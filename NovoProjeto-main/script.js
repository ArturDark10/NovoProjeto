const telaInicial = document.getElementById("tela-inicial");
const telaQuiz = document.getElementById("tela-quiz");
const telaFinal = document.getElementById("tela-final");

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");

const btnIniciar = document.getElementById("btn-iniciar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnToggleTema = document.getElementById("btn-toggle-tema");

const perguntas = [
  {
    enunciado: "Assim que saiu da escola, você encontra um chat com inteligência artificial que responde tudo. O que você pensa?",
    alternativas: [
      { texto: "Isso é assustador!", correto: false },
      { texto: "Isso é maravilhoso!", correto: true }
    ]
  },
  {
    enunciado: "Você descobre que a IA pode imitar sua voz perfeitamente. Qual sua reação?",
    alternativas: [
      { texto: "Isso pode ser perigoso!", correto: true },
      { texto: "Isso pode ajudar em dublagens e acessibilidade.", correto: false }
    ]
  },
  {
    enunciado: "A IA agora pode escrever textos, fazer resumos e resolver tarefas. Você acha isso...",
    alternativas: [
      { texto: "Uma ameaça ao aprendizado.", correto: false },
      { texto: "Uma ferramenta de apoio ao estudo.", correto: true }
    ]
  }
];

let atual = 0;
let pontuacao = 0;

btnIniciar.addEventListener("click", () => {
  telaInicial.classList.add("oculto");
  telaQuiz.classList.remove("oculto");
  atual = 0;
  pontuacao = 0;
  mostraPergunta();
});

btnReiniciar.addEventListener("click", () => {
  telaFinal.classList.add("oculto");
  telaInicial.classList.remove("oculto");
});

btnToggleTema.addEventListener("click", () => {
  document.body.classList.toggle("escuro");
  if (document.body.classList.contains("escuro")) {
    btnToggleTema.textContent = "Modo Claro";
  } else {
    btnToggleTema.textContent = "Modo Escuro";
  }
});

function mostraPergunta() {
  caixaAlternativas.innerHTML = "";
  textoResultado.textContent = "";
  const perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;

  perguntaAtual.alternativas.forEach((alternativa) => {
    const botaoAlternativa = document.createElement("button");
    botaoAlternativa.textContent = alternativa.texto;
    botaoAlternativa.disabled = false;

    botaoAlternativa.addEventListener("click", () => {
      // Desabilita todos botões após escolher uma alternativa
      const botoes = caixaAlternativas.querySelectorAll("button");
      botoes.forEach(btn => btn.disabled = true);

      if (alternativa.correto) {
        botaoAlternativa.classList.add("correto");
        pontuacao++;
      } else {
        botaoAlternativa.classList.add("errado");
        // Marcar a alternativa correta para o usuário ver
        botoes.forEach(btn => {
          if (btn.textContent === perguntaAtual.alternativas.find(a => a.correto).texto) {
            btn.classList.add("correto");
          }
        });
      }

      // Espera 1.5s para mostrar próxima pergunta ou resultado
      setTimeout(() => {
        atual++;
        if (atual < perguntas.length) {
          mostraPergunta();
        } else {
          mostraResultado();
        }
      }, 1500);
    });

    caixaAlternativas.appendChild(botaoAlternativa);
  });
}

function mostraResultado() {
  telaQuiz.classList.add("oculto");
  telaFinal.classList.remove("oculto");
  textoResultado.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
}
