'use strict'
if(userActive){
    const newsContainer = document.getElementById("news-container");
    const btnPrev = document.getElementById("btn-prev");
    const pageNum = document.getElementById("page-num");
    const btnNext = document.getElementById("btn-next");
    // bien nay de tinh news toi da tra ve api
    let totalResults=0;
    getDataNews("us",1);
    
    //ham lay du lieu data new tu api va hien thi list news ra ung dung
    async function getDataNews(country, page){
        try{
            //ket noi voi api va lay du lieu
            const res= await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=4dfea772421f4e1f8bbc4f40c70f04f0`
            );
            const data= await res.json();

            displayNewList(data);
            //bat loi
        }catch(err){
            //thong bao loi
            alert("Error:"+err.message);
        }
    }
    //ham kiem tra dieu kien an va an nut Previous
    function checkBtnPrev(){
        //neu page number la 1 thi an di
        if(pageNum.textContent==1){
            btnPrev.style.display="none";
        }else{
            btnPrev.style.display="block";
        }
    }

    //ham kiem tra dieu kien aanr vaf nhan nut Next
    function checkBtnNext(){
        //neu page Number bang vowi--> lam tron len ( tong so ti tuc toi da API tra ve/so ti tuc hien thi tren 1 trang)
        if(pageNum.textContent == Math.ceil(totalResults/userActive.pageSize)){
            btnNext.style.display="none";
        }else{
            btnNext.style.display="block"
        }
    }
    //bat su kien nhan vao nut Previous
    btnPrev.addEventListener("click",function(){
        //goi ham nay de lay du lieu va hien thi danh sach cac News truowc do
        getDataNews('us',--pageNum.textContent);
    });
    //bat su kien nhan vao nut Next
    btnNext.addEventListener("click",function(){
        getDataNews("us",++pageNum.textContent);
    })
    //ham hien thi list new len trang
    function displayNewList(data){
        //lay gia tri cho bien totalResult
        totalResults=data.totalResults;
        //kiem tra xem co an cac nut next, pev hay chua va an di
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
    //neu chua dnag nhap thi thong bao nguwoi dung dang nahp de truy cap vao
}else{
    alert("vui long dang nhap / dang ky de truy cap");
    window.location.href='../index.html';
}



