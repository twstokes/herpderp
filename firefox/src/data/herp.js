function randomDerp() {
  
  // added this check to the Firefox version because jQuery's .not selector seemed to fail with one element
  // videos with only one comment would cycle continuously with new randomDerp calls on the single commment
  if($(this).hasClass('derped') == false) {
  
    this.derpOriginal = $(this).html();
    
    $(this).click(function() {
      $(this).html(this.derpOriginal);
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
    $(this).addClass('derped');

    return wordArray.join(' ');
  }

}

// only select un-derped elements
$('.Ct, .comment-renderer-text-content').not('.derped').html(randomDerp);


setInterval(function() {
  // only select un-derped elements
  $('.Ct, .comment-renderer-text-content').not('.derped').html(randomDerp);
}, 100);
