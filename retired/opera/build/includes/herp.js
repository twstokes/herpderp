// ==UserScript==
// @include http://www.youtube.com/*
// @include http://www.youtu.be/*
// @include https://www.youtube.com/*
// @include https://www.youtu.be/*
// ==/UserScript==

  
function randomDerp() {
  
    this.derpOriginal = window.jQuery(this).html();
    
    window.jQuery(this).click(function() {
      window.jQuery(this).html(this.derpOriginal);
    });
    
    var randomLength = (Math.floor(Math.random()*20)+1);
    var wordArray = new Array();

    for(var x = 0; x < randomLength; x++) {

      randomBit = (Math.floor(Math.random()*2));

      if(randomBit == 1) {
        wordArray[x] = 'herp';
      } else {
        wordArray[x] = 'derp';
      }
    }

    // add derped class
    window.jQuery(this).addClass("derped");
    
    return '<p>' + wordArray.join(' ') + '</p>';

}


window.addEventListener('DOMContentLoaded', function() {
  // only select un-derped elements
  window.jQuery('.comment-text, p.ctx').not('.derped').html(randomDerp);
}, false);


// Opera doesn't support the DOMNodeInserted listener so we're going to have to use a timer
setInterval(function() {
  // only select un-derped elements
  window.jQuery('.comment-text, p.ctx').not('.derped').html(randomDerp);
}, 100);

