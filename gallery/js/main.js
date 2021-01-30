let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg; 
let windowWidth = window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image, index){
        image.onclick = function(){
            /*we get all the style of the element so we can 
            disect it*/
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            let getImageUrlPos = getFullImgUrl.split("/img/thumbs/");
            let setNewImgUrl = getImageUrlPos[1].replace('")', '');

            getLatestOpenedImg = index + 1;

            /* Pop up */
            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");

            /*img*/

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "../img/"+setNewImgUrl);
            newImg.setAttribute("id", "current-img");

            /* onload so we can have the width of the img*/

            newImg.onload = function(){

                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

                 /* next btn */

                 let newNextBtn = document.createElement("a");
                 let btnNextText = document.createTextNode("Next");
                 newNextBtn.appendChild(btnNextText);
                 container.appendChild(newNextBtn);
                 newNextBtn.setAttribute("class", "img-btn-next");
                 newNextBtn.setAttribute("onclick", "changeImg(1)");
                 newNextBtn.style.cssText = "right: "+calcImgToEdge+"px;";

                /* prev btn */

                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("Prev");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left: "+calcImgToEdge+"px;";
               
            }

            
        }
    });
}

function closeImg(){
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}
function changeImg(changeDir){
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;

    if(changeDir === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){
            calcNewImg = 1;
        }
    }else if(changeDir === 0){
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }
    }
    
    newImg.setAttribute("src", "../img/img"+calcNewImg+".JPG");
    newImg.setAttribute("id", "current-img");
    getLatestOpenedImg = calcNewImg;

    newImg.onload = function(){
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right: "+calcImgToEdge+"px;";
        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left: "+calcImgToEdge+"px;";

    }
}
