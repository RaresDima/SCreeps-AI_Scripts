function run(creep) {

    if(creep.memory.upgrading && creep.carry.energy === 0) {
        creep.memory.upgrading = false;
        creep.say('^^ harvest!');
    }
    if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
        creep.memory.upgrading = true;
        creep.say('⚡ upgrade o.o');
    }

    if(creep.memory.upgrading) {
        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        let sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}



function runToSource(creep, src) {
    
    if(creep.memory.upgrading && creep.carry.energy === 0) {
        creep.memory.upgrading = false;
        creep.say(';) Harvesting');
    }
    if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
        creep.memory.upgrading = true;
        creep.say('⚡ Upgrading :P');
    }

    if(creep.memory.upgrading) {
        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        let sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[src]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[src], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}



function dispatchUpgraders(room) {
    let upgraders = room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role === 'upgrader'}}); // Find upgraders
    let sources = room.find(FIND_SOURCES).length;
    let currSrc = 0;
    for (let upgrader in upgraders) {
        runToSource(upgraders[upgrader], currSrc);
        currSrc = (currSrc + 1) % sources;
    }
}


module.exports = {
    dispatchUpgraders
};