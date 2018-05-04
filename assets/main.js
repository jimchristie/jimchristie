function isVisible(element){
  var rect = element.getBoundingClientRect();

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

var lazyLoadImages = function(){
  var elements = document.querySelectorAll('[data-image]');
  var element;
  
  for (var i = 0; i < elements.length; i++){
    element = elements[i];
    if ( isVisible(element) ){
      element = elements[i];
      element.setAttribute('src', element.dataset.image);
      element.removeAttribute('data-image');
    }
  }
  
};

var lazyLoadBackgroundImages = function(){
  var elements = document.querySelectorAll('[data-background-image]');
  var element;
  var backgroundImage;
  var backgroundPosition;
  
  for (var i=0; i < elements.length; i++){
    element = elements[i];
    if ( isVisible(element) ){
      backgroundImage = 'url(' + element.dataset.backgroundImage + ')';
      element.style.backgroundImage = backgroundImage;

      if (element.dataset.backgroundPosition) {
        backgroundPosition = element.dataset.backgroundPosition;
        element.style.backgroundPosition = backgroundPosition;
      }
      
      element.removeAttribute("data-background-image");
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