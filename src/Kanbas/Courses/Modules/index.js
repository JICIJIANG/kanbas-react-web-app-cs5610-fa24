import React from 'react';
import { BsGripVertical, BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import ModulesControls from './ModulesControls';
import LessonControlButtons from './LessonControlButtons';
import GreenCheckmark from "./GreenCheckmark";


export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              Week 1
            </div>
            <div className="d-flex align-items-center">
              <div><GreenCheckmark /></div>
              <BsPlus className="me-0.5" style={{ fontSize: '2.3rem' }}/>
              <BsThreeDotsVertical className="fs-3" />
            </div>
          </div>

          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              LEARNING OBJECTIVES
              </div>
              <LessonControlButtons />
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              Introduction to the course
              </div>
              <LessonControlButtons />
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              Learn what is Web Development
              </div>
              <LessonControlButtons />
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 1
              </div>
              <LessonControlButtons />
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              LESSON 2
              </div>
              <LessonControlButtons />
            </li>
          </ul>
        </li>

        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            Week 2
            </div>
            <LessonControlButtons />
          </div>

          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
              LEARNING OBJECTIVES
              </div>
              <LessonControlButtons />
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
              LESSON 1
              </div>
              <LessonControlButtons />
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
            <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
              LESSON 2
              </div>
              <LessonControlButtons />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
