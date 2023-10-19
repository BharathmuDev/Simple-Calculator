document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('.input');
    const outputElement = document.querySelector('.output');
    const keys = document.querySelectorAll('.key');
    const icon = document.querySelector('.icon');
    const modal = document.getElementById('modal');
    const showHistoryBtn = document.getElementById('showHistory');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const historyPopup = document.querySelector('.history-popup');
    const historyContent = document.querySelector('.history-content');
    const closeHistoryBtn = document.querySelector('.close-history');
    let isOpenBracket = true;
    let history = [];

    function evaluateExpression(expression) {
        const regex = /\(([^()]*)\)/;
        let match = regex.exec(expression);

        while (match) {
            const subExpression = match[1];
            const subResult = eval(subExpression);
            expression = expression.replace(`(${subExpression})`, '*' + subResult);
            match = regex.exec(expression);
        }
        expression = expression.replace(/%/g, '/100');
        return eval(expression);
    }

    function toggleModal() {
        modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'flex' : 'none';
    }
    icon.addEventListener('click', toggleModal);

    function clearHistory() {
        history = [];
    }
    function showHistory() {
        let historyContent = '';
        history.forEach(item => {
            historyContent += `${item.operation} = ${item.result}\n`;
        });
    }
    showHistoryBtn.addEventListener('click', showHistory);
    clearHistoryBtn.addEventListener('click', clearHistory);
    clearHistoryBtn.addEventListener('click', function() {
        clearHistory();
        toggleModal();
    });

    function updateHistoryPopup() {
        historyContent.innerHTML = '';

        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.textContent = `${item.operation} = ${item.result}`;
            historyContent.appendChild(historyItem);
        });
        historyPopup.style.display = 'flex';
    }

    showHistoryBtn.addEventListener('click', updateHistoryPopup);
    closeHistoryBtn.addEventListener('click', function() {
        historyPopup.style.display = 'none';
    });

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
                        const expression = inputElement.textContent;
                        const result = evaluateExpression(expression);
                        history.push({ operation: expression, result: result });
                        console.log(result);
                        outputElement.textContent = result;
                    } catch (error) {
                        outputElement.textContent = 'Error';
                    }
                    break;
                case '( )':
                    inputElement.textContent += isOpenBracket ? '(' : ')';
                    isOpenBracket = !isOpenBracket;
                    break;
                case 'x':
                    const currentInput = inputElement.textContent;
                    inputElement.textContent = currentInput.slice(0, -1);
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    const lastChar = inputElement.textContent.slice(-1);
                    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
                        inputElement.textContent = inputElement.textContent.slice(0, -1);
                    }
                    inputElement.textContent += keyValue;
                    break;
                default:
                    inputElement.textContent += keyValue;
                    break;
            }
        });
    });
});