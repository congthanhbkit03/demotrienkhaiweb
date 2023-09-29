'use strict'
const inputUsername=document.getElementById("input-username");
const inputPassword=document.getElementById("input-password");
const btnSubmit=document.getElementById("btn-submit");

//bat su kien nhan vao nut login
btnSubmit.addEventListener("click",function(){
    //kiem tra xem nguoi dung da nhap du username va password chua
    const isValidate=validate();
    if(isValidate){
        //tim kiem trong userArr thong tin user nguoi dung nhap vao co dung khong
        const user = userArr.find((item)=>
        item.username === inputUsername.value && 
        item.password === inputPassword.value
        );
        if(user){
            alert("dang nhap thanh cong");
            //luu thong tin user hien tai dang dang nhap tren trang
            saveToStorage("userActive",user);
            //chuyen huong ve trang chu
            window.location.href="../index.html";
        } else{
            alert('thong tin dang nhap ko dung, vui long kiem tra lai')
        }
    }
});

//ham validate du lieu nhap vao cua nguoi dung
function validate(){
    let isValidate=true;
    if(inputUsername.value==""){
        alert("vui long nhap username");
        isValidate=false;
    }
    if(inputPassword.value===""){
        alert('vui long nhap password');
        isValidate=false;
    }
    return isValidate;
}
