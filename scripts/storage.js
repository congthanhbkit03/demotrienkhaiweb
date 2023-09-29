"use strict";
//ham lay du lieu
function getFormStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
//ham luu du lieu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//lay du lieu userArr tu local storage
const users = getFormStorage("userArr") ? getFormStorage("userArr") : [];

//chuyen doi ve dang  class instance
const userArr = users.map((user) => parseUser(user));
//lay du lieu user dang dang nhap
let userActive = getFormStorage("userActive")
  ? parseUser(getFormStorage("userActive"))
  : null;
//lay du lieu todoArr tu local storage
const todos = getFormStorage("todoArr") ? getFormStorage("todoArr") : [];
console.log(todos);
//chuyen doi ve dang  class instance
const todoArr = todos.map((todo) => parseTask(todo));
console.log(todoArr);

//ham chuyen tu js sang class instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,

    userData.pageSize,
    userData.category
  );

  return user;
}
//ham chuyen doi tu js object sang class instance cua task class
function parseTask(taskData) {
  console.log(taskData);
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
