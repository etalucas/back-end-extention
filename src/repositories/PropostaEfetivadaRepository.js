// src/infrastructure/repositories/PropostaEfetivadaRepository.js
const db = require('../data/database');

class PropostaEfetivadaRepository {
  save(propostaEfetivada, callback) {
    const { idDoAnalista, valorPremio, data, loja } = propostaEfetivada;

    const query = `
      INSERT INTO propostas_efetivadas (idDoAnalista, valorPremio, data, loja)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [idDoAnalista, valorPremio, data, loja], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID });
      }
    });
  }

  findWithFilters({ startDate, endDate, loja }, callback) {
    let query = `
      SELECT p.idDoAnalista, a.nome AS analistaNome, p.valorPremio, p.data, p.loja
      FROM propostas_efetivadas p
      JOIN analistas a ON p.idDoAnalista = a.id
      WHERE 1=1
    `;
    const params = [];

    if (startDate) {
      query += ` AND p.data >= ?`;
      params.push(startDate);
    }
    if (endDate) {
      query += ` AND p.data <= ?`;
      params.push(endDate);
    }
    if (loja) {
      query += ` AND p.loja = ?`;
      params.push(loja);
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }
}

module.exports = new PropostaEfetivadaRepository();
