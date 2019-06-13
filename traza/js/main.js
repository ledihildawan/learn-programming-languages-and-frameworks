window.addEventListener("DOMContentLoaded", () => {
  const mainHeader = document.querySelector(".main-header");
  const menuButton = document.querySelector(".menu-button");
  const mainNav = document.querySelector(".main-nav");
  const siteListLinks = document.querySelectorAll(".site-list__link");
  const siteListLinksArr = Array.from(siteListLinks);

  menuButton.addEventListener("click", function() {
    mainNav.classList.toggle("open");
    this.classList.toggle("active");
  });

  // siteListLinksArr.forEach(siteListLink => {
  //   siteListLink.addEventListener("click", function() {
  //     mainNav.classList.toggle("open");
  //   });
  // });

  window.addEventListener("scroll", function() {
    if (this.scrollY > 1) {
      mainHeader.classList.add("sticky");
    } else {
      mainHeader.classList.remove("sticky");
    }
  });
});
