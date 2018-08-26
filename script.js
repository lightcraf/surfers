document.getElementsByClassName("play-button")[0].addEventListener("click", function () {
    var video = document.getElementsByClassName("surfer-video")[0];
    video.style.paddingTop = "0px";
    video.innerHTML = '<iframe width="500" height="300" style="width:100%" src="https://www.youtube.com/embed/bjKzJIu56oU?&autoplay=1" frameborder="0" autoplay="1" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
});

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