"use strict";

//neu da dang nhap
if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  displayTodoList();
  //   console.log(todoArr);

  //ham hien thi thong tin todo list
  function displayTodoList() {
    let html = "";
    //tu mang todoArr loc ra cac todo(task) la cac user dang dang nhap de
    todoArr
      .filter((todo) => todo.owner === userActive.username)
      .forEach(function (todo) {
        html += `
                <li class=${todo.isDone ? "checked" : ""}>
                ${todo.task}
                <span class="close">×</span>
                </li>          
                `;
      });
    todoList.innerHTML = html;
    //bat cac su kien
    eventToggleTasks();
    eventDeleteTasks();
  }
  //bat su kien nhan nut Add de them task
  btnAdd.addEventListener("click", function () {
    //kiem tra xem nguoi dung da thuc su nhap ten nhiem vu can Add chua?
    if (inputTask.value.trim().length === 0) {
      alert("vui long nhap nhiem vu");
    } else {
      const todo = new Task(inputTask.value, userActive.username, false);

      //them task moi vao bang todoArr
      todoArr.push(todo);
      //luu du lieu xuong local storage
      saveToStorage("todoArr", todoArr);
      //hien thi lai list cac nhiem vu
      displayTodoList();
      //reset du lieu tu form nhap
      inputTask.value = "";
    }
  });

  //ham bat cac su kien  Toggle Tasks
  function eventToggleTasks() {
    //lay tat ca cac phan tu li chhua thong tin cua cac task va bat su kien
    document.querySelectorAll("#todo-list li").forEach(function (liEl, idx) {
      liEl.addEventListener("click", function (e) {
        console.log(idx);
        // //tranh nut delete ra ==> de khong bi chong su kien khi an nut delete
        // if (e.target !== liEl.children[0]) {
        //   //toggle class checked
        //   liEl.classList.toggle("checked");
        //   //tim task vua click vao toggle
        //   const todo = todoArr.find(
        //     (todoItem) =>
        //       todoItem.owner === userActive.username &&
        //       todoItem.task === liEl.textContent.slice(0, -1) //lay noi dung
        //   );
        //   //sau do thay doi thuoc tinh isDone cua no
        //   todo.isDone = liEl.classList.contains("checked") ? true : false;
        todoArr[idx].isDone = !todoArr[idx].isDone;
        //luu( cap nhat laij xuong local Storage)
        saveToStorage("todoArr", todoArr);
        //goi lai cai ham in todo
        displayTodoList();
      });
    });
  }

  //ham bat ca su kien  xoa cac task
  function eventDeleteTasks() {
    //lay tat ca cac phan tu nut delete bat su kien click tren tung phan tu
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        //hoi xac nhap xoa
        const isDelete = confirm("ban xac nhan chac chan muon xoa chu?");
        if (isDelete) {
          //tim vi tri cua task duoc an xoa trong mang todoArr
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );
          //xoa task do ra khoi mang todoArr
          todoArr.splice(index, 1);
          //luu( cap nhat lai) du lieuxuong localStorage
          saveToStorage("todoArr", todoArr);
          //hien thi lai list Todo
          displayTodoList();
        }
      });
    });
  }
  //neu chua dang nhap thi thong bao nguoi dung dang nhap de truy cap vao
} else {
  alert("vui long dang nhap/dang ky de truy cap ung dung");
  window.location.assign("../index.html");
}
