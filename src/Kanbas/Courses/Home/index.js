import React from "react";
import Modules from "../Modules";
import CourseStatus from "./Status";
  export default function Home() {
    return (
      <div className="row" id="wd-home">
        <div className="col-md-9 col-sm-12">
          <Modules />
        </div>
  
        <div className="col-md-3 d-none d-md-block">
          <CourseStatus />
        </div>
      </div>
    );
  }
  
