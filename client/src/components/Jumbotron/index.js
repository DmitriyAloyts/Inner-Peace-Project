import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 260, clear: "both", paddingTop: 60, textAlign: "center" }}
      className="jumbotron border border-success"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
