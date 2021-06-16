/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

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


 const renderTweets = function(tweets) {
   let result;
   for (const tweet of tweets) {
     createTweetElement(tweet);
    $("#tweet-container").append(createTweetElement(tweet))
   }
   
 }


 const createTweetElement = function(input) {
   let html = 
     `<article class="tweet">
     <header>
     <div class="tweet-profile">
       <img src="${input.user.avatars}"> 
       <h1>${input.user.name}</h1>
     </div>
    
     <h2>${input.user.handle}</h2>

   </header>
   <div class="tweet-input">
     <p> ${input.content.text}</p>
   </div>
   <footer>
     <p>${timeago.format(new Date(input.created_at))}</p>
     <span>
       <i class="fa fa-flag fa-xs" aria-hidden="true"></i>
       <i class="fa fa-retweet fa-xs" aria-hidden="true"></i>
       <i class="fa fa-heart fa-xs" aria-hidden="true"></i>
     </span>

   </footer>
     </article>`
     return html;
   
 }
renderTweets(data)
 
})
