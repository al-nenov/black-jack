//Create a stage by getting a reference to the canvas
stage = new createjs.Stage("demoCanvas");
//Create a Shape DisplayObject.
circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(0, 0, 40);
//Set position of Shape instance.
circle.x = circle.y = 50;
//Add Shape instance to stage display list.
stage.addChild(circle);
//Update stage will render next frame
stage.update();







//Update stage will render next frame
createjs.Ticker.addEventListener("tick", handleTick);


var endPoint = {
    x:400,
    y:300
}

function handleTick() {
  //Circle will move 10 units to the right.
  

  //Will cause the circle to wrap back
  if (circle.x < endPoint.x ) {
    circle.x += 5;
  }
  if(circle.y < endPoint.y){
      circle.y +=2;
  }
  stage.update();
}
