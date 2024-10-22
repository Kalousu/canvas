let canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.background = "rgba(0, 155, 155, 0.5)"

let c = canvas.getContext("2d");

class balls{
    constructor(x, y, r, c, dx, dy){
        this.x = x,
        this.y = y,
        this.r = r,
        this.originalR = this.r,
        this.c = c,
        this.dx = dx,
        this.dy = dy
    }

    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fillStyle = this.c;
        c.fill();
        c.closePath();
    }

    update(){
        if(getDistance(this.x, mouse.x, this.y, mouse.y) < this.r + 50){
            if(this.r - 50 < 0){
                this.r += 10;
            }
        }else {
            if(this.r > this.originalR){
                this.r -= 5;
            }
        }
        this.x += this.dx;
        if(this.x > canvas.width - this.r || this.x < this.r){
            this.dx = -this.dx;
        }
        this.y += this.dy
        if(this.y > canvas.height - this.r || this.y < this.r){
            this.dy = -this.dy;
        }
    }
}

let ballArray = [];
let colors = ["rgba(0, 50, 255, 0.5)", "rgba(0, 155, 155, 0.5)", "rgba(0, 255, 50, 0.5)", "rgba(20, 100, 255, 0.5)"];

function getDistance(x1, x2, y1, y2){
    let diffX = x2 - x1;
    let diffY = y2 - y1;
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

for(let i = 0; i < 200; i++){
    let r = Math.floor(Math.random() * 5) + 5;
    let randomX = Math.floor (Math.random() * (canvas.width - 200)) + 100
    let randomY = Math.floor(Math.random() * (canvas.height - 200)) + 100
    let randomDX = Math.floor(Math.random() * 6) - 3;
    let randomDY = Math.floor(Math.random() * 6) - 3;
    let ranColor = colors[Math.floor(Math.random() * 4) + 1];
    if(i == 0){
        ballArray[i] = new balls(randomX, randomY, r, ranColor, randomDX, randomDY);
    }else {
        for(let j = 0; j < ballArray.length; j++){
            if(getDistance(randomX, ballArray[j].x, randomY, ballArray[j].y) < 50){
                randomX = Math.floor (Math.random() * (canvas.width - 200)) + 100
                randomY = Math.floor(Math.random() * (canvas.height - 200)) + 100
                j = -1;
            }
        }
        ballArray[i] = new balls(randomX, randomY, r, ranColor, randomDX, randomDY)
    }
}

console.log(ballArray);

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

function animate(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < ballArray.length; i++){
        ballArray[i].draw();
        ballArray[i].update();
    }
    requestAnimationFrame(animate);
}

animate();
