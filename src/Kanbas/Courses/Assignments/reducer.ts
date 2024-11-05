import { createSlice } from '@reduxjs/toolkit';
import { assignments as initialAssignments } from '../../Database';

const initialState = {
  assignments: initialAssignments || [],
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      // 确保不可变性
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };
    },
    deleteAssignment: (state, action) => {
      return {
        ...state,
        assignments: state.assignments.filter(
          assignment => assignment._id !== action.payload
        ),
      };
    },
    updateAssignment: (state, action) => {
      return {
        ...state,
        assignments: state.assignments.map(assignment =>
          assignment._id === action.payload._id
            ? { ...assignment, ...action.payload }
            : assignment
        ),
      };
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
