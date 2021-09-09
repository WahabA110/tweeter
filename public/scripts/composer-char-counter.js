$(document).ready(function() {
  $("#tweet-text").on("input", function(event) {
    const tweetLength = $(this).val().length
    const counter = $("#tweet-text").nextAll(".button-counter").children(".counter")
    counter.text(140 - tweetLength)
    if (tweetLength > 140) {
      counter.addClass('limit')
    } else if (counter.hasClass('limit')) {
      counter.removeClass('limit')
    }
  });
});