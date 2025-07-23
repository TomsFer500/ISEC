/**************************************************
 * Javascript - Ficha 11
 * ************************************************/

window.onload = function () {
    init(); 
};


var form = document.querySelector('form');
// Evento para que o submit não submeta qualquer dados
form.addEventListener('submit', function (event) {
    event.preventDefault();
});



function validaNome(fld) {
    var letters = /^[A-zÀ-ú]+$/;
    if (fld.value.trim().match(letters)) 
		return true;
    return false;
}

const painelStatus = document.querySelector('#painel-status');
const tpNao = document.querySelector('#tpNao');
const tpSim = document.querySelector('#tpSim');
const painelNotaTP = document.querySelector('#notaTP-painel');
const notaTP = document.querySelector('#notaTP');
const notaExame = document.querySelector('#notaExame');
const pNome = document.querySelector('#pNome');
const uNome = document.querySelector('#uNome');
const situacao = document.querySelector('#situacao');
const notaFinal = document.querySelector('#notaFinal');
const msg = document.querySelector('#msg');
const btnNotaFinal = document.querySelector('#btnCalcularNota');
btnNotaFinal.addEventListener('click', validaFormulario);
const btnReset = document.querySelector('#btnReset');
btnReset.addEventListener('click', init);


function resetPainel(){
    painelStatus.style.display = 'none';
    msg.style.display = 'none';

    painelStatus.classList.remove('aprovado');
    painelStatus.classList.remove('reprovado');


        notaTP.setCustomValidity('');
        pNome.setCustomValidity('');
        uNome.setCustomValidity('');
}

function init() {
    painelStatus.style.display="none";
}

tpNao.addEventListener('click', function() {
    painelNotaTP.style.visibility = 'hidden';
    notaTP.value = '0';
});

tpSim.addEventListener('click', function() {
    painelNotaTP.style.visibility = 'visible';
});

function calculaNotaFinal(nTP, nExame){
    const notaFinal = (nTP * 0.08) + (nExame * 0.6);

    return Math.round(notaFinal);
}

function setStatus(nota, txt=''){
    painelStatus.style.display = 'block';
    let msgAluno = 'Aluno' + pNome.value + '' + uNome.value;
    if (nota >= 10){
        painelStatus.classList.add('aprovado');
            msgAluno += 'Aprovado!';
    } else{
        painelStatus.classList.add('Reprovado');
            msgAluno += 'Reprovado';
    }
    situacao.textContent = msgAluno;
    notaFinal.textContent = nota;
    if (txt != ''){
        msg.style.display = 'inline';
        msg.innerHTML = txt;
    } else{
        msg.style.display = 'none';
    }
}

function validaFormulario(){
    if (form.checkValidity()){
        if(!validaNome(pNome)){
            pNome.setCustomValidity('Nome inválido! Especifique o primeiro nome!');
            return;
        }
        if(!validaNome(uNome)){
            uNome.setCustomValidity('Nome inválido! Especifique o último nome!');
            return;
        }
        if(tpSim.checked && notaTP.value.lenght < 1){
            notaTP.setCustomValidity('Introduza a nota!');
            return;
        }
        const nExame = notaExame.value;
        let nota = calculaNotaFinal (notaTP.value, nExame);
        let txt = '';

        if(nExame < 7){
            if(nota >= 10)
                nota = 9;
                    txt = "Sem mínimos em Exame!";
        }
        setStatus(nota,txt);
    } else {
        form.querySelectorAll(':invalid')[0].focus();
        }
}

notaTP.addEventListener('input', resetPainel);
notaExame.addEventListener('input', resetPainel);
pNome.addEventListener('input', resetPainel);
uNome.addEventListener('input', resetPainel);