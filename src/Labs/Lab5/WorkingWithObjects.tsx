import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS5610",
    name: "Web Development",
    description: "A course about full-stack development",
    course: "Computer Science",
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* Assignment Section */}
      <h4>Assignment</h4>
      <input
        className="form-control w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary mt-2"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <br />
      <input
        className="form-control w-75 mt-2"
        id="wd-assignment-score"
        type="number"
        placeholder="Enter new score"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-primary-success mt-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <br />
      <div className="form-check mt-2">
        <input
          id="wd-assignment-completed"
          className="form-check-input"
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label htmlFor="wd-assignment-completed" className="form-check-label">
          Completed
        </label>
      </div>
      <a
        id="wd-update-assignment-completed"
        className="btn btn-warning mt-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <br />
      <a
        id="wd-retrieve-assignment"
        className="btn btn-secondary mt-2"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-secondary mt-2 ms-2"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Assignment Title
      </a>
      <hr />

      {/* Module Section */}
      <h4>Module</h4>
      <input
        className="form-control w-75"
        id="wd-module-name"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        id="wd-update-module-name"
        className="btn btn-primary mt-2"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>
      <br />
      <input
        className="form-control w-75 mt-2"
        id="wd-module-description"
        value={module.description}
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })
        }
      />
      <a
        id="wd-update-module-description"
        className="btn btn-primary-success mt-2"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
      <br />
      <a
        id="wd-get-module"
        className="btn btn-secondary mt-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <a
        id="wd-get-module-name"
        className="btn btn-secondary mt-2 ms-2"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />
    </div>
  );
}
