const transactionRange = document.getElementById("transactionRange");
const sliderValue = document.getElementById("sliderValue");
const contasSelect = document.getElementById("contasSelect");
const cnpjsSelect = document.getElementById("cnpjsSelect");
const consultorToggle = document.getElementById("consultorToggle");
const powerbiToggle = document.getElementById("powerbiToggle");
const precoTotal = document.getElementById("precoTotal");
const volumeInfo = document.getElementById("volumeInfo");
const sliderLabels = document.getElementById("sliderLabels");

function updateSliderBackground() {
  const value = Number(transactionRange.value);
  const min = Number(transactionRange.min);
  const max = Number(transactionRange.max);
  const percentage = ((value - min) / (max - min)) * 100;
  transactionRange.style.background = `linear-gradient(to right, #28c76f 0%, #28c76f ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
}

function gerarNumerosSlider() {
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

  let total = 297;
  total += (contas - 1) * 100;
  total += (cnpjs - 1) * 250;
  if (consultor) total += 1200;
  if (powerbi) total += 250;

  sliderValue.textContent = `${transacoes} transações/mês`;
  volumeInfo.textContent = `${transacoes} transações/mês`;
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