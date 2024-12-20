// To-Do List Application

// Selectors
const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");
const notification = document.querySelector("#notification");

// Functions
function showNotification(message, type = "success") {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  setTimeout(() => {
    notification.textContent = "";
    notification.className = "notification";
  }, 3000);
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector(".task-text").textContent,
    completed: task.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, completed }) => {
    const task = createTaskElement(text);
    if (completed) task.classList.add("completed");
    taskList.appendChild(task);
  });
}

function createTaskElement(taskText) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.textContent = taskText;

  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.textContent = "Edit";
  editButton.onclick = () => editTask(taskItem);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteTask(taskItem);

  const completeButton = document.createElement("button");
  completeButton.className = "complete-button";
  completeButton.textContent = "Complete";
  completeButton.onclick = () => completeTask(taskItem);

  taskItem.append(taskSpan, editButton, deleteButton, completeButton);
  return taskItem;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    showNotification("Task cannot be empty!", "error");
    return;
  }

  const task = createTaskElement(taskText);
  taskList.appendChild(task);
  taskInput.value = "";
  saveTasks();
  showNotification("Task added successfully!");
}

function deleteTask(task) {
  task.remove();
  saveTasks();
  showNotification("Task deleted successfully!");
}

function completeTask(task) {
  task.classList.toggle("completed");
  saveTasks();
  showNotification("Task status updated!");
}

function editTask(task) {
  const newText = prompt(
    "Edit your task:",
    task.querySelector(".task-text").textContent
  );
  if (newText !== null) {
    task.querySelector(".task-text").textContent =
      newText.trim() || task.querySelector(".task-text").textContent;
    saveTasks();
    showNotification("Task updated successfully!");
  }
}

// Event Listeners
addTaskButton.addEventListener("click", addTask);
window.addEventListener("DOMContentLoaded", loadTasks);
