$(document).ready(function() {
  const wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: false,
    live: true
  });
  wow.init();

  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true
  });

  // Vanilla
  const newsletterForm = document.forms["newsletter"];

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email));
    return re.test(email);
  }

  function validate() {
    var email = $("#email").val();

    if (validateEmail(email)) {
      $("#email").val("");
      $("form[name='newsletter']").fadeOut(1000);

      setTimeout(() => {
        $(".newsletter .container")
          .append(
            "<h3>Now you are on the list! Thank for have been joined.</h3>"
          )
          .css({
            "text-align": "center"
          });

        $(".newsletter h3")
          .css("color", "#64c29e")
          .hide()
          .fadeIn(1000);
      }, 1000);

      setTimeout(() => {
        $(".newsletter h3").fadeOut(1000);
      }, 4000);

      setTimeout(() => {
        $(".newsletter h3").remove();
      }, 4999);

      setTimeout(() => {
        $("#email").css("border-color", "#d3d7d9");
        $("form button").text("Go");
        $("form[name='newsletter']").fadeIn(1000);
      }, 5000);
    } else {
      $("#email").css("border-color", "#FFBABA");
      $("form[name='newsletter']").addClass("shake");

      setTimeout(() => {
        $("#email").css("border-color", "#d3d7d9");
      }, 2000);
    }

    return false;
  }

  newsletterForm.addEventListener("submit", function(e) {
    e.preventDefault();
    validate();
  });

  // Sticky Main Navbar
  window.addEventListener("scroll", function() {
    if (window.scrollY > 1) {
      document.querySelector(".main-header").classList.add("sticky");
    } else {
      document.querySelector(".main-header").classList.remove("sticky");
    }
  });

  // Show Mobile Navbar
  const mobileNavBar = document.querySelector(".main-nav-mobile");
  const menuBtn = document.querySelector(".menu-btn");
  const closeMobileNav = document.querySelector(".main-nav-mobile__close");

  menuBtn.addEventListener("click", function() {
    if (mobileNavBar.classList.contains("close")) {
      mobileNavBar.classList.remove("close");
      mobileNavBar.classList.add("open");
    } else {
      mobileNavBar.classList.remove("open");
      mobileNavBar.classList.add("close");
    }
  });

  closeMobileNav.addEventListener("click", function() {
    if (mobileNavBar.classList.contains("open")) {
      mobileNavBar.classList.add("close");
      mobileNavBar.classList.remove("open");
    }
  });
});
