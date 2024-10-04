import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AssignmentEditor() {
    const [submissionType, setSubmissionType] = useState('Online');
    const [onlineEntryOptions, setOnlineEntryOptions] = useState({
        textEntry: false,
        websiteURL: true, // Default checked based on the screenshot
        mediaRecordings: false,
        studentAnnotation: false,
        fileUploads: false,
    });

    const handleSubmissionTypeChange = (event) => {
        setSubmissionType(event.target.value);
    };

    const handleEntryOptionChange = (event) => {
        const { id, checked } = event.target;
        setOnlineEntryOptions(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };

    return (
        <div className="container mt-4">
            {/* Assignment Name */}
            <div className="row mb-3">
                <div className="col-md-12">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" defaultValue="A1" className="form-control" />
                </div>
            </div>

            {/* Description */}
            <div className="row mb-3">
                <div className="col-md-12">
                    <textarea
                        id="wd-description"
                        rows={8}
                        className="form-control"
                        defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. 
The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories
The Kanbas application should include a link to navigate back to the landing page.`}
                    />
                </div>
            </div>

            {/* Points */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    <input id="wd-points" defaultValue={100} className="form-control" />
                </div>
            </div>

            {/* Assignment Group */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                    <select id="wd-group" className="form-control" defaultValue="ASSIGNMENTS">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="OTHERS">OTHERS</option>
                    </select>
                </div>
            </div>

            {/* Display Grade As */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                    <select id="wd-display-grade-as" className="form-control" defaultValue="Percentage">
                        <option value="Percentage">Percentage</option>
                        <option value="OTHERS">OTHERS</option>
                    </select>
                </div>
            </div>

            {/* Submission Type */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                    <select id="wd-submission-type" value={submissionType} onChange={handleSubmissionTypeChange} className="form-control">
                        <option value="Online">Online</option>
                        <option value="In-person">In-person</option>
                    </select>
                </div>
            </div>

            {/* Online Entry Options */}
            {submissionType === 'Online' && (
                <div className="row mb-3">
                    <div className="col-md-8">
                        <label className="form-label">Online Entry Options:</label>
                        <div className="form-check">
                            <input type="checkbox" id="textEntry" className="form-check-input" checked={onlineEntryOptions.textEntry} onChange={handleEntryOptionChange} />
                            <label htmlFor="textEntry" className="form-check-label">Text Entry</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="websiteURL" className="form-check-input" checked={onlineEntryOptions.websiteURL} onChange={handleEntryOptionChange} />
                            <label htmlFor="websiteURL" className="form-check-label">Website URL</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="mediaRecordings" className="form-check-input" checked={onlineEntryOptions.mediaRecordings} onChange={handleEntryOptionChange} />
                            <label htmlFor="mediaRecordings" className="form-check-label">Media Recordings</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="studentAnnotation" className="form-check-input" checked={onlineEntryOptions.studentAnnotation} onChange={handleEntryOptionChange} />
                            <label htmlFor="studentAnnotation" className="form-check-label">Student Annotation</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" id="fileUploads" className="form-check-input" checked={onlineEntryOptions.fileUploads} onChange={handleEntryOptionChange} />
                            <label htmlFor="fileUploads" className="form-check-label">File Uploads</label>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign To */}
            <div className="row mb-3">
                <div className="col-md-8">
                    <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                    <input id="wd-assign-to" defaultValue="Everyone" className="form-control" />
                </div>
            </div>

            {/* Due Dates */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="wd-due" className="form-label">Due</label>
                    <input type="datetime-local" id="wd-due" defaultValue="2024-05-13T23:59" className="form-control" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                    <input type="datetime-local" id="wd-available-from" defaultValue="2024-05-06T12:00" className="form-control" />
                </div>
                <div className="col-md-4">
                    <label htmlFor="wd-until" className="form-label">Until</label>
                    <input type="datetime-local" id="wd-until" defaultValue="2024-05-13T23:59" className="form-control" />
                </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2">Cancel</button>
                <button className="btn btn-success">Save</button>
            </div>
        </div>
    );
}