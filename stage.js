
var POPULATION_SIZE = 400;
var SELECTION_SIZE = 5;

function keygen(x){
  var s = "";
  while(s.length < x && x > 0){
      var r = Math.random();
      s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
  }
  return s;
}

var Store = {}
function store(genome){
  genome.derived = genome.key
  genome.key = keygen(10)
  Store[genome.key] = genome
}
function getGenomes(){
  var genomes = []
  for(var g in Store){
    genomes.push(Store[g].key)
  }
  return genomes
}

function insert(genome,functions){
  var f = Math.floor(Math.random() * functions.length)
  var fn = functions[f]
  var gene = [f,[]]
  for(var i in fn.args){
     gene[1].push(Math.floor(Math.random() * fn.args[i]))
  }
  return gene
}

function genesis(size,variety){
  var population = []
  for(var i = 0; i < size; i++){
    var genes = []
    for(var g = 0; g < variety; g++){
      genes.push(insert(null,functions))
    }
    population.push({
      type: 'BUTTON',
      composite: false,
      content: 'run',
      key: keygen(10),
      tags: [],
      rank: 0,
      genes: genes
    })
  }
  return population
}


function addition(genome){
  if(genome.composite){
    genome.genes.push(insert(genome,compositeFunctions))
  } else{
    genome.genes.push(insert(genome,functions))
  }
  return genome
}

function mutate(genome,rate){
  for(var r = 0; r < rate; r++){
    var i = Math.floor(Math.random() * genome.genes.length)
    var gene = genome.genes[i]
    var fn = functions[gene[0]]
    gene[1][0] = Math.floor(Math.random() * fn.args[0])
    genome.genes[i] = gene
  }
  return genome
}

function compose(a,b){
  return {
    type: 'DIV',
    composite: true,
    content: [a,b],
    key: keygen(10),
    tags: [],
    rank: 0,
    genes: []
  }
}

function crossover(a,b){
  var offspring = {
    type: a.type,
    composite: a.composite || false,
    content: a.content,
    key: keygen(10),
    tags: [],
    rank: 0,
    genes: []
  }
  for(var g in a.genes){
    var n = Math.floor(Math.random() * 2) + 1
    if(n == 1) offspring.genes.push(a.genes[g])
    else offspring.genes.push(b.genes[g])
  }
  // offspring = mutate(offspring,1)
  offspring = addition(offspring)
  return offspring
}

function express(genome){
  var el = document.createElement(genome.type)
  if(Array.isArray(genome.content)){
    el.style.display = "flex"
    for(var c in genome.content){
      el.appendChild(express(genome.content[c]))
    }
  }
  else{ el.innerHTML = genome.content || '' }

  for(var g in genome.genes){
    var gene = genome.genes[g]
    if(gene){
      if(genome.composite && compositeFunctions[gene[0]]){
        el = compositeFunctions[gene[0]].fn.apply(this,[el].concat(gene[1]))
      }
      el = functions[gene[0]].fn.apply(this,[el].concat(gene[1]))
    }
  }
  return el
}

function populate(genepool){
  var population = []
  for(var i = 0; i < genepool.length; i++){
    var genome = genepool[i]
    population.push(express(genome))
  }
  return population
}

function regenerate(genepool,selection,size){
  var population = []
  for(var i = 0; i < size; i++){
    var a = 0; var b = 0;
    while(a == b){
      a = Math.floor(Math.random() * selection.length)
      b = Math.floor(Math.random() * selection.length)
    }
    population.push(crossover(genepool[selection[a]],
      genepool[selection[b]]))
  }
  return population
}

var selection = []

function render(population,genepool){
  var panel = document.getElementById('panel')
  var selections = document.getElementById('selections')
  var pit = document.getElementById('pit')
  var list = document.getElementById('genomes')
  pit.innerHTML = ''
  list.innerHTML = ''
  for(var i in population){
    var phenotype = population[i]
    phenotype.id = i
    phenotype.style.pointerEvents = 'none'
    var container = document.createElement('DIV')
    container.id = i
    container.className = 'phenoContainer'
    container.onclick = function(e){
      selection.push(e.target.id)
      var storeButton = document.createElement('BUTTON')
      storeButton.id = e.target.id
      storeButton.innerHTML = 'store'
      storeButton.onclick = function(event){store(genepool[event.target.id])}
      var item = document.createElement('DIV')
      item.innerHTML = '<b>' + e.target.id + ': </b>' + genepool[e.target.id].genes.toString()
      item.appendChild(storeButton)
      list.appendChild(item)
      if(selection.length >= SELECTION_SIZE){
        genepool = regenerate(genepool,selection,genepool.length)
        selection = []
        population = populate(genepool)
        render(population,genepool)
      }
    }
    container.appendChild(phenotype)
    // var genotype = document.createElement('DIV')
    // genotype.style.display = 'inline-block'
    // genotype.innerHTML = genepool[i].genes.toString()
    // container.appendChild(genotype)
    pit.appendChild(container)
  }
}

var genepool = genesis(POPULATION_SIZE,functions.length)
population = populate(genepool)
render(population,genepool)
