const terminal = document.getElementById('terminal');
    const lines = [
      "Initializing terminal interface...",
      "Welcome to James Tuesday Paschall's digital domain.",
      "", 
      "Available commands:",
      "  - projects     View portfolio and resume",
      "  - games        Play tic-tac-toe, snake, roll dice",
      "", 
      "Type a command to proceed."
    ];

    let currentLine = 0;
    let charIndex = 0;
    let output = '';

    function renderInputLine() {
      terminal.innerHTML = `<pre>${output}</pre><div class="input-line"><span>> </span><input class="terminal-input" autofocus></div>`;
      enableCommandInput();
    }

    function typeLine() {
      if (currentLine < lines.length) {
        const line = lines[currentLine];
        if (charIndex < line.length) {
          output += line.charAt(charIndex);
          charIndex++;
          terminal.innerHTML = `<pre>${output}</pre><div class="input-line"><span>> </span></div>`;
        } else {
          output += '\n';
          charIndex = 0;
          currentLine++;
        }
        setTimeout(typeLine, 30);
      } else {
        renderInputLine();
      }
    }

    function enableCommandInput() {
      const input = terminal.querySelector('.terminal-input');

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const command = input.value.trim();
          output += `> ${command}\n`;
          processCommand(command);
        }
      });

      input.focus();
    }

    function processCommand(command) {
      if (command === 'projects') {
        output += 'Opening resume and projects page...\n';
        terminal.innerHTML = `<pre>${output}</pre>`;
        setTimeout(() => {
          window.location.href = 'resume.html';
        }, 1000);
      } else {
        output += 'Unknown command. Try "projects" or "games".\n';
        renderInputLine();
      }
    }
    
    typeLine();