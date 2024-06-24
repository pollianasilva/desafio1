const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root', // Substitua pela sua senha do MySQL
    database: 'clinica'
};

// Criação da conexão com o banco de dados MySQL
const connection = mysql.createConnection(dbConfig);

// Conectar ao banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conexão bem-sucedida com o banco de dados MySQL.');
});

// Configuração do servidor Express
const app = express();
const port = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rotas para operações CRUD com pacientes

// Criar um novo paciente
app.post('/pacientes', (req, res) => {
    const { nome, telefone } = req.body;
    const query = 'INSERT INTO pacientes (nome, telefone) VALUES (?, ?)';
    connection.query(query, [nome, telefone], (err, results) => {
        if (err) {
            console.error('Erro ao inserir paciente:', err.stack);
            res.status(500).send('Erro ao inserir paciente');
            return;
        }
        res.status(201).send(`Paciente inserido com sucesso, ID: ${results.insertId}`);
    });
});

// Listar todos os pacientes
app.get('/pacientes', (req, res) => {
    const query = 'SELECT * FROM pacientes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pacientes:', err.stack);
            res.status(500).send('Erro ao buscar pacientes');
            return;
        }
        res.status(200).json(results);
    });
});

// Atualizar um paciente pelo ID
app.put('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    const query = 'UPDATE pacientes SET nome = ?, telefone = ? WHERE id = ?';
    connection.query(query, [nome, telefone, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar paciente:', err.stack);
            res.status(500).send('Erro ao atualizar paciente');
            return;
        }
        res.status(200).send(`Paciente com ID: ${id} atualizado com sucesso`);
    });
});

// Deletar um paciente pelo ID
app.delete('/pacientes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM pacientes WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar paciente:', err.stack);
            res.status(500).send('Erro ao deletar paciente');
            return;
        }
        res.status(200).send(`Paciente com ID: ${id} deletado com sucesso`);
    });
});

// Rotas para operações com consultas

// Criar uma nova consulta
app.post('/consultas', (req, res) => {
    const { paciente_id, data, hora, especialidade_id } = req.body;
    const query = 'INSERT INTO consultas (paciente_id, data, hora, especialidade_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [paciente_id, data, hora, especialidade_id], (err, results) => {
        if (err) {
            console.error('Erro ao inserir consulta:', err.stack);
            res.status(500).send('Erro ao inserir consulta');
            return;
        }
        res.status(201).send(`Consulta inserida com sucesso, ID: ${results.insertId}`);
    });
});

// Listar todas as consultas
app.get('/consultas', (req, res) => {
    const query = `
        SELECT consultas.id, pacientes.nome AS paciente, consultas.data, consultas.hora, especialidades.nome AS especialidade 
        FROM consultas 
        JOIN pacientes ON consultas.paciente_id = pacientes.id 
        JOIN especialidades ON consultas.especialidade_id = especialidades.id
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar consultas:', err.stack);
            res.status(500).send('Erro ao buscar consultas');
            return;
        }
        res.status(200).json(results);
    });
});

// Atualizar uma consulta pelo ID
app.put('/consultas/:id', (req, res) => {
    const { id } = req.params;
    const { paciente_id, data, hora, especialidade_id } = req.body;
    const query = 'UPDATE consultas SET paciente_id = ?, data = ?, hora = ?, especialidade_id = ? WHERE id = ?';
    connection.query(query, [paciente_id, data, hora, especialidade_id, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar consulta:', err.stack);
            res.status(500).send('Erro ao atualizar consulta');
            return;
        }
        res.status(200).send(`Consulta com ID: ${id} atualizada com sucesso`);
    });
});

// Deletar uma consulta pelo ID
app.delete('/consultas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM consultas WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar consulta:', err.stack);
            res.status(500).send('Erro ao deletar consulta');
            return;
        }
        res.status(200).send(`Consulta com ID: ${id} deletada com sucesso`);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
