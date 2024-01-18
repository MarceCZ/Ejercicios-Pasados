let simbolosD = ["X", "O"]
let listaCasilla = []
let turno = 0

function crearCasilla() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let casilla = {
                simbolo: null,
                mostrandoSimbolo: false
            }
            listaCasilla.push(casilla)
        }
    }
}

function devolverCasilla(row, col) {
    const pos = row * 3 + col
    return listaCasilla[pos]
}

function ponerSimboloCasilla() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const but = document.getElementById(i + ";" + j)
            const casilla = devolverCasilla(i, j)
            if (casilla.mostrandoSimbolo) {
                but.innerHTML = casilla.simbolo
            } else {
                but.innerHTML = ""
            }
        }
    }
}

function casillaOnClick(row, col) {
    const seleccion = devolverCasilla(row, col)

    //solo un click en la casilla
    if (!seleccion.mostrandoSimbolo) {
        seleccion.simbolo = simbolosD[turno]
        seleccion.mostrandoSimbolo = true;
        ponerSimboloCasilla()

        setTimeout(function(){
            if (verificarGanador(row, col)) {
                alert(`Jugador ${turno + 1} GANO!`)
            }
        
            else if (empate()) {
                alert("Es un emplate!")
            }

            if(turno==0){
                turno = 1
            }
            else{
                turno = 0
            }
        }, 200)
    }
}

function verificarGanador(row, col) {
    const simboloActual = devolverCasilla(row, col).simbolo

    //Filas
    if (
        devolverCasilla(row, 0).simbolo == simboloActual &&
        devolverCasilla(row, 1).simbolo == simboloActual &&
        devolverCasilla(row, 2).simbolo == simboloActual
    ) {
        return true
    }

    //Columnas
    if (
        devolverCasilla(0, col).simbolo == simboloActual &&
        devolverCasilla(1, col).simbolo == simboloActual &&
        devolverCasilla(2, col).simbolo == simboloActual
    ) {
        return true
    }

    //Diagonales
    if (
        (row === col ||
            (row === 0 && col === 2) ||
            (row === 2 && col === 0)) &&
        ((devolverCasilla(0, 0).simbolo == simboloActual &&
            devolverCasilla(1, 1).simbolo == simboloActual &&
            devolverCasilla(2, 2).simbolo == simboloActual) ||
            (devolverCasilla(0, 2).simbolo == simboloActual &&
                devolverCasilla(1, 1).simbolo == simboloActual &&
                devolverCasilla(2, 0).simbolo == simboloActual))
    ) {
        return true
    }

    return false
}

function empate() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!devolverCasilla(i, j).mostrandoSimbolo) {
                return false
            }
        }
    }
    return true
}

function main() {
    crearCasilla()
    ponerSimboloCasilla()
}

main()

