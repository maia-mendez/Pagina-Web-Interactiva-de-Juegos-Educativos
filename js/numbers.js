const numbersData = [
    { num: 1, word: "peteĩ" },
    { num: 2, word: "mokõi" },
    { num: 3, word: "mbohapy" },
    { num: 4, word: "irundy" },
    { num: 5, word: "po" },
    { num: 6, word: "poteĩ" },
    { num: 7, word: "pokõi" },
    { num: 8, word: "poapy" },
    { num: 9, word: "porundy" },
    { num: 10, word: "pa" },
    { num: 11, word: "peteĩ pa" },
    { num: 12, word: "mokõi pa" },
    { num: 13, word: "mbohapy pa" },
    { num: 14, word: "irundy pa" },
    { num: 15, word: "po pa" },
    { num: 16, word: "poteĩ pa" },
    { num: 17, word: "pokõi pa" },
    { num: 18, word: "poapy pa" },
    { num: 19, word: "porundy pa" },
    { num: 20, word: "mokoĩ pa" }
];

let leftSelection = null;
let rightSelection = null;
let matchedCount = 0;

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function numbersInit() {
    const left = document.getElementById('numLeftGrid');
    const right = document.getElementById('numRightGrid');
    const fb = document.getElementById('numFeedback');
    const reset = document.getElementById('numResetBtn');
    if (!left || !right || !fb || !reset) return;

    const leftItems = shuffle(numbersData).slice(0, 8);
    const rightItems = shuffle(leftItems);

    left.innerHTML = '';
    right.innerHTML = '';
    matchedCount = 0;
    leftSelection = null;
    rightSelection = null;
    fb.textContent = '';
    fb.className = 'feedback';
    reset.style.display = 'none';

    leftItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'pair-card';
        card.textContent = item.num;
        card.dataset.key = String(item.num);
        card.onclick = () => selectLeft(card);
        left.appendChild(card);
    });

    rightItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'pair-card';
        card.textContent = item.word;
        card.dataset.key = String(item.num);
        card.onclick = () => selectRight(card);
        right.appendChild(card);
    });
}

function clearSelections() {
    document.querySelectorAll('.pairs-grid .pair-card').forEach(c => c.classList.remove('selected'));
}

function selectLeft(card) {
    clearSelections();
    card.classList.add('selected');
    leftSelection = card;
}

function selectRight(card) {
    if (!leftSelection) {
        card.classList.add('selected');
        rightSelection = card;
        return;
    }
    rightSelection = card;
    checkMatch();
}

function checkMatch() {
    if (!leftSelection || !rightSelection) return;
    const fb = document.getElementById('numFeedback');
    const reset = document.getElementById('numResetBtn');
    if (leftSelection.dataset.key === rightSelection.dataset.key) {
        leftSelection.classList.add('correct');
        rightSelection.classList.add('correct');
        leftSelection.onclick = null;
        rightSelection.onclick = null;
        matchedCount += 1;
        fb.textContent = '¡Correcto!';
        fb.className = 'feedback correct';
        if (matchedCount >= 8) {
            fb.textContent = '¡Excelente! Emparejaste todos.';
            reset.style.display = 'block';
            launchConfetti();
        }
    } else {
        leftSelection.classList.add('incorrect');
        rightSelection.classList.add('incorrect');
        fb.textContent = 'No coincide, intenta de nuevo.';
        fb.className = 'feedback incorrect';
        setTimeout(() => {
            leftSelection.classList.remove('incorrect', 'selected');
            rightSelection.classList.remove('incorrect', 'selected');
            leftSelection = null;
            rightSelection = null;
        }, 600);
        return;
    }
    leftSelection = null;
    rightSelection = null;
}

function numbersReset() { numbersInit(); }

function launchConfetti() {
    let container = document.querySelector('.confetti-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);
    }
    const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'];
    const pieces = 120;
    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const size = Math.random() * 8 + 6;
        piece.style.width = size + 'px';
        piece.style.height = (size * 1.4) + 'px';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.transform = `translateY(-20px) rotate(${Math.random()*360}deg)`;
        piece.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 2200);
    }
}


