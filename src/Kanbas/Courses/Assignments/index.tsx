import AssignmentControls from "./AssControls";
import AssignmentsButtons from "./Button";
import Trash from "./trash";
import { RxTriangleDown } from "react-icons/rx";
import { BsGripVertical } from "react-icons/bs";
import { TbFilePencil } from "react-icons/tb";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect} from "react";


export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId); 
    dispatch(deleteAssignment(assignmentId)); 
  };
 

  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br /><br /><br /><br />
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-1 fs-3" />
          <RxTriangleDown className="me-2 fs-3" />
          <strong style={{ fontSize: '1.2rem' }}>ASSIGNMENTS</strong>
          <AssignmentsButtons />
        </div>
        {assignments
          .map((assignment: any) => (
            <li
              key={assignment._id}
              className="wd-assignment-list-item list-group-item p-0 fs-5 border-gray d-flex align-items-center">
              <BsGripVertical className="ms-1 me-2 fs-2" />
              <TbFilePencil className="me-2 fs-2 text-success" />
              <div className="m-3">
                <a className="wd-assignment-link fw-bold"
                  href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  style={{ color: 'black', textDecoration: 'none' }}>
                  {assignment.title}
                </a>
                <p className="fs-6"><span className="text-danger">Multiple Modules</span> |
                  <strong> Not available until </strong>
                  {assignment.availableFrom.split("T")[0]} at {assignment.availableFrom.split("T")[1]} |
                  <strong> Due </strong>
                  {assignment.due.split("T")[0]} at {assignment.due.split("T")[1]} |
                  &nbsp;{assignment.points} pts</p>
              </div>
              <Trash assignmentId={assignment._id}
                deleteAssignment={(assignmentId) => removeAssignment(assignmentId)} />
            </li>
          ))}

      </ul>
    </div>
  );
}