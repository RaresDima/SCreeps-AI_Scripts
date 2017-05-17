function run(creep) {

    if(creep.memory.building && creep.carry.energy === 0) {
        creep.memory.building = false;
        creep.say('c: Harvesting!');
	}
	
	if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
	    creep.memory.building = true;
	    creep.say('🚧 Building >:D<');
	}

	if(creep.memory.building) {
	    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        if(targets.length) {
            if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
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

    if(creep.memory.building && creep.carry.energy === 0) {
        creep.memory.building = false;
        creep.say('c: Harvesting!');
	}
	
	if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
	    creep.memory.building = true;
	    creep.say('🚧 Building >:D<');
	}

    
	if(creep.memory.building) { // Try to repair
	    
	    let targets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});

        targets.sort((a,b) => a.hits - b.hits);

        if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        else { // Try to sonstruct if no repairs needed
	    
	        targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
            if(targets.length > 0) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
	else {
	    let sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[src]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[src], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	}
}



function dispatchBuilders(room) {
        let builders = room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role === 'builder'}}); // Find builders
        let sources = room.find(FIND_SOURCES).length;
        let currSrc = 1;
        for (let builder in builders) {
            runToSource(builders[builder], currSrc);
            currSrc = (currSrc + 1) % sources;
        }
}


module.exports = {
    dispatchBuilders
};