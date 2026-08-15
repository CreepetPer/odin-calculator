let digit = document.querySelectorAll(".digit");
let currentOperator = document.querySelectorAll(".operator");
let display = document.getElementById("display");
let equals = document.querySelector('.equals');
display.textContent = '0';

let num1 = '';
let operator = '';
let num2 = '';
let result = '';
let displayStr = '';

const validOperations = ['+', '-', '×', '÷'];
// track last clicked
let lastClicked = null;
// operator click count
let opClickCount = 0;

digit.forEach(element => {
    element.addEventListener("click", function () {
        if (String(displayStr).length >= 18 && displayStr !== '') {
            return;
        }

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
        lastClicked = element.textContent;

        displayStr = `${num1 + operator + num2}`;
        if (String(displayStr).length >= 18) {
            document.getElementById("display").style.fontSize = "1.925rem";
            return;
        }
        console.log('displayStr:', String(displayStr).length);

        if (String(displayStr).length >= 18) {
            // displayStr = +(displayStr).toFixed(16);
            // document.getElementById("display").style.fontSize = "1.925rem";
        } else if (String(displayStr).length === 10) {
            document.getElementById("display").style.fontSize = "3.35rem";
        } else if (String(displayStr).length === 11) {
            document.getElementById("display").style.fontSize = "3.05rem";
        } else if (String(displayStr).length === 12) {
            document.getElementById("display").style.fontSize = "2.75rem";
        } else if (String(displayStr).length === 13) {
            document.getElementById("display").style.fontSize = "2.55rem";
        } else if (String(displayStr).length === 14) {
            document.getElementById("display").style.fontSize = "2.35rem";
        } else if (String(displayStr).length === 15) {
            document.getElementById("display").style.fontSize = "2.22rem";
        } else if (String(displayStr).length === 16) {
            document.getElementById("display").style.fontSize = "2.10rem";
        } else if (String(displayStr).length === 17) {
            document.getElementById("display").style.fontSize = "1.95rem";
        }
    });
});
// TODO: make AC button functional
currentOperator.forEach(element => {
    element.addEventListener("click", function () {
        if (isNaN(num1)) {
            return;
        }

        if (!validOperations.includes(lastClicked)) {
            // track operator click count
            opClickCount++;
            console.log('opClickCount:', opClickCount);

            if (opClickCount < 2) {
                operator = String(element.textContent);
            }
            if (opClickCount >= 2) {
                result = operate(operator, +num1, +num2);
                num1 = result;
                console.log('equals:', result);
                num2 = '';
            }
            if (result === 'Cannot divide by zero') {
                display.textContent = 'Cannot divide by zero';
                return;
            }

            operator = String(element.textContent);
            display.textContent = `${num1 + operator}`;
            lastClicked = element.textContent;

        } else if (validOperations.includes(lastClicked)) {
            if (opClickCount < 2) {
                operator = String(element.textContent);
            }
            if (result === 'Cannot divide by zero') {
                display.textContent = 'Cannot divide by zero';
                return;
            }

            operator = String(element.textContent);
            display.textContent = `${num1 + operator}`;
            lastClicked = element.textContent;
        }
    });
});

equals.addEventListener("click", function () {
    result = operate(operator, +num1, +num2);
    console.log("length:", String(result).length);

    if (String(result).length >= 18) {
        result = result.toFixed(16);
        document.getElementById("display").style.fontSize = "1.925rem";
    } else if (String(result).length === 11) {
        document.getElementById("display").style.fontSize = "3.3rem";
    } else if (String(result).length === 12) {
        document.getElementById("display").style.fontSize = "2.75rem";
    } else if (String(result).length === 13) {
        document.getElementById("display").style.fontSize = "2.55rem";
    } else if (String(result).length === 14) {
        document.getElementById("display").style.fontSize = "2.35rem";
    } else if (String(result).length === 15) {
        document.getElementById("display").style.fontSize = "2.35rem";
    } else if (String(result).length === 16) {
        document.getElementById("display").style.fontSize = "2.25rem";
    } else if (String(result).length === 17) {
        document.getElementById("display").style.fontSize = "2.1rem";
    }

    display.textContent = '';
    display.append(result);
    console.log('equals:', result);

    if (opClickCount >= 1) {
        num1 = result;
        num2 = '';
    }

    opClickCount = 0;
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

// const solution = operate(operator, num1, num2);

function operate(operator, number1, number2) {
    if (operator === '+') {
        return add(number1, number2);
    } else if (operator === '-') {
        return subtract(number1, number2);
    } else if (operator === '×') {
        return multiply(number1, number2);
    } else if (operator === '÷') {
        if (number2 == 0 && num2 !== '') {
            document.getElementById("display").style.fontSize = "1.9rem";
            return 'Cannot divide by zero';
        } else {
            return divide(number1, number2);
        }
    } else if (operator === '^') {
        return power(number1, number2);
    } else if (operator === '!') {
        return subtract(number1, number2);
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