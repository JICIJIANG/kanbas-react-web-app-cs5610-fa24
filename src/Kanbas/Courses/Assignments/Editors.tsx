import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAssignment, updateAssignment } from "./client"; // 后端 API 方法
import { addAssignment, updateAssignment as updateAssignmentReducer } from "./reducer"; // Redux 方法

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // 获取课程 ID 和作业 ID
  const isNew = !aid; // 判断是否为新作业
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 从 Redux Store 获取作业列表
  const assignments = useSelector((state) => state.assignments?.assignments || []);
  const currentAssignment = assignments.find((a) => a._id === aid) || {};

  // 初始状态设置
  const [assignment, setAssignment] = useState({
    ...currentAssignment,
    _id: currentAssignment._id || new Date().getTime().toString(),
    course: currentAssignment.course || cid,
    title: currentAssignment.title || "New Assignment",
    description: currentAssignment.description || "Assignment Description",
    points: currentAssignment.points || 100,
    dueDate: currentAssignment.dueDate || new Date().toISOString(),
    availableFrom: currentAssignment.availableFrom || new Date().toISOString(),
    until: currentAssignment.until || new Date().toISOString(),
  });

  // 表单值变化处理
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAssignment((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 保存作业
  const handleSave = async () => {
    try {
      if (isNew) {
        const createdAssignment = await createAssignment(assignment); // 调用后端创建方法
        dispatch(addAssignment(createdAssignment)); // 更新 Redux Store
      } else {
        const updatedAssignment = await updateAssignment(assignment); // 调用后端更新方法
        dispatch(updateAssignmentReducer(updatedAssignment)); // 更新 Redux Store
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`); // 跳转回作业列表
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  // 取消操作
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  useEffect(() => {
    if (!isNew && !currentAssignment._id) {
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    }
  }, [isNew, currentAssignment, cid, navigate]);

  return (
    <div className="container mt-4">
      <h1>{isNew ? "Create New Assignment" : "Edit Assignment"}</h1>

      {/* Title */}
      <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="title" className="form-label">
            Assignment Title
          </label>
          <input
            id="title"
            value={assignment.title}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      {/* Description */}
      <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            value={assignment.description}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="points" className="form-label">
            Points
          </label>
          <input
            id="points"
            type="number"
            value={assignment.points}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>



           {/* Assignment Group */}
           <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="group" className="form-label">Assignment Group</label>
                    <select
                        id="group"
                        value={assignment.group}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="OTHERS">OTHERS</option>
                    </select>
                </div>
            </div>

            {/* Display Grade As */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="displayGradeAs" className="form-label">Display Grade as</label>
                    <select
                        id="displayGradeAs"
                        value={assignment.displayGradeAs}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="Percentage">Percentage</option>
                        <option value="OTHERS">OTHERS</option>
                    </select>
                </div>
            </div>

            {/* Submission Type */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="submissionType" className="form-label">Submission Type</label>
                    <select
                        id="submissionType"
                        value={assignment.submissionType}
                        onChange={(e) => setAssignment(prev => ({ ...prev, submissionType: e.target.value }))}
                        className="form-control"
                    >
                        <option value="Online">Online</option>
                        <option value="In-person">In-person</option>
                    </select>
                </div>
            </div>

            {/* Online Entry Options */}
            {assignment.submissionType === 'Online' && (
                <div className="row mb-3">
                    <div className="col-md-8">
                        <label className="form-label">Online Entry Options:</label>
                        {Object.keys(assignment.onlineEntryOptions).map(option => (
                            <div className="form-check" key={option}>
                                <input
                                    type="checkbox"
                                    id={option}
                                    className="form-check-input"
                                    checked={assignment.onlineEntryOptions[option]}
                                    onChange={handleEntryOptionChange}
                                />
                                <label htmlFor={option} className="form-check-label">
                                    {option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, ' $1')}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Assign To */}
            <div className="row mb-3">
                <div className="col-md-8">
                    <label htmlFor="assignTo" className="form-label">Assign to</label>
                    <input
                        id="assignTo"
                        value={assignment.assignTo}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
            </div>


      {/* Due Date */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            value={assignment.dueDate}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="availableFrom" className="form-label">
            Available From
          </label>
          <input
            id="availableFrom"
            type="datetime-local"
            value={assignment.availableFrom}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      {/* Until */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="until" className="form-label">
            Until
          </label>
          <input
            id="until"
            type="datetime-local"
            value={assignment.until}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="d-flex justify-content-end">
        <button onClick={handleCancel} className="btn btn-secondary me-2">
          Cancel
        </button>
        <button onClick={handleSave} className="btn btn-success">
          Save
        </button>
      </div>
    </div>
  );
}
