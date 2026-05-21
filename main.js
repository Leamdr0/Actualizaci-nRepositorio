// --- NAVEGACIÓN MÓVIL (MENÚ HAMBURGUESA) ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Cerrar el menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// --- ANIMACIÓN DE REVELACIÓN AL HACER SCROLL ---
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Ejecutar una vez al cargar la página

// --- EFECTO DE PARTÍCULAS EN EL FONDO (CANVAS) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let W = window.innerWidth;
let H = window.innerHeight;

canvas.width = W;
canvas.height = H;

window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});

const particles = [];

// Clase para crear partículas
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.5 + 0.5; // Radio
        this.vx = (Math.random() - 0.5) * 0.5; // Velocidad X
        this.vy = (Math.random() - 0.5) * 0.5; // Velocidad Y
        this.a = Math.random() * 0.5 + 0.1; // Opacidad
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Rebotar en los bordes o reaparecer
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        // Color verde neón usando rgb para el canal alpha
        ctx.fillStyle = `rgba(0, 230, 180, ${this.a})`;
        ctx.fill();
    }
}

// Inicializar partículas
const COUNT = Math.min(80, Math.floor(W * H / 12000));
for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle());
}

// Conectar partículas cercanas con líneas
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                // Opacidad de la línea basada en la distancia
                ctx.strokeStyle = `rgba(0, 230, 180, ${(1 - distance / 130) * 0.1})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

// Bucle de animación
function animate() {
    ctx.clearRect(0, 0, W, H);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animate);
}

animate();
