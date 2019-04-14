
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

var main = function () {
  var c = document.getElementById('canvas');
  // Everything is drawn on canvas.
  var ctx = canvas.getContext('2d');
  // Make canvas resize automatically to full window area
  makeCanvasAutoFullwindow(canvas);

  var initModel = function () {
    // Returns the model.
    // The model is updated using tickModel.
    // The model is visualized using tickView.
    return {
      hue: 0 // degrees
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
    model.hue = (model.hue + 1) % 360;
  };

  // View is rendered each frame
  var tickView = function (model) {
    // Draw; View current model

    var h = model.hue.toFixed(0)
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'hsla(' + h + ', 100%, 50%)';
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