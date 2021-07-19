var navOpen = false;
$(".site-content-contain").click(function(){
   if ($("#body").hasClass("sidenav-active") && navOpen == true) {
      openNav();
   }
});

function openNav() {
   if (navOpen == true) {
      document.getElementById("sidenav").classList.remove('active');
      document.getElementById("body").classList.remove('sidenav-active');
      $('#mobile-menu-dynamic').attr('src','https://media-asbestoslaw-com.s3.amazonaws.com/dev/home-page/menu.svg');
      $('#top-header').removeClass('isOpen');
      $('html').css('overflow', 'initial');
         $('body').css('overflow', 'initial');
      navOpen = false;
   } else {
      document.getElementById("sidenav").classList.add('active');
      document.getElementById("body").classList.add('sidenav-active');
      $('#mobile-menu-dynamic').attr('src','https://media-asbestoslaw-com.s3.amazonaws.com/dev/home-page/menuiconwhite.svg');
      $('#top-header').addClass('isOpen');
      $('html').css('overflow', 'hidden');
      $('body').css('overflow', 'hidden');
      setTimeout(function(){ 
         navOpen = true;
      }, 100);
   }
 }

 if(window.location.pathname == '/trust-funds/') {
    var target = document.getElementById("trust-funds-menu-item");
      target.style.color = "#0C5A9C";
      target.style.borderBottom = "3px solid #0C5A9C";
}

if(window.location.pathname == '/find-a-lawyer/') {
   var target = document.getElementById("find-a-lawyer-menu-item");
     target.style.color = "#0C5A9C";
     target.style.borderBottom = "3px solid #0C5A9C";
}

if(window.location.pathname == '/case-value/') {
   var target = document.getElementById("case-value-menu-item");
     target.style.color = "#0C5A9C";
     target.style.borderBottom = "3px solid #0C5A9C";
}

if(window.location.pathname == '/settlements-lawsuits/') {
   var target = document.getElementById("settlements-lawsuits-menu-item");
     target.style.color = "#0C5A9C";
     target.style.borderBottom = "3px solid #0C5A9C";
}