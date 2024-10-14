let history = [];

// Função para adicionar números ou operadores ao display
function appendNumber(value) {
    let display = document.getElementById("display");
    let currentValue = display.value.trim(); // Remove espaços em branco

    // Se for um operador (+, -, *, /)
    if (["+", "-", "*", "/"].includes(value)) {
        // Adiciona um espaço antes do operador se não houver um já
        if (currentValue && !currentValue.endsWith(" ") && !["+", "-", "*", "/"].includes(currentValue.slice(-1))) {
            display.value += " ";  // Adiciona espaço antes do operador
        }
        display.value += value; // Adiciona o operador
        display.value += " "; // Adiciona espaço depois do operador
    } else if (value === ",") {
        // Se for uma vírgula, verifica se já existe uma vírgula no último número
        let lastNumber = currentValue.split(/[\s+*/-]+/).pop();  // Pega o último número

        if (!lastNumber.includes(",")) {
            display.value += value;  // Adiciona a vírgula diretamente sem espaço
        }
    } else {
        // Para números, apenas adiciona diretamente
        display.value += value;
    }
}

// Função para limpar o display
function clearDisplay() {
    document.getElementById("display").value = '';
}

// Função para calcular a expressão
function calc() {
    let displayElement = document.getElementById("display");
    let displayValue = displayElement.value.replace(/\s+/g, '');  // Remove os espaços

    // Troca a vírgula por ponto para avaliação correta
    displayValue = displayValue.replace(/,/g, '.');

    // Verifica se a expressão contém apenas caracteres válidos
    const validExpression = /^[0-9+\-*/().]+$/;
    
    if (validExpression.test(displayValue)) {
        try {
            let result = math.evaluate(displayValue);  // Avalia a expressão
            displayElement.value = result;  // Exibe o resultado

            // Formata a expressão para o histórico com espaços
            let formattedDisplayValue = displayValue.replace(/([+\-*/])/g, ' $1 ').trim(); // Adiciona espaço ao redor dos operadores

            history.push(`${formattedDisplayValue} = ${result}`);  // Adiciona ao histórico formatado
            updateHistory();  // Atualiza o histórico
        } catch (error) {
            displayElement.value = "Erro";  // Em caso de erro, exibe "Erro"
        }
    } else {
        displayElement.value = "Expressão inválida";  // Se a expressão for inválida
    }
}

// Função para atualizar o histórico
function updateHistory() {
    let historyElement = document.getElementById("history");
    historyElement.value = history.join('\n');  // Exibe o histórico completo
}

// Função para tratar as teclas pressionadas
function handleKeyPress(event) {
    const key = event.key;

    if (/\d/.test(key) || ['+', '-', '*', '/', ','].includes(key)) {
        appendNumber(key);  // Adiciona números ou operadores
    } else if (key === 'Enter') {
        calc();  // Realiza o cálculo ao pressionar Enter
    } else if (key === 'Backspace') {
        let display = document.getElementById("display").value;
        document.getElementById("display").value = display.slice(0, -1);  // Apaga o último caractere
    } else if (key === 'Escape') {
        clearDisplay();  // Limpa o display ao pressionar Escape
    }
}

// Adiciona o evento para capturar as teclas
document.addEventListener("keydown", handleKeyPress);
