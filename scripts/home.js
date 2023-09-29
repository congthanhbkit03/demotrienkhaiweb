'use strict'
const loginModal= document.getElementById("login-modal");
const mainContent= document.getElementById("main-content");
const welcomeMessage= document.getElementById("welcome-message");
const btnLogout= document.getElementById("btn-logout");

displayHome();
//ham hien thi noi dung tren trang home
function displayHome(){
    //neu co nguoi dang dang nhap thi an "login modal" va hien thi "mainContent"
    if(userActive){
        loginModal.style.display="none";
        mainContent.style.display="block";
        //them thong bao welcome Message
        welcomeMessage.textContent=`welcome ${userActive.firstname}`;
        //neu ko co ai dang dang nhap thi an "mainContent" va hien thi "login modal"
    }else{
        loginModal.style.display="block";
        mainContent.style.display="none";
    }
}

//bat su kien nhan vao nut logout
btnLogout.addEventListener("click",function(){
    const isLogout =confirm("ban co chac chan muon logout ko");
    if(isLogout){
        //gan gia tri userActive ve null de bieu dien la ko co ai dang dang nhap
        userActive=null;
        //luu du lieu xuong local storage
        saveToStorage("userActive",userActive);
        //hien thi trang home o dang chua co user dang nhap
        displayHome();

    }
});
