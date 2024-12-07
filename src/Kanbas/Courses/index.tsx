import { FaAlignJustify } from 'react-icons/fa';
import AssignmentEditor from "./Assignments/Editors";
import CoursesNavigation from "./Navigation";
import Assignments from "./Assignments";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes,useParams,useLocation  } from "react-router-dom";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as courseClient from "./client";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();

    const [usersForCourse, setUsersForCourse] = useState<any[]>([]);

    useEffect(() => {
      if (cid) {
          courseClient.findUsersForCourse(cid).then((users) => setUsersForCourse(users));
      }
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
         </h2>
          <div className="d-flex">
          <div className="d-none d-md-block">
            <CoursesNavigation />
            </div>
            <div className="flex-fill">
            <Routes>
              <Route path="/"
                     element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments"
                     element={<Assignments />} />
              <Route path="Assignments/:aid"
                     element={<AssignmentEditor />} />
              <Route path="People" element={< PeopleTable users={usersForCourse}/>} />
            </Routes>
            </div></div>
    </div>
);}
