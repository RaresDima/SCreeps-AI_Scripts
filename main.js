let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');

let population = require('population.maintain');



module.exports.loop = function () {
    
    population.maintainPopulationOf('builder', 5);
    population.maintainPopulationOf('upgrader', 2);
    population.maintainPopulationOf('harvester', 1);

    for (let spawn in Game.spawns) { // For each room
        
        roleHarvester.dispatchHarvesters(Game.spawns[spawn].room);
        
        roleUpgrader.dispatchUpgraders(Game.spawns[spawn].room);

        roleBuilder.dispatchBuilders(Game.spawns[spawn].room);
    }
};