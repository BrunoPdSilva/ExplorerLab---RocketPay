import "./css/index.css";

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

const colors = {
  visa: ["#436D99", "#2D57F2"],
  mastercard: ["#DF6F29", "#C69347"],
  default: ["black", "gray"],
};

function setCardType(cardType) {
  ccBgColor01.setAttribute("fill", colors[cardType][0]);
  ccBgColor02.setAttribute("fill", colors[cardType][1]);
  ccLogo.setAttribute("src", `cc-${cardType}.svg`);
}

setCardType("visa");

globalThis.setCardType = setCardType;