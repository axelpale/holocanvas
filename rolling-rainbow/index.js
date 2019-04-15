
var makeCanvasAutoFullwindow = function (canvas) {
  // Canvas is resized when window size changes, e.g.
  // when a mobile device is tilted.
  //
  // Parameter
  //   canvas
  //     HTML Canvas element
  //
  var resizeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);
  // Initially resized to fullscreen.
  resizeCanvas();
};

var makeCursorDisappear = function (el) {
  // Hides cursor after one second and reveals it on mouse move
  //
  // Parameter
  //   el
  //     HTML Element
  //
  var timeout = null;

  var hideCursor = function () {
    console.log('hide')
    el.style.cursor = 'none'
  }

  var showCursor = function () {
    console.log('show')
    window.clearTimeout(timeout)
    timeout = setTimeout(hideCursor, 1000)
    el.style.cursor = 'auto'
  };

  el.addEventListener('mousemove', showCursor, false);
};

var main = function () {
  var c = document.getElementById('canvas');
  // Everything is drawn on canvas.
  var ctx = canvas.getContext('2d');
  // Make canvas resize automatically to full window area
  makeCanvasAutoFullwindow(canvas);
  makeCursorDisappear(canvas);

  var initModel = function () {
    // Returns the model.
    // The model is updated using tickModel.
    // The model is visualized using tickView.
    return {
      // Note: do not write latent variables here.
      //       They should be created on runtime.
      hue: 300,
      dhue: 36,
      y: 0,
      distance: 6,
      speed: 2000
    }
  }

  // Model is simulated forward every frame
  var tickModel = function (model, dt) {
    // Parameter
    //   dt
    //     simulation time, seconds
    //
    // If needed, you can access the canvas dimensions:
    //   var w = canvas.width;
    //   var h = canvas.height;
    //

    // Source variables
    model.dy = model.speed * dt;
    //model.hue0 = (model.hue0 + 50 * dt) % 360;
    model.y = (model.y + model.dy) % ((model.distance + 1) * canvas.height);

    // Latent variables
  };

  // View is rendered each frame
  var tickView = function (model) {
    // Draw; View current model

    var w = canvas.width
    var h = canvas.height

    // Gradients

    var topAt = model.y - model.distance * h;
    var botAt = model.y;
    var lg = ctx.createLinearGradient(0, topAt, w, botAt)

    var hue = model.hue
    var dhue = model.dhue

    lg.addColorStop(0.00, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(0.05, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(0.10, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(0.15, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(0.20, 'hsla(' + hue + ', 100%, 0%)')

    lg.addColorStop(0.25, 'hsla(' + (hue + 0 * dhue) + ', 100%, 30%)')
    lg.addColorStop(0.30, 'hsla(' + (hue + 1 * dhue) + ', 100%, 40%)')
    lg.addColorStop(0.35, 'hsla(' + (hue + 2 * dhue) + ', 100%, 50%)')
    lg.addColorStop(0.40, 'hsla(' + (hue + 3 * dhue) + ', 100%, 50%)')
    lg.addColorStop(0.45, 'hsla(' + (hue + 4 * dhue) + ', 100%, 50%)')

    lg.addColorStop(0.50, 'hsla(' + (hue + 5 * dhue) + ', 100%, 50%)')
    lg.addColorStop(0.55, 'hsla(' + (hue + 6 * dhue) + ', 100%, 50%)')
    lg.addColorStop(0.60, 'hsla(' + (hue + 7 * dhue) + ', 100%, 50%)')
    lg.addColorStop(0.65, 'hsla(' + (hue + 8 * dhue) + ', 100%, 40%)')
    lg.addColorStop(0.70, 'hsla(' + (hue + 9 * dhue) + ', 100%, 30%)')

    lg.addColorStop(0.75, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(0.80, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(0.85, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(0.90, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(0.95, 'hsla(' + hue + ', 100%, 0%)')
    lg.addColorStop(1.00, 'hsla(' + hue + ', 100%, 0%)')

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // number, unix timestamp milliseconds of most recent frame.
  var past = null;
  // Visualization state
  var model = initModel();

  var startAnimationLoop = function loopFn() {
    var present, dt;

    // Time difference from previous frame in milliseconds
    present = Date.now();
    dt = (past === null) ? 0 : present - past;
    past = present;

    // Update Model
    tickModel(model, dt / 1000); // secs

    // Draw; View current model
    tickView(model);

    // Recursion
    window.requestAnimationFrame(loopFn);
  };

  startAnimationLoop()
}

main();
