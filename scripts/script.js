let pickedColor = document.querySelector("#colorPicker");
let colorOne = document.querySelector("#chosenColor");
let colorTwo = document.querySelector("#complementaryColor");
let whiteDecCode = 16777215;

function changeColor(event){
  colorOne.style.color = event.target.value;
  colorOne.style.backgroundColor = event.target.value;
  colorTwo.style.color = calculateComplementary(event.target.value);
  colorTwo.style.backgroundColor = calculateComplementary(event.target.value);
}

function calculateComplementary(color){
  let colorDec = parseInt(color.substring(1, 6), 16);
  let compColor = 0;
  
  if(compColor < whiteDecCode){
    compColor = whiteDecCode - colorDec;
  } else {
    compColor = colorDec - whiteDecCode;
  }
  
  compColor = "#"+compColor.toString(16);
  
  return compColor;
}

pickedColor.addEventListener('input', changeColor);