import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import DatePicker from "react-datepicker";
import uniqid from "uniqid";
import "react-datepicker/dist/react-datepicker.css";

import useLocalStorage from "./hooks/useLocalStorage";

const TaskForm = ({ onModalClose, mode, taskToEdit, handleFormSubmit }) => {
  const [title, setTitle, resetTitle] = useLocalStorage(
    "taskTitle",
    mode === "add" ? "" : taskToEdit.title
  );

  const [description, setDescription, resetDescription] = useLocalStorage(
    "taskDescription",
    mode === "add" ? "" : taskToEdit.description
  );

  const [link, setLink, resetLink] = useLocalStorage(
    "taskLink",
    mode === "add" ? "" : taskToEdit.link
  );

  const [tags, setTags, resetTags] = useLocalStorage(
    "taskTags",
    mode === "add" ? [] : taskToEdit.tags
  );

  const [dueDate, setDueDate, resetDueDate] = useLocalStorage(
    "taskDueDate",
    mode === "add" ? new Date() : taskToEdit.dueDate
  );

  const [assignee, setAssignee, resetAssignee] = useLocalStorage(
    "taskAssignee",
    mode === "add" ? "" : taskToEdit.assignee
  );

  const [comments, setComments, resetComments] = useLocalStorage(
    "taskComments",
    mode === "add" ? [] : taskToEdit.comments
  );

  const [column, setColumn, resetColumn] = useLocalStorage(
    "taskColumn",
    mode === "add" ? "TO DO" : taskToEdit.column
  );

  const [singleComment, setSingleComment] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    const id = mode === "add" ? uniqid() : taskToEdit.id;
    handleFormSubmit(
      id,
      title,
      description,
      link,
      tags,
      dueDate,
      assignee,
      column,
      comments
    );
    handleModalClose();
  };

  const addNewComment = (event) => {
    if (event.key === "Enter") {
      setComments([...comments, singleComment]);
      event.preventDefault();
      setSingleComment("");
    }
  };

  const handleModalClose = () => {
    onModalClose();
    resetTitle();
    resetDescription();
    resetLink();
    resetTags();
    resetDueDate();
    resetAssignee();
    resetComments();
    resetColumn();
  };

  const CustomInput = React.forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      className="add-window__container-controls_selection-select"
      value={value}
      onClick={onClick}
      onChange={onChange}
      readOnly={true}
      onFocus={(event) => event.target.blur()}
      ref={ref}
    />
  ));

  return (
    <div className="add-window__overlay">
      <div className="add-window__container">
        <form onSubmit={onFormSubmit}>
          <div className="add-window__container-controls">
            <h4 className="add-window__container-controls_titles">Title</h4>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="add-window__container_input"
              type="text"
              placeholder="Type title"
            />
            <h4 className="add-window__container-controls_titles">
              Description
            </h4>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="add-window__container_input"
              type="text"
              placeholder="Type description"
            />
            <h4 className="add-window__container-controls_titles">Link</h4>
            <input
              value={link}
              onChange={(event) => setLink(event.target.value)}
              className="add-window__container_input"
              type="text"
              placeholder="Type link"
            />
            <h4 className="add-window__container-controls_titles">Tags</h4>
            <div>
              <TagsInput value={tags} onChange={setTags} name="Tags" />
            </div>
            <div className="add-window__container-controls_selection">
              <div className="add-window__container-controls_selection-element">
                <h4 className="add-window__container-controls_titles">
                  Due date
                </h4>
                <div>
                  <DatePicker
                    selected={new Date(dueDate)}
                    onChange={(date) => setDueDate(date)}
                    dateFormat={"dd/MM/yyyy"}
                    customInput={<CustomInput />}
                  />
                </div>
              </div>
              <div className="add-window__container-controls_selection-element">
                <h4 className="add-window__container-controls_titles">
                  Assigned to
                </h4>
                <select
                  value={assignee}
                  onChange={(event) => setAssignee(event.target.value)}
                  className="add-window__container-controls_selection-select"
                  name="person"
                  id="person"
                >
                  <option value="" disabled hidden>
                    Choose
                  </option>
                  <option value="Marianna">Marianna</option>
                  <option value="Marta">Marta</option>
                  <option value="Maks">Maks</option>
                </select>
              </div>
              <div className="add-window__container-controls_selection-element">
                <h4 className="add-window__container-controls_titles">
                  Column
                </h4>
                <select
                  value={column}
                  className={
                    mode === "add"
                      ? "add-window__container-controls_selection-select add-window__container-controls_selection-select-disabled"
                      : "add-window__container-controls_selection-select"
                  }
                  onChange={(event) => setColumn(event.target.value)}
                  name="column"
                  id="column"
                  disabled={mode === "add" ? true : false}
                >
                  <option value="TO DO">TO DO</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
            </div>
            <div>
              <h4 className="add-window__container-controls_titles">
                Comments
              </h4>
              <div className="add-window__container-controls_comments-section">
                <ul className="add-window__container-controls_comments-section-list">
                  {comments.map((newComment) => {
                    return (
                      <li
                        key={uniqid()}
                        className="add-window__container-controls-comment"
                      >
                        {newComment}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <input
                value={singleComment}
                onChange={(event) => setSingleComment(event.target.value)}
                onKeyPress={addNewComment}
                className="add-window__container_input-comment"
                type="text"
                placeholder="Add comment..."
              />
            </div>
          </div>
          <div className="add-window__container_buttons">
            <button
              onClick={handleModalClose}
              type="button"
              className="add-window__container_button"
            >
              Cancel
            </button>
            <button type="submit" className="add-window__container_button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
