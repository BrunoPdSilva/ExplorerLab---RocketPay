import IMask from "imask";
import "./css/index.css";

const creditCard = document.querySelector(".cc");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

//Form Fields
const cardNumber = document.querySelector("#card-number");
const cvcInput = document.querySelector("#security-code");
const expirationDate = document.querySelector("#expiration-date");

function setCardType(cardType) {
  creditCard.style.backgroundImage = `url(./bg-${cardType}.svg)`;
  ccLogo.setAttribute("src", `logo-${cardType}.svg`);
}

setCardType("cielo");

globalThis.setCardType = setCardType;

const cvcInputPattern = { mask: "0000" };
const cvcInputMasked = IMask(cvcInput, cvcInputPattern);

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
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: (append, dynamicMask) => {
    const number = (dynamicMask.value + append).replace(/\D/g, "");
    const foundMask = dynamicMask.compiledMasks.find(item => {
      return number.match(item.regex);
    });

    console.log(foundMask);

    return foundMask;
  },
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);