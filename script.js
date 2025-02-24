function clear() {
    input = [];
    opIndex = -1;
    document.getElementById("display").value = '';
}

function negate() {
    if (input.length === 0) return;
    let lastNum = input.slice(opIndex + 1);
    if (lastNum[0] === '-') {
        lastNum.shift();
    } else {
        lastNum.unshift('-');
    }
    input.splice(opIndex + 1, lastNum.length, ...lastNum);
    document.getElementById("display").value = input.join('');
}

function percent() {
    if (input.length === 0) return;
    let lastNum = input.slice(opIndex + 1);
    if (lastNum[0] === '-') {
        lastNum.shift();
    }
    let percentValue = parseFloat(lastNum.join('')) / 100;
    input.splice(opIndex + 1, lastNum.length, percentValue);
    document.getElementById("display").value = input.join('');
}

function backspace() {
    if (input.length === 0) return;
    if (input.length - 1 === opIndex) {
        opIndex = -1;
    }
    input.pop();
    document.getElementById("display").value = input.join('');  
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
    input.push(this.innerText);
    document.getElementById("display").value = input.join('');
}

function inputOperator() {
    if (input.length === 0) return;
    if (isNaN(input[input.length - 1])) {
        input[input.length - 1] = this.innerText;
    } else {
        input.push(this.innerText);
    }
    opIndex = input.length - 1;
    document.getElementById("display").value = input.join('');
}

function inputDecimal() {
    if (input.length === 0 || isNaN(input[input.length - 1])) {
        input.push('0.');
    } else {
        let lastNum = input.slice(opIndex + 1);
        let decPoint = lastNum.indexOf('.');
        if (decPoint === -1) {
            input.push('.');
        } else {
            input.splice(decPoint, 1)
            input.push('.');
        }
    }
    document.getElementById("display").value = input.join('');
}

function calculate() {
    let num1 = input.slice(0, opIndex).join('');
    let operator = input[opIndex];
    let num2 = input.slice(opIndex + 1).join('');
    let result = operate(num1, num2, operator);
    input = [result];
    opIndex = -1;
    if (result === "Error") {
        input = [];
    }
    document.getElementById("display").value = result;
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