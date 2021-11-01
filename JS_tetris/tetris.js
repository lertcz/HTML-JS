//10x20

//Define Constants
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;

const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 40;
const KEY_ARROW_RIGHT = 39; 
const KEY_ARROW_DOWN = 38;


// O I S Z L J T

// OO   O    OO   OO    O    O  OOO
// OO   O   OO     OO   O    O   O
//      O               OO  OO  
//      O

$(document).ready(function(){

    var height = 20;
    var width = 10;
    var square = 35;

    var PG = document.getElementById("Playground");
    var test = document.getElementById("test");

    PG.style.height = height * square;
    PG.style.width = width * square;

    var xpos = 0;
    var ypos = 0;

    if(PG != undefined){

        document.addEventListener("keydown",event => {  //function(event)w
            game = true;

            if(event.keyCode == KEY_ARROW_RIGHT) {
                //direction = RIGHT;
                xpos += square;
            }
            if(event.keyCode == KEY_ARROW_LEFT) {
                //direction = LEFT;
                xpos -= square;
            }
            if(event.keyCode == KEY_ARROW_DOWN) {
                //direction = DOWN;
                ypos -= square;
            }
            if(event.keyCode == KEY_ARROW_UP) {
                //direction = UP;
                ypos += square;
            }
            test.style.top = ypos;
            test.style.left = xpos;
        });


    }

});