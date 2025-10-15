let vocabLevel = 1;
let vocabCurrent = null;
let vocabUsed = { 1: [], 2: [], 3: [] };
let vocabLast = { 1: null, 2: null, 3: null };
let vocabFails = 0;

function vocabSelectLevel(level) {
    vocabLevel = level;
    document.querySelectorAll('.vocab-game .level-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.vocab-game .level-button')[level - 1].classList.add('active');
    const name = level === 1 ? 'Fácil' : level === 2 ? 'Medio' : 'Difícil';
    document.getElementById('vocabCurrentLevel').textContent = name;
    vocabNext();
}

function vocabPick() {
    const pool = guaraniWords[`nivel${vocabLevel}`];
    if (!pool || pool.length === 0) return null;
    const indices = pool.map((_, i) => i);
    let avail = indices.filter(i => !vocabUsed[vocabLevel].includes(i));
    if (avail.length === 0) {
        vocabUsed[vocabLevel] = [];
        avail = indices.filter(i => i !== vocabLast[vocabLevel]);
    }
    const idx = avail[Math.floor(Math.random() * avail.length)];
    vocabUsed[vocabLevel].push(idx);
    vocabLast[vocabLevel] = idx;
    return { idx, item: pool[idx] };
}

function vocabNext() {
    const pick = vocabPick();
    if (!pick) return;
    vocabCurrent = pick.item;
    document.getElementById('vocabPrompt').textContent = vocabCurrent.español;
    document.getElementById('vocabHint').textContent = `Empieza con: ${vocabCurrent.guarani.charAt(0)}`;
    document.getElementById('vocabInput').value = '';
    document.getElementById('vocabInput').disabled = false;
    document.getElementById('vocabFeedback').textContent = '';
    document.getElementById('vocabFeedback').className = 'feedback';
    document.getElementById('vocabCorrect').style.display = 'none';
    document.getElementById('vocabNext').style.display = 'none';
    document.getElementById('vocabReveal').disabled = true;
    vocabFails = 0;
}

function vocabCheck() {
    const val = (document.getElementById('vocabInput').value || '').trim().toLowerCase();
    const correct = vocabCurrent.guarani.toLowerCase();
    const fb = document.getElementById('vocabFeedback');
    if (val === correct) {
        fb.textContent = '¡Correcto!';
        fb.className = 'feedback correct';
        document.getElementById('vocabNext').style.display = 'block';
        document.getElementById('vocabInput').disabled = true;
    } else {
        fb.textContent = 'Incorrecto. Intenta otra vez';
        fb.className = 'feedback incorrect';
        vocabFails += 1;
        if (vocabFails >= 3) document.getElementById('vocabReveal').disabled = false;
    }
}

function vocabReveal() {
    document.getElementById('vocabCorrect').textContent = `La palabra correcta era: ${vocabCurrent.guarani}`;
    document.getElementById('vocabCorrect').style.display = 'block';
    document.getElementById('vocabInput').disabled = true;
    document.getElementById('vocabNext').style.display = 'block';
    document.getElementById('vocabReveal').disabled = true;
}


