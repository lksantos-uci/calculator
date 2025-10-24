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
    if (num2 === "0") { 
        alert("You cannot divide by 0"); 
        return 0;
    }
    let quotient = Number(num1) / Number(num2);
    const MAX_LEN = 14;
    quotient = quotient.toFixed(MAX_LEN);
    quotient = (quotient.toString().length > MAX_LEN) ? 
                quotient.toString().substring(0, MAX_LEN) : quotient;
    return quotient * 1;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "addition":
        case "+":
            return add(num1, num2);
        case "subtraction":
        case "-":
            return subtract(num1, num2);
        case "multiplication":
        case "*":
            return multiply(num1, num2);
        case "division":
        case "/":
            return divide(num1, num2);
    }
}

function getOperator(operator) {
    switch (operator) {
        case "addition":
        case '+':
            return '+';
        case "subtraction":
        case '-':
            return '-';
        case "multiplication":
        case '*':
            return '×';
        case "division":
        case "/":
            return '÷';
    }
}

function displayInput(num) {
    const display = document.querySelector("#num-display");
    const text = display.textContent;
    const MAX_LEN = 14;
    if (text.length < MAX_LEN) {
        if ((text === "0") || 
            (text === "" ) && 
            (num === '.')) {
            display.textContent = "0.";
        }
        else if (text === "0") 
            display.textContent = num;
        else if (num !== '.' || !text.includes('.'))
            display.textContent = text.concat(num);
    }
}

function displayExpr(expr) {
    const display = document.querySelector("#expr-display");
    const operator = getOperator(expr.operator);
    if (expr.operand1 && expr.operator && expr.operand2) {
        let text = "".concat(expr.operand1, " ", operator, " ", expr.operand2, " = ");
        display.textContent = text;
    }
    else if (expr.operand1 && expr.operator && !expr.operand2) {
        let text = "".concat(expr.operand1, " ", operator);
        display.textContent = text;
    }
}

function clearNumDisplay() {
    const numDisplay = document.querySelector("#num-display");
    numDisplay.textContent = "";
}

function clearExprDisplay() {
    const exprDisplay = document.querySelector("#expr-display");
    exprDisplay.textContent = "";
}

function getDisplayContent() {
    const display = document.querySelector("#num-display");
    return display.textContent;
}

function updateDisplay(num) {
    clearNumDisplay();
    displayInput(num);
}

function resetExpr(expr) {
    expr.operand1 = null;
    expr.operand2 = null;
    expr.operator = null;
}

function isNumberEntered(event) {
    const target = event.target;
    const type = event.type;
    const key = event.key;
    if (type === "click")
        return target.className === "num-btn";
    return !isNaN(key) || (key === '.');
}

function isOperationEntered(event) {
    const target = event.target;
    const type = event.type;
    const key = event.key;
    if (type === "click")
        return target.className === "op-btn";
    return (key === "+" || key === "-" || key === "*" || key === "/");
}

function isEqualsEntered(event) {
    const target = event.target;
    const type = event.type;
    const key = event.key;
    if (type === "click")
        return target.id === "equals";
    return (key === '=');
}

function isCEEntered(target) {
    return target.id === "ce-btn";
}
function isDelEntered(event) {
    const target = event.target;
    const type = event.type;
    const key = event.key;
    if (type === "click")
        return target.id === "del-btn";
    return key === "Backspace";
}

function handleNumbers(event, expr) {
    const target = event.target;
    const key = event.key;
    const num = (event.type === "click") ? target.textContent : key;
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
    const result = operate(expr.operator, expr.operand1, expr.operand2);
    updateDisplay(result);
    expr.operand1 = expr.operand2 = expr.operator = null;
}

function handleDel() {
    const display = document.querySelector("#num-display"); 
    if (display.textContent !== "") {
        const length = display.textContent.length;
        display.textContent = display.textContent.slice(0, length - 1);
    }
}

function handleInput(event, expr) {
    let target = event.target;
    let type = event.type;
    if (isNumberEntered(event)) {
        handleNumbers(event, expr);
    }
    else if (isOperationEntered(event) || isEqualsEntered(event)) {
        if (expr.operand1 && expr.operand2 && expr.operator) {
            expr.operand2 = getDisplayContent();
            displayExpr(expr);
            handleExpr(expr);
        }
        if (isOperationEntered(event)) {
            expr.operator = (type === "click") ? target.id : event.key;
            expr.operand1 = getDisplayContent();
            displayExpr(expr);
        }
    }
    else if (isCEEntered(target)) {
        resetExpr(expr);
        clearNumDisplay();
        clearExprDisplay();
    }
    else if (isDelEntered(event)) {
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
    calculator.addEventListener("click", (event) => handleInput(event, expression));
    document.addEventListener("keydown", (event) => handleInput(event, expression));
}

initProgram();
