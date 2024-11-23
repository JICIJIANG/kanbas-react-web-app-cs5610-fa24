import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [], // 存储所有选课信息
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    // 设置选课状态
    setEnrollments: (state, action) => {
      state.enrollments = action.payload|| []; // 用后端返回的数据覆盖
    },
    // 添加选课
    enroll: (state, action) => {
      const { user, course } = action.payload;
      const exists = state.enrollments.some(
        (enrollment) => enrollment.user === user && enrollment.course === course
      );
      if (!exists) {
        state.enrollments.push(action.payload); // 避免重复添加
      }
    },
    // 删除选课
    unenroll: (state, action) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment.user !== user || enrollment.course !== course
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;