let pickedColor = document.querySelector("#colorPicker");
let colorOne = document.querySelector("#chosenColor"),
    colorTwo = document.querySelector("#complementaryColor");
let colorOneCode = document.querySelector("#colorOneCode"),
    colorTwoCode = document.querySelector("#colorTwoCode");

function changeColor(event){
  let hexColor = event.target.value,
      hslColor = calculateComplementary(hexColor);
  
  colorOne.style.color = hexColor;
  colorOne.style.backgroundColor = hexColor;
  colorOneCode.innerText = "HSL"+changeColorCode(hexColor);

  colorTwo.style.color = "hsl("+hslColor+")";
  colorTwo.style.backgroundColor = "hsl("+hslColor+")";
  colorTwoCode.innerText = "HSL("+hslColor+")";
}

function calculateComplementary(color){
  let colorArray = [],
      colorHSL = "";
  
  colorArray = hexToHSL(color);
  
  let hue = colorArray.shift();
  if(hue <= 180){
    hue += 180;
  }else{
    hue -= 180;
  }
  colorArray.unshift(hue);
  
  colorHSL = colorArray[0]+', '+colorArray[1]+'%, '+colorArray[2]+'%';
  
  return colorHSL;
}

function changeColorCode(color){
  let hslArray = hexToHSL(color);
  return "("+hslArray[0]+', '+hslArray[1]+'%, '+hslArray[2]+"%)";
}

function hexToHSL(hexColor){
  let hue = 0, sat = 0, light = 0;
  let r = hexColor.substring(1, 3),
      g = hexColor.substring(3, 5),
      b = hexColor.substring(5, 7);
  
  r = parseInt(r, 16) / 255;
  g = parseInt(g, 16) / 255;
  b = parseInt(b, 16) / 255;
  
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