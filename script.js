/* =========================================================
   PLATINUM FIT — script.js
   Arquivo JavaScript externo usado em todas as páginas
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 1. MENU HAMBÚRGUER (responsivo) ---------- */
    const botaoMenu = document.querySelector(".menu-toggle");
    const listaMenu = document.querySelector(".lista-menu");

    if (botaoMenu && listaMenu) {
        botaoMenu.addEventListener("click", function () {
            listaMenu.classList.toggle("aberto");
        });

        // fecha o menu ao clicar em um link (útil no celular)
        listaMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                listaMenu.classList.remove("aberto");
            });
        });
    }

    /* ---------- 2. DESTACAR LINK DA PÁGINA ATUAL NO MENU ---------- */
    const linksMenu = document.querySelectorAll("nav a");
    const paginaAtual = window.location.pathname.split("/").pop().toLowerCase() || "index.html";

    linksMenu.forEach(function (link) {
        const hrefLink = link.getAttribute("href").toLowerCase();
        if (hrefLink === paginaAtual) {
            link.classList.add("ativo");
        }
    });

    /* ---------- 3. BOTÕES "LEIA MAIS" (página Novidades) ---------- */
    const botoesLeiaMais = document.querySelectorAll(".link-leia-mais");

    botoesLeiaMais.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const texto = botao.previousElementSibling;
            texto.classList.toggle("aberto");
            botao.textContent = texto.classList.contains("aberto") ? "Ler menos ▲" : "Leia mais ▼";
        });
    });

    /* ---------- 4. RODAPÉ: ANO ATUAL AUTOMÁTICO ---------- */
    const spanAno = document.querySelector("#ano-atual");
    if (spanAno) {
        spanAno.textContent = new Date().getFullYear();
    }

    /* ---------- 5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---------- */
    const formulario = document.querySelector("#form-contato");

    if (formulario) {

        const campoNome = document.querySelector("#nome");
        const campoEmail = document.querySelector("#email");
        const campoTelefone = document.querySelector("#telefone");
        const campoAssunto = document.querySelector("#assunto");
        const campoMensagem = document.querySelector("#mensagem");
        const mensagemSucesso = document.querySelector("#mensagem-sucesso");

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefone = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

        function mostrarErro(campoInput, mensagem) {
            const caixaCampo = campoInput.closest(".campo");
            caixaCampo.classList.add("erro");
            caixaCampo.querySelector(".mensagem-erro").textContent = mensagem;
        }

        function limparErro(campoInput) {
            const caixaCampo = campoInput.closest(".campo");
            caixaCampo.classList.remove("erro");
        }

        function validarNome() {
            if (campoNome.value.trim().length < 3) {
                mostrarErro(campoNome, "Digite seu nome completo (mínimo 3 letras).");
                return false;
            }
            limparErro(campoNome);
            return true;
        }

        function validarEmail() {
            if (!regexEmail.test(campoEmail.value.trim())) {
                mostrarErro(campoEmail, "Digite um e-mail válido. Ex: nome@email.com");
                return false;
            }
            limparErro(campoEmail);
            return true;
        }

        function validarTelefone() {
            if (!regexTelefone.test(campoTelefone.value.trim())) {
                mostrarErro(campoTelefone, "Digite um telefone válido. Ex: (21) 98888-7777");
                return false;
            }
            limparErro(campoTelefone);
            return true;
        }

        function validarAssunto() {
            if (campoAssunto.value === "") {
                mostrarErro(campoAssunto, "Selecione um assunto.");
                return false;
            }
            limparErro(campoAssunto);
            return true;
        }

        function validarMensagem() {
            if (campoMensagem.value.trim().length < 10) {
                mostrarErro(campoMensagem, "Sua mensagem deve ter pelo menos 10 caracteres.");
                return false;
            }
            limparErro(campoMensagem);
            return true;
        }

        // validação em tempo real (ao sair do campo)
        campoNome.addEventListener("blur", validarNome);
        campoEmail.addEventListener("blur", validarEmail);
        campoTelefone.addEventListener("blur", validarTelefone);
        campoAssunto.addEventListener("change", validarAssunto);
        campoMensagem.addEventListener("blur", validarMensagem);

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const nomeOk = validarNome();
            const emailOk = validarEmail();
            const telefoneOk = validarTelefone();
            const assuntoOk = validarAssunto();
            const mensagemOk = validarMensagem();

            if (nomeOk && emailOk && telefoneOk && assuntoOk && mensagemOk) {
                mensagemSucesso.classList.add("mostrar");
                mensagemSucesso.textContent = "Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.";
                formulario.reset();

                // esconde a mensagem de sucesso depois de alguns segundos
                setTimeout(function () {
                    mensagemSucesso.classList.remove("mostrar");
                }, 6000);
            } else {
                mensagemSucesso.classList.remove("mostrar");
            }
        });
    }

    /* ---------- 6. FILTRO DE PLANOS/SERVIÇOS (página Portfólio) ---------- */
    const botoesFiltro = document.querySelectorAll(".filtro-botao");
    const cartoes = document.querySelectorAll(".card[data-categoria]");

    if (botoesFiltro.length > 0) {
        botoesFiltro.forEach(function (botao) {
            botao.addEventListener("click", function () {
                botoesFiltro.forEach(function (b) { b.classList.remove("ativo"); });
                botao.classList.add("ativo");

                const categoria = botao.getAttribute("data-filtro");

                cartoes.forEach(function (cartao) {
                    if (categoria === "todos" || cartao.getAttribute("data-categoria") === categoria) {
                        cartao.style.display = "flex";
                    } else {
                        cartao.style.display = "none";
                    }
                });
            });
        });
    }

});
