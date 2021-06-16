$(document).ready(function() {
  // --- our code goes here ---
  //display user's text
  //display characters left
  
  $("#tweet-text").on("keyup", function() {
    const input = $(this)
    let text = $("#tweet-text").val();
    let charLeft = (140 - (text.length));
    const $counter = input.closest("form").find(".counter");
    $counter.html(charLeft)
    if(charLeft < 0) {
      
      $counter.addClass("counterLimit");
    } else {
      $counter.removeClass("counterLimit");
    }
  })
});

