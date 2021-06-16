/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  const loadTweets = () => {
    const params = {
        url: "/tweets",
        method: "GET"
    }
    $.ajax(params)
  .then((results)=>{
    
      renderTweets(results)
  })
  .catch((err)=>{
      console.log(`err loading articles: ${err}`)
  })
  .always(()=>{
      console.log(`I'll always say this nomatter what`)
  })
}

  loadTweets();

    const $form = $(".tweet-form")
    $form.submit(function(event) {
      event.preventDefault();
      let data = $(this).serialize();
      let input = $("#tweet-text").val();
      if (input === "") {
        return alert("Please write something.");
      } 
      if (input.length > 140) {
       return alert("This has exceeded our limit of 140 characters.")
      }
        let params = {
            url: "/tweets",
            method: "POST",
            data
        }
        $.ajax(params)
        .then((results)=>{
          loadTweets();
        })
        .catch((err)=>{
            console.log(`error trying to load more: ${err}`)
        })
      
    })


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

 
})
