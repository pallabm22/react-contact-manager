import React from "react";

const Header = () => {
  return (
    <div className="ui fixed menu" style={{ width: "100%" }}>
      <div className="ui container" style={{ width: "100%" }}>
        <h1
          className="ui center aligned header"
          style={{
            fontSize: "2.5rem", // 👈 Increase the size here
            fontWeight: "bold", // Optional: make it bold
            width: "100%",
            margin: "0 auto",
            padding: "1rem 0", // Optional: extra spacing
          }}
        >
          Contact Manager
        </h1>
      </div>
    </div>
  );
};

export default Header;
