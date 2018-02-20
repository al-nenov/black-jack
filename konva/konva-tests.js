var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

var layer = new Konva.Layer();

var rect = new Konva.Rect({
  x: 50,
  y: 50,
  width: 100,
  height: 50,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4
});
var circle = new Konva.Circle({
    x:200,
    y:200,
    width:66,
    height:66,
    fill: 'yellow',
    stroke: 'purple',
    strokeWidth:4
})
// add the shape to the layer
layer.add(circle);
layer.add(rect);

// add the layer to the stage
stage.add(layer);

var velocity = 50;

var anim = new Konva.Animation(function(frame) {
  
  var dist = velocity * (frame.timeDiff / 1000);
  rect.moveTo(50,100);
}, layer);
rect.moveTo(450,100);
anim.start();
