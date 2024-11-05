import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toggleEnrollment, setEnrollments } from "./enrollmentReducer";
import * as db from "./Database";
import "./styles.css";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.accountReducer);
  const enrollments = useSelector((state) => state.enrollment.enrollments);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const isStudent = currentUser?.role === "STUDENT";
  const displayCourses = isStudent && !showAllCourses
    ? courses.filter((course) => enrollments[course._id])
    : courses; // 教师显示所有课程，学生点击Enrollments后也显示所有课程

  useEffect(() => {
    // 从数据库中加载默认的选课状态
    const savedEnrollments = db.enrollments.reduce((acc, enrollment) => {
      if (enrollment.user === currentUser._id) {
        acc[enrollment.course] = true;
      }
      return acc;
    }, {});
    dispatch(setEnrollments(savedEnrollments));
  }, [currentUser, dispatch]);

  const handleEnrollmentsToggle = () => {
    setShowAllCourses((prev) => !prev);
  };

  const handleEnrollmentChange = (courseId) => {
    dispatch(toggleEnrollment(courseId));
  };

  const goToCourse = (courseId) => {
    if (isStudent && enrollments[courseId]) {
      navigate(`/Kanbas/Courses/${courseId}/Home`);
    } else if (!isStudent) {
      navigate(`/Kanbas/Courses/${courseId}/Home`);
    } else {
      alert("You must enroll in the course to view its content.");
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={updateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />

      <input
        defaultValue={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        defaultValue={course.description}
        className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      {isStudent && (
        <button
          className="btn btn-primary mb-3"
          onClick={handleEnrollmentsToggle}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          {showAllCourses ? "Show Enrolled" : "Enrollments"}
        </button>
      )}
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayCourses.map((course) => (
            <div
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
              key={course._id}
            >
              <div className="card rounded-3 overflow-hidden position-relative">
                {isStudent && (
                  <button
                    className={`btn ${
                      enrollments[course._id] ? "btn-danger" : "btn-success"
                    } unenroll-btn position-absolute`}
                    style={{ top: "10px", right: "10px" }} // 定位到右上角
                    onClick={(e) => {
                      e.preventDefault();
                      handleEnrollmentChange(course._id);
                    }}
                  >
                    {enrollments[course._id] ? "Unenroll" : "Enroll"}
                  </button>
                )}
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src="/images/db3.png"
                    width="100%"
                    height={160}
                    alt={course.name}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        goToCourse(course._id);
                      }}
                    >
                      Go
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                      className="btn btn-primary-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                    <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
