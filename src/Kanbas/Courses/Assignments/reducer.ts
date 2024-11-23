import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [], // 初始状态为空
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments.push(action.payload);
    },
    updateAssignment: (state, action) => {
      const index = state.assignments.findIndex((a) => a._id === action.payload._id);
      if (index >= 0) state.assignments[index] = action.payload;
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter((a) => a._id !== action.payload);
    },
  },
});

export const { setAssignments, addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
