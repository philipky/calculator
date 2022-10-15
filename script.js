"use strict";

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
        default:
            return undefined;
    }
}

function resetCalc () {
    calc = "";
    result = null;
    lastOperator = "";
}

let calculationDisplay = document.querySelector("#calculation");
let resultDisplay = document.querySelector("#result");
let clearBtn = document.querySelector("#clearbtn");
let equalBtn = document.querySelector("#equalbtn");
let numBtns = Array.from(document.querySelectorAll(".number"));
let opBtns = Array.from(document.querySelectorAll(".operator"));
let calc = "";
let result = null;
let lastOperator = "";
let isFinished = false;

clearBtn.addEventListener("click", () => {
    calculationDisplay.textContent = "";
    resultDisplay.textContent = "";
    resetCalc();
})
equalBtn.addEventListener("click", () => {
    if (lastOperator === "") {
        result = parseInt(calc);
    } else {
        result = operate(lastOperator,result,parseInt(calc) || 0);
    }
    if (result) {
        resultDisplay.textContent = result;
    } else {
        resultDisplay.textContent = "ERROR!"
    }
    
    resetCalc();
    isFinished = true;
})

numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", () => {
        if (isFinished) {
            calculationDisplay.textContent = "";
            isFinished = false;
        }
        calculationDisplay.textContent += numBtn.textContent;
        calc += numBtn.textContent;
    });
});
opBtns.forEach((opBtn) => {
    opBtn.addEventListener("click", () => {
        if (isFinished) {
            calculationDisplay.textContent = "";
            isFinished = false;
        }
        calculationDisplay.textContent += ` ${opBtn.textContent} `;
        if (lastOperator === "") {
            result = (parseInt(calc) || 0);
        } else {        
            result = operate(lastOperator,result,parseInt(calc) || 0);
        }
        
        lastOperator = opBtn.textContent;
        calc = "";
    })
});
