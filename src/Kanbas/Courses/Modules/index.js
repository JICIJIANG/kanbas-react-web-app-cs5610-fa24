import { useState } from 'react';
import React from 'react';

export default function Modules() {
  const [collapsed, setCollapsed] = useState(false);
  const progress = 50; // 假设完成50%的课程
  
  const toggleCollapseAll = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <div id="wd-modules-buttons">
        <button onClick={toggleCollapseAll}>
          {collapsed ? 'Expand All' : 'Collapse All'}
        </button>
        <button onClick={() => alert(`You have completed ${progress}% of the course.`)}>
          View Progress
        </button>
        <button>Publish All</button>
        <button>+ Module</button>
      </div>

      <ul id="wd-modules">
        <li className="wd-module" key="module-1">
          <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
          {!collapsed && (
            <ul className="wd-lessons">
              <li className="wd-lesson" key="lesson-1">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                  <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to Web Development</li>
                  <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                  <li className="wd-content-item">Creating a React Application</li>
                </ul>
              </li>
            </ul>
          )}
        </li>
        <li className="wd-module" key="module-2">
          <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces with HTML</div>
          {!collapsed && (
            <ul className="wd-lessons">
              <li className="wd-lesson" key="lesson-2">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to Web Development</li>
                  <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                  <li className="wd-content-item">Creating a React Application</li>
                </ul>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
