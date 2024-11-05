import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // 使用 useCallback 包装 fetchProfile
  const fetchProfile = useCallback(() => {
    if (!currentUser) {
      navigate("/Kanbas/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, navigate]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <input
            defaultValue={profile.username}
            id="wd-username"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <input
            defaultValue={profile.password}
            id="wd-password"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <input
            defaultValue={profile.firstName}
            id="wd-firstname"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <input
            defaultValue={profile.lastName}
            id="wd-lastname"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <input
            defaultValue={profile.dob}
            id="wd-dob"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
          />
          <input
            defaultValue={profile.email}
            id="wd-email"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-2"
            id="wd-role"
            defaultValue={profile.role}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
