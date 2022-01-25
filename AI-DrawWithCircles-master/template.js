//jscs:disable
var pop_size = 50;
var mutation_rate = 0.01;
var population;
var mating_pool;
var generation = 0;
var max_fitness_value;
var pic1;
var displayFitnessScore;
var displayGenerationNumber;

function setup() {
  createCanvas(300, 900);
  pic1 = loadImage("assets/andrew.jpg");

  population = new Array();

  for (var i = 0; i < pop_size; i++) {
    population.push(new DNA());
  }
}


function draw() {
  // Displays the image at its actual size at point (0,0)
  image(pic1, 0, 0);
  //start drawing the circles
  max_fitness_value = 0;
  var max_index;

  for (var i = 0; i < pop_size; i++) {
    if (population[i].fitness > max_fitness_value) {
      max_fitness_value = population[i].fitness;
      max_index = i;
    }
  }

  for (var i = 0; i < pop_size; i++) {
    if(i == max_index && generation%50==0) {
      // Clears the cancus for every species
      clear();
      for (var k = 0; k < population[i].gene.length; k+=7){
        //values for RGB
        var red = population[i].gene[k];
        var green = population[i].gene[k+1];
        var blue = population[i].gene[k+2];
        var alpha = population[i].gene[k+3];
        //x, y and diameter
        var x = population[i].gene[k+4];
        var y = population[i].gene[k+5];
        var diameter = population[i].gene[k+6] * 2;
        var c = color('rgba('+red+  ','+ green + ',' + blue + ',' + alpha + ')');
        // Apply color with alpha value
        fill(c);
        noStroke();
        // Create cirle
        ellipse(x, y, diameter, diameter);
      }
      image(pic1, 0, 0);
    }
    population[i].calcFitness(300, 600);
  }

  // Mating pool
  mating_pool = new Array();
  for (var i = 0; i < pop_size; i++) {
    var n = (population[i].fitness);
    for (var j = 0; j < n; j++) {
      mating_pool.push(population[i]);
    }
  }
  // Reproduction
  for (var i = 0; i < pop_size; i++) {
    var a = Math.floor(Math.random()*(mating_pool.length));
    var b = Math.floor(Math.random()*(mating_pool.length));
    var partnerA = mating_pool[a];
    var partnerB = mating_pool[b];
    // Crossover
    var child = partnerA.crossover(partnerB);
    // Mutate
    child.mutate(mutation_rate);
    // Add child to population
    population[i] = child;
  }
  // Display the fitness score and generation number
  displayFitnessScore = 'Fitness Score: ' + max_fitness_value;
  document.getElementById("fitness").innerHTML = displayFitnessScore;

  displayGenerationNumber = 'Generation: ' + generation;
  document.getElementById("generation").innerHTML = displayGenerationNumber;
  // Increment the generation by 1
  generation++;
}
