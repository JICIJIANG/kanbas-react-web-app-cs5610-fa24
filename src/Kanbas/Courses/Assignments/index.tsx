import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { BsGripVertical, BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { TbFilePencil } from "react-icons/tb";
import {
  setAssignments,
  deleteAssignment as deleteAssignmentReducer,
  updateAssignment as updateAssignmentReducer,
} from "./reducer"; // Redux 方法
import {
  findAssignments,
  deleteAssignment,
  updateAssignment,
} from "./client"; // 后端 API 方法
import AssignmentsControls from "./AssControls";
import "./Assignments.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Assignments({ assignmentName, setAssignmentName }) {
  const { cid } = useParams(); // 获取课程 ID
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 从 Redux Store 中获取作业列表
  const assignments = useSelector(
    (state) => state.assignments?.assignments || []
  ).filter((assignment) => assignment.course === cid);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  // 导航到新建作业编辑页面
  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/Editor`);
  };

  // 从服务器加载作业数据
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const assignmentsFromServer = await findAssignments();
        dispatch(setAssignments(assignmentsFromServer)); // 将作业设置到 Redux Store
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, [dispatch]);

  // 删除作业
  const handleDeleteClick = (assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (assignmentToDelete) {
      try {
        await deleteAssignment(assignmentToDelete._id); // 后端删除
        dispatch(deleteAssignmentReducer(assignmentToDelete._id)); // 更新 Redux Store
        setShowDeleteDialog(false);
        setAssignmentToDelete(null);
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  // 更新作业（示例：标记为完成）
  const handleCompleteAssignment = async (assignment) => {
    const updatedAssignment = { ...assignment, completed: true };
    try {
      const result = await updateAssignment(updatedAssignment); // 调用后端更新方法
      dispatch(updateAssignmentReducer(result)); // 更新 Redux Store
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  return (
    <div className="assignments-content">
      {/* 控制面板 */}
      <AssignmentsControls
        setAssignmentName={setAssignmentName}
        assignmentName={assignmentName}
        addAssignment={handleAddAssignment}
        cid={cid}
      />

      <div className="assignments-title-row">
        <h3 className="assignments-title">
          <div className="d-flex align-items-center me-2">
            <BsGripVertical className="me-2 fs-4" /> ASSIGNMENTS
          </div>
        </h3>
        <div
          className="assignments-percentage-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <span className="assignments-percentage-box">40% of Total</span>
          <BsPlus className="ms-1 fs-4" />
          <BsThreeDotsVertical className="more-options ms-1 fs-4" />
        </div>
      </div>

      {/* 作业列表 */}
      <div className="assignment-list">
        {assignments.map((assignment) => (
          <div className="assignment-group" key={assignment._id}>
            <a
              className="assignment-item d-flex align-items-center"
              href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
            >
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="me-2 fs-4" />
                <TbFilePencil
                  className="me-2 fs-4"
                  style={{ color: "green" }}
                />
              </div>
              <div className="assignment-info flex-grow-1">
                <span className="assignment-title">{assignment.title}</span>
                <p className="assignment-details">
                  <span className="text-danger">Multiple Modules</span> | Not
                  available until{" "}
                  {new Date(assignment.availableFrom).toLocaleString()}
                  <br />
                  Due {new Date(assignment.until).toLocaleString()} |{" "}
                  {assignment.points} pts
                </p>
              </div>
              <div className="assignment-controls d-flex align-items-center">
                <FaCheckCircle
                  className="check-icon me-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCompleteAssignment(assignment); // 标记为完成
                  }}
                />
                <FaTrash
                  className="trash-icon text-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClick(assignment);
                  }}
                />
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* 删除确认弹窗 */}
      {showDeleteDialog && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this assignment?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
