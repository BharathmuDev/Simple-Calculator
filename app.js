document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('.input');
    const outputElement = document.querySelector('.output');
    const keys = document.querySelectorAll('.key');
    const modal = document.getElementById('modal');
    const history = [];

    function evaluateExpression(expression) {
        expression = expression.replace(/%/g, '/100*');
        try {
            return eval(expression);
        } catch (error) {
            return 'Error';
        }
    }

    function updateInput(value) {
        inputElement.textContent += value;
    }

    function clearInput() {
        inputElement.textContent = '';
        outputElement.textContent = '';
    }

    function toggleModal() {
        modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'flex' : 'none';
    }

    function addToHistory(operation, result) {
        history.push({ operation, result });
    }

    function showHistory() {
        let historyContent = '';
        history.forEach(item => {
            historyContent += `${item.operation} = ${item.result}\n`;
        });
        console.log(historyContent);

    }

    keys.forEach(key => {
        key.addEventListener('click', function() {
            const keyValue = this.innerText;
            switch (keyValue) {
                case 'AC':
                    clearInput();
                    break;
                case '=':
                    const expression = inputElement.textContent;
                    const result = evaluateExpression(expression);
                    outputElement.textContent = result;
                    addToHistory(expression, result);
                    break;
                case '( )':
                    updateInput(isOpenBracket ? '(' : ')');
                    isOpenBracket = !isOpenBracket;
                    break;
                case 'x':
                    inputElement.textContent = inputElement.textContent.slice(0, -1);
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    const lastChar = inputElement.textContent.slice(-1);
                    if (!['+', '-', '*', '/', '%'].includes(lastChar)) {
                        updateInput(keyValue);
                    }
                    break;
                default:
                    updateInput(keyValue);
                    break;
            }
        });
    });
});
