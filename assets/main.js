function lazyLoadImage(element, image){
  console.log('element: ' + element);
  console.log('image', image);
  
}

function lazyLoadBackground(){
  var elements = document.querySelectorAll('[data-background-image]');
  var element;
  var backgroundImage;
  var backgroundPosition;
  
  for (var i=0; i < elements.length; i++){
    element = elements[i];
    backgroundImage = 'url(' + element.dataset.backgroundImage + ')';
    element.style.backgroundImage = backgroundImage;
    
    if (element.dataset.backgroundPosition) {
      backgroundPosition = element.dataset.backgroundPosition;
      element.style.backgroundPosition = backgroundPosition;
    }
  }
}

function foo(message){
  console.log(message);
}

window.onload = function(){
  lazyLoadBackground();
};