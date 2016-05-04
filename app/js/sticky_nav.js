$(document).ready(function(){
  /******** Sticky Nav ********/
  $(window).scroll(function() {
    if ($(this).scrollTop() > 235) {
      $('nav').addClass('fixed-top');
      $('main').css('margin-top', '70px');
      $('#nav-signin').fadeIn( "slow", "linear" );
    } else {
      $('nav').removeClass('fixed-top');
      $('main').css('margin-top', '20px');
      $('#nav-signin').fadeOut('fast', 'linear');
    }
  });
});
