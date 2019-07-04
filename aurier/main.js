window.addEventListener("DOMContentLoaded", e => {
  // Go to up
  const goToUp = document.querySelector(".go-to-up");
  const hero = document.querySelector(".hero");

  goToUp.addEventListener("click", topFunction);
  goToUp.style.display = "none";

  function showGoToUp() {
    console.log(document.documentElement.scrollTop);
    if (
      document.body.scrollTop > 36 ||
      document.documentElement.scrollTop > 36
    ) {
      goToUp.style.display = "block";
    } else {
      goToUp.style.display = "none";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Sticky Navbar
  window.onscroll = function() {
    myFunction();
    showGoToUp();
  };

  const navbar = document.querySelector(".main-header");

  const sticky = navbar.offsetTop;

  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

  // Add active on element when menu is clicked
  // const menuPrimary = document.querySelector('.main-nav__primary');
  // const menuItem = document.querySelectorAll('.main-nav__item ');

  // for (let i = 0; i < menuItem.length; i++) {
  //   menuItem[i].addEventListener('click', function () {
  //     const current = document.getElementsByClassName('active');
  //     if (current.length > 0) {
  //       current[0].className = current[0].className.replace(' active', '');
  //     }
  //     this.className += ' active';
  //   });
  // }

  // $(document).ready(function () {
  //   $('.owl-carousel').owlCarousel({
  //     loop: true,
  //     margin: 40,
  //     nav: true,
  //     responsive: {
  //       0: {
  //         items: 1
  //       },
  //       600: {
  //         items: 3
  //       },
  //       1000: {
  //         items: 3
  //       }
  //     }
  //   });
  // });

  ScrollReveal().reveal("section", {
    delay: 500,
    easing: "ease-in"
  });
});
