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
    };
    $.ajax(params)
      .then((results) => {
        renderTweets(results);
      })
      .catch((err) => {
        console.log(`err loading articles: ${err}`);
      });

  };

  loadTweets();

  // conditions for input validation
  const $form = $(".tweet-form");
  $form.submit(function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    let input = $("#tweet-text").val();
    if (input === "") {
      $($form).before($("<p>❗️ Please write something ❗️</p>").addClass("error-message").slideDown(500).fadeOut(3000));
      return;
    }
    if (input === null) {
      $($form).before($("<p>❗️ Please write something ❗️</p>").addClass("error-message").slideDown(500).fadeOut(3000));
      return;
    }
    if (input.length > 140) {
      $($form).before($("<p>❗️ Oops! Please limit to 140 characters ❗️</p>").addClass("error-message").slideDown(300).fadeOut(3000));
      return;
    }
    let params = {
      url: "/tweets",
      method: "POST",
      data
    };
    $.ajax(params)
      .then((results) => {
        loadTweets();
      })
      .catch((err) => {
        console.log(`error trying to load more: ${err}`);
      });

  });

  //function for rendering tweets
  const renderTweets = function(tweets) {
    $("#tweet-container").empty();
    for (const tweet of tweets) {
      createTweetElement(tweet);
      $("#tweet-container").prepend(createTweetElement(tweet));
      $("#tweet-text").val("");
      $("#output").html("140");

    }

  };

  //escape function to prevent cross-site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //create tweets from dynamic data
  const createTweetElement = function(input) {
    let html =
      `<article class="tweet">
        <header>
        <div class="tweet-profile">
          <img src="${escape(input.user.avatars)}"> 
          <h1>${escape(input.user.name)}</h1>
        </div>
    
        <h2>${escape(input.user.handle)}</h2>

        </header>
        <div class="tweet-input">
          <p> ${escape(input.content.text)}</p>
        </div>
        <footer>
          <p>${escape(timeago.format(new Date(input.created_at)))}</p>
          <span>
            <i class="fa fa-flag fa-xs" aria-hidden="true"></i>
            <i class="fa fa-retweet fa-xs" aria-hidden="true"></i>
            <i class="fa fa-heart fa-xs" aria-hidden="true"></i>
          </span>

        </footer>
      </article>`;
    return html;

  };
  //back to top button
  const btn = $('#top-button');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 20) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '20');
  });

});
