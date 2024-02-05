
let num1 = '';
let num2 = '';
let operator = null;
const keys = document.querySelector('.keypad');
const current = document.querySelector('.bottom-screen');
const previous = document.querySelector('.top-screen')
let previousText = String(previous.textContent)
let shouldResetScreen = false
const add = (num1,num2) => num1 + num2;
const subtract = (num1,num2) => num1 - num2;
const multiply = (num1,num2) => num1 * num2;
const divide = (num1,num2) => num1 / num2;


const updateCurrent = () => {
    keys.addEventListener('click', (event) => {
        let target = event.target
        if(current.textContent === '0'){
            resetScreen()
        }
        if(target.dataset.type === 'number') {
            current.textContent = (current.textContent) + target.textContent
        }
        if(target.dataset.type === 'operator' && current.textContent !== '0' && operator === null) {
            num1 = current.textContent
            operator = target.textContent
            previous.textContent = num1 + target.textContent
            current.textContent = ''
        }
        if(target.dataset.type === 'equal') {
            num2 = current.textContent
            previous.textContent = previous.textContent + current.textContent
            current.textContent = operate(operator, num1, num2)
        }
        if(target.dataset.type === "clear") {
            clear()
        }
    })
}
updateCurrent()


function clear() {
    current.textContent = '0';
    previous.textContent = '';
    num1 = '';
    num2 = '';
    operator = null;
}

function resetScreen() {
    current.textContent = ''
    shouldResetScreen = false
  }

function operate(operator, num1, num2) {
    num1 = Number(num1)
    num2 = Number(num2)
    
    if(operator == '+') {
        return add(num1, num2)
    }else if(operator == '-') {
        return subtract(num1, num2)
    }else if(operator == 'x') {
        return multiply(num1, num2)
    }else if(operator == '÷' && num2 !== 0) {
        return divide (num1, num2)
    }else {
        return null
    }
}
  
  