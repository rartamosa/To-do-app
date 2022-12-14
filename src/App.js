import React, { useState } from "react";

import Navigation from "./components/Navigation";
import Main from "./components/Main";
import TaskForm from "./components/TaskForm";
import useLocalStorage from "./components/hooks/useLocalStorage";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDoList, setToDoList] = useLocalStorage("tasksList", []);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddFormOpen = () => {
    setIsModalOpen(true);
    setMode("add");
    setSelectedTask(null);
  };

  const handleNewTaskAdd = (
    id,
    title,
    description,
    link,
    tags,
    dueDate,
    assignee,
    column,
    comments
  ) => {
    const newTask = {
      id,
      title,
      description,
      link,
      tags,
      dueDate,
      assignee,
      column,
      comments,
    };
    setToDoList([...toDoList, newTask]);
  };

  const handleEditFormOpen = (singleTask) => {
    setIsModalOpen(true);
    setMode("edit");
    setSelectedTask(singleTask);
  };

  const handleTaskEdit = (
    id,
    title,
    description,
    link,
    tags,
    dueDate,
    assignee,
    column,
    comments
  ) => {
    const editedTask = {
      id,
      title,
      description,
      link,
      tags,
      dueDate,
      assignee,
      column,
      comments,
    };
    const editedToDoList = toDoList.map((task) => {
      if (task.id === editedTask.id) {
        return editedTask;
      } else {
        return task;
      }
    });
    setToDoList(editedToDoList);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setMode("add");
    setSelectedTask(null);
  };

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Navigation
        tasksTotal={toDoList.length}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
      />
      <Main
        onAddFormOpen={handleAddFormOpen}
        toDoList={toDoList}
        onMobileMenuOpen={handleMobileMenuOpen}
        onEditFormOpen={handleEditFormOpen}
      />
      {isModalOpen && (
        <TaskForm
          mode={mode}
          onModalClose={handleModalClose}
          handleFormSubmit={mode === "add" ? handleNewTaskAdd : handleTaskEdit}
          taskToEdit={selectedTask}
        />
      )}
    </>
  );
};

export default App;
