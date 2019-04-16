// Mono color animation

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
    model.hue = (model.hue + 1) % 360;
  },
  tickView: function (model) {
    var h = model.hue.toFixed(0);
    ctx.fillStyle = 'hsla(' + h + ', 100%, 50%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
});
