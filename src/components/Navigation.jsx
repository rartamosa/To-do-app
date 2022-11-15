import React from "react";

import NavigationItem from "./NavigationItem";

const Navigation = ({ tasksTotal, isMobileMenuOpen, onMobileMenuClose }) => {
  return (
    <>
      <nav
        className="navigation__collection"
        style={{ left: isMobileMenuOpen ? "0" : "-75%" }}
      >
        <NavigationItem tasksTotal={tasksTotal} />
      </nav>
      <div
        onClick={onMobileMenuClose}
        className="navigation__overlay"
        style={{ left: isMobileMenuOpen ? "0" : "-100%" }}
      ></div>
    </>
  );
};

export default Navigation;
