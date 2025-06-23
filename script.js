// Referência aos elementos do HTML
const caixaPerguntas = document.querySelector(".caixa-perguntas h2");
const alternativa1 = document.getElementById("alternativa1");
const alternativa2 = document.getElementById("alternativa2");
const textoResultado = document.getElementById("resultado");

// Lista de perguntas
const perguntas = [
  {
    enunciado: "A IA deve substituir trabalhos repetitivos?",
    alternativas: ["Sim, aumenta a eficiência", "Não, pode causar desemprego"]
  },
  {
    enunciado: "Você confiaria em um diagnóstico feito por IA?",
    alternativas: ["Sim, com base em dados precisos", "Não, prefiro um médico humano"]
  },
  {
    enunciado: "A IA deveria ter limites éticos programados?",
    alternativas: ["Sim, para evitar abusos", "Não, isso restringe o progresso"]
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respostasUsuario = [];

// Criando botão de reinício dinamicamente
const botaoRecomecar = document.createElement("button");
botaoRecomecar.textContent = "Recomeçar";
botaoRecomecar.classList.add("botao");
botaoRecomecar.style.marginTop = "20px";
botaoRecomecar.style.display = "none"; // escondido até o final
document.querySelector(".caixa-resultado").appendChild(botaoRecomecar);

botaoRecomecar.addEventListener("click", () => {
  // Reiniciar variáveis
  perguntaAtual = 0;
  pontuacao = 0;
  respostasUsuario = [];
  botaoRecomecar.style.display = "none";
  mostrarPergunta();
});

function mostrarPergunta() {
  textoResultado.textContent = "";
  const pergunta = perguntas[perguntaAtual];
  caixaPerguntas.textContent = pergunta.enunciado;
  alternativa1.textContent = pergunta.alternativas[0];
  alternativa2.textContent = pergunta.alternativas[1];
  alternativa1.style.display = "inline-block";
  alternativa2.style.display = "inline-block";
}

function mostrarResultadoEscolha(resposta) {
  textoResultado.textContent = `Você escolheu: ${resposta}`;
  respostasUsuario.push(resposta);

  // Conta ponto se a resposta começar com "Sim"
  if (resposta.startsWith("Sim")) {
    pontuacao++;
  }

  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    setTimeout(mostrarPergunta, 1500);
  } else {
    setTimeout(mostrarPerfil, 1500);
  }
}

function mostrarPerfil() {
  caixaPerguntas.textContent = "Seu Perfil de Usuário de IA";
  alternativa1.style.display = "none";
  alternativa2.style.display = "none";

  let perfilTexto = "";

  if (pontuacao === perguntas.length) {
    perfilTexto = `
      Você é um visionário da tecnologia! 🤖<br>
      Total confiança na IA e acredita no progresso sem limites.<br>
      Pontuação: ${pontuacao}/${perguntas.length}
    `;
  } else if (pontuacao === 0) {
    perfilTexto = `
      Você é um defensor da consciência humana! ⚖️<br>
      Preza por limites e ética nas decisões automatizadas.<br>
      Pontuação: ${pontuacao}/${perguntas.length}
    `;
  } else {
    perfilTexto = `
      Você busca equilíbrio entre IA e humanidade. 🔍<br>
      Cauteloso, mas aberto a novas possibilidades.<br>
      Pontuação: ${pontuacao}/${perguntas.length}
    `;
  }

  textoResultado.innerHTML = perfilTexto;
  botaoRecomecar.style.display = "inline-block";
}

// Eventos dos botões
alternativa1.addEventListener("click", () => {
  mostrarResultadoEscolha(alternativa1.textContent);
});

alternativa2.addEventListener("click", () => {
  mostrarResultadoEscolha(alternativa2.textContent);
});

// Início do quiz
mostrarPergunta();
