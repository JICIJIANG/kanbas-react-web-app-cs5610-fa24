import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentsButtons() {
  return (
    <div className="float-end">
      <span className="border rounded-pill p-2 me-2">40% of Total</span>
      <FaPlus className="me-1" />
      <IoEllipsisVertical className="me-1 fs-4" />
    </div>
);}