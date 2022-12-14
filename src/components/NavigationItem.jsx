import React from "react";

const NavigationItem = ({ tasksTotal }) => {
  return (
    <>
      <div className="navigation__collection_element">
        <div className="navigation__collection_element-1st">
          <div
            className="navigation__collection_element-tasks-icon"
            title="Tasks icon"
            alt="Tasks icon"
          />
          <p className="navigation__collection_element_name">Tasks</p>
        </div>
        <span className="navigation__collection_element_number">
          {tasksTotal}
        </span>
      </div>

      <div className="navigation__collection_element">
        <div className="navigation__collection_element-1st">
          <div
            className="navigation__collection_element-users-icon"
            title="Users icon"
            alt="Users icon"
          />
          <p className="navigation__collection_element_name">Users</p>
        </div>
        <span className="navigation__collection_element_number">X</span>
      </div>
      <div className="navigation__collection_element">
        <div className="navigation__collection_element-1st">
          <div
            className="navigation__collection_element-columns-icon"
            title="Columns icon"
            alt="Columns icon"
          />
          <p className="navigation__collection_element_name">Columns</p>
        </div>
        <span className="navigation__collection_element_number">Y</span>
      </div>
      <div className="navigation__collection_element">
        <div className="navigation__collection_element-1st">
          <div
            className="navigation__collection_element-tags-icon"
            title="Tags icon"
            alt="Tags icon"
          />
          <p className="navigation__collection_element_name">Tags</p>
        </div>
        <span className="navigation__collection_element_number">Z</span>
      </div>
    </>
  );
};

export default NavigationItem;
