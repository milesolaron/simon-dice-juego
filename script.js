let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

document.querySelector('button[type=button]').addEventListener('click', comenzarJuego);


actualizarEstado('¡Hacé click en "Empezar" para jugar!');
actualizarNumeroRonda('-');
bloquearInputUsuario();

function comenzarJuego() {
    reiniciarEstado();
    manejarRonda();
}

function reiniciarEstado() {
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    ronda = 0;
}

function manejarRonda() {
    actualizarEstado('Turno de Simón');
    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro);

    const tiempoTurnoJugador = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(function($cuadro, index) {
        const tiempoRetraso = (index + 1) * 1000;
        setTimeout(function() {
            resaltar($cuadro);
        }, tiempoRetraso);
    });

    setTimeout(function() {
        actualizarEstado('¡Es tu turno!');
        desbloquearInputUsuario();
    }, tiempoTurnoJugador);

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);
}

function actualizarNumeroRonda(numeroRonda) {
    const $numeroRonda = document.querySelector('#ronda');
    $numeroRonda.textContent = numeroRonda;
}

function manejarInputUsuario(e) {
    const $cuadro = e.target;
    resaltar($cuadro);
    secuenciaUsuario.push($cuadro);

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];
    if ($cuadro.id !== $cuadroMaquina.id) {
        perder();
        return;
    }

    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }
}

function obtenerCuadroAleatorio() {
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
}

function actualizarEstado(estado, error = false){
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;
    if (error) {
        $estado.classList.remove('alert-dark');
        $estado.classList.add('alert-danger');
    } else {
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-dark');
    }
}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function() {
        $cuadro.style.opacity = 0.5;
    }, 500);
}

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {

        };
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    });
}

function perder() {
    bloquearInputUsuario();
    actualizarEstado('¡Perdiste! Hacé click en "Empezar" para obtener la revancha', true);
    document.querySelector('button[type=button]').addEventListener('click', comenzarJuego);
}
