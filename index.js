// DOM Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');
const rosesContainer = document.getElementById('rosesContainer');
const heartsBg = document.getElementById('heartsBg');
const mainTitle = document.querySelector('.main-title');
const subMessage = document.querySelector('.sub-message');
const roseImage = document.getElementById('roseImage');

// Yes button responses (romantic messages)
const yesMessages = [
    "❤️ I LOVE YOU! ❤️",
    "💕 You made my day! 💕",
    "🌹 You're my Valentine! 🌹",
    "💖 I love you more! 💖",
    "🥰 You've made me the happiest person! 🥰"
];

// No button responses (playful messages)
const noMessages = [
    "😢 Are you sure?",
    "💔 Please think again...",
    "🥺 Don't break my heart",
    "😢 I'll keep waiting...",
    "💭 Maybe later?"
];

// Create floating hearts in background
function createHearts() {
    const heartSymbols = ['💕', '💗', '❤️', '💖', '💘', '💞'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        heartsBg.appendChild(heart);
    }
}

// Create falling roses
function createRoses() {
    const roseSymbols = ['🌹', '🥀', '💐', '🌸', '💮'];
    
    // Create initial roses
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createRose(roseSymbols), i * 300);
    }
    
    // Continuously create new roses
    setInterval(() => {
        createRose(roseSymbols);
    }, 800);
}

function createRose(roseSymbols) {
    const rose = document.createElement('div');
    rose.className = 'rose';
    rose.innerHTML = roseSymbols[Math.floor(Math.random() * roseSymbols.length)];
    rose.style.left = Math.random() * 100 + '%';
    rose.style.animationDuration = (Math.random() * 3 + 5) + 's';
    rosesContainer.appendChild(rose);
    
    // Remove rose after animation completes
    setTimeout(() => {
        rose.remove();
    }, 8000);
}

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    // Check if button says CONTINUE (already clicked once)
    if (yesBtn.textContent === 'CONTINUE') {
        // Go to next page
        window.location.href = 'page2.html';
        return;
    }
    
    // First click - show the romantic response
    // Update title and sub-message
    mainTitle.textContent = '❤️ YEYYYYY ❤️';
    subMessage.textContent = 'that means more to me than you know....';
    
    // Change the image to a new one
    roseImage.src = 'https://i.pinimg.com/originals/77/5e/86/775e862f66277d22dca80223cb9f66c9.gif';
    
    const randomMessage = yesMessages[Math.floor(Math.random() * yesMessages.length)];
    response.innerHTML = randomMessage + '<br>💍👫';
    response.className = 'response hearts';
    
    // Create celebration roses
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const roseSymbols = ['🌹', '💕', '❤️', '💖', '💗'];
            createRose(roseSymbols);
        }, i * 100);
    }
    
    // Change button to CONTINUE
    yesBtn.textContent = 'CONTINUE';
    yesBtn.style.fontSize = '1rem';
    yesBtn.style.padding = '12px 35px';
});

// Handle No button click
let noClickCount = 0;
noBtn.addEventListener('click', () => {
    noClickCount++;
    
    // Make YES button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const newSize = currentSize + 8;
    yesBtn.style.fontSize = newSize + 'px';
    yesBtn.style.padding = (15 + (noClickCount * 3)) + 'px ' + (45 + (noClickCount * 5)) + 'px';
    
    if (noClickCount < 5) {
        const randomMessage = noMessages[noClickCount - 1];
        response.innerHTML = randomMessage;
        response.className = 'response';
    } else if (noClickCount === 5) {
        // After 5 NO clicks - shrink and hide NO button
        mainTitle.textContent = '😏 Okay no more escape';
        subMessage.textContent = "You don't have a choice anymore...";
        
        // Shrink and hide NO button
        noBtn.style.transition = 'all 0.5s ease';
        noBtn.style.transform = 'scale(0)';
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        
        // Center the YES button
        yesBtn.style.position = 'absolute';
        yesBtn.style.left = '50%';
        yesBtn.style.top = '65%';
        yesBtn.style.transform = 'translate(-50%, -50%)';
        
        // Make YES button extra big
        yesBtn.style.fontSize = '2.5rem';
        yesBtn.style.padding = '30px 80px';
        
        response.innerHTML = '😅 Gotcha!';
        response.className = 'response';
    }
});

// Move button to random position
function moveButton(button) {
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    
    const maxX = cardRect.width - button.offsetWidth - 40;
    const maxY = cardRect.height - button.offsetHeight - 40;
    
    const randomX = Math.random() * maxX + 20;
    const randomY = Math.random() * maxY + 20;
    
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

// Initialize
createHearts();
createRoses();
