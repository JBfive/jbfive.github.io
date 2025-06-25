// Terminal Portfolio JavaScript

// Boot sequence and initial setup
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('bootSequence').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }, 4500);
});

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    
    // Hide main menu
    const menu = document.querySelector('.menu-section');
    if (menu) menu.style.display = 'none';
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        typeEffect(targetSection.querySelector('.section-content'), 50);
    }
}

function showMenu() {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    
    // Show main menu
    const menu = document.querySelector('.menu-section');
    if (menu) menu.style.display = 'block';
}

// Typewriter effect
function typeEffect(element, speed = 30) {
    if (!element) return;
    
    const text = element.innerHTML;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(function() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Resume download function
function downloadResume() {
    // Create a sample resume file
    const resumeContent = `
DevOps Engineer Resume
======================

Name: Your Name
Email: your.email@domain.com
Phone: (555) 123-4567

EXPERIENCE:
- Senior DevOps Engineer at TechCorp (2020-Present)
- Cloud Infrastructure Engineer at StartupXYZ (2018-2020)
- Systems Administrator at BigCorp (2016-2018)

SKILLS:
- AWS, Azure, GCP
- Docker, Kubernetes
- Terraform, Ansible
- Jenkins, GitLab CI/CD
- Python, Bash, Go
- Prometheus, Grafana

CERTIFICATIONS:
- AWS Certified Solutions Architect
- Certified Kubernetes Administrator (CKA)
- HashiCorp Certified: Terraform Associate
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show download message
    alert('Resume downloaded! (This is a sample - replace with your actual resume)');
}

// Adventure Game
let adventureState = {
    currentScene: 'start',
    choices: []
};

const adventureStory = {
    start: {
        text: "You are a DevOps engineer on your first day at a new company.\nThe production server is down, and everyone is looking at you!\nWhat do you do first?",
        choices: [
            { text: "Check the logs", action: "logs" },
            { text: "Restart the server", action: "restart" },
            { text: "Panic and blame the previous DevOps engineer", action: "panic" }
        ],
        ascii: `
       🏰
      /||\    Welcome to the
     / || \   DevOps Adventure!
    |  ||  |
    |______|
        `
    },
    logs: {
        text: "Smart choice! You check the logs and find:\n'ERROR: Database connection timeout'\nThe database server seems to be the issue.",
        choices: [
            { text: "Check database server status", action: "db_check" },
            { text: "Restart the database", action: "db_restart" },
            { text: "Call the database admin", action: "call_dba" }
        ],
        ascii: `
    📋 LOGS
   ▓▓▓▓▓▓▓▓▓
   ▓ ERROR ▓
   ▓ FOUND ▓
   ▓▓▓▓▓▓▓▓▓
        `
    },
    restart: {
        text: "You restart the server without checking anything first.\nThe server comes back up but crashes again after 2 minutes.\nEveryone is still staring at you...",
        choices: [
            { text: "Now check the logs", action: "logs" },
            { text: "Restart again", action: "restart_again" },
            { text: "Pretend everything is fine", action: "pretend" }
        ],
        ascii: `
    🔄 RESTART
   ╔═══════════╗
   ║ REBOOTING ║
   ║     .     ║
   ║    ...    ║
   ║   .....   ║
   ╚═══════════╝
        `
    },
    panic: {
        text: "You start panicking and blaming the previous engineer.\nYour manager walks over with a disappointed look.\n'This is exactly why we hired you - to fix problems, not create drama.'",
        choices: [
            { text: "Apologize and check the logs", action: "logs" },
            { text: "Double down on blaming others", action: "fired" },
            { text: "Take a deep breath and start over", action: "start" }
        ],
        ascii: `
    😱 PANIC MODE
   ┌─────────────┐
   │ BLAME GAME  │
   │    ACTIVE   │
   │  ¯\_(ツ)_/¯ │
   └─────────────┘
        `
    },
    db_check: {
        text: "Excellent! You check the database server and discover it's running out of disk space.\nYou clean up old log files and the database comes back online.\nProduction is restored! Your team cheers!",
        choices: [
            { text: "Set up monitoring to prevent this", action: "monitoring" },
            { text: "Document the incident", action: "document" },
            { text: "Celebrate with the team", action: "celebrate" }
        ],
        ascii: `
    🎉 SUCCESS!
   ╔═══════════╗
   ║ HERO MODE ║
   ║  ENGAGED  ║
   ║    🚀     ║
   ╚═══════════╝
        `
    },
    db_restart: {
        text: "You restart the database, which temporarily fixes the issue.\nBut you didn't address the root cause - disk space.\nThe problem will return tomorrow...",
        choices: [
            { text: "Investigate the root cause", action: "db_check" },
            { text: "Hope it doesn't happen again", action: "hope" },
            { text: "Set up monitoring", action: "monitoring" }
        ],
        ascii: `
    🔄 TEMP FIX
   ┌─────────────┐
   │  BAND-AID   │
   │  SOLUTION   │
   │     😬      │
   └─────────────┘
        `
    },
    monitoring: {
        text: "You set up comprehensive monitoring with Prometheus and Grafana.\nDisk space, memory, CPU - everything is now tracked.\nYou've become the monitoring hero of the company!",
        choices: [
            { text: "Start the adventure again", action: "start" }
        ],
        ascii: `
    📊 MONITORING
   ╔═══════════╗
   ║ DASHBOARDS║
   ║ EVERYWHERE║
   ║    📈📉   ║
   ╚═══════════╝
        `
    },
    fired: {
        text: "Your manager shakes their head.\n'This isn't working out. Please clear your desk.'\nGame Over! Sometimes attitude matters more than technical skills.",
        choices: [
            { text: "Try again with a better attitude", action: "start" }
        ],
        ascii: `
    💼 GAME OVER
   ┌─────────────┐
   │   FIRED!    │
   │  Learn from │
   │  mistakes   │
   └─────────────┘
        `
    }
};

function startAdventure() {
    showSection('adventure');
    adventureState.currentScene = 'start';
    updateAdventure();
}

function updateAdventure() {
    const scene = adventureStory[adventureState.currentScene];
    if (!scene) return;
    
    const contentDiv = document.getElementById('adventure-content');
    const textDiv = document.getElementById('adventure-text');
    const choicesDiv = document.getElementById('adventure-choices');
    
    // Update ASCII art
    const asciiDiv = contentDiv.querySelector('.ascii-art');
    asciiDiv.textContent = scene.ascii;
    
    // Update text
    textDiv.innerHTML = `<p>${scene.text.replace(/\n/g, '</p><p>')}</p>`;
    
    // Update choices
    choicesDiv.innerHTML = '';
    scene.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = `${index + 1}. ${choice.text}`;
        button.onclick = () => adventureChoice(choice.action);
        choicesDiv.appendChild(button);
    });
}

function adventureChoice(action) {
    adventureState.currentScene = action;
    adventureState.choices.push(action);
    updateAdventure();
}

// Rock Paper Scissors Game
let rpsGame = {
    playerScore: 0,
    computerScore: 0
};

const rpsChoices = {
    rock: {
        name: 'Rock',
        beats: 'scissors',
        ascii: `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
        `
    },
    paper: {
        name: 'Paper',
        beats: 'rock',
        ascii: `
    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)
        `
    },
    scissors: {
        name: 'Scissors',
        beats: 'paper',
        ascii: `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
        `
    }
};

function startRockPaperScissors() {
    showSection('rps');
    updateRpsScore();
}

function playRPS(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let result = '';
    let resultClass = '';
    
    if (playerChoice === computerChoice) {
        result = "It's a tie!";
        resultClass = 'tie';
    } else if (rpsChoices[playerChoice].beats === computerChoice) {
        result = "You win this round!";
        rpsGame.playerScore++;
        resultClass = 'win';
    } else {
        result = "Computer wins this round!";
        rpsGame.computerScore++;
        resultClass = 'lose';
    }
    
    const resultDiv = document.getElementById('rps-result');
    resultDiv.innerHTML = `
        <div class="rps-round-result">
            <p><strong>You chose:</strong> ${rpsChoices[playerChoice].name}</p>
            <pre class="choice-ascii">${rpsChoices[playerChoice].ascii}</pre>
            <p><strong>Computer chose:</strong> ${rpsChoices[computerChoice].name}</p>
            <pre class="choice-ascii">${rpsChoices[computerChoice].ascii}</pre>
            <p class="${resultClass}"><strong>${result}</strong></p>
        </div>
    `;
    
    updateRpsScore();
    
    // Check for game end
    if (rpsGame.playerScore >= 5 || rpsGame.computerScore >= 5) {
        setTimeout(() => {
            const winner = rpsGame.playerScore >= 5 ? 'You' : 'Computer';
            const winnerAscii = rpsGame.playerScore >= 5 ? 
                `
    🎉 VICTORY! 🎉
   ╔═══════════╗
   ║  YOU WIN  ║
   ║    THE    ║
   ║   GAME!   ║
   ╚═══════════╝
                ` : 
                `
    💻 DEFEAT 💻
   ╔═══════════╗
   ║ COMPUTER  ║
   ║   WINS    ║
   ║   GAME    ║
   ╚═══════════╝
                `;
            
            resultDiv.innerHTML = `
                <div class="game-over">
                    <pre class="victory-ascii">${winnerAscii}</pre>
                    <p><strong>${winner} won the game!</strong></p>
                    <p>Final Score - You: ${rpsGame.playerScore}, Computer: ${rpsGame.computerScore}</p>
                    <button onclick="resetRPS()" style="margin-top: 15px; background: transparent; border: 1px solid #00ff00; color: #00ff00; padding: 8px 15px; font-family: 'Courier Prime', monospace; cursor: pointer; border-radius: 3px;">Play Again</button>
                </div>
            `;
        }, 2000);
    }
}

function updateRpsScore() {
    document.getElementById('player-score').textContent = rpsGame.playerScore;
    document.getElementById('computer-score').textContent = rpsGame.computerScore;
}

function resetRPS() {
    rpsGame.playerScore = 0;
    rpsGame.computerScore = 0;
    updateRpsScore();
    document.getElementById('rps-result').innerHTML = '';
}

// Terminal effects
function addTerminalEffect() {
    const terminalBody = document.querySelector('.terminal-body');
    
    // Add random flicker effect
    setInterval(() => {
        if (Math.random() < 0.02) { // 2% chance every interval
            terminalBody.style.opacity = '0.95';
            setTimeout(() => {
                terminalBody.style.opacity = '1';
            }, 50);
        }
    }, 100);
}

// Initialize terminal effects
window.addEventListener('DOMContentLoaded', function() {
    addTerminalEffect();
    
    // Add welcome message after boot
    setTimeout(() => {
        console.log(`
╔═══════════════════════════════════════╗
║        Welcome to the Matrix!         ║
║     Terminal Portfolio Activated      ║
║                                       ║
║  Try typing 'help' in the console     ║
║  for some hidden Easter eggs... 🐰    ║
╚═══════════════════════════════════════╝
        `);
    }, 5000);
});

// Console Easter eggs
const easterEggs = {
    help: () => {
        console.log(`
Available commands:
- matrix(): Enter the Matrix
- hack(): Initiate hacking sequence
- coffee(): Check coffee status
- sudo(): Become root
- exit(): There is no exit...
        `);
    },
    
    matrix: () => {
        console.log("Taking the red pill...");
        let lines = ['01001000', '01100101', '01101100', '01101100', '01101111'];
        let i = 0;
        const matrixInterval = setInterval(() => {
            console.log(lines[Math.floor(Math.random() * lines.length)]);
            i++;
            if (i > 20) clearInterval(matrixInterval);
        }, 200);
    },
    
    hack: () => {
        console.log("Initializing hack sequence...");
        console.log("Bypassing firewall... SUCCESS");
        console.log("Accessing mainframe... SUCCESS");
        console.log("Downloading secret files... SUCCESS");
        console.log("Just kidding! This is just a portfolio site 😄");
    },
    
    coffee: () => {
        const coffeeLevel = Math.floor(Math.random() * 100);
        console.log(`Coffee level: ${coffeeLevel}%`);
        if (coffeeLevel < 30) {
            console.log("⚠️  CRITICAL: Refill immediately!");
        } else if (coffeeLevel < 60) {
            console.log("⚡ MODERATE: Consider a refill soon");
        } else {
            console.log("✅ OPTIMAL: Ready for coding!");
        }
    },
    
    sudo: () => {
        console.log("Nice try! But you're already root in this terminal 😎");
    },
    
    exit: () => {
        console.log("There is no exit from the DevOps life...");
        console.log("You can check out any time you like, but you can never leave! 🎵");
    }
};

// Make Easter eggs available globally
Object.keys(easterEggs).forEach(cmd => {
    window[cmd] = easterEggs[cmd];
});