import React from "react";
import Signin from "./Signin";
import { Routes, Route, Navigate } from "react-router";
import Profile from './Profile';  // Import Profile component
import Signup from './Signup';  // Import Signup component
import AccountNavigation from "./Navigation";

export default function Account() {
  return (
    <div id="wd-account-screen">
      <h1>Account</h1>
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
            <Routes>
                <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}