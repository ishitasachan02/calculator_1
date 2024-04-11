let calcscreen = document.querySelector(".screen");
let buttons = document.querySelector(".buttons");

calcscreen.addEventListener("mousedown", (e) => e.preventDefault());
calcscreen.addEventListener("keydown", (e) => e.preventDefault());

buttons.addEventListener("mousedown", keypadFunc);
document.addEventListener("keydown", keyboardFunc);

function keypadFunc(e) {
  //Prevent keypad from reacting to Enter key
  if (e.pointerId == -1) return;

  //Patterns
  let operations = "+-x/"

  //Numbers validate
  if (!e.target.className) {
    if (calcscreen.value == "0" || calcscreen.value == "NaN" || calcscreen.value == "Infinity") calcscreen.value = e.target.value;
    else if (calcscreen.value.match(/(?=[+-x/])[\d.]*/g)[calcscreen.value.split("").filter(e => e == "+" || e == "-" || e == "/" || e == "x").length * 2] == "0") calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + e.target.value;
    else calcscreen.value += e.target.value;
  }

  //Deletion functionality
  else if (e.target.value == "RESET") calcscreen.value = "0";
  else if (e.target.value == "DEL") {
    if (calcscreen.value.length == 1) calcscreen.value = "0";
    else calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1);
  }

  //Operations validate
  else if (operations.indexOf(e.target.value) != -1) {
    if (operations.indexOf(calcscreen.value[calcscreen.value.length - 1]) != -1) calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + e.target.value;
    else calcscreen.value += e.target.value;
  }

  //Floating point validate
  else if (calcscreen.value.match(/(?=[+-x/])[\d.]*/g)[calcscreen.value.split("").filter(e => e == "+" || e == "-" || e == "/" || e == "x").length * 2].split("").filter(el => el == ".").length < 1 && e.target.value == ".") calcscreen.value += e.target.value;

  //Equal
  else if (e.target.value == "=") calcscreen.value = result();
}

function keyboardFunc(e) {
  //Patterns
  let chars = "1234567890";
  let operations = "+-*/";

  //Numbers validate
  if (chars.indexOf(e.key) != -1) {
    if (calcscreen.value == "0" || calcscreen.value == "NaN" || calcscreen.value == "Infinity") calcscreen.value = e.key;
    else if (calcscreen.value.match(/(?=[+-x/])[\d.]*/g)[calcscreen.value.split("").filter(e => e == "+" || e == "-" || e == "/" || e == "x").length * 2] == "0") calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + e.key;
    else calcscreen.value += e.key;
  }

  //Deletion functionality
  else if (e.key == "Delete") calcscreen.value = "0";
  else if (e.key == "Backspace") {
    if (calcscreen.value.length == 1) calcscreen.value = "0";
    else calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1);
  }

  //Operations validate
  else if (operations.indexOf(e.key) != -1) {
    if (operations.indexOf(calcscreen.value[calcscreen.value.length - 1]) != -1 || calcscreen.value[calcscreen.value.length - 1] == 'x') {
      if (e.key == "*") calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + "x";
      else calcscreen.value = calcscreen.value.substring(0, calcscreen.value.length - 1) + e.key;
    }
    else {
      if (e.key == "*") calcscreen.value += "x";
      else calcscreen.value += e.key;
    }
  }

  //Floating point validate
  else if (calcscreen.value.match(/(?=[+-x/])[\d.]*/g)[calcscreen.value.split("").filter(e => e == "+" || e == "-" || e == "/" || e == "x").length * 2].split("").filter(el => el == ".").length < 1 && e.key == ".") calcscreen.value += e.key;

  //Equal
  else if (e.key == "=" || e.key == "Enter") calcscreen.value = result();
}

function result() {
  return new Function(`return ${calcscreen.value.replaceAll("x", "*")}`)();
}







