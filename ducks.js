
/*
 * how angle is defined
 *
 * North - 0 Degrees
 * East - 90 Degrees
 * South - 180 Degrees
 * West - 270 Degrees
 */

/*
 * input: angle - Number
 * returns: random angle based on the possible trajectory the object can take
 * returns -1 if the angle is larger than 360 degrees
 *
 * call this when the object hits the wall (the edge of browser)
 */
var generateAngleWall = function(angle) {
    if (angle < 90) {
        return 270 + Math.random() * 90;
    } else if (angle < 180) {
        return 180 + Math.random() * 90;
    } else if (angle < 270) {
        return 90 + Math.random() * 90;
    } else if (angle < 360) {
        return Math.random() * 90;
    } else {
        return -1;
    }
}

/*
 * input: angle - Number
 * returns: random angle based on the possible trajectory the object can take
 * returns -1 if the angle is larger than 360 degrees
 *
 * call this when the object hits floor/ceiling
 */
var generateAngleFloor = function(angle) {
    if (angle < 90) {
        angle = 90 + Math.random() * 90;
    } else if (angle < 180) {
        angle = Math.random() * 90;
    } else if (angle < 270) {
        angle = 270 + Math.random() * 90;
    } else if (angle < 360) {
        angle = 180 + Math.random() * 90;
    } else {
        angle = -1;
    }
    return angle;
}

/*
 * inputs: moveDiv - div to be moved
 *         angle - Number, current angle of object
 * returns: no return value
 *
 * handles collision detection of the walls of browser
 */
var checkWalls = function(moveDiv, angle) {
    var x = (moveDiv.style.left);
    var y = (moveDiv.style.top);
    x=x.substring(0,x.length-2);
    x=parseInt(x);
    y=y.substring(0,y.length-2);
    y=parseInt(y);
    var height = 500;
    var width = 500;

    if (x < 0 || x > width) {
        if (x < 0) {
            x = 2;
        }
        if (x > width) {
            x = width - 2;
        }

        // object is probably past boundaries, therefore move it back
        // in boundaries so other functions work properly
        moveDiv.style.left = x+"px";
        return generateAngleWall(angle);
    } else if (y < 0 || y > width) {
        if (y < 0) {
            y = 2;
        }
        if (y > width) {
            y = width - 2;
        }

        // object is probably past boundaries, therefore move it back
        // in boundaries so other functions work properly
        moveDiv.style.top = y+"px";
        return generateAngleFloor(angle);
    } else {
        return angle;
    }
}

var setXVelocity = function(angle, max) {
    if (angle < 180) {
        // should always be positive
        var xVel = Math.abs(Math.sin(angle * (180 / Math.PI)) * max);
        return xVel;
    } else {
        // should always be negative
        return -Math.abs(Math.sin(angle * (180 / Math.PI)) * max);
    }
}

var setYVelocity = function(angle, max) {
    if (angle < 270 && angle > 90) {
        // should always be negative
        var yVel = Math.abs(Math.cos(angle * (180 / Math.PI)) * max);
        return yVel;
    } else {
        // should always be positive
        return -Math.abs(Math.cos(angle * (180 / Math.PI)) * max);
    }
}

// start angle of duck
var angle = 135;

var moveDuck = function(e) {
    var duckImage = document.getElementById("duck");
    var moveDiv = document.querySelector(".move");
    var max = 10;

    angle = checkWalls(moveDiv, angle);

    var x = (moveDiv.style.left);
    var y = (moveDiv.style.top);
    x=x.substring(0,x.length-2);
    x=parseInt(x);
    y=y.substring(0,y.length-2);
    y=parseInt(y);

    if (isNaN(x)) x=200;
    if (isNaN(y)) y=200;

    x = x + setXVelocity(angle, max);
    y = y + setYVelocity(angle, max);

    moveDiv.style.left = x + "px";
    moveDiv.style.top = y + "px";
}

var myevent;
function startit() {
     myevent = setInterval(moveDuck,10);
}

function stopit() {
        window.clearTimeout(myevent);
}

startit();

