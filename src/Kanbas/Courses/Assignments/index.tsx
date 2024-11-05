import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import { BsGripVertical, BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import { TbFilePencil } from 'react-icons/tb';
import {deleteAssignment} from './reducer'; // 确保 reducer 中有 deleteAssignment action
import AssignmentsControls from './AssControls';
import './Assignments.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Assignments({
  assignmentName,
  setAssignmentName,
}) {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 从 Redux Store 中获取 assignments，筛选出当前课程相关的作业
  const assignments = useSelector(state => state.assignments.assignments).filter(
    (assignment) => assignment.course === cid
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  // 导航到新建作业编辑页面
  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/Editor`);
  };

  // 删除作业的确认和取消
  const handleDeleteClick = (assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id));
      setShowDeleteDialog(false);
      setAssignmentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  // 监听 assignments 的更新，以确保组件重新渲染
  useEffect(() => {
    console.log("Assignments updated:", assignments);
  }, [assignments]);

  return (
    <div className="assignments-content">
      {/* 控制面板 */}
      <AssignmentsControls
        setAssignmentName={setAssignmentName}
        assignmentName={assignmentName}
        addAssignment={handleAddAssignment}  // 确保使用 handleAddAssignment 进行导航
        cid={cid}
      />

      <div className="assignments-title-row">
        <h3 className="assignments-title">
          <div className="d-flex align-items-center me-2">
            <BsGripVertical className="me-2 fs-4" /> ASSIGNMENTS
          </div>
        </h3>
        <div className="assignments-percentage-container" style={{ display: 'flex', alignItems: 'center' }}>
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
                <TbFilePencil className="me-2 fs-4" style={{ color: 'green' }} />
              </div>
              <div className="assignment-info flex-grow-1">
                <span className="assignment-title">{assignment.title}</span>
                <p className="assignment-details">
                    <span className="text-danger">Multiple Modules</span> | Not available until {new Date(assignment.availableFrom).toLocaleString()}
                    <br />
                    Due {new Date(assignment.until).toLocaleString()} | {assignment.points} pts
                  </p>
              </div>
              <div className="assignment-controls d-flex align-items-center">
                <FaCheckCircle className="check-icon me-2" />
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

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
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
