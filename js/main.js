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
        var duck = document.getElementById("duck");
        console.log(distanceFromMouse(duck, e.pageX, e.pageY));
};

window.onload = function() {
        this.addEventListener('mousemove', monitorMouse);
};