import React, { useState } from 'react';

export default function AssignmentEditor() {
    const [submissionType, setSubmissionType] = useState('Online');

    const handleSubmissionTypeChange = (event) => {
        setSubmissionType(event.target.value);
    };

    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

            <textarea id="wd-description" cols={45} rows={15}>
                The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, Links to each of the lab assignments, Link to the Kanbas application, Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
            <br />

            <table>
                <tbody>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" defaultValue={100} />
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td>
                            <select id="wd-group">
                                <option value="ASSIGNMENTS" selected>
                                    ASSIGNMENTS
                                </option>
                                <option value="OTHERS">OTHERS</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-display-grade-as">Display Grade as</label>
                        </td>
                        <td>
                            <select id="wd-display-grade-as">
                                <option value="Percentage" selected>
                                    Percentage
                                </option>
                                <option value="OTHERS">OTHERS</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-submission-type">Submission Type</label>
                        </td>
                        <td>
                            <select id="wd-submission-type" value={submissionType} onChange={handleSubmissionTypeChange}>
                                <option value="Online" selected>
                                    Online
                                </option>
                                <option value="In-person">In-person</option>
                            </select>
                        </td>
                    </tr>
                    {submissionType === 'Online' && (
                        <tr>
                            <td align="right" valign="top">
                                <label>Online Entry Option:</label>
                            </td>
                            <td>
                                <input type="checkbox" name="check-entry" id="wd-chkbox-Text Entry" />
                                <label htmlFor="wd-chkbox-Text Entry">Text Entry</label><br />
                                <input type="checkbox" name="check-entry" id="wd-chkbox-Website URI" />
                                <label htmlFor="wd-chkbox-Website URI">Website URI</label><br />
                                <input type="checkbox" name="check-entry" id="wd-chkbox-media" />
                                <label htmlFor="wd-chkbox-media">Media Recordings</label><br />
                                <input type="checkbox" name="check-entry" id="wd-chkbox-student-annotation" />
                                <label htmlFor="wd-chkbox-student-annotation">Student Annotation</label><br />
                                <input type="checkbox" name="check-entry" id="wd-chkbox-fileuploads" />
                                <label htmlFor="wd-chkbox-fileuploads">File Uploads</label>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-assign-to">Assign To</label>
                        </td>
                        <td>
                            <input id="wd-assign-to" defaultValue="Everyone" />
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-due">Due</label>
                        </td>
                        <td>
                            <input type="date" id="wd-due" />
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label>Available from</label>
                        </td>
                        <td>
                            <input type="date" id="wd-available-from" />
                            <label htmlFor="wd-until" style={{ marginLeft: '10px' }}>Until</label>
                            <input type="date" id="wd-until" style={{ marginLeft: '5px' }} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


