const express = require('express');
const router = express.Router();

// Dados temporários para demonstração
let funcionarios = [];
let registros = [];

// Rota para cadastrar funcionário
router.post('/cadastrar', (req, res) => {
    const nome = req.body.get('nome');
    const id = funcionarios.length + 1;
    funcionarios.push({ id, nome });
    res.json({ message: `Funcionário ${nome} cadastrado com sucesso!` });
});

// Rota para registrar ponto
router.post('/registrar-ponto', (req, res) => {
    const { image } = req.body;
    // Lógica para reconhecimento facial (ex: integração com Face API)
    // Aqui estamos simulando o reconhecimento
    const reconhecido = true;
    const nome = 'Funcionário Exemplo'; // Nome obtido pelo reconhecimento facial

    if (reconhecido) {
        const registro = {
            nome,
            data: new Date(),
            tipo: 'entrada' // Pode ser 'entrada', 'saída almoço', 'retorno almoço', 'saída'
        };
        registros.push(registro);
        res.json({ message: `Ponto registrado para ${nome}` });
    } else {
        res.json({ message: 'Reconhecimento facial falhou' });
    }
});

// Rota para gerar e baixar relatório
router.get('/relatorio', (req, res) => {
    const csv = registros.map(r => `${r.nome},${r.data},${r.tipo}`).join('\n');
    fs.writeFileSync(path.join(__dirname, '..', 'relatorio.csv'), csv);
    res.download(path.join(__dirname, '..', 'relatorio.csv'));
});

module.exports = router;
