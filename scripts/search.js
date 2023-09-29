'use strict';
if(userActive){
    const navPageNum = document.getElementById("nav-page-num");
    const inputQuery = document.getElementById("input-query");
    const btnSubmit = document.getElementById("btn-submit");

    const newsContainer = document.getElementById("news-container");
    const btnPrev = document.getElementById("btn-prev");
    const pageNum = document.getElementById("page-num");
    const btnNext = document.getElementById("btn-next");
    
    let totalResult = 0;
    let keywords="";
    navPageNum.style.display="none";
    

    btnSubmit.addEventListener("click", function(){
        pageNum.textContent="1";
        newsContainer.innerHTML="";
        //kiem tra xem nguoi dung da nhap keywords chuwa?
        if(inputQuery.value.trim().length === 0){
            //aanr cac nut chuyen trang neu chua nhap keywords
            navPageNum.style.display="none";
            alert("vui long nhap keywords de tim kiem !");
        }else{
            keywords = inputQuery.value;
            //goi ham nay de hien thi list New len trang ung dung
            getDataNewsByKeywords(keywords,1);
        }
    });

    //ham bat dong bo de lay du lieu tin tuc  duoc tim kiem tu tu khoa nhap vao
    async function getDataNewsByKeywords(keywords, page){
        try{
            const res = await fetch(
                `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=4dfea772421f4e1f8bbc4f40c70f04f0`
            );
            const data = await res.json();

            //neu ko co bai viet nao thi thong bao
            if(data.totalResult == 0){
                //aanr cac nut chuyen trang neu co loi
                navPageNum.style.display="none";
                throw new Error(
                    "Khong co bai bao nao phu hop voi tu khoa ban tim kiem, thu lai bang cach nhap tu khoa mowi !"
                );
            }
            
            //hien thi cac nut chuyen trang neu du lieu tra ve thanh cong va khong phat sinh loi
            navPageNum.style.display="block";
            //hien thi list cac news
            displayNewList(data);
            //bat loi va thong bao cho nguoi dung
        } catch(err){
            alert(err.massage);
        }
    }

    //ham : kiem tra  dieu kien aanr  va aanr nut Previous
    function checkBtnPrev(){
        //khi page Number la 1 thi aanr ddi
        if(pageNum.textContent == 1){
            btnPrev.style.display = "none";
        }else{
            btnPrev.style.display="block"
        }
    }

    //ham kiem tra ddieu kien aanr vaf  aanr nut  Next
    function checkBtnNext(){
        //neu page Number bang voi  lam tron len 
        if(pageNum.textContent == Math.ceil(totalResult/ userActive.pageSize)){
            btnNext.style.display="none";
        }else{
            btnNext.style.display="block";
        }
    }
    //bat su kien  click vao nut Previous
    btnPrev.addEventListener("click", function(){
        //goi ham nay de lay du lieu va hien thi danh sach cac News truwoc do
        getDataNewsByKeywords(keywords, --pageNum.textContent);
    });
    //bat su kien  click vao nut Next
    btnNext.addEventListener("click", function(){
        //goi ham nay de lay du lieu va hien thi danh sach cac News sau do
        getDataNewsByKeywords(keywords, ++pageNum.textContent);
    });

    //ham hien thi list News len trang
    function displayNewList(data){
        //lay gia tri cho bien totalResults
        totalResult = data.totalResult;
        //kiem tra xem co aanr cac nut Next, Previous hay chuwa va an di
        checkBtnPrev();
        checkBtnNext();

        let html="";
        //tao cac code html cac new de hien thi
        //no_image_availabale.jpg de thay the cho 1 so anh  cos gia tri duong dan la null=>ko hien thi duoc
        data.articles.forEach(function(article){
            html+=`
            <div class="new-content">
            <div class="img-banner">
                <img src=${ 
                    article.urlToImage
                    ? article.urlToImage
                    :"no_image_availabale.jpg"
                } alt="img"/>
            </div>
            <div class="content">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
                <button><a href=${article.url} target="_blank">View</a></button>
            </div>
        </div>
            
            `;
        });
        newsContainer.innerHTML=html;
    }
    //neu chua dang nhap  thi thong bao nguoi dung dang nhap de truy cap vao trang
}else{
    alert("vui long dang nhap/ dang ky de truy cap ung dung");
}

