let pickedColor = document.querySelector("#colorPicker");
let colorOne = document.querySelector("#chosenColor");
let colorTwo = document.querySelector("#complementaryColor");

function changeColor(event){
  hexToRGB(event.target.value);
  colorOne.style.color = event.target.value;
  colorOne.style.backgroundColor = event.target.value;
  colorTwo.style.color = calculateComplementary(event.target.value);
  colorTwo.style.backgroundColor = calculateComplementary(event.target.value);
}

function calculateComplementary(color){
  let colorArray = [], colorHSL = "";
  
  colorArray = hexToRGB(color);
  
  let hue = colorArray.shift();
  if(hue <= 180){
    hue += 180;
  }else{
    hue = (hue+180)-360;
  }
  colorArray.unshift(hue);
  
  colorHSL = colorArray[0]+', '+colorArray[1]+'%, '+colorArray[2]+'%';
  
  return "hsl("+colorHSL+")";
}

function hexToRGB(hexColor){
  let red = hexColor.substring(1, 3);
  let green = hexColor.substring(3, 5);
  let blue = hexColor.substring(5, 7);
  
  red = parseInt(red, 16);
  green = parseInt(green, 16);
  blue = parseInt(blue, 16);
  
  return rgbToHSL(red, green, blue);
}

function rgbToHSL(r, g, b){
  let hue = 0, sat = 0, light = 0;
  
  r /= 255;
  g /= 255;
  b /= 255;
  
  let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin;
  
  //Get the Hue value
  if(delta == 0){ hue = 0; }
  else if(cmax == r){ hue = ((g - b) / delta) % 6; }
  else if(cmax == g){ hue = (b - g) / delta + 2 }
  else{ hue = (r - g) / delta + 4; }
  
  hue = Math.round(hue * 60);
  if(hue < 0){ hue += 360; }
  
  // Get the Lightness
  light = (cmax + cmin) / 2;
  
  //Get the Saturation
  sat = delta == 0 ? 0 : delta / (1 - Math.abs(2 * light - 1));
  
  light = +(light * 100).toFixed(1);
  sat = +(sat * 100).toFixed(1);
  
  return [hue, sat, light];
}

pickedColor.addEventListener('input', changeColor, false);
pickedColor.addEventListener('change', changeColor, false);