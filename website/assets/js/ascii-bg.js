const canvas = document.createElement('canvas');
canvas.id = 'ascii-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let width, height;
let fontSize = 16;
let cols, rows;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    fontSize = width < 768 ? 10 : 16; // Smaller font on mobile screens
    cols = Math.floor(width / fontSize) + 1;
    rows = Math.floor(height / fontSize) + 1;
    ctx.font = `${fontSize}px monospace`;
}
window.addEventListener('resize', resize);
resize();

const chars = [' ', '.', ',', '-', ':', ';', '+', '=', '%', '#', '@'];
let time = 0;

function draw() {
    ctx.clearRect(0, 0, width, height); // transparent bg
    ctx.fillStyle = 'rgba(253, 161, 170, 0.15)'; // Soft pink from theme
    ctx.textBaseline = 'top';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            // Interference pattern math to create a moving ink-blot/noise effect
            let v1 = Math.sin(x * 0.04 + time * 0.4);
            let v2 = Math.cos(y * 0.04 + time * 0.3);
            let v3 = Math.sin((x + y) * 0.04 - time * 0.2);
            
            let val = (v1 + v2 + v3 + 3) / 6; 
            
            let charIndex = Math.floor(val * chars.length);
            if (charIndex < 0) charIndex = 0;
            if (charIndex >= chars.length) charIndex = chars.length - 1;

            if (chars[charIndex] !== ' ') {
                ctx.fillText(chars[charIndex], x * fontSize, y * fontSize);
            }
        }
    }
    time += 0.05;
    requestAnimationFrame(draw);
}
draw();