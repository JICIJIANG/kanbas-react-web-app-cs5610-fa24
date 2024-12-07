import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function Trash(
  { assignmentId, deleteAssignment }: {
    assignmentId: string;
    deleteAssignment: (assignmentId: string) => void
  }
) {
  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)} /> {/* delete button */}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}