const transactionRange = document.getElementById("transactionRange");
const sliderValue = document.getElementById("sliderValue");
const contasSelect = document.getElementById("contasSelect");
const cnpjsSelect = document.getElementById("cnpjsSelect");
const consultorToggle = document.getElementById("consultorToggle");
const powerbiToggle = document.getElementById("powerbiToggle");
const precoTotal = document.getElementById("precoTotal");
const volumeInfo = document.getElementById("volumeInfo");
const planoNomeTopo = document.getElementById("planoNomeTopo");
const planoNome = document.getElementById("planoNome");
const precoBase = document.getElementById("precoBase");
const volumeInfoLine = document.getElementById("volumeInfoLine");
const volumeInfoLabel = document.getElementById("volumeInfoLabel");
const contasInfoLine = document.getElementById("contasInfoLine");
const contasInfoLabel = document.getElementById("contasInfoLabel");
const contasInfoStatus = document.getElementById("contasInfoStatus");
const cnpjsInfoLine = document.getElementById("cnpjsInfoLine");
const cnpjsInfoLabel = document.getElementById("cnpjsInfoLabel");
const cnpjsInfoStatus = document.getElementById("cnpjsInfoStatus");

function updateSliderBackground() {
  const value = Number(transactionRange.value);
  const min = Number(transactionRange.min);
  const max = Number(transactionRange.max);
  const percentage = ((value - min) / (max - min)) * 100;
  transactionRange.style.background = `linear-gradient(to right, #28c76f 0%, #28c76f ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
}

function gerarNumerosSlider() {
  const sliderLabels = document.getElementById("sliderLabels");
  sliderLabels.innerHTML = "";
  const min = Number(transactionRange.min);
  const max = Number(transactionRange.max);
  const step = Number(transactionRange.step);

  for (let i = min; i <= max; i += step) {
    if (i % 100 === 0 || i === max) {
      const label = document.createElement("span");
      label.textContent = i === max ? "500+" : i;
      const percentage = ((i - min) / (max - min)) * 100;
      label.style.position = "absolute";
      label.style.left = `${percentage}%`;
      label.style.transform = "translateX(-50%)";
      sliderLabels.appendChild(label);
    }
  }
}

function calcularTotal() {
  const transacoes = Number(transactionRange.value);
  const contas = Number(contasSelect.value);
  const cnpjs = Number(cnpjsSelect.value);
  const consultor = consultorToggle.checked;
  const powerbi = powerbiToggle.checked;

  let plano = "Essencial";
  let precoBaseValor = 400;
  let transacoesInclusas = 50;
  let contasInclusas = 1;

  if (transacoes >= 200) {
    plano = "Controle";
    precoBaseValor = 950;
    transacoesInclusas = 200;
    contasInclusas = 2;
  }

  sliderValue.textContent = `${transacoes} transações/mês`;
  volumeInfoLabel.textContent = `${transacoesInclusas} transações/mês`;
  planoNomeTopo.textContent = plano;
  planoNome.textContent = plano;
  precoBase.textContent = `R$ ${precoBaseValor}`;

  let total = precoBaseValor;
  const itensExtras = document.getElementById("itensExtras");
  itensExtras.innerHTML = "";
  // Transações
  if (transacoes <= transacoesInclusas) {
    volumeInfoLabel.textContent = `${transacoesInclusas} transações/mês`;
    volumeInfoStatus.textContent = "Inclusa";
    volumeInfoStatus.className = "incluido";
  } else {
    const blocos = Math.ceil((transacoes - transacoesInclusas) / 50);
    const valorExtras = blocos * 200;
    total += valorExtras;
    volumeInfoLabel.textContent = `${transacoes} transações (${transacoesInclusas} inclusas)`;
    volumeInfoStatus.textContent = `R$ ${valorExtras}`;
    volumeInfoStatus.className = ""; // remove "incluido"
  }

  // Contas
  if (contas <= contasInclusas) {
    contasInfoLabel.textContent = `${contasInclusas} conta${contasInclusas > 1 ? 's' : ''} bancária${contasInclusas > 1 ? 's' : ''}`;
    contasInfoStatus.textContent = "Inclusa";
    contasInfoStatus.className = "incluido";
  } else {
    const extras = contas - contasInclusas;
    const valor = extras * 100;
    total += valor;
    contasInfoLabel.textContent = `${contas} contas bancárias (${contasInclusas} inclusa${contasInclusas > 1 ? 's' : ''})`;
    contasInfoStatus.textContent = `R$ ${valor}`;
    contasInfoStatus.className = "";
  }

  // CNPJs
  if (cnpjs <= 1) {
    cnpjsInfoLabel.textContent = `1 CNPJ`;
    cnpjsInfoStatus.textContent = "Incluso";
    cnpjsInfoStatus.className = "incluido";
  } else {
    const extras = cnpjs - 1;
    const valor = extras * 250;
    total += valor;
    cnpjsInfoLabel.textContent = `${cnpjs} CNPJs (1 incluso)`;
    cnpjsInfoStatus.textContent = `R$ ${valor}`;
    cnpjsInfoStatus.className = "";
  }

  /*
  // Cálculo de transações extras
  const transacoesExtras = Math.max(0, transacoes - transacoesInclusas);
  if (transacoesExtras > 0) {
    const blocos = Math.ceil(transacoesExtras / 50);
    const valorExtras = blocos * 200;
    total += valorExtras;
    const linhaExtras = document.createElement("div");
    linhaExtras.className = "preco-linha";
    linhaExtras.innerHTML = `<span>${transacoes} transações (${transacoesInclusas} inclusas)</span><span>R$ ${valorExtras}</span>`;
    itensExtras.appendChild(linhaExtras);
  }


  // Contas adicionais
  if (contas > contasInclusas) {
    const extras = contas - contasInclusas;
    const valor = extras * 100;
    total += valor;
    const linha = document.createElement("div");
    linha.className = "preco-linha";
    linha.innerHTML = `<span>${contas} contas bancárias (${contasInclusas} inclusas)</span><span>R$ ${valor}</span>`;
    itensExtras.appendChild(linha);
  }
  
  // CNPJs adicionais
  if (cnpjs > 1) {
    const extras = cnpjs - 1;
    const valor = extras * 250;
    total += valor;
    const linha = document.createElement("div");
    linha.className = "preco-linha";
    linha.innerHTML = `<span>${cnpjs} CNPJs (1 incluso)</span><span>R$ ${valor}</span>`;
    itensExtras.appendChild(linha);
  }
  */

  // Consultor dedicado
  if (consultor) {
    total += 1200;
    const linha = document.createElement("div");
    linha.className = "preco-linha";
    linha.innerHTML = `<span>Consultor dedicado</span><span>R$ 1200</span>`;
    itensExtras.appendChild(linha);
  }
  
  // Integração Power BI
  if (powerbi) {
    total += 250;
    const linha = document.createElement("div");
    linha.className = "preco-linha";
    linha.innerHTML = `<span>Integração com Power BI</span><span>R$ 250</span>`;
    itensExtras.appendChild(linha);
  }

  precoTotal.textContent = `R$ ${total}/mês`;
  updateSliderBackground();
}

transactionRange.addEventListener("input", calcularTotal);
contasSelect.addEventListener("change", calcularTotal);
cnpjsSelect.addEventListener("change", calcularTotal);
consultorToggle.addEventListener("change", calcularTotal);
powerbiToggle.addEventListener("change", calcularTotal);

// Inicializa
calcularTotal();
gerarNumerosSlider();