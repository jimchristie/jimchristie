/******************** Global vars *******************************************/

var lastScrollTop = 0; // used to check scrolling direction




/********************* functions that determine if elements are visible or nearly visible **********************/


function hiddenByCss(element) {
  return element.offsetParent === null;
}

function windowHeight() {
  return window.innerHeight || document.documentElement.clientHeight;
}

function windowWidth() {
  
}

function inViewport(element) {
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth
  
  element.position = element.getBoundingClientRect();
  
  return (
    element.position.top >= 0 &&
    element.position.left >= 0 &&
    element.position.top <= windowHeight && 
    element.position.left <= windowWidth
  ) || (
    element.position.bottom >= 0 &&
    element.position.right >= 0 &&
    element.position.bottom <= windowHeight &&
    element.position.right <= windowWidth
  );
}

function isVisible(element){
  return inViewport(element) && !hiddenByCss(element);
}

function pixelMargin(percentage) {
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return windowHeight * (percentage / 100);
}

function isJustAboveViewport(element, margin) {
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  margin = (typeof margin === 'undefined') ? 10 : margin;
  element.position = element.getBoundingClientRect();
  
  return (
    element.position.bottom > -(pixelMargin(margin)) && 
    element.position.bottom < 0
  );
}

function isJustBelowViewport(element, margin) {
  margin = (typeof margin === 'undefined') ? 10 : margin;
  
  var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  element.position = element.getBoundingClientRect();
  
  return (
    element.position.top < windowHeight + pixelMargin(margin) && 
    element.position.top > windowHeight
  );
  
}

function nearlyVisible(element, margin) {
  return (isJustBelowViewport(element, margin) || isJustAboveViewport(element, margin)) && !hiddenByCss(element);
}



/********************************* determine scroll directions *************************************/


/**
 * uses global var lastScrollTop
 */
function scrollingDown() { 
   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
      return true;
   } else {
      return false;
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}

/**
 * uses global var lastScrollTop
 */
function scrollingUp() {
  var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  if (st < lastScrollTop){
    return true;
  } else {
    return false;
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}

function isComingIntoView(element, margin) {
  margin = typeof margin === 'undefined' ? 50 : margin;
  
  return (
    (scrollingUp() && isJustAboveViewport(element, margin) ) ||
    (scrollingDown() && isJustBelowViewport(element, margin) )
  );
}

/*************************** Lazy loading image functions *****************************************/

var loadImage = function(element){
  if (element.dataset && element.dataset.image){
    element.setAttribute('src', element.dataset.image);
    element.removeAttribute('data-image');
  }
};

var lazyLoadImages = function(margin){
  var elements= document.querySelectorAll('[data-image]');
  
  for (var i = 0; i < elements.length; i++){
    // this runs in an IIFE to make the timeout work
    // ref: http://borgs.cybrilla.com/tils/javascript-for-loop-with-delay-in-each-iteration-using-iife/
    (function(i){
      setTimeout(function(){
        
        if ( isVisible(elements[i]) || nearlyVisible(elements[i], margin) || isComingIntoView(elements[i])){
          loadImage(elements[i]);
        }
      }, 1 * i);
    })(i);
  }
};

var setBackgroundPosition = function(element){
  var backgroundPosition = element.dataset.backgroundPosition;
  element.style.backgroundPosition = backgroundPosition;
  element.removeAttribute("data-background-position");
};

var loadBackgroundImage = function(element){
  var backgroundImage = 'url(' + element.dataset.backgroundImage + ')';
  element.style.backgroundImage = backgroundImage;

  if (element.dataset.backgroundPosition)
    setBackgroundPosition(element);
  
      
  element.removeAttribute("data-background-image");
};

var lazyLoadBackgroundImages = function(margin){
  var elements = document.querySelectorAll('[data-background-image]');
  
  for (var i = 0; i < elements.length; i++){
    if ( isVisible(elements[i]) || nearlyVisible(elements[i], margin) || isComingIntoView(elements[i]) ){
      loadBackgroundImage(elements[i]);
      
    }
  }
};

/******************** Functions that deal with external links *******************************/

function linkIsExternal(element) {
  return (element.host !== window.location.host);
}

function getExternalLinks(){
  var anchors = document.getElementsByTagName('a');
  var externalLinks = [];
  
  for (var i = 0; i < anchors.length; i++) {
    if ( linkIsExternal(anchors[i]) ) {
        externalLinks.push(anchors[i]);
    }
  }
  
  return externalLinks;
}

var addTargetBlankToExternalLinks = function() {
  var externalLinks = getExternalLinks();
  
  if (externalLinks.length < 1)
    return;
  
  for (var i = 0; i < externalLinks.length; i++ ) {
    externalLinks[i].setAttribute("target", "_blank");
  }
};


/*
 ********************** init and events *************************************************
 */

window.onload = function(){
  lazyLoadBackgroundImages();
  lazyLoadImages();
  addTargetBlankToExternalLinks();
};

window.onscroll = function(){
  lazyLoadBackgroundImages();
  lazyLoadImages();
};

window.onresize = function(){
  lazyLoadBackgroundImages();
  lazyLoadImages();
};