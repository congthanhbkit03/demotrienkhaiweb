'use strict'
if(userActive){
    const inputPageSize = document.getElementById("input-page-size");
    const inputCategory = document.getElementById("input-category");
    const btnSubmit = document.getElementById("btn-submit");

    btnSubmit.addEventListener("click",function(){
        if(validate()){
            //cap nhat lai userActive
            userActive.pageSize = Number.parseInt(inputPageSize.value);
            userActive.category = inputCategory.value;
            saveToStorage("userActive", userActive);
            
            //cap nhat lai mang userArr
            const index = userArr.findIndex(
            (userItem)=>userItem.username === userActive.username
            );
            userArr[index] = userActive;
            saveToStorage("userArr", userArr);
            //reset lai form nap va thong bao cai dat thanh cong
            alert("cai dat thnah cong");
            inputPageSize.value="";
            inputCategory.value="General";
        }
    });

    //ham validate du lieu nhap vao cua nguoi dung
    function validate(){
        let isValidate =  true;
        //kiem tra inputPageSize
        if(Number.isNaN(Number.parseInt(inputPageSize.value))){
            alert("New per page khong hop le");
            isValidate = false;
        }
        //kiem tra inputCategory
        if(inputCategory.value===""){
            alert("vui long nhap news category");
            isValidate= false;
        }
        return isValidate;
    }
    //neu chua dawng nhap thi thong bao
}else{
    alert("vui long dang nhap");
    window.location.assign("../index.html");
}
