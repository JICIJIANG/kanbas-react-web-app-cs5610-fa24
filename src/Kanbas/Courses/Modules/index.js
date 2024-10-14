import React from 'react';
import { useParams } from "react-router";
import * as db from "../../Database";
import { BsGripVertical, BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import ModulesControls from './ModulesControls';
import LessonControlButtons from './LessonControlButtons';
import GreenCheckmark from "./GreenCheckmark";


export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              {module.name}
            </div>

            <div className="d-flex align-items-center">
              <div><GreenCheckmark /></div>
              <BsPlus className="me-0.5" style={{ fontSize: '2.3rem' }}/>
              <BsThreeDotsVertical className="fs-3" />
            </div>
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
