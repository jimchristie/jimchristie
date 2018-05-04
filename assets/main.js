// I don't think I need this anymore. 5/4/2018
// var getPosition = function(element){
//   var left = element.scrollX;
//   var right = element.innerWidth + left;
//   var top = element.scrollY;
//   var bottom = element.innerHeight + top;
  
//   var position =  {
//     "left": left, 
//     "right": right, 
//     "top": top, 
//     "bottom": bottom
//   };
  
//   return position;
// };

function isVisible(element){
  var rect = element.getBoundingClientRect();
  console.log(rect);

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
  
  var hidden = (element.offsetParent === null);
  
  return inViewport && !hidden;
}

var lazyLoadImage = function(element, image){
  console.log('element: ' + element);
  console.log('image', image);
  
};

var lazyLoadBackgroundImages = function(){
  var elements = document.querySelectorAll('[data-background-image]');
  var element;
  var elementPosition;
  var backgroundImage;
  var backgroundPosition;
  var alreadyLoaded;
  
  for (var i=0; i < elements.length; i++){
    element = elements[i];
    alreadyLoaded = element.dataset.lazyLoaded;
    if (isVisible(element) && !alreadyLoaded){
      backgroundImage = 'url(' + element.dataset.backgroundImage + ')';
      element.style.backgroundImage = backgroundImage;

      if (element.dataset.backgroundPosition) {
        backgroundPosition = element.dataset.backgroundPosition;
        element.style.backgroundPosition = backgroundPosition;
      }
      
      element.dataset.lazyLoaded = true;
    }
  }
};

window.onload = function(){
  lazyLoadBackgroundImages();
};

window.onscroll = function(){
  lazyLoadBackgroundImages();
};

window.onresize = function(){
  lazyLoadBackgroundImages;
};