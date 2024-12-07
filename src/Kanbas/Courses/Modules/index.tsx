import {useState, useEffect, useCallback} from 'react';
import { useParams } from "react-router";
import { BsGripVertical } from 'react-icons/bs';
import ModulesControls from './ModulesControls';
import LessonControlButtons from './LessonControlButtons';
import ModuleControlButtons from './ModuleControlButtons';
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";


export default function Modules() {
  const { cid } = useParams();
  const [ moduleName, setModuleName ] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = useCallback(async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  }, [cid, dispatch]); // Add cid and dispatch as dependencies

  // Include fetchModules in the dependency array
  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const createModuleForCourse = async () => {
      if (!cid) return;
      const newModule = { name: moduleName, course: cid };
      const module = await coursesClient.createModuleForCourse(cid, newModule);
      dispatch(addModule(module));
    };
  const removeModule = async (moduleId: string) => {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    };
  const saveModule = async (module: any) => {
      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    };

  return (
    <div>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
        addModule ={createModuleForCourse}/>           <br /><br /><br /><br />

 
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .map((module: any) => (
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              { module.editing && (
                <input className="form-control w-125 d-inline-block"
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown= {(e) => {
                        if (e.key === "Enter") {
                          saveModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}/>
              )}
            </div>
            <ModuleControlButtons moduleId={module._id}
               deleteModule={(moduleId) => removeModule(moduleId)}
               editModule={(moduleId) => dispatch(editModule(moduleId))} />
         </div>

          {module.lessons && (
          <ul className="wd-lessons list-group rounded-0">
            {module.lessons.map((lesson: any) => (
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              {lesson.name}
              </div>
              <LessonControlButtons />
            </li>
            ))}
          </ul>
          )}
        </li>
          ))}
      </ul>
    </div>
  );
}
