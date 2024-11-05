// AssignmentsControls.js
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAssignment } from './reducer'; // 导入 addAssignment action

export default function AssignmentsControls({
    assignmentName, setAssignmentName, cid
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddAssignmentClick = () => {
        // 生成具有默认值的新作业对象
        const newAssignment = {
            _id: new Date().getTime().toString(),
            course: cid,
            title: 'New Assignment',
            description: 'Default Description',
            points: 100,
            dueDate: new Date().toISOString(),
            availableFrom: new Date().toISOString(),
            until: new Date().toISOString(),
        };
        
        // 添加新作业到 Redux store
        dispatch(addAssignment(newAssignment));

        // 使用生成的作业 ID 导航到 AssignmentEditor 页面
        navigate(`/Kanbas/Courses/${cid}/Assignments/${newAssignment._id}`);
    };

    return (
        <div className="assignments-header">
            <div className="search-container">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search..." className="search-input" />
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
