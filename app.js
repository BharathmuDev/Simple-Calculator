document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('.input');
    const outputElement = document.querySelector('.output');
    const keys = document.querySelectorAll('.key');
    let isOpenBracket = true;
    let currentOperator = null;

    keys.forEach(key => {
        key.addEventListener('click', function() {
            const keyValue = this.innerText;

            switch (keyValue) {
                case 'AC':
                    inputElement.textContent = '';
                    outputElement.textContent = '';
                    break;
                case '=':
                    try {
                        const expression = inputElement.textContent.replace(/%/g, '/100*');
                        const result = eval(expression);
                        console.log(result);
                        outputElement.textContent = result;
                    } catch (error) {
                        outputElement.textContent = 'Error';
                    }
                    break;
                case '( )':
                    // Toggle between open and close brackets
                    if (isOpenBracket) {
                        inputElement.textContent += '(';
                    } else {
                        inputElement.textContent += ')';
                    }
                    isOpenBracket = !isOpenBracket;
                    break;
                case 'x':
                    let currentInput = inputElement.textContent;
                    inputElement.textContent = currentInput.slice(0, -1);
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    if (currentOperator && currentOperator !== keyValue) {
                        let currentInput = inputElement.textContent;
                        inputElement.textContent = currentInput.slice(0, -1) + keyValue;
                    } else {
                        inputElement.textContent += keyValue;
                    }
                    currentOperator = keyValue;
                    break;
                default:
                    inputElement.textContent += keyValue;
                    break;
            }
        });
    });
});

