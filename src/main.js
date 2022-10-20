import IMask from "imask";
import "./css/index.css";

// Cards Background & Logo
const creditCard = document.querySelector(".cc");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

// Form Fields
const form = document.querySelector("form");
const cardNumberInput = document.querySelector("#card-number");
const cardHolderInput = document.querySelector("#card-holder");
const expirationDateInput = document.querySelector("#expiration-date");
const cvcInput = document.querySelector("#security-code");

// Card Fields
const cardNumber = document.querySelector(".cc-number");
const cardHolder = document.querySelector(".cc-holder .value");
const expirationDate = document.querySelector(".cc-expiration .value");
const cvc = document.querySelector(".cc-security .value");

function setCardType(cardType) {
  creditCard.style.backgroundImage = `url(./bg-${cardType}.svg)`;
  ccLogo.setAttribute("src", `logo-${cardType}.svg`);
}

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: "diners",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "american express",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: "discover",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:2131|1800|35\d{3})\d{11}/,
      cardtype: "jcb",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  },
};

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
};

const cvcInputPattern = { mask: "0000" };

const cardNumberMasked = IMask(cardNumberInput, cardNumberPattern);
const expirationDateMasked = IMask(expirationDateInput, expirationDatePattern);
const cvcInputMasked = IMask(cvcInput, cvcInputPattern);

// Listeners
form.addEventListener("submit", e => e.preventDefault());

cardHolderInput.addEventListener("input", () => {
  cardHolder.innerText = cardHolderInput.value.length > 0 ? cardHolderInput.value : "FULANO DA SILVA";
})

cvcInputMasked.on("accept", () => {
  cvc.innerText = cvcInputMasked.value.length > 0 ? cvcInputMasked.value : "123"
})

expirationDateMasked.on("accept", () => {
  expirationDate.innerText = expirationDateMasked.value.length > 0 ? expirationDateMasked.value : "02/32"
})

cardNumberMasked.on("accept", () => {
  cardNumber.innerText = cardNumberMasked.value.length > 0 ? cardNumberMasked.value : "1234 5678 9012 3456"
  
  let type = cardNumberMasked.masked.currentMask.cardtype

  console.log(`CARTÃO: ${type}`)
  setCardType(type)
})

globalThis.setCardType = setCardType;