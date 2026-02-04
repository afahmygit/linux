// Menu Toggle
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuBtn = document.getElementById('menuBtn');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');

    // Keep button visible when menu is open
    if(sidebar.classList.contains('active')) {
        menuBtn.classList.add('visible');
    } else {
        // If closing, rely on auto-hide logic unless hovering
        if(!menuBtn.matches(':hover')) {
            setTimeout(() => {
                if(!sidebar.classList.contains('active') && !menuBtn.matches(':hover')) {
                    menuBtn.classList.remove('visible');
                }
            }, 500);
        }
    }
}

function closeMenu() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// Auto-Hide Menu Button Logic
const menuBtn = document.getElementById('menuBtn');
const hotspot = document.querySelector('.menu-hotspot');
let hideTimeout;

function showButton() {
    menuBtn.classList.add('visible');
    clearTimeout(hideTimeout);

    // Auto hide after 2 seconds if not hovering over button or hotspot
    hideTimeout = setTimeout(() => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar.classList.contains('active') &&
            !menuBtn.matches(':hover') &&
            !hotspot.matches(':hover')) {
            menuBtn.classList.remove('visible');
        }
    }, 2500);
}

// Create hotspot if it doesn't exist
if (!hotspot) {
    const newHotspot = document.createElement('div');
    newHotspot.className = 'menu-hotspot';
    document.body.appendChild(newHotspot);
}

// Show on mouse move in hotspot
document.querySelector('.menu-hotspot').addEventListener('mousemove', showButton);
document.querySelector('.menu-hotspot').addEventListener('mouseenter', showButton);

// Keep visible while hovering the button itself
menuBtn.addEventListener('mouseenter', () => {
    menuBtn.classList.add('visible');
    clearTimeout(hideTimeout);
});

menuBtn.addEventListener('mouseleave', () => {
    showButton(); // Trigger the auto-hide timer
});

// Show briefly on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    menuBtn.classList.add('visible');
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar.classList.contains('active') && !menuBtn.matches(':hover')) {
            menuBtn.classList.remove('visible');
        }
    }, 1500);
});

// Keyboard shortcut for search (Ctrl+K or Cmd+K)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input').focus();
    }

    // Close menu on Escape
    if (e.key === 'Escape') {
        closeMenu();
        document.getElementById('search-input').blur();
    }
});

// ASCII Background & Loader (Optional - can be removed if not wanted)
function generateASCII() {
    const chars = '01010101 DEVOPS LINUX CLOUD AWS AZURE DOCKER K8S ANSIBLE TERRAFORM ZFS LVM ';
    let ascii = '';
    for (let i = 0; i < 4000; i++) {
        ascii += chars.charAt(Math.floor(Math.random() * chars.length));
        if (i % 80 === 0) ascii += '\n';
    }
    return ascii;
}

// Loading screen (optional - uncomment if wanted)
/*
const loadingMessages = [
    'Initializing systems...',
    'Loading command reference...',
    'Preparing documentation...',
    'Access Granted.'
];

document.addEventListener('DOMContentLoaded', function() {
    const asciiBg = document.getElementById('ascii-background');
    const loadingText = document.getElementById('loading-text');

    if (asciiBg) {
        asciiBg.textContent = generateASCII();
    }

    let msgIndex = 0;
    const msgInterval = setInterval(() => {
        msgIndex++;
        if(msgIndex < loadingMessages.length && loadingText) {
            loadingText.textContent = loadingMessages[msgIndex];
        }
    }, 600);

    window.addEventListener('load', function() {
        setTimeout(() => {
            clearInterval(msgInterval);
            const screen = document.getElementById('loading-screen');
            if (screen) {
                screen.style.opacity = '0';
                setTimeout(() => screen.style.display = 'none', 500);
            }
        }, 1500);
    });
});
*/
