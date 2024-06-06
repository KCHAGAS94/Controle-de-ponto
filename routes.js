const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Dados temporários para demonstração
let funcionarios = [];
let registros = [];

// Rota para cadastrar funcionário
router.post('/cadastrar', (req, res) => {
    const codigo = req.body.get('codigo');
    const nome = req.body.get('nome');
    funcionarios.push({ codigo, nome });
    res.json({ message: `Funcionário ${nome} cadastrado com sucesso!` });
});

// Rota para registrar ponto
router.post('/registrar-ponto', (req, res) => {
    const { codigo } = req.body;
    const funcionario = funcionarios.find(f => f.codigo === codigo);
    if (funcionario) {
        const dataHora = new Date().toLocaleString();
        const registro = {
            codigo,
            nome: funcionario.nome,
            dataHora,
            tipo: 'entrada' // Pode ser 'entrada', 'saída almoço', 'retorno almoço', 'saída'
        };
        registros.push(registro);
        res.json({ nome: funcionario.nome, mensagem: 'Ponto registrado', dataHora });
    } else {
        res.json({ mensagem: 'Funcionário não encontrado' });
    }
});

// Rota para gerar e baixar relatório
router.get('/relatorio', (req, res) => {
    const csv = registros.map(r => `${r.nome},${r.dataHora},${r.tipo}`).join('\n');
    fs.writeFileSync(path.join(__dirname, '..', 'relatorio.csv'), csv);
    res.download(path.join(__dirname, '..', 'relatorio.csv'));
});

module.exports = router;
