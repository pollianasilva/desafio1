# Enunciado 1 - Exercício de Programação
[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Montserrat&size=30&pause=1000&color=ff69b4&random=false&width=435&lines=Clínica+de+Consultas+Ágil)](https://git.io/typing-svg)<br>
![Aceleradora Ágil](https://img.shields.io/badge/Aceleradora%20Ágil-ff69b4?style=for-the-badge&logoColor=white) 

- Video Demostrativo:
  

https://github.com/pollianasilva/desafio1/assets/140568849/2377f92f-f57a-495a-a21d-3fa316b84146

## Instruções de Configuração: 
1. Crie um novo banco de dados no MySQL e também configure sua senha no arquivo server.js
```sql
CREATE DATABASE clinica;
USE clinica;

CREATE TABLE IF NOT EXISTS pacientes (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
telefone VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS especialidades (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO especialidades (nome) VALUES
('Cardiologia'),
('Dermatologia'),
('Endocrinologia'),
('Gastroenterologia'),
('Neurologia'),
('Oftalmologia'),
('Ortopedia'),
('Pediatria'),
('Psiquiatria'),
('Urologia');

CREATE TABLE IF NOT EXISTS consultas (
id INT AUTO_INCREMENT PRIMARY KEY,
paciente_id INT,
data DATE,
hora TIME,
especialidade_id INT,
FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
FOREIGN KEY (especialidade_id) REFERENCES especialidades(id)
);
```

2. Instale as dependências necessárias no terminal do VS Code: 
```Terminal
npm install express mysql2 body-parser
```
3. Inicie o servidor para conectar ao banco de dados:
```Terminal
node server.js
```
4. Abra no localhost: http://localhost:3000/
## Descrição Exercício:

Você foi contratado para desenvolver um sistema de clínica de consultas no seu bairro.
Seus vizinhos não estão se sentindo muito bem e gostariam de agendar consultas. Para
isso, você deverá desenvolver as seguintes funcionalidades, que devem ser apresentadas
para o usuário através de um menu via terminal:

**Cadastrar um paciente:** O programa solicita o nome e o telefone do usuário. Após o
cadastro, exibe a mensagem "Paciente cadastrado com sucesso" e adiciona o paciente à
lista de Pacientes Cadastrados. Em seguida, retorna ao menu principal.

**Marcações de consultas**: Ao selecionar essa opção, o programa exibe uma lista
numerada dos pacientes cadastrados. Ao escolher o número correspondente a um
paciente, solicita o dia, a hora e a especialidade desejada para a consulta. Após o envio
desses dados, o agendamento é adicionado à lista de agendamentos e o programa
retorna ao menu principal.

**Cancelamento de consultas:** Ao selecionar essa opção, o programa exibe uma lista
numerada dos agendamentos existentes. Ao escolher o número correspondente ao
agendamento que deseja remarcar, é exibida uma mensagem informando a data, a hora e
a especialidade da consulta agendada. Nesse momento, o usuário pode optar por
cancelar a consulta. Ao confirmar o cancelamento, o agendamento é removido da lista e o
programa retorna ao menu principal.

**Sair:** O programa encerra a execução.

**Tratamento de erros:**
- O paciente não pode ser cadastrado mais de uma vez. Para evitar duplicidade,
garanta que o número de telefone seja diferente para cada cadastro. Caso ocorra
uma tentativa de cadastro duplicado, exiba a mensagem "Paciente já cadastrado!"
e retorne ao menu principal.
- Pacientes não podem marcar consultas em dias e horários já agendados. Verifique
se a data e a hora selecionadas estão disponíveis antes de realizar o
agendamento.
- Consultas não podem ser marcadas antes da data atual. Certifique-se de que o
usuário não possa agendar consultas retroativas.

## Extra:

Seria muito legal se você conseguisse implementar uma maneira de armazenar as
informações dos pacientes de forma que eles continuassem existindo mesmo após o
usuário sair do sistema. Que funcionasse como uma espécie de “banco de dados”. ;)

<div style="display: inline_block" align = "center"><br>
FORAM UTILIZADOS:
<img align="center" alt="Polly-VS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg">  
<img align="center" alt="Polly-Html" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg">
<img align="center" alt="Ste-JS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg"> 
<img align="center" alt="Polly-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg">
<img align="center" alt="Polly-bootstrap" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"> 
<img align="center" alt="Ste-Mysql" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"> 
<img align="center" alt="Ste-Nodejs" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
</div>
<br><br>

![/](https://img.shields.io/badge/%2F-ff1493?style=for-the-badge) ![thoughtworks](https://img.shields.io/badge/thoughtworks-1e3a5f?style=for-the-badge) 
![PucRS](https://img.shields.io/badge/PucRS-83d0f5?style=for-the-badge&logo=chipperci&logoColor=white) 
![Centro da Inovação da Escola Politécnica](https://img.shields.io/badge/Centro%20da%20Inovação%20da%20Escola%20Politécnica-4db8ff?style=for-the-badge) 
![Tecnopuc](https://img.shields.io/badge/Tecnopuc-808080?style=for-the-badge) 
![Rede Globo](https://img.shields.io/badge/Rede%20Globo-fd5e02?style=for-the-badge)
