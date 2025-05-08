function clear() {
    console.log("Button Pressed: " + this.innerText)
    console.log("Old Array: " + input);
    input = [];
    opIndex = -1;
    document.getElementById("display").value = '';
    console.log("New Array: " + input);
}

function negate() {
    console.log("Button Pressed: " + this.innerText)
    console.log("Old Array: " + input);
    if (input.length === 0) return;
    let lastNum = input.slice(opIndex + 1);
    oldLength = lastNum.length;
    lastNum = lastNum.join('');
    if (lastNum[0] === '-') {
        lastNum = lastNum.slice(1);
    } else {
        lastNum = '-' + lastNum;
    }
    input.splice(opIndex + 1, oldLength, ...[lastNum]);
    document.getElementById("display").value = input.join('');
    console.log("New Array: " + input);
}

function percent() {
    console.log("Button Pressed: " + this.innerText)
    console.log("Old Array: " + input);
    if (input.length === 0) return;
    let lastNum = input.slice(opIndex + 1).join('');
    let percentValue = parseFloat(lastNum) / 100;
    input.splice(opIndex + 1, 1, percentValue);
    document.getElementById("display").value = input.join('');
    console.log("New Array: " + input);
}

function backspace() {
    console.log("Button Pressed: " + this.innerText)
    console.log("Old Array: " + input);
    if (input.length === 0) return;
    if (input.length - 1 === opIndex) {
        opIndex = -1;
        input.pop();
    } else {
        let lastNum = input.slice(opIndex + 1).join('');
        if (lastNum.length === 2 && lastNum[0] === '-') {
            lastNum = '';
        } else {
            lastNum = lastNum.slice(0, -1);
        }
        input.splice(opIndex + 1, 1, ...[lastNum]);
    }
    document.getElementById("display").value = input.join('');
    console.log("New Array: " + input);
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return "Error";
            }
            return a / b;
        default:
            return "Error";
    }
}

function inputNum() {
    console.log("Button Pressed: " + this.innerText)
    console.log("Old Array: " + input);
    let lastNum = input.slice(opIndex + 1);
    lastNum.push(this.innerText);
    lastNum = lastNum.join('');
    input.splice(opIndex + 1, 1, ...[lastNum]);
    document.getElementById("display").value = input.join('');
    console.log("New Array: " + input);
}

function inputOperator() {
    console.log("Button Pressed: " + this.innerText)
    console.log("Old Array: " + input);
    if (input.length === 0) return;
    if (isNaN(input[input.length - 1])) {
        input[input.length - 1] = this.innerText;
    } else {
        if (opIndex !== -1) {
            calculate();
        }
        input.push(this.innerText);
    }
    opIndex = input.length - 1;
    document.getElementById("display").value = input.join('');
    console.log("New Array: " + input);
}

function inputDecimal() {
    console.log("Button Pressed: " + this.innerText)
    console.log("Old Array: " + input);
    if (input.length === 0 || (input[input.length - 1] !== '.' && isNaN(input[input.length - 1]))) {
        input.push('0.');
    } else {
        let lastNum = input.slice(opIndex + 1).join('');
        let decPoint = lastNum.indexOf('.');
        if (decPoint === -1) {
            lastNum = lastNum + '.';
            input.splice(opIndex + 1, 1, ...[lastNum]);
        }
    }
    document.getElementById("display").value = input.join('');
    console.log("New Array: " + input);
}

function calculate() {
    console.log("Button Pressed: " + this.innerText)
    console.log("Old Array: " + input);
    let num1 = input.slice(0, opIndex).join('');
    let operator = input[opIndex];
    let num2 = input.slice(opIndex + 1).join('');
    if (num1 === '' || num2 === '') {
        return;
    }
    let result = operate(num1, num2, operator);
    input = [String(result)];
    opIndex = -1;
    if (result === "Error") {
        input = [];
    }
    document.getElementById("display").value = result;
    console.log("New Array: " + input);
}

let input = [];
let opIndex = -1;




function init() {
    let numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        number.addEventListener('click', inputNum);
    });
    let operators = document.querySelectorAll('.operator');
    operators.forEach(operator => {
        operator.addEventListener('click', inputOperator);
    });
    let decimal = document.getElementById('decimal');
    decimal.addEventListener('click', inputDecimal);
    let equals = document.getElementById('equals');
    equals.addEventListener('click', calculate);
    let clearBtn = document.getElementById('clear');
    clearBtn.addEventListener('click', clear);
    let negateBtn = document.getElementById('negate');
    negateBtn.addEventListener('click', negate);
    let percentBtn = document.getElementById('percent');
    percentBtn.addEventListener('click', percent);
    let backspaceBtn = document.getElementById('backspace');
    backspaceBtn.addEventListener('click', backspace);
}

init();