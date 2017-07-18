
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
  var img_max_cntr = 10000;
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

  show_img_cntr = true;
  show_file_name = true;
}

function draw() {
  nextFrame("loop");
  displayImg(show_img_cntr, show_file_name);
}

function displayImg(show_img_cntr, show_file_name) {
  background(255);
  image(imgs[cur_frame], 0, 0);
  
  if (show_img_cntr) {
    displayImgCnt(cur_frame + 1);
  }

  if (show_file_name) {
    displayFileName(cur_frame);
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

function displayImgCnt(cntr) {
  // draw a slightly transparent box
  // and display the frame counter inside
  var display_box_width = width * 0.1;
  var text_size = width * 0.015;
  var display_box_height = text_size * 1.5;
  push();
  noStroke();
  fill(200, 200);
  rect(0, 0, display_box_width, display_box_height)
  pop();

  push();
  textAlign(LEFT, TOP);
  textSize(text_size);
  text("Frame: " + (cur_frame + 1), text_size * 0.5, text_size * 0.1);
  pop();
}

function displayFileName(cntr) {
  var fn = img_names[cntr];

  // draw a slightly transparent box
  // and display the file name
  var text_size = width * 0.015;
  var display_box_width = fn.length * 8;
  var display_box_height = text_size * 1.5;
  var rect_start_x = width - display_box_width;
  var rect_start_y = height - display_box_height;
  push();
  noStroke();
  fill(200, 200);
  rect(rect_start_x, rect_start_y, display_box_width, display_box_height);
  pop();

  push();
  textAlign(LEFT, TOP);
  textSize(text_size);
  text(fn, rect_start_x + text_size * 0.5, rect_start_y + text_size * 0.1);
  pop(); 
}


// control the frame animation
// divide the canvas in 3rd's;
// left: decrement frame counter
// middle: pause animation
// right: increment frame counter
function mousePressed() {
  print("mouse pressed: " + mouseX);
  // decrement frame
  if (mouseX <= width / 3) {
    cur_frame -= 1;
    if (cur_frame < 0) {
      cur_frame = n_imgs - 1;
    }

    if (!frames_playing) {
      displayImg(show_img_cntr, show_file_name);
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
      displayImg(show_img_cntr, show_file_name);
    }
  }
}
