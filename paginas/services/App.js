



import { validarInput } from './validar.js';


window.onload = () =>{//so execulta a função quando a paggina for recarregada
    const inputs = document.querySelectorAll("input");//acessando todos os inputs

    inputs.forEach(input => {
        //verificar a entrada, evento de digitação
        input.addEventListener("input", () => {
            //alert('Ola');
            validarInput(input,false);//false é pra nao da erro enquanto o o usuario estiver digitando
        });
        //verificar a saida, saida de digitação
        input.addEventListener("blur", () => {//blur ativa quando sai do campo
            validarInput(input);//ativa o erro
        });
    });
};