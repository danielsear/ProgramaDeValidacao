

export const recuperarEndereço = (input) => {
    const cepNumeros = input.value.replace(/\D/g,"");//transformar string em numeros

    if(input.validity.valid){
    const   url=`https://viacep.com.br/ws/${cepNumeros}/json/`;//capitar o cep indicado no site 
    const options = {//opções para fazer a chamada
           method: "GET",//buscando dados
            mode: "cors",//sites de dominios diferentes
            headers: {
                "content-type": "application/json;charset=utf-8" 
            }
       };
       //fetch retorna um response, resposta => transforma em arquivo.json, retorna um data com todos os dados
        fetch(url, options).then(response => response.json()).then(data => {
                console.log(data);
              if(data.erro){
                  input.setCustomValidity("Este cep não existe");
                  return;
              }
              preencherCampos(data);//se tiver certo preencher os outros campos com as informações do data
              input.setCustomValidity("");
              return;
            });
    };
};

const preencherCampos = data => {
    //buscando os campos pelo ID
    const campoLogradouro = document.getElementById("logradouro");
    const campoCidade = document.getElementById("cidade");
    const campoEstado = document.getElementById("estado");
    //inserindo os dados do data no formulario  
    campoLogradouro.value = data.logradouro;
    campoCidade.value = data.localidade;
    campoEstado.value = data.uf;

};  