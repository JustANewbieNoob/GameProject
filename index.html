<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dungeon Adventure</title>
  <style>
    /* Dark Mode and Light Mode Styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      transition: background-color 0.3s, color 0.3s;
    }
    .dark {
      background-color: #1e1e1e;
      color: #f1f1f1;
    }
    .light {
      background-color: #f4f4f4;
      color: #333;
    }
    #game-status {
      margin-bottom: 10px;
    }
    #game-output {
      height: 300px;
      overflow-y: scroll;
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
      background-color: #333;
      color: #f1f1f1;
    }
    #game-input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
    }
    button {
      padding: 10px 20px;
      margin: 10px 0;
      cursor: pointer;
    }
    button:focus {
      outline: none;
    }
  </style>
</head>
<body class="dark">
  <button id="mode-toggle">Toggle Light/Dark Mode</button>

  <div id="game-status">
    <p id="status-level">Level: 1</p>
    <p id="status-health">Health: 100</p>
    <p id="status-potions">Potions: 3</p>
    <p id="status-gold">Gold: 0</p>
    <p id="status-attack">Attack: 10</p>
  </div>

  <div id="game-output"></div>
  <input id="game-input" type="text" placeholder="Enter your action here...">

  <script>
    // Game Variables
    let level = 1;
    let player = {
        health: 100,
        attack: 10,
        inventory: {
            potion: 3 // Start with 3 health potions
        },
        gold: 0
    };

    let monster = {
        health: 0,
        attack: 0
    };

    // DOM Elements
    const output = document.getElementById('game-output');
    const input = document.getElementById('game-input');
    const statusLevel = document.getElementById('status-level');
    const statusHealth = document.getElementById('status-health');
    const statusPotions = document.getElementById('status-potions');
    const statusGold = document.getElementById('status-gold');
    const statusAttack = document.getElementById('status-attack');

    // Display a message in the game output
    function logMessage(message) {
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        output.appendChild(newMessage);
        output.scrollTop = output.scrollHeight; // Auto-scroll
    }

    // Initialize a new level
    function startLevel() {
        if (level % 10 === 0) {
            logMessage(`Level ${level}: A Boss Monster appears!`);
            monster.health = Math.floor(50 + level * 10); // Higher health for bosses
            monster.attack = Math.floor(10 + level * 5); // Stronger attack
            logMessage(`Boss Health: ${monster.health}, Attack: ${monster.attack}`);
        } else {
            logMessage(`Level ${level}: You enter a dark dungeon.`);
            monster.health = Math.floor(20 + level * 5);
            monster.attack = Math.floor(5 + level * 2);
            logMessage(`A monster appears! Health: ${monster.health}, Attack: ${monster.attack}`);
        }
        logMessage('What will you do? (attack, heal, use potion, flee, inspect, defend, inventory)');
    }

    // Handle player actions
    function handleAction(action) {
        if (action === 'attack') {
            const damage = Math.floor(Math.random() * player.attack) + 1;
            monster.health -= damage;
            logMessage(`You attack the monster for ${damage} damage.`);
            if (monster.health <= 0) {
                logMessage('You defeated the monster!');
                level++;
                player.gold += Math.floor(Math.random() * 10) + 1; // Random gold drop
                updateStatus();
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
                const heal = 25; // Fixed healing amount
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
                input.disabled = true;
            }
        } else if (action === 'inventory') {
            logMessage(`Inventory: ${JSON.stringify(player.inventory)}`);
        } else {
            logMessage('Invalid action. Try "attack", "heal", "use potion", "flee", "inspect", "defend", or "inventory".');
        }
    }

    // Monster's turn to attack
    function monsterTurn() {
        const damage = Math.floor(Math.random() * monster.attack) + 1;
        player.health -= damage;
        logMessage(`The monster attacks you for ${damage} damage. Health: ${player.health}`);
        if (player.health <= 0) {
            logMessage('You have been defeated. Game Over!');
            input.disabled = true;
        }
    }

    // Update game status display
    function updateStatus() {
        statusLevel.textContent = `Level: ${level}`;
        statusHealth.textContent = `Health: ${player.health}`;
        statusPotions.textContent = `Potions: ${player.inventory.potion}`;
        statusGold.textContent = `Gold: ${player.gold}`;
        statusAttack.textContent = `Attack: ${player.attack}`;
    }

    // Input event listener
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const action = input.value.toLowerCase().trim();
            input.value = '';
            handleAction(action);
        }
    });

    // Toggle light/dark mode
    document.getElementById('mode-toggle').addEventListener('click', () => {
        const body = document.body;
        body.classList.toggle('dark');
        body.classList.toggle('light');
    });

    // Start the game
    logMessage('Welcome to Dungeon Adventure! Type your actions below.');
    startLevel();
  </script>
</body>
</html>
