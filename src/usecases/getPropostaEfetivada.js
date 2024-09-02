// src/application/use_cases/createPropostaEfetivada.js
const PropostaEfetivadaRepository = require('../repositories/PropostaEfetivadaRepository');
const PropostaEfetivadaFiltro = require('../entities/PropostaEfetivadaFiltro');

function getPropostaEfetivada(data, callback) {
  const { startDate, endDate, loja } = data;

  const filtro = new PropostaEfetivadaFiltro(startDate, endDate, loja);

  PropostaEfetivadaRepository.findWithFilters(filtro, callback);
}

module.exports = getPropostaEfetivada;
