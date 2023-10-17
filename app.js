document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('.input');
    const outputElement = document.querySelector('.output');
    const keys = document.querySelectorAll('.key');
    const icon = document.querySelector('.icon');
    const modal = document.getElementById('modal');
    const showHistoryBtn = document.getElementById('showHistory');
    const clearHistoryBtn = document.getElementById('clearHistory');
    let isOpenBracket = true;
    let history = [];

    function evaluateExpression(expression) {
        expression = expression.replace(/%/g, '/100*');

        const regex = /\(([^()]*)\)/;
        let match = regex.exec(expression);

        while (match) {
            const subExpression = match[1];
            const subResult = eval(subExpression);
            expression = expression.replace(`(${subExpression})`, '*' + subResult);
            match = regex.exec(expression);
        }
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
        alert(historyContent);
    }
    showHistoryBtn.addEventListener('click', showHistory);
    clearHistoryBtn.addEventListener('click', clearHistory);
    clearHistoryBtn.addEventListener('click', function() {
        clearHistory();
        toggleModal();
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
                    if (isOpenBracket) {
                        inputElement.textContent += '(';
                    } else {
                        inputElement.textContent += ')';
                    }
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
                    let currentInput1 = inputElement.textContent;
                    const lastChar = currentInput1.slice(-1);
                    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
                        inputElement.textContent = currentInput1.slice(0, -1) + keyValue;
                    } else {
                        inputElement.textContent += keyValue;
                    }
                    break;
                default:
                    inputElement.textContent += keyValue;
                    break;
            }
        });
    });
});


