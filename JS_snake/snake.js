//https://www.educative.io/edpresso/how-to-create-a-countdown-timer-using-javascript
//https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
//https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser 
//https://www.w3schools.com/howto/howto_js_rangeslider.asp

//DEFINE CONSTANTS
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;

const KEY_ARROW_LEFT = 37;
const KEY_ARROW_UP = 40;
const KEY_ARROW_RIGHT = 39; 
const KEY_ARROW_DOWN = 38;

$(document).ready(function(){

    const playerW = 25;

    const EASY = 200;
    const MEDIUM = 100;
    const HARD = 50;

    //settings
    var playgroundColumns = 20;
    var interval = MEDIUM; //400
    var offset = 25;
    var playgroundW = playerW * playgroundColumns;

    var Slength = 2;
    var Tailname;

    var playgroundArr = new Array(playgroundColumns);

    var Head = document.getElementById("Head");
    var PG = document.getElementById("Playground");

    PG.style.width = playgroundW;
    PG.style.height = playgroundW;
    Head.style.width = playerW;
    Head.style.height = playerW;

    var xpos = 0;
    var ypos = 0;

    var game = false;
    var time = 0;
   
    var direction;

    if(Head != undefined){

        //while(game){

            var HeadW = playerW;
            var PGW = playgroundW;
            

            document.addEventListener("keydown",event => {  //function(event)w
                game = true;

                if(event.keyCode == KEY_ARROW_RIGHT) {
                    direction = RIGHT;
                }
                if(event.keyCode == KEY_ARROW_LEFT) {
                    direction = LEFT;
                }
                if(event.keyCode == KEY_ARROW_DOWN) {
                    direction = DOWN;
                }
                if(event.keyCode == KEY_ARROW_UP) {
                    direction = UP;
                }
                
            });

            var arrow_keys_handler = function(e) {
                switch(e.keyCode){
                    case 37: case 39: case 38:  case 40: // Arrow keys
                    case 32: e.preventDefault(); break; // Space
                    default: break; // do not block other keys
                }
            };
            window.addEventListener("keydown", arrow_keys_handler, false);

            function playground(){

                for(var i = 0; i < playgroundArr.length; i++)
                {
                    playgroundArr[i] = [];
                }
        
                for (var i = 0; i < playgroundColumns; i++) { 
                    for (var j = 0; j < playgroundColumns; j++) { 
                
                        playgroundArr[i][j] = 0; 
                    } 
                } 
            }
        
            function borders(){
                //Check borders
                if(xpos >= playgroundColumns) xpos = 0;
                else if(xpos < 0) xpos = (playgroundColumns-1);
                else if(ypos >= playgroundColumns) ypos = 0;
                else if(ypos < 0) ypos = (playgroundColumns-1);
            }

            function map(){
                if(playgroundArr[ypos][xpos] == -1)
                {
                    Slength += 1;

                    var Fruit = document.getElementById("Fruit");
                    Fruit.parentNode.removeChild(Fruit);

                    var Tail = document.createElement('div');
                    Tail.setAttribute('class', 'Tail');
                    Tail.setAttribute('id', 'tail' + (Slength-2));
                    document.getElementById("snake").appendChild(Tail);

                    playgroundArr[ypos][xpos] = Slength;
                    interval = interval * 0.9

                    fruit();
                }

                else if (playgroundArr[ypos][xpos] > 0 && playgroundArr[ypos][xpos] < (Slength - 1))
                {
                    game = false;
                    alert("Game Over!");
                    location.reload();
                    
                }

                else
                {
                    playgroundArr[ypos][xpos] = Slength;
                }

                //console.log(playgroundArr);
                //console.log(xpos + " " + ypos);
            }

            function sub(){
                for(var i = 0; i < 20; i++) // row 
                {
                    for(var j = 0; j < 20; j++) // column
                    {
                        if(playgroundArr[i][j] != 0) //|| playgroundArr[i][j] != -1)
                        {
                            if(playgroundArr[i][j] != -1)
                            {
                            //sub everything except 0, -1
                            playgroundArr[i][j] = (playgroundArr[i][j] - 1);
                            }
                        }
                    }
                }
            }

            function drawSnake(){
                for(var i = 0; i < 20; i++) // row 
                {
                    for(var j = 0; j < 20; j++) // column
                    {
                        if(playgroundArr[i][j] == Slength-1)
                        {
                            Head.style.left = (j * 25) + offset;
                            Head.style.top = (i * 25) + offset;
                        }
                    }
                }
            }

            function drawTail(){
                if((Slength-2) > 0)
                {
                    for(var i = 0; i < 20; i++) // row 
                    {
                        for(var j = 0; j < 20; j++) // column
                        {
                            for(var Tailnum = (Slength-2); Tailnum >= 1; Tailnum--)
                            {
                                Tailname = "tail" + Tailnum;
                                
                                if(playgroundArr[i][j] == Tailnum)
                                {
                                    var Tail = document.getElementById(Tailname);
                                    Tail.style.width = "25px";
                                    Tail.style.height = "25px";

                                    Tail.style.left = (j * 25) + offset;
                                    Tail.style.top = (i * 25) + offset;
                                }
                            }
                        }
                    }
                }
            }

            function fruit(){

                var fruit = document.createElement('div');
                fruit.setAttribute('class', 'Fruit');
                fruit.setAttribute('id', 'Fruit');
                document.getElementById("fruits").appendChild(fruit);

                var blanks = playgroundColumns**2 - (Slength-1);
                var fruitpos = Math.floor(Math.random() * blanks);
                
                for(var i = 0; i < 20; i++) // row 
                {
                    for(var j = 0; j < 20; j++) // column
                    {
                        if(playgroundArr[i][j] == 0)
                        {
                            if(fruitpos == 0)
                            {
                                playgroundArr[i][j] = -1;

                                fruit.style.left = (j*25) + offset; 
                                fruit.style.top = (i*25) + offset;
                            }
                            fruitpos--;
                        }
                    }
                }
            }

            function score(){
                //score
                document.getElementById("score").innerHTML = "Score: "+ ((Slength-2)*10).toString(10)

                //time
                var minutes = Math.floor((time % (60 * 60)) / (60));
                var seconds = Math.floor(time % (60));

                document.getElementById("time").innerHTML = "Time:  " + (minutes).toString(10) + ":" + (seconds).toString(10)
            }

            function settings(){
                var slider = document.getElementById("myRange");
                var output = document.getElementById("Dif");
                output.innerHTML = "Difficulty: Medium"; // Display the default slider value

                // Update the current slider value (each time you drag the slider handle)
                slider.oninput = function() {
                    switch(this.value)
                    {
                        case "1":
                                output.innerHTML = "Difficulty: Easy";
                                interval = EASY;
                            break;

                        case "2":
                                output.innerHTML = "Difficulty: Meduim";
                                interval = MEDIUM;
                            break;

                        case "3":
                                output.innerHTML = "Difficulty: Hard";
                                interval = HARD;
                            break;

                    }
                }
            }

            // create PG array
            playground();
            settings();

            //create initial fruit
            fruit();

            setInterval(function(){ 
                
                if(game)
                {

                   switch(direction)
                    {
                        case LEFT:
                                xpos -= 1;
                            break;
                        case RIGHT:
                                xpos += 1;
                            break;
                        case UP:
                                ypos += 1;
                            break;
                        case DOWN:
                                ypos -= 1;
                            break;
                    }
                    //alert(xpos + " " + ypos)
                    borders(); 

                    map();

                    score();

                    sub();

                    drawSnake();

                    drawTail();

                }

             }, interval);

             setInterval(function(){
                 if(game)
                 {
                 time++;
                 }
             }, 1000)

        //}
    }



function generateApple(e){
    
}

});