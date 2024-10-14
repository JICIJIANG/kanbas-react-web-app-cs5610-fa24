import React from 'react';
import { useParams} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { BsGripVertical, BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import { TbFilePencil } from "react-icons/tb";
import { FaCheckCircle } from 'react-icons/fa';
import './Assignments.css'; 
import * as db from '../../Database';

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments.filter(assignment => assignment.course === cid); // 筛选对应课程的作业

    return (
        <div className="assignments-content">
            <div className="assignments-header">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
                <div className="assignment-actions">
                    <button className="btn-group">+ Group</button>
                    <button className="btn-add">+ Assignment</button>
                </div>
            </div>

            <div className="assignments-title-row">
                <h3 className="assignments-title">
                    <div className="d-flex align-items-center me-2">
                        <BsGripVertical className="me-2 fs-4" />ASSIGNMENTS 
                    </div>
                </h3>
                <div className="assignments-percentage-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="assignments-percentage-box">
                        40% of Total
                    </span>
                    <BsPlus className="ms-1 fs-4" />
                    <BsThreeDotsVertical className="more-options ms-1 fs-4" />
                </div>
            </div>

            <div className="assignment-list">
                {assignments.map(assignment => (
                    <div className="assignment-group" key={assignment._id}>
                        <a className="assignment-item d-flex align-items-center" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                            <div className="d-flex align-items-center me-2">
                                <BsGripVertical className="me-2 fs-4" />
                                <TbFilePencil className="me-2 fs-4" />
                            </div>
                            <div className="assignment-info flex-grow-1">
                                <span className="assignment-title">{assignment.title}</span>
                                <p className="assignment-details">
                                    <span className="text-danger">Multiple Modules</span> | Not available until May 20 at 12:00am<br />
                                    Due May 27 at 11:59pm | 100 pts
                                </p>
                            </div>
                            <div className="assignment-controls d-flex align-items-center">
                                <FaCheckCircle className="check-icon me-2" />
                                <BsThreeDotsVertical className="more-options" />
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}