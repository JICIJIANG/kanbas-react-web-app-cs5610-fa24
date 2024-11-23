import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

// 创建作业
export const createAssignment = async (assignment) => {
  const response = await axios.post(ASSIGNMENTS_API, assignment);
  return response.data;
};

// 获取所有作业
export const findAssignments = async () => {
  const response = await axios.get(ASSIGNMENTS_API);
  return response.data;
};

// 更新作业
export const updateAssignment = async (assignment) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};

// 删除作业
export const deleteAssignment = async (assignmentId) => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};
