'use strict'
const inputFirstname=document.getElementById("input-firstname");
const inputLastname=document.getElementById("input-lastname");
const inputUsername=document.getElementById("input-username");
const inputPassword=document.getElementById("input-password");
const inputPasswordConfirm=document.getElementById("input-password-confirm");
const btnSubmit=document.getElementById("btn-submit");

//bat su kien nhan vao nut resiger
btnSubmit.addEventListener("click",function(){
    //lay du lieu nhap vao tu nguwoi dung
    const user = new User(
        inputFirstname.value,
        inputLastname.value,
        inputUsername.value,
        inputPassword.value,
    );

    //check validate
    const isValidate=validate(user);
    if(isValidate){
        //them user vao mang userArr      
        userArr.push(user);
        //luu du lieu lai xuong loacalStorage
        saveToStorage("userArr", userArr);
        alert("dang ky thanh cong");
        //dieu hupng ang trang login
        window.location.href="../pages/login.html";
    }
});
// viet ham validate
function validate(user){
    let isValidate=true;
    //ko co truong hop nao bi bo trong
    if(user.firstname.trim().length === 0){
        alert("vui long nhap firstname");
        isValidate=false;
    }
    if(user.lastname.trim().length === 0){
        alert("vui long nhap lastname");
        isValidate=false;
    }
    if(user.username.trim().length === 0){
        alert("vui long nhap username");
        isValidate=false;
    }
    if(user.password === ""){
        alert("vui long nhap username");
        isValidate=false;
    }
    if(user.inputPasswordConfirm === ""){
        alert("vui long nhap username");
        isValidate=false;
    }
    //username ko duoc trung 
    if(
        !userArr.every((item)=>(item.username !== user.username?true:false))
        ){
            alert("username da ton tai");
            isValidate=false;
        }
    //password va confirmpassword phai giong nhau
    if(user.password !== inputPasswordConfirm.value){
        alert("passwowd va paswordconfirm pahi giong nhau");
        isValidate=false;
    }
    
    //password phai co nhieu hon 8 ky tu
    if(user.password.length<=8){
        alert("password phai co nhieu hon 8 ky tu");
        isValidate=false;
    }

    return isValidate;
}

