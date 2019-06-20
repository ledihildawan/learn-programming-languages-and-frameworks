$(document).ready(function () {
  // if (window.innerWidth > 1024) {
  //   const wow = new WOW({
  //     boxClass: "wow",
  //     animateClass: "animated",
  //     offset: 0,
  //     mobile: false,
  //     live: true
  //   });
  //   wow.init();
  // }

  $(".client__list").owlCarousel({
    items: 2,
    loop: true,
    autoplay: true,
    margin: 32,
    responsive: {
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });

  $(".testimonial__list").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true
  });

  // // Vanilla
  // const newsletterForm = document.forms["newsletter"];

  // function validateEmail(email) {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // }

  // function validate() {
  //   var email = $("#email").val();

  //   if (validateEmail(email)) {
  //     $("#email").val("");
  //     $("form[name='newsletter']").fadeOut(1000);

  //     setTimeout(() => {
  //       $(".newsletter .container")
  //         .append("<h3>Now you are on the list! Thank for have been joined.</h3>");

  //       $(".newsletter h3")
  //         .css({
  //           "color": "#64c29e",
  //           "text-align": "center",
  //           "line-height": "1.5"
  //         })
  //         .hide()
  //         .fadeIn(1000);
  //     }, 1000);

  //     setTimeout(() => {
  //       $(".newsletter h3").fadeOut(1000);
  //     }, 4000);

  //     setTimeout(() => {
  //       $(".newsletter h3").remove();
  //     }, 4999);

  //     setTimeout(() => {
  //       $("#email").css("border-color", "#d3d7d9");
  //       $("form button").text("Go");
  //       $("form[name='newsletter']").fadeIn(1000);
  //     }, 5000);
  //   } else {
  //     $("#email").css("border-color", "#FFBABA");
  //     $("form[name='newsletter']").addClass("shake");

  //     setTimeout(() => {
  //       $("#email").css("border-color", "#d3d7d9");
  //     }, 2000);
  //   }

  //   return false;
  // }

  // newsletterForm.addEventListener("submit", function(e) {
  //   e.preventDefault();
  //   validate();
  // });

  // // Sticky Main Navbar
  // window.addEventListener("scroll", function() {
  //   if (window.scrollY > 1) {
  //     document.querySelector(".main-header").classList.add("sticky");
  //   } else {
  //     document.querySelector(".main-header").classList.remove("sticky");
  //   }
  // });

  // // Show Mobile Navbar
  // const mobileNavBar = document.querySelector(".main-nav-mobile");
  // const menuBtn = document.querySelector(".menu-btn");
  // const closeMobileNav = document.querySelector(".main-nav-mobile__close");

  // menuBtn.addEventListener("click", function() {
  //   if (mobileNavBar.classList.contains("close")) {
  //     mobileNavBar.classList.remove("close");
  //     mobileNavBar.classList.add("open");
  //   } else {
  //     mobileNavBar.classList.remove("open");
  //     mobileNavBar.classList.add("close");
  //   }
  // });

  // closeMobileNav.addEventListener("click", function() {
  //   if (mobileNavBar.classList.contains("open")) {
  //     mobileNavBar.classList.add("close");
  //     mobileNavBar.classList.remove("open");
  //   }
  // });
  $(".counter").counterUp({
    delay: 10,
    time: 1000
  });

  // Sticky Main Navbar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 1) {
      document.querySelector(".main-header").classList.add("sticky");
    } else {
      document.querySelector(".main-header").classList.remove("sticky");
    }
  });
});

window.addEventListener("DOMContentLoaded", function () {
  var $portfolioList = $(".portfolio__list").isotope({
    itemSelector: ".portfolio__item",
  });

  $(".portfolio__filter").on("click", "h3", function () {
    var filterValue = $(this).attr('data-filter');
    $portfolioList.isotope({ filter: filterValue });
  })

  $(".portfolio__filter").each(function (i, filter) {
    var $filter = $(filter);
    $filter.on("click", "h3", function (e) {
      $filter.find(".active").removeClass("active");
      var $filterTitle = $(e.currentTarget);
      $filterTitle.addClass("active");
    })
  });

  const menuBtn = document.querySelector(".menu-btn");
  const mainNavMobile = document.querySelector(".main-mobile-nav");
  const mainHeader = document.querySelector(".main-header");
  const navOverlay = document.querySelector(".nav-overlay");
  const siteNavLink = document.querySelectorAll(".main-mobile-nav__link");
  const siteNavLinkArr = Array.from(siteNavLink);

  for (let siteNavLink of siteNavLinkArr) {
    siteNavLink.addEventListener("click", () => {
      navOverlay.classList.remove("active");
      mainNavMobile.classList.remove("open");
      if (window.scrollY < 1) {
        mainHeader.classList.remove("sticky");
      }
    });
  }

  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("open");

    if (window.scrollY < 1) {
      mainHeader.classList.toggle("sticky");
    }

    navOverlay.classList.toggle("active");
    mainNavMobile.classList.toggle("open");
  });

  navOverlay.addEventListener("click", function () {
    this.classList.remove("active");
    mainNavMobile.classList.remove("open");
    if (window.scrollY < 1) {
      mainHeader.classList.remove("sticky");
    }
  });
});