var angle = 0;
let starship;
let cam;
let vid;

function preload() {
    starship = loadImage('media/starship.jpg')
}

function setup() {
    createCanvas(500, 500, WEBGL);
    cam = createCapture(VIDEO);
    cam.size(150, 175);
    cam.hide();

    vid = createVideo(
        'media/korn.mp4',
        vidLoad
    );
    vid.size(100, 100);
    vid.hide();
}

// This function is called when the video loads
function vidLoad() {
    vid.loop();
    vid.volume(0);
}


function draw() {
    let dx = mouseX - width / 2;
    let dy = mouseY - height / 2;
    let mouseColorx = map(mouseX, 0, width, 0, 255);
    let cursorZ = map(mouseY, 0, width, 0, 325)
    let v = createVector(dx, dy, 0);
    v.div(100);
    //ambientLight(255);
    directionalLight(255, 0, 255, dx, dy, 0);
    pointLight(0, 0, 255, 500, 0, 0);
    pointLight(0, 255, 0, 0, 200, 0);
    pointLight(0, 255, 0, 0, -200, 0);
    pointLight(255, mouseColorx, 100, 0, 0, 200);

    background(0);

    translate(0, 0, cursorZ)

    push();
    //fill(0, 50, 200);
    //translate(mouseX - width / 2, mouseY - height / 2);
    rotateX(angle);
    rotateY(angle * 0.2);
    rotateZ(angle * 0.2);

    noStroke();
    //ambientMaterial(255);
    //translate(0, 0, mouseX);
    texture(cam);
    //filter(THRESHOLD);
    box(220);
    box(50);
    box(20);
    box(8);
    box(3);
    pop();
    //filter(THRESHOLD);
    push();
    translate(0, 200);
    rotateX(HALF_PI);
    texture(starship);
    noStroke();
    //ambientMaterial(255);
    plane(650, 600);
    pop();

    push();
    translate(0, -150, 100);
    rotateX(HALF_PI);
    texture(starship);
    noStroke();
    plane(325);
    angle += 0.005;
}