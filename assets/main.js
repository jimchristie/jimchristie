function isVisible(element){
  var rect = element.getBoundingClientRect();
  var hidden = (element.offsetParent === null);
  
  // no point figuring out position if it's hidden with css
  if (hidden)
    return false;

  var inViewport =  (
    ( // check if top is visible
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    ) || (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.bottom <= (window.inerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  );
  
  return inViewport && !hidden;
}

var loadImage = function(element){
  if (element.dataset && element.dataset.image){
    element.setAttribute('src', element.dataset.image);
    element.removeAttribute('data-image');
  }
};

var lazyLoadImages = function(){
  var elements= document.querySelectorAll('[data-image]');
  
  for (var i = 0; i < elements.length; i++){
    // this runs in an IIFE to make the timeout work
    // ref: http://borgs.cybrilla.com/tils/javascript-for-loop-with-delay-in-each-iteration-using-iife/
    (function(i){
      setTimeout(function(){
        if ( isVisible(elements[i]) ){
          loadImage(elements[i]);
        }
      }, 1 * i);
    })(i);
  }
};

var loadBackgroundImage = function(element){
  var backgroundImage = 'url(' + element.dataset.backgroundImage + ')';
  element.style.backgroundImage = backgroundImage;
};

var setBackgroundPosition = function(element){
  var backgroundPosition = element.dataset.backgroundPosition;
  element.style.backgroundPosition = backgroundPosition;
};

var lazyLoadBackgroundImages = function(){
  var elements = document.querySelectorAll('[data-background-image]');
  
  for (var i = 0; i < elements.length; i++){
    if ( isVisible(elements[i]) ){
      loadBackgroundImage(elements[i]);

      if (elements[i].dataset.backgroundPosition)
        setBackgroundPosition(elements[i]);
      
      elements[i].removeAttribute("data-background-image");
    }
  }
};

window.onload = function(){
  lazyLoadBackgroundImages();
  lazyLoadImages();
};

window.onscroll = function(){
  lazyLoadBackgroundImages();
  lazyLoadImages();
};

window.onresize = function(){
  lazyLoadBackgroundImages;
  lazyLoadImages();
};