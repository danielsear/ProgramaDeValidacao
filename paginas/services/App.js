

//Vale lembrar que existe duas formas de trabalhar com js no html
//1) usando a tag type:"module" no script ><script src="../services/App.js" type="module"></script>
//2) ou usando o npm: criando o packe.json 

//Utilizando uma mascara para o validar o preço do produto com uma biblioteca feita no github
//<script src="https://github.com/codermarcos/simple-mask-money/releases/download/<RELEASE_VERSION_HERE>=(v3.0.0)/simple-mask-money.js"></script>


/*
Os argumentos são:

afterFormat: function> Esta função será chamada sempre após o valor formatado
allowNegative: boolean> Este booleano define se permite valores abaixo de zero
beforeFormat: function> Esta função será chamada sempre antes do valor formatado
negativeSignAfter: boolean> Este booleano define se o sinal negativo permanecerá após o número
prefixo: string> Esta string sempre precede seu valor
sufixo: string> Esta string sempre processa seu valor
fixed: boolean> Este booleano define se seu valor pode ser vazio ou sempre deve ter valor
Dígitos fracionários: número> Este número define a quantidade de dígitos decimais
Separador decimal: string> Esta string define o separador de dígitos decimais
milharesSeparator: string> Esta string define o separador de milhares de dígitos
cursor: string> Esta string define como o cursor se moverá. Pode ser mover, terminar ou iniciar.*/ 

import { validarInput } from './validar.js';


window.onload = () =>{//so execulta a função quando a paggina for recarregada
    const inputs = document.querySelectorAll("input");//acessando todos os inputs

    inputs.forEach(input => {

        if(input.dataset.tipo === "preco"){
            SimpleMaskMoney.setMask(input,{
              //  afterFormat(e) { console.log('afterFormat', e); }, executar algo antes de ser formatado, nao vamos utilisar aq
                allowNegative: false,
                //beforeFormat(e) { console.log('beforeFormat', e); },executar algo depois de ser formatado, nao vamos utilisar aq
                negativeSignAfter: false,
                prefix: 'R$',
               // suffix: '',
                fixed: true,
                fractionDigits: 2,
                decimalSeparator: ',',
                thousandsSeparator: '.',
                cursor: "end "//end começar no final , 'move' livre
            })
        }


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