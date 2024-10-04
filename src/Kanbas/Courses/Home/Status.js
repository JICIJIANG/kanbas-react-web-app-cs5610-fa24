import { MdDoNotDisturbAlt } from "react-icons/md";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { FiHome, FiActivity, FiBell } from "react-icons/fi";
import { BsMegaphone, BsGraphUp } from "react-icons/bs";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-2">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-0.2 fs-5" /> Unpublish
          </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-0.2 fs-5" /> Publish
          </button>
        </div>
      </div>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import from Commons
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FiHome className="me-2 fs-5" /> Choose Home Page
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FiActivity className="me-2 fs-5" /> View Course Stream
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsMegaphone className="me-2 fs-5" /> New Announcement
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsGraphUp className="me-2 fs-5" /> New Analytics
      </button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FiBell className="me-2 fs-5" /> View Course Notifications
      </button>
    </div>
  );
}
