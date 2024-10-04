import React from "react";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus, FaBan } from "react-icons/fa6";
import { useState } from "react";

export default function ModulesControls() {
  const [progress] = useState(0);

  const handleCollapseAll = () => {
    console.log("All modules collapsed");
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* Add Module Button */}
      <button
        id="wd-add-module-btn"
        className="btn btn-lg btn-danger me-1 float-end"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>

      {/* Publish All Dropdown */}
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          {/* New Unpublish Items */}
          <li>
            <a
              id="wd-unpublish-all-modules-and-items"
              className="dropdown-item"
              href="#"
            >
              <FaBan className="me-2" />
              Unpublish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-unpublish-modules-only"
              className="dropdown-item"
              href="#"
            >
              <FaBan className="me-2" />
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>

      {/* View Progress Button */}
      <button
        id="wd-view-progress"
        className="btn btn-lg btn-secondary me-1 float-end"
      >
        View Progress
      </button>

      {/* Progress Indicator */}
      {progress > 0 && (
        <div className="progress-bar bg-success" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      )}

      {/* Collapse All Button */}
      <button
        id="wd-collapse-all"
        className="btn btn-lg btn-secondary me-1 float-end"
        onClick={handleCollapseAll}
      >
        Collapse All
      </button>
    </div>
  );
}

