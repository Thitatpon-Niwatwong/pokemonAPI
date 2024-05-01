import React from "react";
import "../App.css"; // Import App.css for styling

function ErrorDisplay({ message }) {
  return <div className="error">{message}</div>;
}

export default ErrorDisplay;
