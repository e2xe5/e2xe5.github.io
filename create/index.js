let img;
let s;
let a = [];
let done;
let SIMPVAL;
let NEGVAL;
let i = 0;
let n = 200;
let eps;
let depth = 25;
let np;
let lmax;
let lmax1;
let step;
let pix = [];
let canv;
let loaded = -1;
let croped = false;
let dx, dy;
let dx1 = 0;
let dy1 = 0;
let rdx = [];
let rdy = [];
var sb, rb, cb, fb, ib, bb, eb;
var load_button;
let rx = [];
let ry = [];
let rx0;
let ry0;
let rx1;
let ry1;
let resized;
let m = [];
let changed;
let w1;
let scale1;
let scale = 0.9;
let cw = 1024;
let dblclc;
let simh2, negh2, sizh2, roth2;
let simsl, negsl, sizsl;
let settings;
let sset;
let smoothed;
let rotating;

function mouseWheel(event) {
  scale -= 0.004 * event.delta;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  rx[0] = (windowWidth - 0.86 * min(windowWidth, windowHeight * 0.9)) / 2;
  ry[0] = (windowHeight * 0.86 - 0.86 * min(windowWidth, windowHeight * 0.9)) / 2;
  rx[1] = (windowWidth + 0.86 * min(windowWidth, windowHeight * 0.9)) / 2;
  ry[1] = (windowHeight * 0.86 + 0.86 * min(windowWidth, windowHeight * 0.9)) / 2;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  canv = createCanvas(max(width, cw), max(width, cw));
  canv.parent('logo');
  canv.drop(handleFile);
  smooth(8);
  w1 = 0;
  step = 0;
  lmax1 = -800;
  lmax = 0;
  done = 1;
  settings = 0;
  rotating = 0;
  smoothed = true;
  simsl = 0.5;
  negsl = 0.5;
  sizsl = 0.5;
  chsiz();
  rectMode(CORNERS);

  sb = createImg("/settings.svg")
    .position(windowWidth / 2 - 100 - 1.5 * windowWidth / 16, -50)
    .parent('buttons')
    .mousePressed(chset)
    .class("an");
  rb = createImg("/restart.svg")
    .position(windowWidth / 2 - 50 - 0.5 * windowWidth / 16, -50)
    .parent('buttons')
    .mousePressed(restart)
    .class("an");
  cb = createImg("/crop.svg")
    .position(windowWidth / 2 + 0 + 0.5 * windowWidth / 16, -50)
    .parent('buttons')
    .mousePressed(crop)
    .class("an");
  fb = createImg("/forward.svg")
    .position(windowWidth / 2 + 50 + 1.5 * windowWidth / 16, -50)
    .parent('buttons')
    .mousePressed(save1)
    .class("an");
  ib = createImg("/info.svg")
    .position(windowWidth - 100 - 1.5 * windowWidth / 16, -windowHeight + 55)
    .parent('buttons')
    .mousePressed()
    .class("a");
  bb = createImg("/shop.svg")
    .position(windowWidth - 50 - 0.5 * windowWidth / 16, -windowHeight + 55)
    .parent('buttons')
    .mousePressed()
    .class("a");
  eb = createImg("/exit.svg")
    .parent('buttons')
    .mousePressed(exit)
    .class("a")
    .hide();

  sset = createElement('h2', 'Настройки')
    .class('info_a')
    .parent('buttons')
    .hide()
    .style("font-size: 200%;");
  simh2 = createElement('h2', 'Глубина черного')
    .class('info_a')
    .parent('buttons')
    .hide()
    .style("font-size: 130%;");
  negh2 = createElement('h2', 'Глубина белого')
    .class('info_a')
    .parent('buttons')
    .hide()
    .style("font-size: 130%;");
  sizh2 = createElement('h2', 'Размер полотна')
    .class('info_a')
    .parent('buttons')
    .hide()
    .style("font-size: 130%;");
  roth2 = createElement('h2', 'Поворот:')
    .class('info_a')
    .parent('buttons')
    .hide()
    .mousePressed(chrot)
    .style("font-size: 130%;");


  load_button = createButton('Выбрать фото')
    .mousePressed(handleFile)
    .class('inputImg btn')
    .parent('btnh');

  input = createFileInput(handleFile);
  input.class('inputImg');
  input.parent('btnh');

  frameRate(60);
}

function restart() {
  if (w1 != 0) {
    rx[0] = (windowWidth - 0.86 * min(windowWidth, windowHeight * 0.9)) / 2;
    ry[0] = (windowHeight * 0.86 - 0.86 * min(windowWidth, windowHeight * 0.9)) / 2;
    rx[1] = (windowWidth + 0.86 * min(windowWidth, windowHeight * 0.9)) / 2;
    ry[1] = (windowHeight * 0.86 + 0.86 * min(windowWidth, windowHeight * 0.9)) / 2;
    sb.position(windowWidth / 2 - 100 - 1.5 * windowWidth / 16, -50);
    rb.position(windowWidth / 2 - 50 - 0.5 * windowWidth / 16, -50);
    cb.position(windowWidth / 2 + 0 + 0.5 * windowWidth / 16, -50);
    fb.position(windowWidth / 2 + 50 + 1.5 * windowWidth / 16, -50);
    ib.position(windowWidth - 100 - 1.5 * windowWidth / 16, -windowHeight + 55);
    bb.position(windowWidth - 50 - 0.5 * windowWidth / 16, -windowHeight + 55);
    eb.position(windowWidth - 50 - 0.5 * windowWidth / 16, windowHeight + 55);
    rx0 = rx[0];
    ry0 = ry[0];
    rx1 = rx[1];
    ry1 = ry[1];
    w1 = int(0.9 * min(width, height));
    done = 1;
    scale = 1;
    loaded = 10;
    resized = false;
    croped = false;
    fb.class("an");
    cb.class("a");
    sb.class("a");
    sset.hide();
    simh2.hide();
    negh2.hide();
    sizh2.hide();
    roth2.hide();
    settings = 0;
    chsiz();
  }
}

function exit() {
  sb.position(windowWidth / 2 - 100 - 1.5 * windowWidth / 16, -50).class("a");
  rb.position(windowWidth / 2 - 50 - 0.5 * windowWidth / 16, -50);
  cb.position(windowWidth / 2 + 0 + 0.5 * windowWidth / 16, -50).class("a");
  fb.position(windowWidth / 2 + 50 + 1.5 * windowWidth / 16, -50).class("an");
  ib.position(windowWidth - 100 - 1.5 * windowWidth / 16, -windowHeight + 55);
  bb.position(windowWidth - 50 - 0.5 * windowWidth / 16, -windowHeight + 55);
  eb.position(windowWidth - 50 - 0.5 * windowWidth / 16, windowHeight + 55);
  sset.hide();
  simh2.hide();
  negh2.hide();
  sizh2.hide();
  roth2.hide();
  croped = false;
  settings = 0;
  step = 0;
  lmax1 = -800;
  lmax = 0;
  done = 1;
  loaded = -1;
  i = 0;
  chsiz();
  createnails();
}

function chsiz() {
  switch (sizsl) {
    case 0:
      cw = 360;
      break;
    case 0.25:
      cw = 480;
      break;
    case 0.5:
      cw = 540;
      break;
    case 0.75:
      cw = 640;
      break;
    case 1:
      cw = 720;
      break;
  }
}

function chset() {
  if (settings == 0) {
    eb.position(rx[1] - 50, -windowHeight + ry[0] + 50).show();
    sset.position(rx[0] - 15, -windowHeight + ry[0] + 60).show();
    simh2.position(rx[0], -windowHeight + ry[0] + 110 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 0.5).show();
    negh2.position(rx[0], -windowHeight + ry[0] + 160 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 1.5).show();
    sizh2.position(rx[0], -windowHeight + ry[0] + 210 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 2.5).show();
    roth2.position(rx[0], -windowHeight + ry[0] + 260 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 3.5).show();
    settings += 10;
    sb.class("an");
    cb.class("an");
    fb.class("an");
  }
}

function chrot() {
  rotating = (rotating + 1) % 4;
  let sss = rotating * 90;
  roth2.value(sss);
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    background(255);
    img = loadImage(file.data);
    rx[0] = (windowWidth - 0.84 * min(windowWidth, windowHeight * 0.9)) / 2;
    ry[0] = (windowHeight * 0.9 - 0.84 * min(windowWidth, windowHeight * 0.9)) / 2;
    rx[1] = (windowWidth + 0.84 * min(windowWidth, windowHeight * 0.9)) / 2;
    ry[1] = (windowHeight * 0.9 + 0.84 * min(windowWidth, windowHeight * 0.9)) / 2;
    rx0 = rx[0];
    ry0 = ry[0];
    rx1 = rx[1];
    ry1 = ry[1];
    w1 = int(0.9 * min(width, height));
    scale = 1;
    loaded = 10;
    resized = false;
    croped = false;
  } else {
    img = null;
  }
  file = null;
}


function mouseDragged() {
  if ((rx[0] + 20 < mouseX) && (mouseX < rx[1] - 20)) {
    if (abs(mouseY - (ry[0] + 105 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 1)) < 10) {
      simsl = (mouseX - (rx[0] + 20)) / (rx[1] - rx[0] - 40);
    }
    if (abs(mouseY - (ry[0] + 155 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 2)) < 10) {
      negsl = (mouseX - (rx[0] + 20)) / (rx[1] - rx[0] - 40);
    }
    if (abs(mouseY - (ry[0] + 205 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 3)) < 10) {
      sizsl = int(int(mouseX + 20 - (rx[0] + 20)) / int((rx[1] - rx[0] - 40) / 4)) / 4;
      console.log(sizsl);
    }
  }
  if (settings == 0) {
    for (let i = 0; i < 2; i++) {
      for (let j = 2; j < 4; j++) {
        if ((abs(mouseX - m[i]) < 40) && (abs(mouseY - m[j]) < 20)) {
          rx[i] = mouseX;
          ry[j - 2] = mouseY;
          changed = 100;
        }
      }

      if (changed == 0) {
        dx += mouseX - pmouseX;
        dy += mouseY - pmouseY;
      }
    }
  }
}


function save1() {
  if (settings == 0)
    if (done == 2) {
      for (let i = 0; i < 100; i++) {
        push();
        translate(random(width + 200) - 200, random(height + 200) - 200);
        rotate(random(PI));
        fill(180, 15);
        stroke(220, 15);
        textSize(40 + int(random(20)));
        text("LBA project", 0, 0);
        pop();
      }
      save(canv, "output.png");
    }
}

function drawrect(x1, y1, x2, y2) {
  noStroke();
  fill(240, 240, 240, 80);
  m[0] = min(x1, x2);
  m[1] = max(x1, x2);
  m[2] = min(y1, y2);
  m[3] = max(y1, y2);
  rx[0] = m[0];
  rx[1] = m[1];
  ry[0] = m[2];
  ry[1] = m[3];
  rect(0, 0, m[0], height);
  rect(m[0], 0, width, m[2]);
  rect(m[1], m[2], width, m[3]);
  rect(m[0], m[3], width, height);
  stroke(0);
  fill(0);
  strokeWeight(2);
  let mr = 6;
  rect(m[0], m[2], m[0] + mr, m[2] + mr);
  rect(m[0], m[3], m[0] + mr, m[3] - mr);
  rect(m[1], m[2], m[1] - mr, m[2] + mr);
  rect(m[1], m[3], m[1] - mr, m[3] - mr);
  noFill();
  rect(x1, y1, x2, y2);
  strokeWeight(1);
  if (changed > 0) {
    changed--;
    if (changed > 10) {
      if (changed <= 40) {
        strokeWeight((changed - 30) / 30);
        if (m[1] - m[0] > m[3] - m[2]) {
          ry[0] -= 0.24 * (m[1] - m[0] - (m[3] - m[2]));
          ry[1] += 0.24 * (m[1] - m[0] - (m[3] - m[2]));
        }
        if (m[3] - m[2] > m[1] - m[0]) {
          rx[0] -= 0.24 * (m[3] - m[2] - (m[1] - m[0]));
          rx[1] += 0.24 * (m[3] - m[2] - (m[1] - m[0]));
        }
      }
      line(m[0] + 1 * (m[1] - m[0]) / 3, m[2], m[0] + 1 * (m[1] - m[0]) / 3, m[3]);
      line(m[0] + 2 * (m[1] - m[0]) / 3, m[2], m[0] + 2 * (m[1] - m[0]) / 3, m[3]);
      line(m[0], m[2] + 1 * (m[3] - m[2]) / 3, m[1], m[2] + 1 * (m[3] - m[2]) / 3);
      line(m[0], m[2] + 2 * (m[3] - m[2]) / 3, m[1], m[2] + 2 * (m[3] - m[2]) / 3);
    }
    if (changed == 10) {
      rdx[0] = rx[0];
      rdy[0] = ry[0];
      rdx[1] = rx[1];
      rdy[1] = ry[1];
      w1 = rx[1] - rx[0];
      scale1 = pow(((rx1 - rx0) / w1), 0.1);
    }
    if (changed < 10) {
      scale *= scale1;
      rx[0] -= (rdx[0] - rx0) * 0.1;
      ry[0] -= (rdy[0] - ry0) * 0.1;
      rx[1] += (rx1 - rdx[1]) * 0.1;
      ry[1] += (ry1 - rdy[1]) * 0.1;
      dx1 -= scale * ((rx[0] + rx[1] - rx0 - rx1) / 2) * 0.1;
      dy1 -= scale * ((ry[0] + ry[1] - ry0 - ry1) / 2) * 0.1;
    }
  }
}

function start(a) {
  step = 0;
  lmax1 = -800;
  lmax = 0;
  done = 1;
  loaded = -1;
  i = 0;
  createnails();
}


function crop() {
  if (w1 != 0) {
    if (settings == 0) {
      if (!croped) {
        push();
        translate(dx + dx1 + (windowWidth) / 2, dy + dy1 + (windowHeight * 0.9) / 2);
        rotate(rotating * PI / 2);
        image(img, -img.width * scale / 2, -img.height * scale / 2,
          img.width * scale, img.height * scale);
        pop();
        start();
        croped = true;
        s = 0.0;
        pix = [];
        rx[0] = round(rx[0]);
        rx[1] = round(rx[1]);
        ry[0] = round(ry[0]);
        ry[1] = round(ry[1]);
        w1 = rx1 - rx0;
        scale1 = w1 / cw;
        copy(round(rx0), round(ry0), round(w1), round(w1), 0, 0, cw, cw);
        loadPixels();
        for (let x = 0; x < cw; x++) {
          for (let y = 0; y < cw; y++) {
            pix[y * cw + x] = 255 - (red(get(x, y)));
            if (pix[y * cw + x] < 1) {
              pix[y * cw + x] = 0;
            }
            s += 1.0 * pix[y * cw + x] / (cw * cw);
          }
        }
        updatePixels();
        SIMPVAL = int(s * simsl);
        NEGVAL = int(3 * s * negsl);
        eps = 2 * s;
        background(240);
        stroke(0);
        fill(0);
        for (let i = 0; i < n; i++) {
          ellipse(rx0 + scale1 * a[i], ry0 + scale1 * a[i + n], 2, 2);
        }
        np = 49;
        cb.class("an");
        fb.class("an");
      }
    }
  }
}

function createnails() {
  // w1 = rx1 - rx0;
  let w1 = cw;
  let k = 0;
  for (let i = 0; i < (n / 4); i++) {
    a[i] = round(i * (w1 - 1) * 4 / n);
    a[i + n] = 0;
    a[i + n / 4] = round(w1 - 1);
    a[i + n / 4 + n] = round(i * (w1 - 1) * 4 / n);
    a[i + n / 2] = round(w1 - i * (w1 - 1) * 4 / n - 1);
    a[i + n / 2 + n] = round(w1 - 1);
    a[i + 3 * n / 4] = 0;
    a[i + 3 * n / 4 + n] = round(w1 - i * (w1 - 1) * 4 / n - 1);
  }
}

function draw() {
  if (settings > 2) {
    if (settings > 3)
      settings--;
    fill(100, 5);
    noStroke()
    rect(-1, -1, windowWidth + 1, windowHeight + 1);
    fill(255, 255 - (settings - 2) * 24);
    stroke(0);
    rect(rx[0] - 10, ry[0], rx[1] + 10, ry[1]);
    stroke(50);
    fill(250);
    rect(rx[0] + 20, ry[0] + 105 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 1 - 1,
      (rx[1] - 20), ry[0] + 105 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 1 + 2);
    ellipse(rx[0] + 20 + (rx[1] - rx[0] - 40) * simsl, ry[0] + 105 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 1, 14, 14);
    rect(rx[0] + 20, ry[0] + 155 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 2 - 1,
      (rx[1] - 20), ry[0] + 155 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 2 + 2);
    ellipse(rx[0] + 20 + (rx[1] - rx[0] - 40) * negsl, ry[0] + 155 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 2, 14, 14);
    rect(rx[0] + 20, ry[0] + 205 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 3 - 1,
      (rx[1] - 20), ry[0] + 205 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 3 + 2);
    ellipse(rx[0] + 20 + (rx[1] - rx[0] - 40) * sizsl, ry[0] + 205 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 3, 14, 14);
    textSize(24);
    text(rotating * 90, rx[0] + 110, ry[0] + 242 + 0.2 * max(0, (ry[1] - ry[0]) - 260) * 3.5 - 1);
  } else {
    if ((!smoothed) && (!croped)) {
      background(240, 240, 240);
    }
    if (loaded > 0) {
      push();
      translate(dx + img.width / 2, dy + img.height / 2);
      rotate(rotating * PI / 2);
      tint(255, 255, 255, max(0, 25 * (8 - loaded)));
      image(img, -img.width / 2, -img.height / 2);
      img.resize(0, min(windowWidth, windowHeight));
      dx = (windowWidth - img.width) / 2;
      dy = (windowHeight * 0.9 - img.height) / 2;
      pop();
      loaded--;
    } else if (loaded == 0) {
      noTint();
      start();
      dx = 0;
      dy = 0;
      cb.class("a");
      rb.class("a");
      sb.class("a");
      changed = 0;
      resized = true;
    }
    if (!croped) {
      fill(255);
      if (resized) {
        push();
        translate(dx + dx1 + (windowWidth) / 2,
          dy + dy1 + (windowHeight * 0.9) / 2);
        rotate(rotating * PI / 2);
        rect(1 - img.width * scale / 2, 1 - img.height * scale / 2,
          -1 + img.width * scale / 2, -1 + img.height * scale / 2);
        image(img, -img.width * scale / 2, -img.height * scale / 2,
          img.width * scale, img.height * scale);
        pop();
      }
      drawrect(rx[0], ry[0], rx[1], ry[1]);
    } else {
      strokeWeight(0.8 * scale1);
      fill(0, 128);
      stroke(0, 128);
      if (done != 2) {
        go(depth);
      }
    }
  }
}

function go(k) {
  w1 = rx1 - rx0;
  if (k != 0) {
    let f = false;
    let j = 0;
    let max = -16000;
    for (let j1 = 0;
      (j1 < ((2 * n) + 1)) && !f; j1++) {
      if (i != j1) {
        let q = (j1 % 2 === 0) ? (n + 1 + np + (j1 / 2)) % n : (n + 1 + np - ((j1 + 1) / 2)) % n;
        let c = p(i, q, 0);
        if (abs(c - lmax) < eps) {
          j = q;
          f = true;
        } else if (c > max) {
          j = q;
          max = c;
        }
      }
    }
    if ((!f) || (max > lmax) || (step > 2100)) {
      lmax = max;
      if (lmax > lmax1) {
        lmax1 = lmax;
      }
      if ((lmax < eps) && (done != 2)) {
        done = 2;
        fb.class("a");
      }
    }
    line(rx0 + scale1 * a[i], ry0 + scale1 * a[i + n], rx0 + scale1 * a[j], ry0 + scale1 * a[j + n]);
    step++;
    if (i != j) {
      i = (p(i, j, 1));
    }
    np = i;
    i = j;
    go(k - 1);
  }
}

function p(x, y, m) {
  if (x != y) {
    let s = 0;
    let x0 = a[x];
    let y0 = a[x + n];
    let dx = abs(a[y] - a[x]);
    let dy = abs(a[y + n] - a[x + n]);
    let sx = a[x] < a[y] ? 1 : -1;
    let sy = a[x + n] < a[y + n] ? 1 : -1;
    let err = dx - dy;
    let e2;
    let f = false;
    while (f != true) {
      if (x0 === a[y] && y0 === a[y + n]) {
        f = true;
      }
      if (m != 1) {
        s += pix[x0 + y0 * cw];
      }
      if (m == 1) {
        if (pix[x0 + y0 * cw] > 1) {
          pix[x0 + y0 * cw] -= SIMPVAL;
        } else if (pix[x0 + y0 * cw] <= 1) {
          pix[x0 + y0 * cw] = -NEGVAL;
        }
      }
      e2 = 2 * err;
      if (e2 > -dy) {
        err = err - dy;
        x0 = x0 + sx;
      }
      if (e2 < dx) {
        err = err + dx;
        y0 = y0 + sy;
      }
    }
    return s;
  } else {
    return 0;
  }
}
