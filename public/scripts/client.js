/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// just hardcoded tweets to be used as a test


$(document).ready(function() {

  const loadTweets = () => {
    $.get('/tweets', function(tweetData) {
      // take container specified in html and clear it out
      $('#tweet-container').empty();
      // also take form, clear that out as well
      $('textarea').val("");
      // then render the tweets
      renderTweets(tweetData);
    })
  }

  // we want to target your tweet-container then create 
  // an on call, then reload loadTweets function. Then chain
  // another function trigger then reload
  $('#tweet-container').on('reload', loadTweets).trigger('reload');

  const renderTweets = function(tweets) {
    for (let item of tweets) {
      $('#tweet-container').append(createTweetElement(item));
    }
  }

  const createTweetElement = (tweetData) => {
    let $tweet = `
    <article class="tweetArticle">
      <header class="currentUser">
        <h5>${tweetData.user.name}</h5>
        <h5>${tweetData.user.handle}</h5>
      </header>
      <p>
        ${tweetData.content.text}
      </p>
      <div class="linebreak"></div>
      <footer>
        <span><b>${timeago.format(tweetData.created_at)}</b></span>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`
  
    return $tweet;
  }


  $('form').on('submit', (event) => {
    event.preventDefault();
    const text = $('#tweet-text').val();
    if (text.length > 140) {
      alert('Character length is too long. Please shorten.');
      return;
    }
    if (text.length === 0) {
      alert('No text inputted. Please input before submitting.');
      return;
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $('form').serialize()
    })
    .then((res) => {
      console.log('res:', res);
      $('textarea').val("");
      loadTweets();
      renderTweets(data);
      $('.counter').val('140');
    })
  });
  loadTweets();
  renderTweets(data);

});