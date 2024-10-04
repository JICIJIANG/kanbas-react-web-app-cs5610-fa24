import React from "react";
export default function Floats(){
    return(
      <div id="wd-float-divs">
        <h2>Float</h2>
        <div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
            Yellow </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
            Blue </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
            Red </div>
        <img className="wd-float-right"
            src="/images/Starship-gap2.jpg" alt=""/>
        <div className="wd-float-done"></div>
        </div>
      </div>
    );
}