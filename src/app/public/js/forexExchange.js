const currenciesList = ["ARS", "USD", "CLP", "BRL", "UYU"];

const createCurrenciesList = (defaultCurrency = "ARS") => {
  let tmp = "";

  currenciesList.forEach((currency) => {
    if (currency === defaultCurrency)
      return (tmp = tmp.concat(
        `<option selected value="${currency}">${currency}</option>`,
      ));
    return (tmp = tmp.concat(
      `<option value="${currency}">${currency}</option>`,
    ));
  });

  return tmp;
};

document.getElementById("from_currency").innerHTML = createCurrenciesList();
document.getElementById("to_currency").innerHTML = createCurrenciesList("USD");

const getCurrencies = async () => {
  const tmp = await Promise.all(
    currenciesList.map((currency) => {
      return new Promise((res, rej) => {
        fetch(`https://open.er-api.com/v6/latest/${currency}`)
          .then((ans) => ans.json())
          .then((ans) => {
            res({ [currency]: ans.rates });
          })
          .catch((err) => rej(err));
      });
    }),
  );
  return tmp.reduce(
    (obj, item) =>
      Object.assign(obj, {
        [Object.keys(item)[0]]: Object.values(item)[0],
      }),
    {},
  );
};

const rates = await getCurrencies();

const calculateExchange = () => {
  const input_currency = document.getElementById("from_currency").value;
  const input_amount = document.getElementById("give_currency").value;
  const output_currency = document.getElementById("to_currency").value;
  const output_amount = rates[input_currency][output_currency] * input_amount;

  document.getElementById("receive_currency").value = output_amount;
};

const exchangeCalculatorDOM = document.getElementById("exchange-calculator");

exchangeCalculatorDOM.addEventListener("input", calculateExchange);
