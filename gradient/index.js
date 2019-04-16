// Gradient color animation

// Everything is drawn on canvas.
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Make canvas resize automatically to full window area
holocanvas.makeCanvasAutoFullwindow(canvas);
holocanvas.makeCursorDisappear(canvas);

holocanvas.start({
  initModel: function () {
    return {
      hue: 0 // degrees
    }
  },
  tickModel: function (model, dt) {
    model.hue = (model.hue + 10 * dt) % 360;
  },
  tickView: function (model) {
    var w = canvas.width
    var h = canvas.height

    var hue0 = model.hue.toFixed(0)
    var hue1 = ((model.hue + 50) % 360).toFixed(0)

    var lg = ctx.createLinearGradient(0, 0, w, h)
    lg.addColorStop(0, 'hsla(' + hue0 + ', 100%, 50%)')
    lg.addColorStop(1, 'hsla(' + hue1 + ', 100%, 50%)')

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, w, h);
  }
});
