
function preload() {
  // global vars to hold the loaded images
  // and their filenames
  imgs = [];
  img_names = [];

  // image file name attributes  
  var img_dir = "http://0.0.0.0:8000/";
  var img_fn_prefix = "pt_img-";
  var img_ext = ".png"
  var img_min_cntr = 100;
  var img_max_cntr = 5000;
  var img_delta_cntr = 100;
  n_imgs = (img_max_cntr - img_min_cntr) / img_delta_cntr + 1;

  for (var i = 0; i < n_imgs; i++) {
    var img_cntr = img_min_cntr + i * img_delta_cntr;
    var fn = img_fn_prefix + img_cntr + img_ext;
    var fpath = img_dir + fn;
    var img = loadImage(fpath);
    imgs.push(img);
    img_names.push(fn);
  }
}

function setup() {
  // use the first image's dimensions to
  // set the canvas size
  createCanvas(imgs[0].width, imgs[0].height);
  background(255);

  fr = 5;
  frameRate(fr);

  // global variable to keep track
  // of the current frame; start at -1;
  cur_frame = -1;
  // are the frames animating?
  frames_playing = true;
  // used for rock'ing animation
  frame_forward = true;

  // display info
  show_info = true;
  show_interface_help = true;
}

function draw() {
  nextFrame("loop");
  displayImg(show_info);

  if (show_info) {
    displayInfo();
  }

  if (show_interface_help && frameCount === 1) {
    noLoop();
    frames_playing = false;
    displayInterfaceHelp();
    show_interface_help = false;
  }
}

function displayImg(show_info) {
  background(255);
  image(imgs[cur_frame], 0, 0);

  if (show_info) {
    displayInfo();
  }
}

function nextFrame(mode = "loop") {
  if (mode === "loop") {
    cur_frame += 1;
    if (cur_frame > (n_imgs - 1)) {
      cur_frame = 0;
    }
  } else if (mode === "rock") {
    if (frame_forward) {
      cur_frame += 1;
      if (cur_frame > (n_imgs - 1)) {
        cur_frame -= 1;
        frame_forward = false;
      }
    } else {
      cur_frame -= 1;
      if (cur_frame < 0) {
        cur_frame += 1;
        frame_forward = true;
      }
    }
  }
}

function displayInfo() {
  // draw a slightly transparent box
  // and display the frame counter inside
  var display_box_width = width;
  var text_size = width * 0.015;
  var display_box_height = text_size * 1.5;
  var fn = img_names[cur_frame];
  push();
  noStroke();
  fill(200, 100);
  rect(0, 0, display_box_width, display_box_height)
  pop();

  push();
  textAlign(LEFT, TOP);
  textSize(text_size);
  text("Frame: " + (cur_frame + 1), text_size * 0.5, text_size * 0.1);
  pop();

  push();
  textAlign(RIGHT, TOP);
  textSize(text_size);
  text(fn, width - text_size * 0.5, text_size * 0.1);
  pop();
}


function displayInterfaceHelp() {
  push();
  noStroke();
  fill(200, 200);
  rect(0, 0, width, height);
  pop();

  push();
  stroke(0);
  strokeWeight(width * 0.002);
  line(width / 3, 0, width / 3, height);
  
  push();
  stroke(0);
  strokeWeight(width * 0.002);
  line(width * 2 / 3, 0, width * 2 / 3, height);

  noStroke();
  fill(0);
  textSize(width * 0.04);
  textAlign(CENTER, CENTER);
  text("<< 1 Frame", (width / 3) * 0.5, height * 0.5);
  pop()

  noStroke();
  fill(0);
  textSize(width * 0.04);
  textAlign(CENTER, CENTER);
  text("Play/Pause", width * 0.5, height * 0.5);
  pop()

  noStroke();
  fill(0);
  textSize(width * 0.04);
  textAlign(CENTER, CENTER);
  text("1 Frame >>", width - (width / 3 * 0.5), height * 0.5);
  pop()
}


// control the frame animation
// divide the canvas in 3rd's;
// left: decrement frame counter
// middle: pause animation
// right: increment frame counter
function mousePressed() {
  // decrement frame
  if (mouseX <= width / 3) {
    cur_frame -= 1;
    if (cur_frame < 0) {
      cur_frame = n_imgs - 1;
    }

    if (!frames_playing) {
      displayImg(show_info);
    }
  }

  // pause/play animation
  if (mouseX > width / 3 && mouseX <= width * 2 / 3) {
    if (frames_playing) {
      noLoop();
    } else {
      loop();
    }
    frames_playing = !frames_playing;
  }

  if (mouseX > width * 2 / 3) {
    cur_frame += 1;
    if (cur_frame > (n_imgs - 1)) {
      cur_frame = 0;
    }

    if (!frames_playing) {
      displayImg(show_info);
    }
  }
}
