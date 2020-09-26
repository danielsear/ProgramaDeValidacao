

//required= restringe cada campo a ser obrigatório ser preenchido, sua inserção de dados
//data-tipo= email, senha, cidade,...  define um modulo no Html de comunicação com os js. do campo e área
//type= email xxx@xxx.xx, password senha, date data + min= data minima, submit botao

import { ValidarDataNascimento } from './ValidarDataNascimento.js';
import {validarCpf} from './ValidarCpf.js';

const retornarMensagemDeErro = (tipo, validity) => {
   
    let mensagemDeErro = "";

    const tiposDeErro = ["valueMissing", "typeMismatch","tooShort","rangeUnderflow",
    "customError"];
   
    //tipos com suas msgs de erro por meio dos seus respectivos erros
    const mensagensDeErro = {
        email: {
            valueMissing: " O e-mail é necessário",
            typeMismatch: "Este não é um e-mail valido"
        },
        senha: {
            valueMissing: " A senha é necessário",
            tooShort: "Necessário 4 caracteres mínimo"
        },
        dataNascimento: {
            valueMissing: " A data de nascimento é necessário",
            rangeUnderflow: "Data mínima 1901",
            customError: "A idade mínima é 18 anos"
        },
        cpf: {
            valueMissing: " O cpf é necessário",
            customError: "Este cpf não é válido"
        },
        rg: {
            valueMissing: " O rg é necessário",
        },
        cep: {
            valueMissing: " O cep é necessário",
        },
        cidade: {
            valueMissing: " A cidade é necessário",
        },
        logradouro: {
            valueMissing: " O logradouro é necessário",
        },
        estado: {
            valueMissing: " O estado é necessário",
        }
    };

    tiposDeErro.forEach(erro => {
        if(validity[erro]){//verifica se o erro existe no validity
           mensagemDeErro = mensagensDeErro[tipo][erro];//leva o [tipo]campo [erro]tipo de erro
        }
    });

 //console.log(mensagemDeErro);
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
   // console.log(input.validity); olhando para cada erro possível do validity
   /*
    if(input.id == 'dataNascimento'){   fazer individualmente para cada caso queira individualmente
        ValidarDataNascimento();
    }
    */
   const classeElementoErro= "erro-validacao";// class que esta no css parra erro
   const classeInputErro = "possui-erro-validacao";// class que esta no css parra erro
   const elementoPai = input.parentNode;//pegando o nome do elemento pai do input (div)
   const elementoErroExiste = elementoPai.querySelector(`.${classeElementoErro}`);//se houver erro ele vai atribuir ao elementoerroexiste
   const elementoErro = elementoErroExiste || document.createElement("div");//se ele nao existe atribui  a div para o ele voltando ao estado normal
   const elementoEhValido = input.validity.valid;//retorna true o campo esta valido or false nao esta valido
   const tipo = input.dataset.tipo;// seleciona a área que o data-tipo esta no HTML
  
   const validadoresEspecificos = { 
       dataNascimento: input => ValidarDataNascimento(input),//pra data
       cpf: input => validarCpf(input) //para o cpf
   };

   if(validadoresEspecificos[tipo]){
       //se achar uma chave com o tipo ele executa a propria função passando o input
       validadoresEspecificos[tipo](input);
   }
   if(!elementoEhValido){//se existi um elementoerro
        elementoErro.className =classeElementoErro;
        elementoErro.textContent = retornarMensagemDeErro(tipo, input.validity);
        //buscar o tipo de erro e sua msg específica
     
        if(adicionarErro){//se nao for valido e quiser adicionar o erro
            input.classList.add(classeInputErro);// criando a class no html
            input.after(elementoErro);// imprimir a msg de erro
        }
   }
    else{
        elementoErro.remove();// caso nao existir retirar o erro
        input.classList.remove(classeInputErro);//retirar a class
   }
}