function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) alert("You cannot divide by 0"); 
    else return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '/':
            divide(num1, num2);
            break;
    }

}

function displayNumber(num) {
    const display = document.querySelector("#num-display");
    display.textContent += num;
}

function clearDisplay() {
    const display = document.querySelector("#num-display");
    display.textContent = "";
}

function getPressedKey() {
    const calculator = document.querySelector("#calculator");
    calculator.addEventListener("click", (event) => {
        let target = event.target;
        if (target.className === "number") {
            const num = target.textContent;
            displayNumber(num);
        }
    });
}

getPressedKey();
