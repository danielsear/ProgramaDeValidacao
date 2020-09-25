
import { ValidarDataNascimento } from './ValidarDataNascimento.js';

const retornarMensagemDeErro = (tipo, validity) => {
    let mensagemDeErro = "";
    const tiposDeErro = ["valueMissing", "typeMismatch","tooShort"];
    const mensagensDeErro = {
        email: {
            valueMissing: " O e-mail é necessário",
            typeMismatch: "Este não é um e-mail valido"
        },
        senha: {
            valueMissing: " A senha é necessário",
            tooShort: "Necessário 4 caracteres mínimo"
        }
    };

    tiposDeErro.forEach(erro => {
        if(validity[erro]){
           mensagemDeErro = mensagensDeErro[tipo][erro];
        }
    });
    return mensagemDeErro;

};

/*VALIDITY TIPOS DE ERROS , 
VALIDITYSTATE {
    valueMissing : true, falta um valor no campo email
    tooShort: true, senha muito curta, campo senha
    rangeUnderflow: true, data de nascimento invalida, data
    customError: no setCustomValidity , a string de erro transforma em um erro
}

*/

export const validarInput = (input,adicionarErro = true) => {
    console.log(input.validity);
   /*
    if(input.id == 'dataNascimento'){
        ValidarDataNascimento();
    }
    */
   const classeElementoErro= "erro-validacao";
   const classeInputErro = "possui-erro-validacao";
   const elementoPai = input.parentNode;
   const elementoErroExiste = elementoPai.querySelector(`.${classeElementoErro}`);
   const elementoErro = elementoErroExiste || document.createElement("div");
   const elementoEhValido = input.validity.valid;//retorna true or false
   const tipo = input.dataset.tipo;
  
   const validadoresEspecificos = {
       dataNascimento: input => ValidarDataNascimento(input)
   };
   if(validadoresEspecificos[tipo]){
       validadoresEspecificos[tipo](input);
   }
   if(!elementoEhValido){
        elementoErro.className =classeElementoErro;
        elementoErro.textContent = retornarMensagemDeErro(tipo, input.validity);
     
        if(adicionarErro){
            input.classList.add(classeInputErro);
            input.after(elementoErro);
        }
   }
    else{
        elementoErro.remove();
        input.classList.remove(classeInputErro);
   }
}