import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateAssignment, addAssignment } from './reducer';
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const isNew = !aid;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 从 Redux Store 获取 assignments
    const assignments = useSelector(state => state.assignments.assignments);
    const selectedAssignment = assignments.find(a => a._id === aid);

    // 从数据库加载默认值
    const course = db.courses.find(c => c._id === cid) || {};
    const dueDate = course.endDate ? new Date(course.endDate) : new Date();
    dueDate.setUTCHours(23, 59);
    const availableFrom = course.startDate ? new Date(course.startDate) : new Date();
    availableFrom.setUTCHours(23, 59);

    // 设置 assignment 的初始状态
    const [assignment, setAssignment] = useState(
        selectedAssignment
            ? {
                ...selectedAssignment,
                title: selectedAssignment.title || 'Add Assignment Name',
                description: selectedAssignment.description || course.description || '', // 使用已有作业的描述或数据库默认
                points: selectedAssignment.points || 100,
                group: selectedAssignment.group || 'ASSIGNMENTS',
                displayGradeAs: selectedAssignment.displayGradeAs || 'Percentage',
                submissionType: selectedAssignment.submissionType || 'Online',
                onlineEntryOptions: {
                    textEntry: false,
                    websiteURL: true,
                    mediaRecordings: false,
                    studentAnnotation: false,
                    fileUploads: false,
                    ...selectedAssignment.onlineEntryOptions,
                },
                assignTo: selectedAssignment.assignTo || 'Everyone',
                dueDate: selectedAssignment.dueDate || dueDate.toISOString().slice(0, 16),
                availableFrom: selectedAssignment.availableFrom || availableFrom.toISOString().slice(0, 16),
                until: selectedAssignment.until || dueDate.toISOString().slice(0, 16),
              }
            : {
                _id: new Date().getTime().toString(),
                course: cid,
                title: 'Add Assignment Name',
                description: 'Add Assignment Description',
                points: 100,
                group: 'ASSIGNMENTS',
                displayGradeAs: 'Percentage',
                submissionType: 'Online',
                onlineEntryOptions: {
                    textEntry: false,
                    websiteURL: false,
                    mediaRecordings: false,
                    studentAnnotation: false,
                    fileUploads: false,
                },
                assignTo: 'Everyone',
                dueDate: dueDate.toISOString().slice(0, 16),
                availableFrom: availableFrom.toISOString().slice(0, 16),
                until: dueDate.toISOString().slice(0, 16),
              }
    );

    // 表单输入处理函数
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setAssignment(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleEntryOptionChange = (event) => {
        const { id, checked } = event.target;
        setAssignment(prevState => ({
            ...prevState,
            onlineEntryOptions: {
                ...prevState.onlineEntryOptions,
                [id]: checked,
            }
        }));
    };

    // 保存作业
    const handleSave = () => {
        const assignmentToSave = {
            ...assignment,
            _id: isNew ? new Date().getTime().toString() : assignment._id || new Date().getTime().toString(),
            course: cid, // 确保包含当前课程 ID
        };
    
        console.log("Dispatching addAssignment with:", assignmentToSave);
    
        if (isNew) {
            dispatch(addAssignment(assignmentToSave));
        } else {
            dispatch(updateAssignment(assignmentToSave)); 
        }
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    // 取消操作
    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    return (
        <div className="container mt-4">
            <h1>Assignment Editor</h1>
            {/* Assignment Name */}
            <div className="row mb-3">
                <div className="col-md-12">
                    <label htmlFor="title" className="form-label">Assignment Name</label>
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
                    <textarea
                        id="description"
                        rows={8}
                        className="form-control"
                        value={assignment.description}
                        onChange={handleInputChange}
                        placeholder="Assignment Description"
                    />
                </div>
            </div>

            {/* Points */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="points" className="form-label">Points</label>
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

            {/* Due Dates */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="dueDate" className="form-label">Due</label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        value={assignment.dueDate}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="availableFrom" className="form-label">Available from</label>
                    <input
                        type="datetime-local"
                        id="availableFrom"
                        value={assignment.availableFrom}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="until" className="form-label">Until</label>
                    <input
                        type="datetime-local"
                        id="until"
                        value={assignment.until}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="d-flex justify-content-end">
                <button onClick={handleCancel} className="btn btn-secondary me-2">Cancel</button>
                <button onClick={handleSave} className="btn btn-success">Save</button>
            </div>
        </div>
    );
}
