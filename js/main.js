var duck = document.getElementById("duck");
var mouseX, mouseY;

var distance = function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
};

var distanceFromMouse = function(element) {
        var rect = element.getBoundingClientRect();
        var elemX = (rect.left + rect.right) / 2;
        var elemY = (rect.top + rect.bottom) / 2;
        return distance(mouseX, mouseY, elemX, elemY);
};

var updateMouseCoords = function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
}

var checkMouse = function(e) {
        var distance = distanceFromMouse(duck);
        console.log(distance);
        if (distance < 50) {
                revealDuck();
                alert("you got too close to the duck");
        }
};

var revealDuck = function() {
        duck.style.visibility = "visible";
}

window.onload = function() {
        this.addEventListener("mousemove", updateMouseCoords);
        startit();
};