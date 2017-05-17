function cleanDeadCreeps() {
    for(let name in Memory.creeps)
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
}

function countValidCreeps(rm, role) {
    let validCreeps = {};
    
    for (let creep in Game.creeps)
        if (Game.creeps[creep].room === rm && Game.creeps[creep].memory.role === role)
            validCreeps[creep] = Game.creeps[creep];
            
    return validCreeps;
}

function countElements(collection) {
    let cnt = 0;
    for (let i in collection)
        cnt += 1;
    return cnt;
}



function maintainPopulationOf(role, n) {
    
    cleanDeadCreeps();
    
    for (let spawn in Game.spawns) {
        
        if (role == 'harvester')
            n *= Game.spawns[spawn].room.find(FIND_SOURCES).length;

        let currentRoom = Game.spawns[spawn].room; // Get room

        let creepsWithRole = countValidCreeps(currentRoom, role);
 
        if(countElements(creepsWithRole) < n && Game.spawns[spawn].room.energyAvailable >= 300) {
            console.log('Spawning new ' + role + ': ' + Game.spawns[spawn].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: role}));
            console.log(currentRoom + ' ' + role + ': ' + Game.spawns[spawn].room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role === role}}));
        }
       //console.log(currentRoom + ' ' + role + ': ' + Game.spawns[spawn].room.find(FIND_MY_CREEPS, {filter: (creep) => {return creep.memory.role == role}}));
    }
}



module.exports = { 
    maintainPopulationOf
};