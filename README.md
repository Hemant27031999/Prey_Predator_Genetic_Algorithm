# Prey-Predator and the Genetic Algorithm

<img src="https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/PreyPred.gif" width="860"/>

>“This survival of the fittest which I have here sought to express in virtual terms, is that which Mr. Darwin has called 'natural selection, or the preservation of favoured races in the struggle for life.”


See the live simulation at : https://hemant27031999.github.io/Prey_Predator_Genetic_Algorithm/

0 seconds             |  60 seconds |    120 seconds     
:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i1.png)  |  ![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i2.png) |  ![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i3.png)

180 seconds             |  240 seconds |    300 seconds     
:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i1.png)  |  ![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i2.png) |  ![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i3.png)

360 seconds             |  420 seconds |    480 seconds     
:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i1.png)  |  ![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i2.png) |  ![](https://github.com/Hemant27031999/Prey_Predator_Genetic_Algorithm/blob/master/Images/i3.png)


This implementation explores techniques for simulating the process of evolution in an ecosystem of pseudo-living beings. The objects that move about the screen meet each other, mate, and pass their genes on to a new generation and this ensures the continuation of fittest of all beings only as the world evolves.

## What are genetic algorithms ?
The genetic algorithm is a method for solving both constrained and unconstrained optimization problems that is based on natural selection, the process that drives biological evolution. The genetic algorithm repeatedly modifies a population of individual by selecting the most fittest individual from the current population to be parents and uses their genes to produce the children for the next generation.

The genetic algorithm uses three main types of rules at each step to create the next generation from the current population:

* **Selection rules** select the individuals, called parents, that contribute to the population at the next generation.

* **Crossover rules** combine two parents to form children for the next generation.

* **Mutation rules** apply random changes to individual parents to form children.

This project does not uses the Crossover rule and make the next generation using the single parent only.

## Assumptions made for the particles
* Predators does not harm each other.
* Preys does not harm each other.
* The bigger the particles, the slower they are and vice versa.
* The Prey and Predator both have almost similar speed and acceleration.
* The Predator can only eat Preys which are neither too big nor too small with respect to their size.
* Preys reproduce faster than Predators.
* Only one predator feeds on a single prey.
* The Predator will try to catch the Prey which is nearest to it and only if it is hungry (presentHealth < 5/6 * maximumHealth).

Edge cases are not covered i.e. if the prey once crosses the border and reaches the other side, the Predator which was chasing this prey loose the knowledge of it.

The Prey eats the grass only if it appears in its way, it is not attracted towards it.

## Observations
* The most fittest particles manages to escape the predator with maximum probability and hence continue to pass on their genes, making the major population of new generation.
* Their are high chances of prey escaping from the predator if it gets into a group of other preys while chased by the predator because predator than tries to catch other also and get confused.
* Neither the most fastest nor the most biggest are best of all population. Bigger (but slow) are slow in reacting to external environment and faster prey (but small) are least probable of finding the food.

## Contributing
* Their is a huge scope of improvement in this project. Just send a PR if you want to contribute.

## References
Daniel Shiffman's [Nature of Code](https://natureofcode.com/book/chapter-9-the-evolution-of-code/)
