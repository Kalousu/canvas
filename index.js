let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.background = "rgba(0, 0, 255, 0.5)"

class Ball{
    constructor(x, y, velocity, r, distance, color){
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.r = r;
        this.distance = distance;
        this.color = color;
        this.radians = 0;
        this.lastMouse = {x: x, y: y};
    }

    draw(lastPoint){
        c.beginPath();
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.lineWidth = this.r;
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    update(){
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        const lastPoint = {x: this.x, y: this.y}
        this.radians += this.velocity / 20;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;
        this.draw(lastPoint);
    }
}

let mouse = {
    x: 0,
    y: 0
};

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

let balls = [];
let colors = ["dark blue", "light blue", "blue", "aqua"];

for(let i = 0; i < 100; i++){
    let r = Math.random() * 3 + 1;
    let distance = Math.random() * 100 + 50;
    let velocity = Math.random() + 1;
    balls.push(new Ball(0, 0, velocity, r, distance, colors[Math.floor(Math.random() * 4)]));
}

window.onload = function animate(){
    c.fillStyle = "rgba(255, 255, 255, 0.05)"
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
    console.log(mouse);
    for(let i = 0; i < balls.length; i++){
        balls[i].update();
    }
    requestAnimationFrame(animate);
}