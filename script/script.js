function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    if (num2 === 0) alert("You cannot divide by 0"); 
    else return Number(num1) / Number(num2);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "addition":
            return add(num1, num2);
        case "subtraction":
            return subtract(num1, num2);
        case "multiplication":
            return multiply(num1, num2);
        case "division":
            return divide(num1, num2);
    }

}

function displayInput(num) {
    const display = document.querySelector("#num-display");
    if (display.textContent === "0") display.textContent = num;
    else display.textContent += num;
}

function clearDisplay() {
    const display = document.querySelector("#num-display");
    display.textContent = "";
}

function getDisplayContent() {
    const display = document.querySelector("#num-display");
    return display.textContent;
}

function updateDisplay(num) {
    clearDisplay();
    displayInput(num);
}

function resetExpr(expr) {
    expr.operand1 = null;
    expr.operand2 = null;
    expr.operator = null;
}

function isNumberPressed(target) {
    return target.className === "num-btn";
}

function isOperationPressed(target) {
    return target.className === "op-btn";
}

function isEqualsPressed(target) {
    return target.id === "equals";
}

function isCEPressed(target) {
    return target.id === "ce-btn";

}
function isDelPressed(target) {
    return target.id === "del-btn";
}

function handleNumbers(target, expr) {
    const num = target.textContent;
    if (!expr.operand1) {
        expr.operand1 = num;
        updateDisplay(num);
    }
    else if (expr.operator && !expr.operand2) { 
        expr.operand2 = num; 
        updateDisplay(num);
    }
    else displayInput(num);
}

function handleExpr(expr) {
    expr.operand2 = getDisplayContent();
    const result = operate(expr.operator, expr.operand1, expr.operand2);
    updateDisplay(result);
    expr.operand1 = expr.operand2 = expr.operator = null;
}

function handleDel(expr) {
    const display = document.querySelector("#num-display"); 
    if (display.textContent !== "") {
        const length = display.textContent.length;
        display.textContent = display.textContent.slice(0, length - 1);
    }
}

function handleClick(event, expr) {
    let target = event.target;
    if (isNumberPressed(target)) {
        handleNumbers(target, expr);
    }
    else if (isOperationPressed(target) || isEqualsPressed(target)) {
        if (expr.operand1 && expr.operand2 && expr.operator) {
            handleExpr(expr);
        }
        if (isOperationPressed(target)) {
            expr.operator = target.id;
            expr.operand1 = getDisplayContent();
        }
    }
    else if (isCEPressed(target)) {
        resetExpr(expr);
        clearDisplay();
    }
    else if (isDelPressed(target)) {
        handleDel();
    }

}

function initProgram() {
    const calculator = document.querySelector("#calculator");
    let expression = { 
        operand1: null, 
        operand2: null, 
        operator: null
    };
    calculator.addEventListener("click", (event) => handleClick(event, expression));
}

initProgram();
