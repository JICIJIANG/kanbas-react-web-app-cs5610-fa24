import * as client from "./client";
import { useEffect, useState, useCallback } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  // 使用 useCallback 确保 fetchProfile 是一个稳定的函数引用
  const fetchProfile = useCallback(async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      console.error(err);
    }
    setPending(false);
  }, [dispatch]); // 依赖 dispatch，确保它是稳定的

  // 添加 fetchProfile 到 useEffect 的依赖数组
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!pending) {
    return children;
  }

  return null; // 如果 pending 为 true，返回 null 或者加载指示器
}
