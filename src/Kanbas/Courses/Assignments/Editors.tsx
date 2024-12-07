import { useParams } from "react-router";
//import { assignments } from "../../Database";
import { Link } from "react-router-dom";
import { addAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";


export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();
    const existingAssignment = assignments.find((assignment: any) => assignment._id === aid);
    const isNewAssignment = !existingAssignment;

    const [assignment, setAssignment] = useState(existingAssignment || { // if assignment is not found, create a new assignment
        _id: new Date().getTime().toString(),
        title: "New Assignment",
        course: cid,
        description: "New Assignment Description",
        points: 100,
        due: new Date().toISOString().split(".")[0],
        availableFrom: new Date().toISOString().split(".")[0],
        availableUntil: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split(".")[0]
    });

    const createAssignmentForCourse = async (assignment: any) => {
        if (!cid) return;
        const newAssignment = await coursesClient.createAssignmentForCourse(cid, assignment);
        dispatch(addAssignment(newAssignment));
    };

    const saveAssignment = async (assignment: any) => {
        await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };

    return (
        <div id="wd-assignments-editor" className="ms-5">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">
                    Assignment Name</label>
                <input className="form-control" type="text"
                    id="wd-name" defaultValue={assignment ? assignment.title : "New Assignment"}
                    onChange={(e) => { setAssignment({ ...assignment, title: e.target.value }) }} />
            </div>

            <textarea id="wd-description" className="form-control mb-3"
                onChange={(e) => { setAssignment({ ...assignment, description: e.target.value }) }}>
                {assignment ? assignment.description : "New Assignment Description"}
            </textarea>

            <form id="wd-assignment-properties">
                <div className="row mb-3">
                    <label htmlFor="wd-points" className="col-sm-2 col-form-label">
                        Points</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="number" id="wd-points" value={assignment ? assignment.points : 100}
                            onChange={(e) => { setAssignment({ ...assignment, points: parseInt(e.target.value) }) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="wd-group" className="col-sm-2 col-form-label">
                        Assignment Group</label>
                    <div className="col-sm-10">
                        <select className="form-select" id="wd-group">
                            <option selected>ASSIGNMENTS</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label">
                        Display Grade as</label>
                    <div className="col-sm-10">
                        <select className="form-select" id="wd-display-grade-as">
                            <option selected>Percentage</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2">
                        Submission Type</label>
                    <div className="border rounded col-sm-10">
                        <div className="m-3">
                            <select className="form-select m-2" id="wd-submission-type">
                                <option selected>Online</option>
                            </select>
                            <label className="mt-2 mb-2 fw-bold">Online Entry Options</label>
                            <br />
                            <div className="m-2 mb-3">
                                <input className="form-check-input me-2" type="checkbox"
                                    name="online-entry-options" id="wd-text-entry" />
                                <label className="form-check-label" htmlFor="wd-text-entry">
                                    Text Entry</label>
                            </div>
                            <div className="m-2 mb-3">
                                <input className="form-check-input me-2" type="checkbox"
                                    name="online-entry-options" id="wd-website-url" checked />
                                <label className="form-check-label" htmlFor="wd-website-url">
                                    Website URL</label>
                            </div>
                            <div className="m-2 mb-3">
                                <input className="form-check-input me-2" type="checkbox"
                                    name="online-entry-options" id="wd-media-recordings" />
                                <label className="form-check-label" htmlFor="wd-media-recordings">
                                    Media Recordings</label>
                            </div>
                            <div className="m-2 mb-3">
                                <input className="form-check-input me-2" type="checkbox"
                                    name="online-entry-options" id="wd-student-annotation" />
                                <label className="form-check-label" htmlFor="wd-student-annotation">
                                    Student Annotation</label>
                            </div>
                            <div className="m-2 mb-3">
                                <input className="form-check-input me-2" type="checkbox"
                                    name="online-entry-options" id="wd-file-upload" />
                                <label className="form-check-label" htmlFor="wd-file-upload">
                                    File Uploads</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                        Assign</label>
                    <div className="border rounded col-sm-10">
                        <div className="m-3">
                            <label htmlFor="wd-assign-to" className="col-form-label fw-bold mb-1">Assign to</label><br />
                            <input id="wd-assign-to" className="form-control" value="Everyone" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="wd-due-date" className="col-form-label fw-bold mb-1">Due</label><br />
                            <input id="wd-due-date" className="form-control" type="datetime-local" defaultValue={assignment?.due}
                                onChange={(e) => { setAssignment({ ...assignment, due: e.target.value }) }} />
                        </div>
                        <div className="m-3 d-flex">
                            <div className="flex-fill me-1">
                                <label htmlFor="wd-available-from" className="col-form-label fw-bold mb-1">Available from</label><br />
                                <input id="wd-available-from" className="form-control" type="datetime-local" defaultValue={assignment?.availableFrom}
                                    onChange={(e) => { setAssignment({ ...assignment, availableFrom: e.target.value }) }} />
                            </div>
                            <div className="flex-fill">
                                <label htmlFor="wd-available-until" className="col-form-label fw-bold mb-1">Available until</label><br />
                                <input id="wd-available-until" className="form-control" type="datetime-local" defaultValue={assignment?.availableUntil}
                                    onChange={(e) => { setAssignment({ ...assignment, availableUntil: e.target.value }) }} />
                            </div>

                        </div>
                    </div>
                </div>
            </form>

            <hr />
            <div className="float-end">
                <Link id="wd-save-btn" className="btn btn-md btn-danger me-2 float-end"
                    to={`/Kanbas/Courses/${cid}/Assignments`}
                    onClick={() => {
                        if (isNewAssignment) {
                            createAssignmentForCourse(assignment);
                        } else {
                            saveAssignment(assignment);
                        }
                    }}>
                    Save
                </Link>
                <Link id="wd-cancel-btn" className="btn btn-md btn-secondary me-2 float-end"
                    to={`/Kanbas/Courses/${cid}/Assignments`}>
                    Cancel
                </Link>
            </div>


        </div>
    );
}