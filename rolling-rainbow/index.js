// Rolling rainbow hologram animation

// Everything is drawn on canvas.
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Make canvas resize automatically to full window area
holocanvas.makeCanvasAutoFullwindow(canvas);
holocanvas.makeCursorDisappear(canvas);

holocanvas.start({
  initModel: function () {
    return {
      hue: 300, // degrees
      dhue: 36,
      y: 0,
      distance: 6,
      speed: 2000
    }
  },
  tickModel: function (model, dt) {
    // Update source variables.
    model.dy = model.speed * dt;
    // Update latent variables.
    model.y = (model.y + model.dy) % ((model.distance + 1) * canvas.height);
  },
  tickView: function (model) {
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
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, w, h);
  }
});
