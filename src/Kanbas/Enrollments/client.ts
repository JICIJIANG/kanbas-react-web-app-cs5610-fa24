import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchEnrollments = async (userId) => {
  const response = await axios.get(`${API}/${userId}`);
  return response.data;
};

export const enrollCourse = async (userId, courseId) => {
  const response = await axios.post(API, { userId, courseId });
  return response.data;
};

export const unenrollCourse = async (userId: string, courseId: string) => {
    const response = await axios.delete(`${API}/${userId}/${courseId}`);
    return response.data;
  };