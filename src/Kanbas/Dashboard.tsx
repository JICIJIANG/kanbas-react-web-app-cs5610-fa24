import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchEnrollments, enrollCourse, unenrollCourse } from "./Enrollments/client";
import { setEnrollments, enroll, unenroll } from "./Enrollments/reducer";
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
  const enrollments = useSelector((state) => state.enrollment.enrollments) || [];
  const [showAllCourses, setShowAllCourses] = useState(false);

  const isStudent = currentUser?.role === "STUDENT";

  useEffect(() => {
    if (isStudent) {
      const loadEnrollments = async () => {
        try {
          const data = await fetchEnrollments(currentUser._id);
          dispatch(setEnrollments(data || [])); // 确保数据为数组
        } catch (error) {
          console.error("Failed to fetch enrollments", error);
        }
      };
      loadEnrollments();
    }
  }, [dispatch, currentUser, isStudent]);

  const handleEnrollmentsToggle = () => {
    setShowAllCourses((prev) => !prev);
  };

  const handleEnrollmentChange = async (courseId) => {
    const isEnrolled = enrollments.some((e) => e.course === courseId);
    try {
      if (isEnrolled) {
        await unenrollCourse(currentUser._id, courseId);
        dispatch(unenroll({ user: currentUser._id, course: courseId }));
      } else {
        await enrollCourse(currentUser._id, courseId);
        dispatch(enroll({ user: currentUser._id, course: courseId }));
      }
    } catch (error) {
      console.error(`Failed to change enrollment for course ${courseId}:`, error);
    }
  };

  const goToCourse = (courseId) => {
    const isEnrolled = enrollments.some((e) => e.course === courseId);
    if (isStudent && !isEnrolled) {
      alert("You must enroll in the course to view its content.");
      return;
    }
    navigate(`/Kanbas/Courses/${courseId}/Home`);
  };

  const displayCourses = isStudent && !showAllCourses
    ? courses.filter((course) =>
        Array.isArray(enrollments) && enrollments.some((e) => e.course === course._id)
      )
    : courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        {!isStudent && (
          <>
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
          </>
        )}
      </h5>
      {!isStudent && (
        <>
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
        </>
      )}
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
            <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
              <div className="card rounded-3 overflow-hidden position-relative">
                {isStudent && (
                  <button
                    className={`btn ${
                      enrollments.some((e) => e.course === course._id) ? "btn-danger" : "btn-success"
                    } unenroll-btn position-absolute`}
                    style={{ top: "10px", right: "10px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleEnrollmentChange(course._id);
                    }}
                  >
                    {enrollments.some((e) => e.course === course._id) ? "Unenroll" : "Enroll"}
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
                    {!isStudent && (
                      <>
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
                      </>
                    )}
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
