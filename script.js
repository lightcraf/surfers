document.getElementsByClassName("play-button")[0].addEventListener("click", function () {
    var video = document.getElementsByClassName("surfer-video")[0];
    video.style.paddingTop = "0px";
    video.innerHTML = '<iframe width="500" height="300" style="width:100%" src="https://www.youtube.com/embed/bjKzJIu56oU?&autoplay=1" frameborder="0" autoplay="1" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
});


function setThumb() {
    var thumbItems = document.getElementsByClassName("js-thumb-items");
    for (let i = 0; i < thumbItems.length; i++) {
        thumbItems[i].addEventListener("click", handleThumbs);
    }
}

function handleThumbs(event) {
    if (event.target.nodeName == "IMG") {
        var currentThumbIndex = event.currentTarget.id.replace("thumbs-", "");
        document.getElementById("largeImg-" + currentThumbIndex).src = event.target.src;
    }
    if (event.currentTarget.nodeName == "UL" && event.target.nodeName == "IMG") {
        for (var i = 0; i < event.currentTarget.children.length; i++) {
            event.currentTarget.children[i].classList.remove("thumb-active");
        }
        event.target.parentNode.classList.add("thumb-active");
    }
}


function setTabs() {
    var tabBox = document.getElementsByClassName("tab-box");
    var tabLinks = document.getElementsByClassName("tab-links");
    for (var i = 0; i < tabBox.length; i++) {
        tabBox[i].addEventListener("click", showTab);
    }
    resetTab();
    for (var j = 0; j < tabLinks.length; j += 3) {
        tabLinks[j].className += " active-tab";
        document.getElementById("description-" + j/3).style.display = "block";
    }
}

function resetTab() {
    var tabContent = document.getElementsByClassName("tab-content");
    var tabLinks = document.getElementsByClassName("tab-links");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabLinks[i].className = tabLinks[i].className.replace(" active-tab", "");
    }
}

function showTab(event) {
    var tabName;
    if (event.target.className == "tab-links") {
        tabName = event.target.getAttribute("data-tab");
        resetTab();
        document.getElementById(tabName).style.display = "block";
        event.target.className += " active-tab";
    } else {
        return false;
    }
}


(function () {
    var slideIndex = 1;
    showSlides(slideIndex);

    document.getElementsByClassName("js-products-slides")[0].addEventListener("click", function (event) {
        var target = event.target;
        if (target.classList.contains("js-prev-product")) {
            showSlides(slideIndex += -1);
        } else if (target.classList.contains("js-next-product")) {
            showSlides(slideIndex += 1);
        }
    });

    function showSlides(n) {
        setThumb();
        var slides = document.getElementsByClassName("js-product-slide");

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";

        document.getElementsByClassName("js-slide-page")[0].innerHTML = "0" + slideIndex + "/25";
        setTabs();
    }
})();


(function () {
    var translateValue = 0;
    var count = 0;
    var slidesInBox = 4;
    var profileItem = document.getElementsByClassName("profile__card");
    var len = profileItem.length;
    document.getElementsByClassName("js-team-slider-prev")[0].addEventListener("click", function () {
        if (count === 0) {
            return false;
        }
        count -= 1;
        translateValue += 92.5;
        for (var i = 0; i < len; i++) {
            profileItem[i].style.transform = "translate(" + translateValue + "%, 0%)";
        }
    });

    document.getElementsByClassName("js-team-slider-next")[0].addEventListener("click", function () {
        if (count >= len - slidesInBox) {
            return false;
        }
        count += 1;
        translateValue -= 92.5;
        for (var i = 0; i < len; i++) {
            profileItem[i].style.transform = "translate(" + translateValue + "%, 0%)";
        }
    });
})();