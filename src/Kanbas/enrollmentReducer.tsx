// src/Kanbas/enrollmentReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrollments: {}, // 记录用户的选课状态，key 是课程 ID，值是是否已注册
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    toggleEnrollment: (state, action) => {
      const courseId = action.payload;
      state.enrollments[courseId] = !state.enrollments[courseId];
    },
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
  },
});

export const { toggleEnrollment, setEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
