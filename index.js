let canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.background = "rgba(255, 155, 0, 0.5)"

let context = canvas.getContext("2d");

class balls {
    constructor(x, y, color){
        this.x = x,
        this.y = y,
        this.color = color
    }

    draw(){
        context.beginPath();
        context.strokeStyle = "rgb(5, 255 ,255)"
        context.fillStyle = "rgb(155, 0, 0)"
        context.arc(Math.sin(this.x), this.y, 2, 0, Math.PI * 2);
        context.closePath();
    }

    update(){
        this.x++;
        if(this.x > 360){
            this.x = 0;
        }
    }
}

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener(onmousemove, (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

let ball = new balls(500, 500, "rgb(0, 0, 255)");

function main(){
    ball.draw();
    ball.update();
    console.log(ball);
    requestAnimationFrame(main());
}

main();