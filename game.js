// Game Variables
let level = 1;
let player = {
    health: 100,
    attack: 10,
    inventory: {
        potion: 3
    },
    magicBoostTurns: 0 // Track magic scroll buff turns
};

let monster = {
    health: 0,
    attack: 0
};

const output = document.getElementById('game-output');
const input = document.getElementById('game-input');
const statusLevel = document.getElementById('status-level');
const statusHealth = document.getElementById('status-health');
const statusPotions = document.getElementById('status-potions');
const themeToggle = document.getElementById('theme-toggle');

// Items descriptions (optional if you want to display)
const itemDescriptions = {
    potion: "Heals 25 HP",
    elixir: "Full heal",
    magic_scroll: "Boosts your attack for 3 turns, executes weak monsters",
    gold: "Shiny!"
};

function logMessage(message) {
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    output.appendChild(newMessage);
    output.scrollTop = output.scrollHeight;
}

function updateStats() {
    statusLevel.textContent = `Level: ${level}`;
    statusHealth.textContent = `Health: ${player.health}`;
    statusPotions.textContent = `Potions: ${player.inventory.potion || 0}`;
}

function randomItemDrop() {
    const items = ['potion', 'elixir', 'magic_scroll', 'gold'];
    const dropChance = Math.random();
    if (dropChance < 0.5) {
        const item = items[Math.floor(Math.random() * items.length)];
        if (player.inventory[item]) {
            player.inventory[item]++;
        } else {
            player.inventory[item] = 1;
        }
        logMessage(`You found a ${item.replace('_', ' ')}!`);
    }
}

function startLevel() {
    if (level % 10 === 0) {
        logMessage(`Level ${level}: A Boss Monster appears!`);
        monster.health = Math.floor(50 + level * 10);
        monster.attack = Math.floor(10 + level * 5);
    } else {
        logMessage(`Level ${level}: You enter a dark dungeon.`);
        monster.health = Math.floor(20 + level * 5);
        monster.attack = Math.floor(5 + level * 2);
    }
    logMessage(`Monster appears! Health: ${monster.health}, Attack: ${monster.attack}`);
    logMessage('What will you do? (attack, heal, use potion, use magic scroll, flee, inspect, defend, inventory)');
    updateStats();
}

function handleAction(action) {
    if (action === 'attack') {
        let baseDamage = Math.floor(Math.random() * player.attack) + 1;
        if (player.magicBoostTurns > 0) {
            baseDamage = Math.floor(baseDamage * 1.5); // 50% more damage
        }
        monster.health -= baseDamage;
        logMessage(`You attack the monster for ${baseDamage} damage.`);

        // Check for execution
        if (player.magicBoostTurns > 0 && monster.health > 0 && monster.health < 10) {
            logMessage('Magic Scroll activates! You execute the monster!');
            monster.health = 0;
        }

        if (monster.health <= 0) {
            logMessage('You defeated the monster!');
            randomItemDrop();
            level++;
            if (level > 100) {
                logMessage('Congratulations! You have conquered the dungeon!');
                input.disabled = true;
                return;
            }
            startLevel();
        } else {
            monsterTurn();
        }

        if (player.magicBoostTurns > 0) {
            player.magicBoostTurns--;
        }

    } else if (action === 'heal') {
        const heal = Math.floor(Math.random() * 15) + 1;
        player.health = Math.min(100, player.health + heal);
        logMessage(`You heal yourself for ${heal}. Health: ${player.health}`);
        monsterTurn();

    } else if (action === 'use potion') {
        if (player.inventory.potion > 0) {
            player.health = Math.min(100, player.health + 25);
            player.inventory.potion--;
            logMessage(`You used a potion. Health: ${player.health}`);
        } else {
            logMessage('You have no potions left!');
        }
        monsterTurn();

    } else if (action === 'use magic scroll') {
        if (player.inventory.magic_scroll > 0) {
            player.magicBoostTurns = 3;
            player.inventory.magic_scroll--;
            logMessage('You use a magic scroll! Attack boosted for 3 turns!');
        } else {
            logMessage('You have no magic scrolls!');
        }
    } else if (action === 'flee') {
        logMessage('You flee to the previous level.');
        level = Math.max(1, level - 1);
        startLevel();

    } else if (action === 'inspect') {
        logMessage(`Monster stats - Health: ${monster.health}, Attack: ${monster.attack}`);

    } else if (action === 'defend') {
        const reducedDamage = Math.floor(Math.random() * (monster.attack / 2)) + 1;
        player.health -= reducedDamage;
        logMessage(`You defend! Monster attacks for ${reducedDamage}. Health: ${player.health}`);
        if (player.health <= 0) {
            logMessage('You have been defeated. Game Over.');
            input.disabled = true;
        }

    } else if (action === 'inventory') {
        const inventoryList = Object.entries(player.inventory)
            .map(([item, count]) => `${item.replace('_', ' ')}: ${count}`)
            .join(', ');
        logMessage(`Inventory: ${inventoryList}`);

    } else {
        logMessage('Invalid action. Try "attack", "heal", "use potion", "use magic scroll", "flee", "inspect", "defend", or "inventory".');
    }
    updateStats();
}

function monsterTurn() {
    const damage = Math.floor(Math.random() * monster.attack) + 1;
    player.health -= damage;
    logMessage(`The monster attacks you for ${damage} damage. Health: ${player.health}`);
    if (player.health <= 0) {
        logMessage('You have been defeated. Game Over.');
        input.disabled = true;
    }
    updateStats();
}

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// Input listener
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const action = input.value.toLowerCase().trim();
        input.value = '';
        handleAction(action);
    }
});

// Start the game
logMessage('Welcome to Dungeon Adventure! Type your actions below.');
startLevel();
