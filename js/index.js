//Lista de looks do Met Gala com nome e imagem local
const metGala = [
    {nome: "Rihanna no Met Gala 2026", imagem: "img/metgala1.jpg"},
    {nome: "Lisa no Met Gala 2026", imagem: "img/metgala2.jpg"},
    {nome: "Jisso no Met Gala 2026", imagem: "img/metgala3.jpg"},
    {nome: "Jennie no Met Gala 2026", imagem: "img/metgala4.jpg"},
    {nome: "Rose no Met Gala 2026", imagem: "img/metgala5.jpg"},
    {nome: "Beyoncé no Met Gala 2026", imagem: "img/metgala6.jpg"},
    {nome: "Karina no Met Gala 2026", imagem: "img/metgala7.jpg"},
    {nome: "NingNing no Met Gala 2026", imagem: "img/metgala8.jpg"},
];

//Começa todos os votos zerados
const votos = new Array(metGala.length).fill(0);

//Guarda local que está sendo exibido agora 
let indice1, indice2;

//Seleciona os elementos da página
const cartao1 = document.getElementById("cartao1");
const cartao2 = document.getElementById("cartao2");
const resultado = document.getElementById("resultado");
const barras = document.getElementById("barras");
const avisoProx = document.getElementById("proximo-aviso");

//Sorteia um novo par de looks do Met Gala diferentes
function sortearPar(){
    indice1 = Math.floor(Math.random() * metGala.length);
    do{
        indice2 = Math.floor(Math.random() * metGala.length);
    } while (indice2 === indice1);

    //atualiza cartão 1
    cartao1.querySelector("img").src = metGala[indice1].imagem;

    //atualiza cartão 2
    cartao2.querySelector("img").src = metGala[indice2].imagem;

    //esconde o resultado da rodada anterior
    resultado.style.display = "none";

    //habilita os cliques nos cartões
    cartao1.style.pointerEvents = "auto";
    cartao2.style.pointerEvents = "auto";
}

//registra o voto e mostra o placar por 3 segundos
function votar(indiceVencedor) {
    votos[indiceVencedor]++;

    //Desabilita cliques enquanto o resultado aparece
    cartao1.style.pointerEvents = "none";
    cartao2.style.pointerEvents = "none";

    mostrarResultado();

    //Aguarda 3 segundos e sorteia o próximo par
    let segundos = 3;
    avisoProx.textContent = `Próxima dupla em ${segundos}s...`;

    const contagem = setInterval(() => {
        segundos--;
        if(segundos > 0){
            avisoProx.textContent = `Próxima dupla em ${segundos}s...`;
        }else{
            clearInterval(contagem);
            sortearPar();
        }
    }, 1000);
}

//Mostrar o placar com barras de progresso
function mostrarResultado(){
    const totalVotos = votos.reduce((soma, v) => soma + v, 0);

    barras.innerHTML = ""; //Limpa barras anteriores

    metGala.forEach((rede, i) => {
        const percentual = totalVotos > 0 ? (votos[i] / totalVotos) * 100 : 0;

        const item = document.createElement("div");
        item.classList.add("barra-item");

        item.innerHTML = `
            <span class="nome">${rede.nome}</span>
            <div class="barra-fundo">
                <div class="barra-preenchida" style="width: ${percentual}%"></div>
            </div>
            <span class="votos">${votos[i]} votos</span>
        `;
        barras.appendChild(item);
    });
    resultado.style.display = "block";
}

sortearPar(); //Inicia o jogo quando a pagina carregar