$(document).ready(function(){
  // var hiddenElement= $("#hidden_element"); //element with hover content
  $(".thumb-containers").mouseover(function(){
    $(this).addClass("foo");
    $(this).children("#hidden_element").show();
  })

  .mouseleave(function () {
    $(this).removeClass("foo");
    $(this).children("#hidden_element").hide();
  });
});
