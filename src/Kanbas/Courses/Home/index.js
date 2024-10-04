import React from "react";
import Modules from "../Modules";
import CourseStatus from "./Status";
  export default function Home() {
    return (
      <div className="row" id="wd-home">
        <div className="col-md-8s col-sm-11">
          <Modules />
        </div>
  
        <div className="col-md-2 d-none d-md-block">
          <CourseStatus />
        </div>
      </div>
    );
  }
  
