let buttons = document.querySelectorAll(".btn");
let digit = document.querySelectorAll(".digit");
let currentOperator = document.querySelectorAll(".operator");
let display = document.getElementById("display");
let equals = document.querySelector('.equals');
let ac = document.querySelector('.clear');
let backspace = document.querySelector('.backspace');
display.textContent = '0';

let num1 = '';
let operator = '';
let num2 = '';
let result = '';
let displayStr = '';

const validOperations = ['+', '-', '×', '÷'];
const keyMap = {
    '*': '×',
    '/': '÷',
    'Backspace': 'backspace',
    'Escape': 'AC',
    'Enter': '=',
};
let displayElements = [];

// track last clicked
let lastClicked = null;
// last character deleted by backspace
let lastBackspaced = null;
// operator click count
let opClickCount = 0;

// keyboard mappings
document.addEventListener("keydown", e => {
    let keyPressed = keyMap[e.key] || e.key;
    console.log('key pressed: ', keyPressed);

    let targetButton = Array.from(buttons).find(button => button.textContent.trim() === keyPressed);
    if (targetButton) {
        targetButton.click();
    } else {
        return;
    }
});

// clear (AC) button
ac.addEventListener("click", function () {
    document.getElementById("display").style.fontSize = "3.5rem";
    display.textContent = '0';
    num1 = '';
    operator = '';
    num2 = '';
    result = '';
    displayStr = '';
    lastClicked = 'AC';
    lastBackspaced = null;
    opClickCount = 0;
});

// backspace button
backspace.addEventListener("click", function () {
    lastBackspaced = display.textContent.slice(-1);
    display.textContent = display.textContent.slice(0, -1);
    displayElements = String(display.textContent).split(/([\+\-×÷])/);

    num1 = displayElements[0];
    operator = displayElements[1];
    num2 = displayElements[2];

    if (num1 === undefined) {
        num1 = '';
    }
    if (operator === undefined) {
        operator = '';
        if (/[\+\-×÷]/.test(lastBackspaced)) {
            opClickCount -= 1;
            console.log('opClickCount (backspace):', opClickCount);
        }
    }
    if (num2 === undefined) {
        num2 = '';
    }

    lastClicked = 'backspace';
});

digit.forEach(element => {
    element.addEventListener("click", function () {
        document.getElementById("display").style.fontSize = "3.5rem";

        if (lastClicked === '.') {
            lastClicked = element.textContent;
            if (lastClicked === '.') {
                return;
            }
        }

        if (lastClicked === '=' || display.textContent === 'Cannot divide by zero') {
            document.getElementById("display").style.fontSize = "3.5rem";
            display.textContent = '0';
            num1 = '';
            operator = '';
            num2 = '';
            result = '';
            displayStr = '';
            opClickCount = 0;
        }

        if (String(displayStr).length >= 18 && displayStr !== '') {
            return;
        }

        if (operator === '') {
            lastClicked = element.textContent;
            if (display.textContent === '0') {
                display.textContent = '';
            }
            if (lastClicked === '.' && String(num1).includes('.')) {
                return;
            }
            num1 = String(num1) + String(element.textContent);
            display.append(element.textContent);
        } else {
            lastClicked = element.textContent;
            if (lastClicked === '.' && String(num2).includes('.')) {
                return;
            }
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
            displayStr = +(displayStr).toFixed(16);
            document.getElementById("display").style.fontSize = "1.925rem";
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

currentOperator.forEach(element => {
    element.addEventListener("click", function () {
        if (isNaN(num1)) {
            return;
        }

        if (!validOperations.includes(lastClicked)) {
            // track operator click count
            opClickCount++;
            console.log('opClickCount:', opClickCount);

            if (opClickCount < 2 && lastClicked !== 'backspace') {
                operator = String(element.textContent);
            } else if (opClickCount >= 2) {
                if (operator === '') {
                    operator = String(element.textContent);
                }
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
    if ((operator === '' && lastClicked !== '.') || lastClicked === '=') {
        lastClicked = '=';
        return;
    } else if (/[\+\-×÷]$/.test(display.textContent)) {
        display.textContent = String(display.textContent).slice(0, -1);
        operator = '';
        opClickCount -= 1;
        console.log('opClickCount (last string is an operator): ', opClickCount);
        return;
    } else if (num2 === '') {
        display.textContent = num1;
    }

    result = operate(operator, +num1, +num2);
    console.log("length:", String(result).length);

    if (String(result).length >= 18) {
        if (Number.isFinite(result)) {
            result = result.toFixed(16);
        }
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
    lastClicked = '=';
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

function operate(operator, number1, number2) {
    if (String(num1).endsWith('.') && operator === '') {
        return String(num1).slice(0, -1);
    }

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