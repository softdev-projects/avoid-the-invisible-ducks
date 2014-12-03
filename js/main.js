var duck = document.getElementById("duck");

var distance = function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
};

var distanceFromMouse = function(element, mouseX, mouseY) {
        var rect = element.getBoundingClientRect();
        var elemX = (rect.left + rect.right) / 2;
        var elemY = (rect.top + rect.bottom) / 2;
        return distance(mouseX, mouseY, elemX, elemY);
};

var monitorMouse = function(e) {
        if (distanceFromMouse(duck, e.pageX, e.pageY) < 40) {
                revealDuck();
                alert("you got too close to the duck");
        }
};

var revealDuck = function() {
        duck.style.visibility = "visible";
}

window.onload = function() {
        this.addEventListener("mousemove", monitorMouse);
};