import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`); // delete assignment on the server
    return response.data;
};

export const updateAssignment = async (assignment: any) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment); // update assignment on the server
    return data;
};