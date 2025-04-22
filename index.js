class Typer {
    constructor(file, speed = 1) {
        this.text = '';
        this.index = 0;
        this.speed = speed;
        this.file = file;
        this.accessCount = 0;
        this.deniedCount = 0;
        this.accessTimer = null;
        this.typeTimer = null;
        this.consoleElement = document.getElementById('terminal');
    }

    init() {
        this.accessTimer = setInterval(() => this.updateCursor(), 500);

        fetch(this.file)
            .then(res => res.text())
            .then(data => {
                this.text = data.trimEnd();
                this.startTyping();
            })
            .catch(err => {
                console.error('Failed to load file:', err);
            });

        document.addEventListener('keydown', e => this.handleKey(e));
    }

    startTyping() {
        this.typeTimer = setInterval(() => {
            this.step();
            if (this.index >= this.text.length) {
                clearInterval(this.typeTimer);
            }
        }, 40);
    }

    step() {
        if (this.index <= this.text.length) {
            const visibleText = this.text.substring(0, this.index);
            this.consoleElement.innerHTML = visibleText.replace(/\n/g, '<br/>');
            this.index += this.speed;
            window.scrollBy(0, 50);
        }
    }

    updateCursor() {
        const content = this.consoleElement.innerHTML;
        if (content.endsWith('|')) {
            this.consoleElement.innerHTML = content.slice(0, -1);
        } else {
            this.consoleElement.innerHTML += '|';
        }
    }

    handleKey(e) {
        switch (e.key) {
            case 'Alt':
                this.accessCount++;
                if (this.accessCount >= 3) this.makeAccess?.();
                break;
            case 'CapsLock':
                this.deniedCount++;
                if (this.deniedCount >= 3) this.makeDenied?.();
                break;
            case 'Escape':
                this.index = this.text.length;
                break;
            default:
                // optionally, handle typing interactions here
                break;
        }

    }

    makeAccess() {
        alert('Access Granted!');
    }

    makeDenied() {
        alert('Access Denied!');
    }

    hidepop() {
        alert('Popup Hidden'); // stub
    }
}

const typer = new Typer('intro.txt', 1);
window.addEventListener('DOMContentLoaded', () => typer.init());