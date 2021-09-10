/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// just hardcoded tweets to be used as a test
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// loops through the tweets passed in as the parameter, calls the createTweetElement function
// for each tweet passed through, and adds it onto the id tweet-container which is in the body
// section of index.html
const renderTweets = function(tweets) {
  for (let item of tweets) {
    $('#tweet-container').append(createTweetElement(item));
  }
}

// function takes in the data, and adds it to an html
// format which will be returned.
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


$(document).ready(function() {

  $('form').on('submit', (event) => {
    event.preventDefault()
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $('form').serialize()
    })
    .then((res) => {
      console.log(res);
    })
  })

  renderTweets(data);

});