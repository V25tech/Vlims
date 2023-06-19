$(document).ready(function(){
  "use strict";

    var $ = jQuery.noConflict();

    var headerPrimary = $(".vm-primary-header").height();
    var headerBreacrumb = $(".vm-breadcrumb").height();
    var headerBreacrumbPrimary= headerBreacrumb + headerPrimary;
    
    $('.sidebar').css({"padding-top": headerPrimary});
    $('.sidebar-breadcrumb').css({"padding-top": headerBreacrumbPrimary});
    $('.vm-breadcrumb').css({"top": headerPrimary});
    $('main').css({"top": headerBreacrumb});
    
    
   
    //=========push hambuger menu
    var trigger = $('.vm-hamburger-btn, .overlay'),
      overlay = $('.overlay'),
      isClosed = false;
      trigger.click(function () {
        hamburger_cross();      
      });
    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
        } 
        else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }
    $('[data-toggle="offcanvas"], .overlay').click(function () {
        $('#vm-wrapper').toggleClass('vm-primary-nav-toggled');
    }); 
    

  
  
   $( ".td-dropdown" ).click(function() {  
   
    $(this).parents('.vm-table-action').toggleClass( "active");
  
    
  });

  
  









});   

