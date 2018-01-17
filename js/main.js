// function animationHover(element, animation){
//     element = $(element);
//     element.hover(
//         function() {
//             element.addClass('animated ' + animation);        
//         },
//         function(){
//             //wait for animation to finish before removing classes
//             window.setTimeout( function(){
//                 element.removeClass('animated ' + animation);
//             }, 2000);         
//         });
// }

  $(function() {
    $.scrollify({
      section : ".sec",
      scrollbars : true,
      scrollSpeed : 1500 
    });
  });

  function move(section){
    $.scrollify.move(section);
  }

  jQuery(document).ready(function($){
    window.sr = ScrollReveal({reset:true});
    sr.reveal('.reveal');
    // sr.reveal('.bar');
  });
