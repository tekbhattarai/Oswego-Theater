window.onscroll = function() {myFunction()};

var navbar;
var sticky;
function myFunction() {
    navbar = document.getElementById("navbar");
    sticky = navbar.offsetTop;
    console.log(pageYOffset)
    console.log(sticky);
  if (window.pageYOffset > sticky) {      
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}