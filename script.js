let num1 = '';
let operator = '';
let num2 = '';

const validOperations = ['+', '-', '×', '÷'];
let lastClicked = null;
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        lastClicked = event.target.textContent;
        console.log('Last button clicked:', lastClicked);
    }
});

let digit = document.querySelectorAll(".digit");
let currentOperator = document.querySelectorAll(".operator");
let display = document.getElementById("display");
let equals = document.querySelector('.equals');
display.textContent = '0';

digit.forEach(element => {
    element.addEventListener("click", function () {
        document.getElementById("display").style.fontSize = "3.5rem";
        if (operator === '') {
            if (display.textContent === '0') {
                display.textContent = '';
            }
            num1 = String(num1) + String(element.textContent);
            display.append(element.textContent);
        } else {
            num2 = String(num2) + String(element.textContent);
            display.append(element.textContent);
        }
    });
});

currentOperator.forEach(element => {
    element.addEventListener("click", function () {
        if (!validOperations.includes(lastClicked)) {
            operator = String(element.textContent);
            display.append(operator);
        }
    });
});
// TODO: if operator pressed 2 or more times, make the solution = num1

equals.addEventListener("click", function () {
    display.textContent = '';
    display.append(operate(operator, +num1, +num2));
    console.log('equals:', operate(operator, +num1, +num2));
});

// calculator operation functions
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
    return num1 / num2;
}

function power(base, exponent) {
    return base ** exponent;
};

function factorial(value) {
    let result = 1;
    for (let i = 1; i <= value; i++) {
        result = result * i;
    }
    return result;
};

const solution = operate(operator, num1, num2);

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '×') {
        return multiply(num1, num2);
    } else if (operator === '÷') {
        if (num2 === 0) {
            document.getElementById("display").style.fontSize = "1.9rem";
            return 'Cannot divide by zero';
        } else {
            return divide(num1, num2);
        }
    } else if (operator === '^') {
        return power(num1, num2);
    } else if (operator === '!') {
        return subtract(num1, num2);
    } else {
        return "unsupported operator";
    }
}

// function input() {

// }

/* 
(done) 1. when btn is activated, it stores that digit to num1 var
(done) 2. when operator btn is activated, it stores that to operator var
3. when btn is activated again, it stores that digit to num2 var
if operator is activated a second time, solution = operate becomes num1
4. when equal button is activated, operate() takes num1, operator, and num2 as its arguments, and run the function and save value to solution var

5. use dom manipulation to reflect solution's value to the display
*/