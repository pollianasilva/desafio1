// Função para cadastrar um paciente
function cadastrarPaciente(event) {
    event.preventDefault(); // Evita que o formulário recarregue a página

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    fetch('http://localhost:3000/pacientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, telefone }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Resposta do servidor:', data);
        document.getElementById('cadastroMessage').textContent = data;
        // Após cadastrar, atualiza a lista de pacientes
        listarPacientes();
    })
    .catch(error => {
        console.error('Erro ao cadastrar paciente:', error);
        document.getElementById('cadastroMessage').textContent = 'Erro ao cadastrar paciente.';
    });
}

// Função para listar pacientes
function listarPacientes() {
    fetch('http://localhost:3000/pacientes')
    .then(response => response.json())
    .then(data => {
        const selectPaciente = document.getElementById('paciente');
        selectPaciente.innerHTML = '<option value="">Selecione o Paciente</option>';
        data.forEach(paciente => {
            selectPaciente.innerHTML += `<option value="${paciente.id}">${paciente.nome} - ${paciente.telefone}</option>`;
        });
    })
    .catch(error => {
        console.error('Erro ao listar pacientes:', error);
    });
}

// Função para listar especialidades com IDs de 1 a 10 por nomes específicos
function listarEspecialidades() {
    const especialidades = [
        { id: 1, nome: "Cardiologia" },
        { id: 2, nome: "Dermatologia" },
        { id: 3, nome: "Endocrinologia" },
        { id: 4, nome: "Gastroenterologia" },
        { id: 5, nome: "Neurologia" },
        { id: 6, nome: "Oftalmologia" },
        { id: 7, nome: "Ortopedia" },
        { id: 8, nome: "Pediatria" },
        { id: 9, nome: "Psiquiatria" },
        { id: 10, nome: "Urologia" }
    ];

    const selectEspecialidade = document.getElementById('especialidade');
    selectEspecialidade.innerHTML = '<option value="">Selecione a Especialidade</option>';

    especialidades.forEach(especialidade => {
        selectEspecialidade.innerHTML += `<option value="${especialidade.id}">${especialidade.nome}</option>`;
    });
}



// Função para marcar consulta
function marcarConsulta(event) {
    event.preventDefault(); // Evita que o formulário recarregue a página

    const pacienteId = document.getElementById('paciente').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const especialidadeId = document.getElementById('especialidade').value;

    fetch('http://localhost:3000/consultas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paciente_id: pacienteId, data, hora, especialidade_id: especialidadeId }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Resposta do servidor:', data);
        document.getElementById('marcacaoMessage').textContent = data;
        // Após marcar a consulta, atualiza a lista de consultas
        listarConsultas();
    })
    .catch(error => {
        console.error('Erro ao marcar consulta:', error);
        document.getElementById('marcacaoMessage').textContent = 'Erro ao marcar consulta.';
    });
}

// Função para listar consultas agendadas
function listarConsultas() {
    fetch('http://localhost:3000/consultas')
    .then(response => response.json())
    .then(data => {
        const selectConsulta = document.getElementById('agendamento');
        selectConsulta.innerHTML = '<option value="">Selecione o Agendamento</option>';
        data.forEach(consulta => {
            selectConsulta.innerHTML += `<option value="${consulta.id}">${consulta.paciente} - ${consulta.data} ${consulta.hora} - ${consulta.especialidade}</option>`;
        });
    })
    .catch(error => {
        console.error('Erro ao listar consultas:', error);
    });
}

// Função para cancelar consulta
function cancelarConsulta(event) {
    event.preventDefault(); // Evita que o formulário recarregue a página

    const idConsulta = document.getElementById('agendamento').value;

    fetch(`http://localhost:3000/consultas/${idConsulta}`, {
        method: 'DELETE',
    })
    .then(response => response.text())
    .then(data => {
        console.log('Resposta do servidor:', data);
        document.getElementById('cancelamentoMessage').textContent = data;
        // Após cancelar, atualiza a lista de consultas
        listarConsultas();
    })
    .catch(error => {
        console.error('Erro ao cancelar consulta:', error);
        document.getElementById('cancelamentoMessage').textContent = 'Erro ao cancelar consulta.';
    });
}

// Event Listeners
document.getElementById('cadastroPaciente').addEventListener('submit', cadastrarPaciente);
document.getElementById('marcacaoConsulta').addEventListener('submit', marcarConsulta);
document.getElementById('cancelamentoConsulta').addEventListener('submit', cancelarConsulta);

// Inicialização: listar pacientes, especialidades e consultas ao carregar a página
listarPacientes();
listarEspecialidades();
listarConsultas();

