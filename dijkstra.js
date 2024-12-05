
const grafo = {
  A: { B: 4, C: 2, D: 7 },
  B: { A: 4, C: 1, E: 1 },
  C: { A: 2, B: 1, D: 3, E: 3 },
  D: { A: 7, C: 3, E: 2 },
  E: { B: 1, C: 3, D: 2 },
};


function dijkstra(grafo, inicio) {
  const distancias = {};
  const anteriores = {};
  const visitados = new Set();
  const naoVisitados = new Set(Object.keys(grafo));


  for (const vertice of naoVisitados) {
    distancias[vertice] = Infinity;
    anteriores[vertice] = null;
  }
  distancias[inicio] = 0;

  while (naoVisitados.size > 0) {
    // Encontrar o nó não visitado com a menor distância
    let menorDistancia = Infinity;
    let menorVertice = null;

    for (const vertice of naoVisitados) {
      if (distancias[vertice] < menorDistancia) {
        menorDistancia = distancias[vertice];
        menorVertice = vertice;
      }
    }

   
    naoVisitados.delete(menorVertice);
    visitados.add(menorVertice);

    
    for (const vizinho in grafo[menorVertice]) {
      const peso = grafo[menorVertice][vizinho];
      const novaDistancia = distancias[menorVertice] + peso;

      if (novaDistancia < distancias[vizinho]) {
        distancias[vizinho] = novaDistancia;
        anteriores[vizinho] = menorVertice;
      }
    }
  }

  return { distancias, anteriores };
}

function encontrarCaminho(anteriores, destino) {
  const caminho = [];
  let atual = destino;

  while (atual !== null) {
    caminho.unshift(atual);
    atual = anteriores[atual];
  }

  return caminho;
}


const resultado = dijkstra(grafo, "A");


const menorTempoAteE = resultado.distancias["E"];
const caminhoAteE = encontrarCaminho(resultado.anteriores, "E");


const menorTempoAteD = resultado.distancias["D"];
const caminhoAteD = encontrarCaminho(resultado.anteriores, "D");


console.log(`Menor tempo de A até E: ${menorTempoAteE} horas`);
console.log(`Caminho de A até E: ${caminhoAteE.join(" -> ")}`);
console.log(`Menor tempo de A até D: ${menorTempoAteD} horas`);
console.log(`Caminho de A até D: ${caminhoAteD.join(" -> ")}`);
