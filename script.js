const selectTeamA = document.getElementById("selectTeamA");
const selectTeamB = document.getElementById("selectTeamB");
const selectPhase = document.getElementById("selectPhase");
const inputData = document.getElementById("data");
const inputHora = document.getElementById("hora");
const btnAtualizar = document.getElementById("btnAtualizar");
const btnTelaCheia = document.getElementById("btnTelaCheia");
const avisoData = document.getElementById("avisoData");

const teamA = document.getElementById("teamA");
const teamB = document.getElementById("teamB");
const phase = document.getElementById("phase");
const countdown = document.getElementById("countdown");
const timer = document.getElementById("timer");
const flagA = document.getElementById("flagA");
const flagB = document.getElementById("flagB");

let intervalo;

// ===== FONTE ÚNICA DE VERDADE =====
// nome do time -> caminho da bandeira
// (os <option> dos selects são gerados a partir daqui, então
// não existe mais risco de os nomes ficarem diferentes entre HTML e JS)
const bandeiras = {
  "Argélia": "assets/flags/argelia.png",
  "Argentina": "assets/flags/argentina.png",
  "Austrália": "assets/flags/australia.png",
  "Áustria": "assets/flags/austria.png",
  "Bélgica": "assets/flags/belgica.png",
  "Bósnia e Herzegovina": "assets/flags/bosnia.png",
  "Brasil": "assets/flags/brasil.png",
  "Cabo Verde": "assets/flags/cabo-verde.png",
  "Canadá": "assets/flags/canada.png",
  "Colômbia": "assets/flags/colombia.png",
  "Coreia do Sul": "assets/flags/coreia.png",
  "Costa do Marfim": "assets/flags/costa-do-marfim.png",
  "Croácia": "assets/flags/croacia.png",
  "Curaçao": "assets/flags/curacao.png",
  "Egito": "assets/flags/egito.png",
  "Equador": "assets/flags/equador.png",
  "Escócia": "assets/flags/escocia.png",
  "Espanha": "assets/flags/espanha.png",
  "Estados Unidos": "assets/flags/estados-unidos.png",
  "França": "assets/flags/franca.png",
  "Gana": "assets/flags/gana.png",
  "Haiti": "assets/flags/haiti.png",
  "Inglaterra": "assets/flags/inglaterra.png",
  "Irã": "assets/flags/ira.png",
  "Iraque": "assets/flags/iraque.png",
  "Japão": "assets/flags/japao.png",
  "Jordânia": "assets/flags/jordania.png",
  "Marrocos": "assets/flags/marrocos.png",
  "México": "assets/flags/mexico.png",
  "Noruega": "assets/flags/noruega.png",
  "Nova Zelândia": "assets/flags/nova-zelandia.png",
  "Países Baixos": "assets/flags/paises-baixos.png",
  "Panamá": "assets/flags/panama.png",
  "Paraguai": "assets/flags/paraguai.png",
  "Portugal": "assets/flags/portugal.png",
  "Qatar": "assets/flags/qatar.png",
  "República Checa": "assets/flags/republica-checa.png",
  "República Democrática do Congo": "assets/flags/rd-congo.png",
  "Arábia Saudita": "assets/flags/arabia.png",
  "Senegal": "assets/flags/senegal.png",
  "Suécia": "assets/flags/suecia.png",
  "Suíça": "assets/flags/suica.png",
  "África do Sul": "assets/flags/africa-do-sul.png",
  "Tunísia": "assets/flags/tunisia.png",
  "Turquia": "assets/flags/turquia.png",
  "Uruguai": "assets/flags/uruguai.png",
  "Uzbequistão": "assets/flags/uzbequistao.png"
};

// gera as opções dos dois selects de time a partir do objeto "bandeiras"
function popularSelectsDeTimes() {
  const paises = Object.keys(bandeiras).sort((a, b) => a.localeCompare(b, "pt-BR"));

  [selectTeamA, selectTeamB].forEach((select) => {
    paises.forEach((pais) => {
      const option = document.createElement("option");
      option.value = pais;
      option.textContent = pais;
      select.appendChild(option);
    });
  });

  // valores iniciais (equivalentes ao que estava fixo no HTML original)
  selectTeamA.value = "Brasil";
  selectTeamB.value = "Argentina";
}

popularSelectsDeTimes();

btnAtualizar.addEventListener("click", () => {
  const selectedTeamA = selectTeamA.value;
  const selectedTeamB = selectTeamB.value;
  const selectedPhase = selectPhase.value;
  const data = inputData.value;
  const hora = inputHora.value;

  // valida se data/hora foram preenchidos e se estão no futuro
  if (data && hora) {
    const dataJogo = new Date(`${data}T${hora}:00`);

    if (dataJogo <= new Date()) {
      avisoData.classList.remove("oculto");
      timer.textContent = "00:00:00";
      return;
    }
  }

  avisoData.classList.add("oculto");
  clearInterval(intervalo);

  // atualiza textos
  teamA.textContent = selectedTeamA;
  teamB.textContent = selectedTeamB;
  phase.textContent = selectedPhase;

  if (data && hora) {
    countdown.textContent = `${data.split("-").reverse().join("/")} • ${hora}`;
  } else {
    countdown.textContent = "Defina data e horário";
  }

  // atualiza bandeiras automaticamente
  flagA.src = bandeiras[selectedTeamA] || "assets/flags/default.png";
  flagB.src = bandeiras[selectedTeamB] || "assets/flags/default.png";
  flagA.alt = `Bandeira de ${selectedTeamA}`;
  flagB.alt = `Bandeira de ${selectedTeamB}`;

  // mostra botão de transmissão
  btnTelaCheia.classList.remove("oculto");

  // se data ou hora estiverem vazias, não inicia o timer
  if (!data || !hora) {
    timer.textContent = "00:00:00";
    return;
  }

  const dataJogo = new Date(`${data}T${hora}:00`);

  intervalo = setInterval(() => {
    const agora = new Date();
    const diferenca = dataJogo - agora;

    if (diferenca <= 0) {
      clearInterval(intervalo);
      timer.textContent = "00:00:00";
      countdown.textContent = "A transmissão começou!";
      return;
    }

    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    timer.textContent =
      `${String(horas).padStart(2, "0")}:` +
      `${String(minutos).padStart(2, "0")}:` +
      `${String(segundos).padStart(2, "0")}`;
  }, 1000);
});

// entra em modo transmissão
btnTelaCheia.addEventListener("click", async () => {
  document.body.classList.add("modo-transmissao");

  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
  } catch (erro) {
    console.log("Não foi possível entrar em tela cheia:", erro);
  }
});

// quando sair da tela cheia, volta tudo ao normal
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    document.body.classList.remove("modo-transmissao");
  }
});