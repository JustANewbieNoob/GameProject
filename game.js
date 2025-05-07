// Game Variables
let level = 1;
let player = {
    health: 100,
    attack: 10, // Default attack for the fist (randomized)
    inventory: {
        potion: 3, // Start with 3 health potions
        gold: 0 // Start with no gold
    },
    weapon: null, // No weapon at the start, only fists
    equippedWeapon: 'Fist', // Start with Fist equipped
    specialAbilitiesCooldown: 0 // Cooldown for special abilities
};

let monster = {
    health: 0,
    attack: 0
};

// Weapon and Scroll Data (including special abilities)
const weapons = {
    common: [
        { name: 'Rusty Sword', damage: [5, 7], special: 'Slash', effect: 'Damage over 2 turns', cooldown: 3 },
        { name: 'Old Dagger', damage: [3, 5], special: 'Quick Strike', effect: 'First strike faster', cooldown: 3 },
        { name: 'Wooden Hammer', damage: [4, 6], special: 'Smash', effect: 'Stuns enemy', cooldown: 3 }
    ],
    rare: [
        { name: 'Silver Sword', damage: [7, 10], special: 'Heavy Slash', effect: 'Double damage', cooldown: 3 },
        { name: 'Steel Dagger', damage: [5, 8], special: 'Rapid Strike', effect: 'Hits twice', cooldown: 3 },
        { name: 'Iron Hammer', damage: [6, 9], special: 'Crush', effect: 'Lower enemy defense', cooldown: 3 }
    ],
    epic: [
        { name: 'Golden Sword', damage: [10, 15], special: 'Power Slash', effect: 'Critical damage', cooldown: 3 },
        { name: 'Mystic Dagger', damage: [8, 12], special: 'Teleport Slash', effect: 'Avoids damage on next turn', cooldown: 3 },
        { name: 'Platinum Hammer', damage: [9, 13], special: 'Titan Smash', effect: 'Affects area of effect', cooldown: 3 }
    ],
    legendary: [
        { name: 'Dragon Slayer', damage: [15, 20], special: 'Flame Strike', effect: 'Burns enemy', cooldown: 4 },
        { name: 'Celestial Dagger', damage: [12, 18], special: 'Shadow Step', effect: 'Doubles damage for 1 turn', cooldown: 4 },
        { name: 'Thunder Hammer', damage: [13, 19], special: 'Storm Strike', effect: 'Deals AoE damage', cooldown: 4 }
    ]
};

const scrolls = [
    { name: 'Fireball Scroll', effect: 'Deals fire damage to enemy', cooldown: 4 },
    { name: 'Heal Scroll', effect: 'Restores 30 health', cooldown: 4 },
    { name: 'Teleport Scroll', effect: 'Escape to a previous level', cooldown: 4 }
];

// DOM Elements
const output = document.getElementById('game-output');
const input = document.getElementById('game-input');
const statusLevel = document.getElementById('status-level');
const statusHealth = document.getElementById('status-health');
const statusPotions = document.getElementById('status-potions');
const statusGold = document.getElementById('status-gold');
const restartButton = document.getElementById('restart-button');

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.getElementById('dark-mode-toggle');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Restart the Game
function restartGame() {
    level = 1;
    player = {
        health: 100,
        attack: 10,
        inventory: { potion: 3, gold: 0 },
        weapon: null,
        equippedWeapon: 'Fist',
        specialAbilitiesCooldown: 0
    };
    monster = { health: 0, attack: 0 };
    output.innerHTML = ''; // Clear output
    updateGameStatus();
    startLevel(); // Restart the first level
}

// Update the Game Status UI
function updateGameStatus() {
    statusLevel.textContent = `Level: ${level}`;
    statusHealth.textContent = `Health: ${player.health}`;
    statusPotions.textContent = `Potions: ${player.inventory.potion}`;
    statusGold.textContent = `Gold: ${player.inventory.gold}`;
}

// Display a message in the game output
function logMessage(message) {
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    output.appendChild(newMessage);
    output.scrollTop = output.scrollHeight; // Auto-scroll
}

// Initialize a new level
function startLevel() {
    // Nerfed monster stats
    const monsterHealth = Math.floor(10 + level * 2); // Reduced monster health scaling
    const monsterAttack = Math.floor(3 + level * 1); // Reduced monster attack scaling
    const goldDrop = Math.floor(5 + level * 3); // Gold drops more as the level increases

    if (level % 10 === 0) {
        logMessage(`Level ${level}: A Boss Monster appears!`);
        monster.health = Math.floor(30 + level * 5); // Boss monsters are still stronger, but nerfed
        monster.attack = Math.floor(7 + level * 2); // Boss monsters' attacks are still higher
    } else {
        logMessage(`Level ${level}: You enter a dark dungeon.`);
        monster.health = monsterHealth;
        monster.attack = monsterAttack;
    }

    logMessage(`A monster appears! Health: ${monster.health}, Attack: ${monster.attack}`);
    logMessage('What will you do? (attack, heal, use potion, flee, inspect, defend, inventory)');
    logMessage(`Gold dropped: ${goldDrop}`);

    player.inventory.gold += goldDrop; // Add gold drop to player’s inventory
    updateGameStatus(); // Update status with new gold

    // Chance for a weapon or scroll drop
    if (Math.random() < 0.2) {
        dropItem();
    }
}

// Drop a weapon or scroll based on random chance
function dropItem() {
    const dropChance = Math.random();
    let item = null;

    if (dropChance < 0.1) { // 10% chance for a weapon
        const rarity = getWeaponRarity();
        item = getRandomItem(weapons[rarity]);
        logMessage(`You found a ${item.name} (${rarity} weapon)!`);
        player.weapon = item; // Equip the weapon
        player.equippedWeapon = item.name;
    } else if (dropChance < 0.2) { // 10% chance for a scroll
        item = scrolls[Math.floor(Math.random() * scrolls.length)];
        logMessage(`You found a ${item.name} (${item.effect}) scroll!`);
    }
}

// Get a random rarity for weapon drop
function getWeaponRarity() {
    const rarityRoll = Math.random();
    if (rarityRoll < 0.5) return 'common';
    if (rarityRoll < 0.8) return 'rare';
    if (rarityRoll < 0.95) return 'epic';
    return 'legendary'; // 5% chance for legendary items
}

// Get a random item from a set of weapons
function getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

// Handle player actions
function handleAction(action) {
    if (action === 'attack') {
        if (player.specialAbilitiesCooldown > 0) {
            logMessage(`You cannot use your special abilities. Cooldown: ${player.specialAbilitiesCooldown} turns.`);
            return;
        }
        const damage = getRandomDamage(player.attack);
        monster.health -= damage;
        logMessage(`You attack the monster for ${damage} damage using your ${player.equippedWeapon}.`);
        if (monster.health <= 0) {
            logMessage('You defeated the monster!');
            level++;
            if (level > 100) {
                logMessage('Congratulations! You have conquered the dungeon and defeated all monsters!');
                input.disabled = true;
                return;
            }
            startLevel();
        } else {
            monsterTurn();
        }
    } else if (action === 'heal') {
        const heal = Math.floor(Math.random() * 15) + 1;
        player.health = Math.min(100, player.health + heal);
        logMessage(`You heal yourself for ${heal}. Health: ${player.health}`);
        monsterTurn();
    } else if (action === 'use potion') {
        if (player.inventory.potion > 0) {
            const heal = 25;
            player.health = Math.min(100, player.health + heal);
            player.inventory.potion--;
            logMessage(`You used a potion and healed for ${heal}. Health: ${player.health}. Potions left: ${player.inventory.potion}`);
        } else {
            logMessage('You have no potions left!');
        }
        monsterTurn();
    } else if (action === 'flee') {
        logMessage('You flee to the previous level!');
        level = Math.max(1, level - 1);
        startLevel();
    } else if (action === 'inspect') {
        logMessage(`Monster stats - Health: ${monster.health}, Attack: ${monster.attack}`);
    } else if (action === 'defend') {
        const reducedDamage = Math.floor(Math.random() * (monster.attack / 2)) + 1;
        player.health -= reducedDamage;
        logMessage(`You defend and reduce damage! Monster attacks for ${reducedDamage}. Health: ${player.health}`);
        if (player.health <= 0) {
            logMessage('You have been defeated. Game Over!');
        }
    } else if (action === 'inventory') {
        logMessage(`Inventory: ${JSON.stringify(player.inventory)}`);
    } else {
        logMessage('Invalid action. Try "attack", "heal", "use potion", "flee", "inspect", "defend", or "inventory".');
    }
}

// Monster's turn to attack
function monsterTurn() {
    const damage = getRandomDamage(monster.attack);
    player.health -= damage;
    logMessage(`The monster attacks you for ${damage} damage. Health: ${player.health}`);
    if (player.health <= 0) {
        logMessage('You have been defeated. Game Over!');
        input.disabled = true;
    }
}

// Get random damage based on a weapon's attack value
function getRandomDamage(baseAttack) {
    return Math.floor(Math.random() * baseAttack) + 1;
}

// Listen for the player's input and process the action
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const action = input.value.trim().toLowerCase();
        input.value = ''; // Clear input field after submission
        handleAction(action);
    }
});

// Start the game
startLevel();
