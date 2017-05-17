function run(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        let sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            creep.say('Harvesting... -_-');
        }
    }
    else {
        let targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_EXTENSION ||
                                                                                        structure.structureType === STRUCTURE_SPAWN ||
                                                                                        structure.structureType === STRUCTURE_TOWER)
                                                                                        && 
                                                                                        structure.energy < structure.energyCapacity;}});
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('Depositing! $_$');
            }
        }
        
        
    }
}



function runToSource(creep, src) {
    if (creep.carry.energy < creep.carryCapacity) {
        let sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[src]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[src], {visualizePathStyle: {stroke: '#ffaa00'}});
            creep.say('Harvesting... -_-');
        }
    }
    else {
        let targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_EXTENSION ||
                                                                                        structure.structureType === STRUCTURE_SPAWN ||
                                                                                        structure.structureType === STRUCTURE_TOWER)
                                                                                        && 
                                                                                        structure.energy < structure.energyCapacity;}});
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                creep.say('Depositing! $_$');
            }
        }
        else {
            for (let s in Game.spawns) {
                if (Game.spawns[s].room === creep.room)
                    creep.moveTo(Game.spawns[s]);
            }
        }
    }
}



function dispatchHarvesters(room) {
        let harvesters = room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role === 'harvester'}}); // Find harvesters
        let sources = room.find(FIND_SOURCES).length;
        let currSrc = 0;
        for (let harvester in harvesters) {
            runToSource(harvesters[harvester], currSrc);
            currSrc = (currSrc + 1) % sources;
        }
}



module.exports = {
    run,
    runToSource,
    dispatchHarvesters
};