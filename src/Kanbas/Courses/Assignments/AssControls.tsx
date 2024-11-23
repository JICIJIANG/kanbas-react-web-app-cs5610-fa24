import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment } from "./reducer"; // Redux action
import { createAssignment } from "./client"; // 后端 API 调用
import "./Assignments.css";

export default function AssignmentsControls({
  assignmentName,
  setAssignmentName,
  cid,
}: {
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  cid: string;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 创建作业并导航到编辑页面
  const handleAddAssignmentClick = async () => {
    const newAssignment = {
      _id: new Date().getTime().toString(), // 唯一 ID
      course: cid,
      title: "New Assignment",
      description: "Default Description",
      points: 100,
      dueDate: new Date().toISOString(),
      availableFrom: new Date().toISOString(),
      until: new Date().toISOString(),
      completed: false,
    };

    try {
      // 调用后端 API 创建作业
      const createdAssignment = await createAssignment(newAssignment);
      // 将新作业同步到 Redux Store
      dispatch(addAssignment(createdAssignment));
      // 导航到新作业编辑页面
      navigate(`/Kanbas/Courses/${cid}/Assignments/${createdAssignment._id}`);
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <div className="assignments-header">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
        />
      </div>
      <div className="assignment-actions">
        <button className="btn-group">+ Group</button>
        <button className="btn-add" onClick={handleAddAssignmentClick}>
          + Assignment
        </button>
      </div>
    </div>
  );
}
