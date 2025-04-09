const allButtons = document.querySelector("#buttons-container");
const display = document.querySelector("#calculator-display");

let buffer = "";
let currentNumber = 0;
let previousNumber = 0;
let result = 0;
let currentOperator = "";
let previousOperator = "";
let keyPressed = "";
let key = "";

function reset(){
    buffer = "";
    currentNumber = 0;
    previousNumber = 0;
    currentOperator = "";
    previousOperator = "";
    keyPressed = "";
    key = "";
    display.innerText="";
}

function calculate(){
    currentNumber = Number(buffer);
    if(previousNumber){
        switch(previousOperator){
            case "+":
                previousNumber = currentNumber+previousNumber;
                
                break;
            case "-":
                previousNumber = previousNumber - currentNumber;
                break;
            case "*":
                previousNumber = previousNumber * currentNumber;
                break;
            case "/":
                previousNumber = previousNumber / currentNumber;
                break;
        }
    }else{
        previousNumber = currentNumber;
        previousOperator = currentOperator;
        currentNumber = 0;                
    }
    previousOperator = currentOperator;
    currentOperator = "";
    buffer="";
    display.innerText = previousNumber;
}

allButtons.addEventListener("click",(e)=>{
    keyPressed = e.target.innerText;
    key = Number(keyPressed);
    if(isNaN(key)){
        switch(keyPressed){
            case "+":
                currentOperator = "+";
                calculate();
                break;
            case "-":
                currentOperator = "-";
                calculate();
                break;
            case "x":
                currentOperator = "*";
                calculate();
                break;
            case "÷":
                currentOperator = "/";
                calculate();
                break;
            case "=":
                currentOperator = "=";
                calculate();
                break;
            case "C":
                reset();
                break;
            case ".":
                if(!buffer.includes(keyPressed)){
                    buffer+=keyPressed;
                    display.innerText = buffer;
                }
                break;
        }
    }else{
        buffer+=keyPressed;
        display.innerText = buffer;
    }
    if (buffer.length > 12){
        buffer = buffer.slice(0,buffer.length-1);
        display.innerText = buffer;
    }
    if(buffer.length === 1 && buffer.slice(0,1) === "0"){
        buffer = buffer.slice(0,buffer.length-1);
        display.innerText = buffer;
    }
});

document.addEventListener("keydown",(e)=>{
    key =  e.key;
    keyPressed = "";
    if((key >=0 && key <= 9)){
        keyPressed = "#button-"+key;
    }else if(key === "+"){
        keyPressed = "#button-plus";
    }else if(key === "-"){
        keyPressed = "#button-minus";
    }else if (key === "x" || key === "*"){
        keyPressed = "#button-multiply";
    } else if (key === "/"){
        keyPressed = "#button-divide"
    }else if (key === "Enter" || key === "="){
        keyPressed = "#button-equals";
    }else if (key === "."){
        keyPressed = "#button-decimal";
    }else if (key === "C" || key === "c"  ){
        keyPressed = "#button-c";
    }
    if(keyPressed){
        document.querySelector(keyPressed).click();
    }
})