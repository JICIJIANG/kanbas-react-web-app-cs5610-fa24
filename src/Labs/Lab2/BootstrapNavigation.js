import React from "react";

export default function BootstrapNavigation() {
  return (
    <>
      <div id="wd-css-navigating-with-tabs">
        <h2>Tabs</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className="nav-link active" onClick={() => console.log("Active tab clicked")}>
              Active
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => console.log("Link clicked")}>
              Link
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => console.log("Link clicked")}>
              Link
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link disabled" disabled>
              Disabled
            </button>
          </li>
        </ul>
      </div>
      <div id="wd-css-navigating-with-cards">
        <h2>Cards</h2>
        <div className="card" style={{ width: "18rem" }}>
          <img src="images/Starship-gap2.jpg" className="card-img-top" alt="Stacking Starship" />
          <div className="card-body">
            <h5 className="card-title">Stacking Starship</h5>
            <p className="card-text">
              Stacking the most powerful rocket in history. Mars or bust!
            </p>
            <button className="btn btn-primary" onClick={() => console.log("Boldly Go clicked")}>
              Boldly Go
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
