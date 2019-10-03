function r() {
  return random(1);
}

function r(x) {
  return random(x);
}

function listFileNames(dir) {
  let file = new File(dir);
  if (file.isDirectory())
    return file.list();
  else
    return null;
}
let a;
let action;

function preload() {
  a = ['data/a_GlobusOblique.TTF', 'data/bedrockc.ttf', 'data/HeatherScriptOne.ttf', 'data/GardensC.otf', 'data/data.pde', 'data/aksent.Ttf', 'data/camp.TTF', 'data/a_BighausTitul.TTF', 'data/Archive.otf', 'data/quake.TTF', 'data/bagira.ttf', 'data/delph.TTF', 'data/20_db.otf'];

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  action = true;
  for (let i = 0; i < a.length; i++)
    a[i] = loadFont(a[i]);
}

function mouseClicked() {
  action = !action;
}

function draw() {
  if (r() < 0.70) background(0);
  if (action) {
    if (r() < 0.10) fill(0, 2, 242, 255);
    if (r() < 0.10) fill(255, 84, 0, 255);
    if (r() < 0.40) textFont(a[Math.round(r(5))]);
    textSize(160);
    textAlign(CENTER, BOTTOM);
    text("Посвят ФПМИ", width / 2, height * 0.45);
    textSize(120);
    textAlign(CENTER, TOP);
    text("07.10.19", width / 2, height * 0.65);
    if (r() < 0.8)
      for (let i = 0; i < int(r(50) + 20); i++) {
        let x0 = r(0.9 * width);
        let x1 = r(0.2 * width);
        let y0 = (height * 0.3 + r(0.4 * height));
        let y1 = (r(30) + 10);
        push();
        translate(r(6) - 3, r(6) - 3);
        fill(0);
        if (r() < 0.70) rect(x0 + Math.round(r(5) - 2.5) * r(40) - 20, y0 + r(40) - 20, x1, y1);
        copy(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1),
          Math.round(x0 + r(5) - 2.5 * r(40) - 20), Math.round(y0 + r(40) - 20), Math.round(x1), Math.round(y1));
        pop();
      }
    stroke(10);
    let step = Math.round(r(3) + 2);
    for (let i = 0; i < height / step; i++)
      line(0, frameCount % step + i * step, width, frameCount % step + i * step);
    fill(255, 255, 255);
    noStroke();
  }
  if ((!action)||(r() < 0.1)) {
    fill(0, 2, 242, Math.round(20));
    let ix = Math.round(r(12) + 2);
    let iy = Math.round(r(12) + 2);
    let sx = r(ix)+1;
    let sy = r(ix)+1;
    for (let x = 0; x < width; x += ix)
      for (let y = 0; y < height; y += iy) {
        rect(x, y, sx, sy);
        if (r() < 0.1) fill(0, 2, 242, Math.round(r(20) + 20));
        if (r() < 0.1) fill(255, 84, 0, Math.round(r(20) + 20));
        if (r() < 0.1) fill(0,0,0,20);
      }
    fill(255);
  }

}
