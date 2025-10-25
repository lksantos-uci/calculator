function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function formatQuotient(quotient) {
    const MAX_LEN = 14;
    quotient = quotient.toFixed(MAX_LEN);
    if (quotient.toString().length > MAX_LEN)  
        quotient = quotient.toString().substring(0, MAX_LEN);
    return quotient * 1;
}

function divide(num1, num2) {
    if (num2 === "0") { 
        alert("You cannot divide by 0!"); 
        return 0;
    }
    let quotient = Number(num1) / Number(num2);
    quotient = formatQuotient(quotient);
    return quotient;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "−":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}

function formatOperator(event, operator) {
    const type = event.type;
    if (type === "keydown") {
        switch (operator) {
            case '+':
                return '+';
            case '-':
                return '−';
            case '*':
                return '×';
            case "/":
                return '÷';
        }
    }
    return operator;
}

function isDisplayFull(length) {
    const MAX_LEN = 14;
    return length >= MAX_LEN;
}

function displayInput(num) {
    const display = document.querySelector("#num-display");
    const text = display.textContent;
    if (!isDisplayFull(text.length)) {
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
    const operator = expr.operator;
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
    const clickedBtn = event.target.textContent;
    const pressedKey = event.key;
    return (clickedBtn === "=") || (pressedKey === "=");
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

function displayRes(expr) {
    const result = operate(expr.operator, expr.operand1, expr.operand2);
    updateDisplay(result);
    expr.operand1 = expr.operand2 = expr.operator = null;
}

function isNumDisplayBlank(content) {
    return content === "";
}

function handleDel(expr) {
    const display = document.querySelector("#num-display"); 
    if (!isNumDisplayBlank(display.textContent)) {
        const length = display.textContent.length;
        display.textContent = display.textContent.slice(0, length - 1);
    }
    if (isNumDisplayBlank(display.textContent)) {
        clearExprDisplay();
        resetExpr(expr);
    } 
}

function isExprEntered(expr) {
    return expr.operand1 && expr.operand2 && expr.operator;
}

function handleInput(event, expr) {
    let target = event.target;
    let type = event.type;
    if (isNumberEntered(event)) {
        handleNumbers(event, expr);
    }
    else if (isOperationEntered(event) || isEqualsEntered(event)) {
        if (isExprEntered(expr)) {
            expr.operand2 = getDisplayContent();
            displayExpr(expr);
            displayRes(expr);
        }
        if (isOperationEntered(event)) {
            const clickedBtn = target.textContent;
            const pressedKey = event.key;
            const input = (type === "click") ? clickedBtn : pressedKey;
            expr.operator = formatOperator(event, input);
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
        handleDel(expr);
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
