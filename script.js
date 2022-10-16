"use strict";

let calculationDisplay = document.querySelector("#calculation");
let resultDisplay = document.querySelector("#result");
let clearBtn = document.querySelector("#clearbtn");
let equalBtn = document.querySelector("#equalbtn");
let numBtns = Array.from(document.querySelectorAll(".number"));
let opBtns = Array.from(document.querySelectorAll(".operator"));
let lastOperand = 0;
let runningTotal = 0;
let lastOperator = "";
let lastStep = "";
const numberStep = "number";
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
    switch (lastStep) {
        case "":
            resultDisplay.textContent = number;
            break;
        case numberStep:
            resultDisplay.textContent += number;
            break;
        case operatorStep:
            resultDisplay.textContent = number;
            break;
        case equalStep:
            resultDisplay.textContent = number;
            break;
        default:
            resultDisplay.textContent = "ERROR!";
    }
    lastStep = numberStep;
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
        case numberStep:
            lastOperand = parseInt(resultDisplay.textContent);
            if (lastOperator === "") {
                runningTotal = lastOperand;
            } else {
                runningTotal = operate(operator, runningTotal, lastOperand);
            }
            lastOperator = operator; 
            calculationDisplay.textContent = `${runningTotal} ${operator}`;
            resultDisplay.textContent = runningTotal;
            break;
        case operatorStep:
            lastOperator = operator;
            calculationDisplay.textContent = `${runningTotal} ${operator}`;
            break;
        case equalStep:
            lastOperator = operator;
            calculationDisplay.textContent = `${runningTotal} ${operator}`;
            break;
        default:
            resultDisplay.textContent = "ERROR!";
    }
    
    lastStep = operatorStep;
}

function finishCalculation() {
    
    switch (lastStep) {
        case "":
            return;
        case numberStep:
            lastOperand = parseInt(resultDisplay.textContent);
            runningTotal = operate(lastOperator, runningTotal, lastOperand);
            calculationDisplay.textContent += ` ${lastOperand} =`;
            resultDisplay.textContent = runningTotal;
            break;
        case operatorStep:
            break;
        case equalStep:
            break;
        default:
            resultDisplay.textContent = "ERROR!";
    }
    lastStep = equalStep;
    
}

clearBtn.addEventListener("click", resetCalc);

numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", () => addNum(numBtn.textContent))
});

opBtns.forEach((opBtn) => {
    opBtn.addEventListener("click", () => {
        calculate(opBtn.textContent);
    });
});

equalBtn.addEventListener("click", finishCalculation);

