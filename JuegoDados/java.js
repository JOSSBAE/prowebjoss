// Efecto de sonido (opcional)
const diceSound = document.getElementById("diceSound");

// Tirar dados
function tirarDados() {
    // Deshabilitar botón durante la animación
    const boton = document.getElementById("rollButton");
    boton.disabled = true;
    
    // Reproducir sonido (opcional)
    diceSound.play();
    
    // Animación de dados
    const dado1 = document.getElementById("dice1");
    const dado2 = document.getElementById("dice2");
    const resultadoDiv = document.getElementById("resultado");
    
    resultadoDiv.textContent = "";
    
    // Animación: Cambiar caras rápidamente
    let rolls = 0;
    const rollInterval = setInterval(() => {
        dado1.textContent = obtenerCaraDado();
        dado2.textContent = obtenerCaraDado();
        rolls++;
        
        if (rolls > 10) {
            clearInterval(rollInterval);
            determinarGanador();
            boton.disabled = false;
        }
    }, 100);
}

// Obtener cara aleatoria del dado (Unicode)
function obtenerCaraDado() {
    const carasDado = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return carasDado[Math.floor(Math.random() * 6)];
}

// Determinar ganador
function determinarGanador() {
    const dado1 = document.getElementById("dice1");
    const dado2 = document.getElementById("dice2");
    const resultadoDiv = document.getElementById("resultado");
    
    const valorDado1 = obtenerValorDado(dado1.textContent);
    const valorDado2 = obtenerValorDado(dado2.textContent);
    
    if (valorDado1 > valorDado2) {
        resultadoDiv.textContent = "¡Jugador 1 Gana! 🎉";
        resultadoDiv.style.color = "#2ecc71";
    } else if (valorDado2 > valorDado1) {
        resultadoDiv.textContent = "¡Jugador 2 Gana! 🎉";
        resultadoDiv.style.color = "#2ecc71";
    } else {
        resultadoDiv.textContent = "¡Empate! 🤝";
        resultadoDiv.style.color = "#f39c12";
    }
}

// Convertir cara del dado a valor numérico
function obtenerValorDado(cara) {
    const carasDado = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return carasDado.indexOf(cara) + 1;
}