var text = ["Frontend Lover", "Backend Warrior", "Tech Fanatic", "Web Developer"];
var counter = 0;
var elem = $("#intro-animation");
setInterval(change, 1750);
function change() {
    elem.fadeOut(function(){
        elem.html(text[counter]);
        counter++;
        if(counter >= text.length) { counter = 0; }
        elem.fadeIn();
    });
}