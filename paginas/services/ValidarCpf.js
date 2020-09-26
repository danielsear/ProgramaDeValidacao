
// conferir numeros repetidos
const cpfNumerosRepetidos = (cpf) => {
    const cpfsInvalidos = [
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999"
    ];
    return cpfsInvalidos.includes(cpf);
    // ele inclui caso seja verdadeiro      
}

const calcularTotal = (multiplicador) => (resultado, numeroAtual) => resultado + numeroAtual * multiplicador--;

const calcularDigito = (parteCpf, multiplicador) => {
    // total=primeiro numero do cpf * (começa com 10 pro primeiro, 11 pro segundo) + segundo * 9 ou 10 + ...+ nono ou decimo *2
    // resto = total % 11
    // 11 - resto = ao digito
    //fazer para os dois ultimos digitos sendo o primeiro começa com multiplicador 10, segundo 11
    const total = parteCpf.reduce(calcularTotal(multiplicador), 0);// reduce percorre o array chando calcularTotal( multiplicador, valor inicial), retorna o resultado e leva denovo para cada posição faz a conta retornando o resultado e  + o resultado da anterior
    const resto = total % 11;
    const digito = 11 - resto;
    // assim o digito final tendem a ser o mesmo digito da posição 

    if (resto > 9) {
        //digitos acima de 9 não entrão na conta pois queremos apenas um digito, 0 a 9
        digito = 0;
    }

    return digito;
};

export const validarCpf = input => {

    const cpfNumeros = input.value.replace(/\D/g, "");
    //trasforma a string em numero, procurando todos os digitos tirando os pontos e símbolos
    //console.log(cpfNumero);

    if (cpfNumerosRepetidos(cpfNumeros)) {
        input.setCustomValidity("Este é um cpf não existe");
        // incrementando o erro caso cpfNumerosRepetidos for verdadeiro
        return;
    }

    const primeiraParteCpf = cpfNumeros.substr(0, 9).split("");
    // substr transforma em um array do 0 ao 9 digito e split= vai separar cada caracter um uma posição do array
    const primeiroDigitoCpf = Number(cpfNumeros.charAt(9));
    //pego o 10 digito, penúltimo transformando-o a string em inteiro para fazer a verificação
    const primeiroDigitoCalculado = calcularDigito(primeiraParteCpf, 10);
    console.log(primeiroDigitoCalculado);

    if(primeiroDigitoCpf !== primeiroDigitoCalculado){
        input.setCustomValidity("Este é um cpf não existe");
        return;
    }

    const segundoParteCpf = cpfNumeros.substr(0, 10).split("");
    const segundoDigitoCpf = Number(cpfNumeros.charAt(10));
    const segundoDigitoCalculado = calcularDigito(segundoParteCpf, 11);
    console.log(segundoDigitoCalculado);

    if(segundoDigitoCpf !== segundoDigitoCalculado){
        input.setCustomValidity("Este é um cpf não existe");
        return;
    }


    input.setCustomValidity("");//se cpfNumerosRepetidos for falso retornar vazio


};