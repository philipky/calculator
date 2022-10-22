"use strict";

let calculationDisplay = document.querySelector("#calculation");
let resultDisplay = document.querySelector("#result");
let clearBtn = document.querySelector("#clearbtn");
let equalBtn = document.querySelector("#equalbtn");
let numBtns = Array.from(document.querySelectorAll(".number"));
let opBtns = Array.from(document.querySelectorAll(".operator"));
let dotBtn = document.querySelector(".dot");
let backSpaceBtn = document.querySelector("#backspacebtn")
let lastOperand = 0;
let runningTotal = 0;
let lastOperator = "";
let lastStep = "";
const numberStep = "number";
const dotStep = ".";
const operatorStep = "operator";
const equalStep = "equal";

function add(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        return undefined;
    }
    return a + b;
}

function subtract (a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        return undefined;
    }
    return a - b;
}

function multiply (a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        return undefined;
    }
    return a*b;
}

function divide (a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        return undefined;
    }
    return a/b;
}

function operate(operator, a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        return undefined;
    }

    switch (operator) {
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case '*':
            return multiply(a,b);
            break;
        case 'x':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
        case '\u00F7':
            return divide(a,b);
            break;
        default:
            return undefined;
    }
}

function resetCalc() {
    lastOperand = 0;
    runningTotal = 0;
    lastOperator = "";
    lastStep = "";
    calculationDisplay.textContent = "";
    resultDisplay.textContent = "0";
}

function addNum(number) {
    if (resultDisplay.textContent.length === 19) return;
    if (resultDisplay.textContent === "0") {
        resultDisplay.textContent = number;
        lastStep = numberStep;
        return;
    }
    switch (lastStep) {
        case "":
            resultDisplay.textContent = number;
            break;
        case dotStep:
            resultDisplay.textContent += number;
            break;
        case numberStep:
            resultDisplay.textContent += number;
            break;
        case operatorStep:
            resultDisplay.textContent = number;
            break;
        case equalStep:
            resetCalc();
            resultDisplay.textContent = number;
            break;
        default:
            resultDisplay.textContent = "ERROR!";
    }
    resultDisplay.textContent = parseFloat(resultDisplay.textContent.replace(/,/g,'')).toLocaleString();
    lastStep = numberStep;
}

function addDot() {
    if (resultDisplay.textContent.length === 19 || resultDisplay.textContent.includes(".")) return;
    switch (lastStep) {
        case "":
            resultDisplay.textContent = ".";
            break;
        case dotStep:
            break;
        case numberStep:
            resultDisplay.textContent += ".";
            break;
        case operatorStep:
            resultDisplay.textContent = ".";
            break;
        case equalStep:
            resetCalc();
            resultDisplay.textContent = ".";
            break;
        default:
            resultDisplay.textContent = "ERROR!";
    }
    resultDisplay.textContent = parseFloat(resultDisplay.textContent.replace(/,/g,'')).toLocaleString();
    lastStep = dotStep;
}

function checkOperator(operator) {
    const operators = ["+", "-", "*", "x", "/", "\u00F7"];
    return (operators.includes(operator));
}

function calculate(operator) {
    
    if (!checkOperator(operator)) return;

    switch (lastStep) {
        case "":
            calculationDisplay.textContent = `0 ${operator}`;
            lastOperator = operator;
            break;
        case dotStep:
        case numberStep:
            lastOperand = parseFloat(resultDisplay.textContent.replace(/,/g,''));
            if (lastOperator === "") {
                runningTotal = lastOperand;
            } else {
                runningTotal = operate(operator, runningTotal, lastOperand);
            }
            lastOperator = operator; 
            calculationDisplay.textContent = `${runningTotal.toLocaleString()} ${operator}`;
            resultDisplay.textContent = Math.round(runningTotal*10**10)/10**10;
            break;
        case operatorStep:
            lastOperator = operator;
            calculationDisplay.textContent = `${runningTotal.toLocaleString()} ${operator}`;
            break;
        case equalStep:
            lastOperator = operator;
            calculationDisplay.textContent = `${runningTotal.toLocaleString()} ${operator}`;
            break;
        default:
            resultDisplay.textContent = "ERROR!";
    }
    resultDisplay.textContent = parseFloat(resultDisplay.textContent.replace(/,/g,'')).toLocaleString();
    lastStep = operatorStep;
}

function finishCalculation() {
    
    switch (lastStep) {
        case "":
            return;
        case dotStep:
        case numberStep:
            if (lastOperator === "") return;
            if (lastOperator === "/" || lastOperator === "\u00F7") {
                if (resultDisplay.textContent === "0") {
                resetCalc();
                resultDisplay.textContent = "Divide by 0!";
                return;
                }   
            } 
            lastOperand = parseFloat(resultDisplay.textContent.replace(/,/g,''));
            runningTotal = operate(lastOperator, runningTotal, lastOperand);
            calculationDisplay.textContent += ` ${lastOperand} =`;
            resultDisplay.textContent = Math.round(runningTotal*10**10)/(10**10);
            break;
        case operatorStep:
            break;
        case equalStep:
            break;
        default:
            resultDisplay.textContent = "ERROR!";
    }
    resultDisplay.textContent = parseFloat(resultDisplay.textContent.replace(/,/g,'')).toLocaleString();
    lastStep = equalStep;
    
}

function backspace() {
    if (lastStep === equalStep) return;
    if (resultDisplay.textContent === "0") return;
    if (resultDisplay.textContent.length === 1) {
        resultDisplay.textContent = "0";
    } else if (resultDisplay.textContent.length > 1) {
        resultDisplay.textContent = resultDisplay.textContent.substring(0,resultDisplay.textContent.length - 1);
    } else {
        resultDisplay.textContent = "ERROR!";
    }
}

function pressKey(e) {
    switch (e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            addNum(e.key);
            break;
        case '.':
            addDot();
            break;
        case 'Backspace':
            backspace();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            calculate(e.key);
            break;
        case '=':
        case 'Enter':
            finishCalculation();
            break;
    }
}

clearBtn.addEventListener("click", resetCalc);

numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", () => addNum(numBtn.textContent))
});

dotBtn.addEventListener("click", addDot);

backSpaceBtn.addEventListener("click", backspace);

opBtns.forEach((opBtn) => {
    opBtn.addEventListener("click", () => {
        calculate(opBtn.textContent);
    });
});

equalBtn.addEventListener("click", finishCalculation);

window.addEventListener("keydown", (e) => pressKey(e));

