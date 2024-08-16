import React, { useEffect, useState } from "react";
import "../CurrencyConverter/CurrencyConverter.css";
import axios from "axios";

const CurrencyConverter = () => {
  const [rates, setRates] = useState(""); /* Taxas */
  const [fromCurrency, setFromCurrency] = useState("USD"); /* De */
  const [toCurrency, setToCurrency] = useState("EUR"); /* Para */
  const [amount, setAmount] = useState(0); /* Quantidade */
  const [convertedAmount, setConvertedAmount] =
    useState(null); /* valor da conversao */

  useEffect(() => {
    axios
      .get(
        "https://v6.exchangerate-api.com/v6/33332548d2112393d3992002/latest/USD"
      )
      .then((response) => {
        setRates(response.data.conversion_rates);
      })
      .catch((error) => {
        console.log("ocorreu um erro", error);
      });
  }, []);

  useEffect(() => {
      if(rates) {
        const rateFrom = rates[fromCurrency] || 0
        const rateTo = rates[toCurrency] || 0
        setConvertedAmount(((amount/rateFrom) * rateTo).toFixed(2))

      }
  }, [amount , rates , fromCurrency , toCurrency])

  if (!rates) {
    return (
      <h3>Carregando</h3>
    )
  }

  return (
    <div className="converter">
      <h2>Conversor de Moedas</h2>
      <input type="number" placeholder="Digite o valor .." value={amount} onChange={(e) => setAmount(e.target.value)} />
      <span>Selecione a Moeda</span>
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} >
        {Object.keys(rates).map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
      <span>Converta Para </span>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} >
        {Object.keys(rates).map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
      <h3>
        {convertedAmount} {toCurrency}
      </h3>
      <p>
        {amount} {fromCurrency} valem {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

export default CurrencyConverter;
