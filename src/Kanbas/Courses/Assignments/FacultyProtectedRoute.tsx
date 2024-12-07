import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return currentUser.role === "FACULTY" && children;

}