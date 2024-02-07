
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

//Update Display
const display = document.querySelector('.screen');

const updateDisplay = () => {
    display.textContent = calculator.displayValue
};
updateDisplay();

//Handle Key Press
const keys = document.querySelector('.keypad');

keys.addEventListener('click', (event) => {
    const key = event.target
    const type = key.dataset.type;
    const keyValue = key.textContent
    
    //check if clicked element is a button
    if(!key.closest('button')) {
        return;
    }  
      
    if(type === 'operator'){
        handleOperator(keyValue);
        updateDisplay();
        return;
    }
    if(type === 'decimal'){
        inputDecimal(keyValue);
        updateDisplay();
        return;
    }
    if(type === 'clear'){
        clearCalculator();
        updateDisplay();
        return;
    }
    if(type === 'delete'){
        backspace(); 
        updateDisplay();
        return;
    }
    
    inputNumber(keyValue);
    updateDisplay();
});

//Input number
const inputNumber = (number) => {
    const {displayValue, waitingForSecondOperand} = calculator;

    if(waitingForSecondOperand === true){
        calculator.displayValue = number;
        calculator.waitingForSecondOperand = false
    }else{
        calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    }
};

//Input Decimal
const inputDecimal = (dot) => {
    if(calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
};

//Handle Operators
const handleOperator = (nextOperator) => {
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    if(firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    }else if (operator) {
        const result = calculate(firstOperand, inputValue, operator)

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
};


function clear() {
    displayValue = '0';
    previous.textContent = '';
    firstOperand = '';
    secondOperand = '';
    operator = null;
}

// Calculator logic
const calculate = (firstOperand, secondOperand, operator) => {
    if(firstOperand/secondOperand == Infinity || firstOperand/secondOperand == -Infinity){
        display.textContent = 'ya boob'
        return
    }else if(operator === '+') {
        return firstOperand + secondOperand;
    }else if(operator === '-') {
        return firstOperand - secondOperand;
    }else if(operator === 'x') {
        return firstOperand * secondOperand;
    }else if(operator === '÷' ) {
        return firstOperand / secondOperand;
    }     
    return secondOperand;
};

//Clear Calculator
const clearCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

//Delete last digit
const backspace = () => {
   calculator.displayValue = calculator.displayValue.toString().slice(0, -1);
   return calculator.displayValue
}
