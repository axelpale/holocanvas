window.holocanvas = {};

window.holocanvas.makeCanvasAutoFullwindow = function (canvas) {
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

window.holocanvas.makeCursorDisappear = function (el) {
  // Hides cursor after one second and reveals it on mouse move
  //
  // Parameter
  //   el
  //     HTML Element
  //
  var timeout = null;

  var hideCursor = function () {
    el.style.cursor = 'none'
  }

  var showCursor = function () {
    window.clearTimeout(timeout)
    timeout = setTimeout(hideCursor, 1000)
    el.style.cursor = 'auto'
  };

  el.addEventListener('mousemove', showCursor, false);
};

window.holocanvas.start = function (opts) {
  // Start the animation.
  //
  // Params:
  //   opts.initModel
  //   opts.tickModel
  //   opts.tickView
  //
  // See details below.
  //

  // opts.initModel
  //
  // Returns the model.
  //
  // Example
  //   opts.initModel = function () {
  //     return { hue: 359 }
  //   }
  //
  // The model is updated using opts.tickModel()
  // The model is visualized using opts.tickView()
  //
  var initModel = opts.initModel;

  // opts.tickModel = function (model, dt)
  //   Parameter
  //     model
  //       The model object initialized by initModel
  //     dt
  //       simulation time, seconds
  //
  // In tickModel, the model is computed forward by dt.
  // In another words, the model is simulated forward every frame.
  // If you need the canvas dimensions, just get the canvas:
  //   var canvas = document.getElementById('canvas');
  //   var w = canvas.width;
  //   var h = canvas.height;
  //
  // Example:
  //   opts.tickModel = function (model, dt) {
  //     model.hue = (model.hue + 1) % 360;
  //   }
  //
  var tickModel = opts.tickModel;

  // opts.tickView = function (model)
  //
  // Renders the view. The view is rendered each frame.
  // Draw the view.
  // Does not return anything.
  //
  // Example:
  //   var canvas = document.getElementById('canvas');
  //   var ctx = canvas.getContext('2d');
  //   opts.tickView = function (model) {
  //     var h = model.hue.toFixed(0);
  //     ctx.fillStyle = 'hsla(' + h + ', 100%, 50%)';
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   };
  //
  // Tips:
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  var tickView = opts.tickView;

  // ** documentation ends ** //

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

  startAnimationLoop();
};
