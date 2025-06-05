let banderas = [];
let banderaActual = {};
let puntaje = 0;

async function cargarBanderas() {
  const res = await fetch("banderas.json");
  banderas = await res.json();
  nuevaRonda();
}

function nuevaRonda() {
  document.getElementById("resultado").textContent = "";
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";

  // Elige una bandera al azar
  banderaActual = banderas[Math.floor(Math.random() * banderas.length)];
  document.getElementById("bandera").src = banderaActual.img;

  // Crea opciones (1 correcta y 2 incorrectas)
  const opciones = [banderaActual.pais];
  while (opciones.length < 3) {
    const paisRandom = banderas[Math.floor(Math.random() * banderas.length)].pais;
    if (!opciones.includes(paisRandom)) {
      opciones.push(paisRandom);
    }
  }

  // Mezclar opciones
  opciones.sort(() => Math.random() - 0.5);

  // Mostrar botones
  opciones.forEach(pais => {
    const btn = document.createElement("button");
    btn.textContent = pais;
    btn.onclick = () => verificarRespuesta(pais);
    opcionesDiv.appendChild(btn);
  });
}

function verificarRespuesta(paisElegido) {
  const resultado = document.getElementById("resultado");
  if (paisElegido === banderaActual.pais) {
    resultado.textContent = "¡Correcto! 🎉";
    puntaje++;
  } else {
    resultado.textContent = `Incorrecto 😞 Era ${banderaActual.pais}`;
  }
  document.getElementById("puntaje").textContent = `Puntaje: ${puntaje}`;
}

document.getElementById("siguiente").addEventListener("click", nuevaRonda);

cargarBanderas();
