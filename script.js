const display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let justEvaluated = false;

function updateDisplay() {
    display.textContent = currentInput;
}

// Handle button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            handleNumber(button.textContent);
        } else if (button.classList.contains('operator')) {
            handleOperator(button.textContent);
        } else if (button.id === 'clear') {
            handleClear();
        } else if (button.id === 'equals') {
            handleEquals();
        } else if (button.id === 'decimal') {
            handleDecimal();
        } else if (button.id === 'negative') {
            handleNegative();
        }
    });
});

// Handle number input
function handleNumber(number) {
    if (currentInput === '0' || justEvaluated) {
        currentInput = number;
    } else {
        currentInput += number;
    }
    justEvaluated = false;
    updateDisplay();
}

// Handle operator input
function handleOperator(op) {
    if (justEvaluated) {
        previousInput = currentInput;
        justEvaluated = false;
    } else if (previousInput && currentInput) {
        handleEquals();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
}

// Handle decimal point input
function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

// Handle clear button
function handleClear() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// Handle negative sign (±)
function handleNegative() {
    if (currentInput !== '0') {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay();
    }
}

// Handle equals (calculate result)
function handleEquals() {
    if (previousInput && currentInput && operator) {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    result = 'Error';
                } else {
                    result = prev / current;
                }
                break;
        }

        currentInput = result.toString();
        previousInput = '';
        operator = null;
        justEvaluated = true;
        updateDisplay();
    }
}

// Add keyboard support
document.addEventListener('keydown', event => {
    const key = event.key;
    if ('0123456789'.includes(key)) {
        handleNumber(key);
    } else if ('+-*/'.includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        handleEquals();
    } else if (key === 'Backspace') {
        handleClear();
    } else if (key === '.') {
        handleDecimal();
    } else if (key === 'Escape') {
        handleClear();
    }
});
