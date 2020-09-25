
export const ValidarDataNascimento = input => {
    //alert(input.value);
    const dataNascimento = new Date(input.value);
    const dataAtual = new Date();

    const dataFaz18 = new Date(
        dataNascimento.getUTCFullYear() + 18,
        dataNascimento.getUTCMonth(),
        dataNascimento.getUTCDate()
    );

    if(dataFaz18 > dataAtual ){
        input.setCustomValidity("A idade mínima de cadastro é de 18 anos.");
        return;
    }
    input.setCustomValidity("");
    return;
}