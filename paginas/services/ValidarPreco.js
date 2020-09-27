

export const validarPreco = (input) =>{
    const preco = input.formatToNumber();

    if(preco === 0){
        input.setCustomValidity("Produto sem preço, por favor insira o preço corretamente");
        return;
    };

    input.setCustomValidity("");
};