


export const ValidarDataNascimento = input => {
    //alert(input.value);
    const dataNascimento = new Date(input.value);//valor digitado pelo usuário
    const dataAtual = new Date();

    const dataFaz18 = new Date(//criando a data para verificar se é maior q 18 anos
        dataNascimento.getUTCFullYear() + 18,//pegou o ano + 18 anos para verificação
        dataNascimento.getUTCMonth(),//mes
        dataNascimento.getUTCDate()//dia
    );

    if(dataFaz18 > dataAtual ){
        input.setCustomValidity("A idade mínima de cadastro é de 18 anos.");
          //passando uma validação
        return;
    }
    input.setCustomValidity("");
    return;
}