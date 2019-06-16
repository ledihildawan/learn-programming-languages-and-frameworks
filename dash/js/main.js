window.addEventListener("DOMContentLoaded", () => {
  const mainHeader = document.querySelector(".main-header");
  const menuButton = document.querySelector(".menu-button");
  const mainNav = document.querySelector(".main-nav");
  const siteListLinks = document.querySelectorAll(".site-list__link");
  const siteListLinksArr = Array.from(siteListLinks);
  const goToUp = document.querySelector(".gotoup");
  const hero = document.querySelector(".hero");

  menuButton.addEventListener("click", function() {
    mainNav.classList.toggle("open");
    this.classList.toggle("active");
  });

  if (window.innerWidth < 1024) {
    console.log(window.innerWidth);
    siteListLinksArr.forEach(siteListLink => {
      siteListLink.addEventListener("click", function() {
        mainNav.classList.toggle("open");
      });
    });
  } else {
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true
    });

    wow.init();
  }

  window.addEventListener("scroll", function() {
    if (this.scrollY > 1) {
      mainHeader.classList.add("sticky");
    } else {
      mainHeader.classList.remove("sticky");
    }

    if (window.innerWidth < 1024) {
      if (this.scrollY > 560) {
        goToUp.style.opacity = 1;
        goToUp.style.visibility = "visible";
      } else {
        goToUp.style.opacity = 0;
      }
    } else {
      if (this.scrollY > hero.clientHeight - 400) {
        goToUp.style.opacity = 1;
        goToUp.style.visibility = "visible";
      } else {
        goToUp.style.opacity = 0;
      }
    }
  });
});
