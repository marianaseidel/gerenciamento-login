const url = "http://localhost:8081/extensions"

function listarTodosRamais() {
    const corpoTabela = document.getElementById("tableBody");
    corpoTabela.innerHTML = "";

    fetch(`${url}/all`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao buscar ramais.");
            }
            return response.json();
        })
        .then((dados) => {
            dados.forEach((ramal) => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${ramal.numero}</td>
                    <td>${ramal.usuarioLogado || "-"}</td>
                    <td>${ramal.status.toLowerCase() === "ativo" ? "Indisponível" : "Disponível"}</td>
                    <td>${ramal.status.toLowerCase() === "ativo" ?
                        `<button data-ramal="${ramal.numero}" data-bs-toggle="modal" data-bs-target="#myModal" title="Deslogar do ramal" class="btn btn-link p-0 m-0 text-danger">
                            <i class="bi bi-telephone-x"></i>
                        </button>` :
                        `<button onclick="logarRamalEspecifico(${Number(ramal.numero)})" title="Logar no ramal" class="btn btn-link p-0 m-0 text-success">
                            <i class="bi bi-telephone"></i>
                        </button>`
                    }</td>
                `;
                corpoTabela.appendChild(linha);
            });
        })
        .catch((error) => {
            console.error(error);
            const linha = document.createElement("tr");
            linha.innerHTML = `<td colspan="4">Erro ao carregar ramais.</td>`;
            corpoTabela.appendChild(linha);
        });
}

function listarRamaisDisponiveis() {
    const corpoTabela = document.getElementById("tableBody");
    corpoTabela.innerHTML = "";

    fetch(`${url}/available-all`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao buscar ramais.");
            }
            return response.json();
        })
        .then((dados) => {
            dados = filtrarPorIntervalo(dados);

            if (dados.length === 0) {
                const linha = document.createElement("tr");
                linha.innerHTML = `<td colspan="4">Nenhum ramal disponível.</td>`;
                corpoTabela.appendChild(linha);
            } else {
                dados.forEach((ramal) => {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${ramal.numero}</td>
                        <td>${ramal.usuarioLogado || "-"}</td>
                        <td>${ramal.status.toLowerCase() === "ativo" ? "Indisponível" : "Disponível"}</td>
                        <td>
                            <button onclick="logarRamalEspecifico(${Number(ramal.numero)})" title="Logar no ramal" class="btn btn-link p-0 m-0 text-success">
                                <i class="bi bi-telephone"></i>
                            </button>
                        </td>
                    `;
                    corpoTabela.appendChild(linha);
                });
            }
        })
        .catch((error) => {
            console.error(error);
            const linha = document.createElement("tr");
            linha.innerHTML = `<td colspan="4">Erro ao carregar ramais.</td>`;
            corpoTabela.appendChild(linha);
        });
}

function listarRamaisIndisponiveis() {
    const corpoTabela = document.getElementById("tableBody");
    corpoTabela.innerHTML = "";

    fetch(`${url}/unavailable-all`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao buscar ramais.");
            }
            return response.json();
        })
        .then((dados) => {
            dados = filtrarPorIntervalo(dados);

            if (dados.length === 0) {
                const linha = document.createElement("tr");
                linha.innerHTML = `<td colspan="4">Nenhum ramal ativo encontrado.</td>`;
                corpoTabela.appendChild(linha);
            } else {
                dados.forEach((ramal) => {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${ramal.numero}</td>
                        <td>${ramal.usuarioLogado || "-"}</td>
                        <td>${ramal.status.toLowerCase() === "ativo" ? "Indisponível" : "Disponível"}</td>
                        <td>
                            <button data-ramal="${ramal.numero}" data-bs-toggle="modal" data-bs-target="#myModal" title="Deslogar do ramal" class="btn btn-link p-0 m-0 text-danger">
                                <i class="bi bi-telephone-x"></i>
                            </button></td>
                        </td>
                    `;
                    corpoTabela.appendChild(linha);
                });
            }
        })
        .catch((error) => {
            console.error(error);
            const linha = document.createElement("tr");
            linha.innerHTML = `<td colspan="4">Erro ao carregar ramais.</td>`;
            corpoTabela.appendChild(linha);
        });
}
listarTodosRamais();
document.getElementById("inativos-tab").addEventListener("click", listarRamaisIndisponiveis);
document.getElementById("ativos-tab").addEventListener("click", listarRamaisDisponiveis);
document.getElementById("todos-tab").addEventListener("click", listarTodosRamais);
document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        buscarUsuarios();
    }
});

let intervaloInicio = null;
let intervaloFim = null;


function filtrarPorIntervalo(dados) {
    intervaloInicio = document.getElementById('rangeInicio').value;
    intervaloFim = document.getElementById('rangeFim').value;

    if (intervaloInicio && intervaloFim) {
        return dados.filter((ramal) =>
            Number(ramal.numero) >= Number(intervaloInicio) &&
            Number(ramal.numero) <= Number(intervaloFim)
        );
    }
    return dados;
}

function exibirMensagem(idParagrafo, mensagem) {
   document.getElementById(idParagrafo).innerHTML = mensagem;
}

function addRamais(event) {
    event.preventDefault();
    const email = document.getElementById('emailUsuarioLogado').value;
    const myObj = {
        "usuario": document.getElementById("usuarioLogado").value,
        "extension": document.getElementById("option").value,
        "email": email,
    };
    const objSend = JSON.stringify(myObj);

    fetch(`${url}/login`, {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json',
         },
         body: objSend
    })
    .then(response => {
        return response.text().then(data => {
            if (!response.ok) {
                throw new Error(data);
            }
            return data;
        });
    })
    .then(data => {
        if (!email.includes('@') || !email.includes('.com')) {
            exibirMensagem('texto-erro', 'Por favor, insira um formato de e-mail válido.');
            emailUsuarioLogado.focus();
            return;
        } else {
             exibirMensagem('texto-erro', '');
        }

        console.log('Ramal registrado com sucesso:', data);
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        listarTodosRamais();

    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

let ramalSelecionado = null;
const modal = document.getElementById('myModal');
modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    ramalSelecionado = button.getAttribute('data-ramal');
});

function showSuccessModal(mensagem) {
    const modal = new bootstrap.Modal(document.getElementById("successModal"));
    document.querySelector("#successModal .modal-body").textContent = mensagem;
    modal.show();
}

function deslogarRamal(extension) {
    fetch(`${url}/logout/${extension}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.text())
    .then(data => {
        if (data === "Ramal deslogado com sucesso.") {
            showSuccessModal(data);
        }

        if (!data.erros || Object.keys(data.erros).length === 0) {
            listarTodosRamais();
        }
    })
    .catch(error => {
        console.error("Erro ao deslogar ramal:", error);
        alert("Erro ao deslogar ramal!");
    });
}

function recarregarPagina() {
     window.location.href = "index.html";
}

function buscarUsuarios() {
    const termoBusca = document.getElementById("search").value.toLowerCase().trim();
    const corpoTabela = document.getElementById("tableBody");
    corpoTabela.innerHTML = "";

    if (!termoBusca) {
        listarTodosRamais();
        return;
    }
    fetch(`${url}/all`)
    .then(response => response.json())
    .then((dados) => {
        const resultados = dados.filter(ramal => {
        const nome = ramal.usuarioLogado ? ramal.usuarioLogado.toLowerCase() : "";
        const numero = ramal.numero ? ramal.numero.toString() : "";
        return termoBusca === nome || termoBusca === numero;
    });

    if (resultados.length === 0) {
        const linha = document.createElement("tr");
        linha.innerHTML = `<td colspan="4">Nenhum resultado encontrado.</td>`;
        corpoTabela.appendChild(linha);
        return;
    }

    resultados.forEach((ramal) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${ramal.numero}</td>
            <td>${ramal.usuarioLogado || "-"}</td>
            <td>${ramal.status.toLowerCase() === "ativo" ? "Indisponível" : "Disponível"}</td>
            <td>${ramal.status.toLowerCase() === "ativo" ?
                `<button onclick="deslogar()" title="Deslogar do ramal" class="btn btn-link p-0 m-0 text-danger">
                    <i class="bi bi-telephone-x"></i>
                </button>` :
                `<button onclick="logar()" title="Logar do ramal" class="btn btn-link p-0 m-0 text-success">
                    <i class="bi bi-telephone"></i>
                </button>`
            }</td>
        `;
        corpoTabela.appendChild(linha);
        });
    })
    .catch(error => {
        console.error('Erro ao realizar a busca:', error);
        alert('Erro ao realizar a busca!');
    });
}

function logarRamal(ramal) {
    document.getElementById("option").value = ramal;
    const modal = new bootstrap.Modal(document.getElementById("modalCadastro"));
    modal.show();;
    buscarRamalDisponivel();
}

function logarRamalEspecifico(ramal){
    document.getElementById("option").value = ramal;
    const modal = new bootstrap.Modal(document.getElementById("modalCadastro"));
    modal.show();
}

function buscarRamalDisponivel() {
    fetch(`${url}/available`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar ramal disponível.");
            }
            return response.json();
        })
        .then(data => {
            if (data && data.extension) {
                const ramal = data.extension;
                const option = document.getElementById("option");
                option.value = ramal;
                option.textContent = ramal;
            } else {
                console.log("Nenhum ramal disponível.");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar ramal disponível:", error);
        });
}

function range() {
    const modal = new bootstrap.Modal(document.getElementById("modalRange"));
    modal.show();
}

function listarRamaisPorRange() {
    intervaloInicio = document.getElementById('rangeInicio').value;
    intervaloFim = document.getElementById('rangeFim').value;

    if (intervaloInicio === '' || intervaloFim === '') {
        alert('Por favor, preencha os dois campos.');
        return;
    }

    fetch(`${url}/configurar-intervalo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inicio: parseInt(intervaloInicio),
            fim: parseInt(intervaloFim)
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao configurar intervalo.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        const modalElement = document.getElementById('modalRange');
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
        modalInstance.hide();
        listarTodosRamais();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao configurar intervalo.');
    });
}