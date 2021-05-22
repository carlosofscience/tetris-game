let board = document.querySelector('.tetris-board');
let scoreElem = document.querySelector('h1');
let height = 26, width = 12, gameScore = 0, currentTetromino, isGameOver = false;

for (let i = 0; i < height * width; i++) {
    let cell =  document.createElement('li');
    let x = i % width, y = Math.floor(i/width);
    if(y == 0 || y == height-1 || x ==0 || x == width-1)
        cell.style.backgroundColor = "black";
    else
        cell.style.backgroundColor = "white";

    board.appendChild(cell);
}

let tetrominos = [
    {
        name:'L',
        data: [
            0,0,1,
            0,0,1,
            0,1,1,
        ],
        color:"orange"
    },
    {
        name:'O',
        data: [
            1,1,
            1,1,
        ],
        color:"yellow"
    },
    {
        name:'T',
        data: [
            1,1,1,
            0,1,0,
            0,0,0,
        ],
        color:"pink"
    },
    {
        name:'z',
        data: [
            1,1,0,
            0,1,1,
            0,0,0,
        ],
        color:"green"
    },
    {
        name:'s',
        data: [
            0,1,1,
            1,1,0,
            0,0,0,
        ],
        color:"red"
    },
    {
        name:'I',
        data: [
            0,1,0,0,
            0,1,0,0,
            0,1,0,0,
            0,1,0,0,
        ],
        color:"cyan"
    }
    
    
]


genNewTetromino();

function checkForCollision(tetromino = currentTetromino.tetromino, position = currentTetromino.position){
    let result = false;
    let root  = Math.sqrt(tetromino.data.length);

    board.childNodes.forEach((cell, index)=>{
        let x =  index % width, y = Math.floor(index/width);
        let root  = Math.sqrt(tetromino.data.length);
        let dx = x - position.x, dy = y - position.y;
        if(x >= position.x && y >= position.y && dx < root && dy < root){

            let di = dy * root + dx;
            if(tetromino.data[di] && cell.style.backgroundColor != "white"){
                cell.innerHTML = "X";
                result = true;
            }

        }

    })

    return result;
}

function cleanTetromino(){
    const {tetromino, position} = currentTetromino;

    board.childNodes.forEach((cell, index)=>{
        let x =  index % width, y = Math.floor(index/width);
        let root  = Math.sqrt(tetromino.data.length);
        let dx = x - position.x, dy = y - position.y;
        if(x >= position.x && y >= position.y && dx < root && dy < root){

            let di = dy * root + dx;
            if(tetromino.data[di])
                cell.style.backgroundColor = "white";
        }

    })
}

function rotateTettromuino(direction = 1){

    //clean tetromino
    cleanTetromino();
    //rotatate
    const {tetromino} = currentTetromino;
    let len = tetromino.data.length, squareLen = Math.sqrt(len);
    let temp = new Array(len);
    
    if(direction > 0){
        //if rotate to the left, rotate 3+1 times
        console.log("rotating left");

        for (let i = 0; i < 2; i++) {

            temp = new Array(len);

            tetromino.data.forEach((val, i)=>{
                let x = i % squareLen, y= Math.floor(i / squareLen), index =  len - (squareLen * (x+1)) + y;
                temp[index] = val;
            })
            console.log(temp);

            currentTetromino.tetromino.data = temp;

        }
        
    }
    temp = new Array(len);
    tetromino.data.forEach((val, i)=>{
        let x = i % squareLen, y= Math.floor(i / squareLen), index =  len - (squareLen * (x+1)) + y;
        temp[index] = val;
    })

    currentTetromino.tetromino.data = temp;
    
        


    //check for collision
    //if collision but back to normal
    if (checkForCollision()){
        //maybe clean
        //revert changes
        
    if(direction < 0){
        //if rotate to the left, rotate 3+1 times
        console.log("undo rotating left");

        for (let i = 0; i < 2; i++) {

            temp = new Array(len);

            tetromino.data.forEach((val, i)=>{
                let x = i % squareLen, y= Math.floor(i / squareLen), index =  len - (squareLen * (x+1)) + y;
                temp[index] = val;
            })
            console.log(temp);

            currentTetromino.tetromino.data = temp;

        }
        
    }
    temp = new Array(len);
    tetromino.data.forEach((val, i)=>{
        let x = i % squareLen, y= Math.floor(i / squareLen), index =  len - (squareLen * (x+1)) + y;
        temp[index] = val;
    })

    currentTetromino.tetromino.data = temp;

        console.log("found collision while rotating");
    }
    // /otherwise go to go update tetromino
    moveTetromino(currentTetromino.position);
    
    
}

function moveTetromino(position){
    const {tetromino}  = currentTetromino;

    cleanTetromino();
    let isThereCollision = checkForCollision(tetromino, position);
    if (!isThereCollision)
    {
        currentTetromino.position = position;

    }else if (currentTetromino.position.y==1){
        displayTetromino()
        onGameOver();
    }
    displayTetromino()
    return !isThereCollision;
}

//updates html dom
function displayTetromino(){
    
        const {tetromino, position} = currentTetromino;

        board.childNodes.forEach((cell, index)=>{
            let x =  index % width, y = Math.floor(index/width);
            let root  = Math.sqrt(tetromino.data.length);
            let dx = x - position.x, dy = y - position.y;
            if(x >= position.x && y >= position.y && dx < root && dy < root){

                let di = dy * root + dx;
                if(tetromino.data[di])
                    cell.style.backgroundColor = tetromino.color;
            }

        })
    
}


window.addEventListener('keydown', e =>{
    console.log(e.keyCode);
    switch(e.keyCode){
        case 37:
            moveTetromino({x:currentTetromino.position.x - 1, y:currentTetromino.position.y})
            break;
        case 38:
        case 69://E
            rotateTettromuino(1);
            break;
        case 81://Q
            rotateTettromuino(-1);
            break;
        case 39:
            moveTetromino({x:currentTetromino.position.x + 1, y:currentTetromino.position.y})
            break;QQ
        case 40:
            moveTetromino({x:currentTetromino.position.x, y:currentTetromino.position.y + 1})
            break;
        case 32:
            {
                let go = true;
                while (go){
                    go = moveTetromino({x:currentTetromino.position.x, y:currentTetromino.position.y + 1})
                }
                genNewTetromino();
            }
            break;
        }
    
})

function genNewEmptyBoardLine(){

    let newLine = [];
    for (let i = 0; i < width; i++) {
        let cell =  document.createElement('li');
        if(i==0 || i == width-1)
            cell.style.backgroundColor = "black"
        else
            cell.style.backgroundColor = "white"
        newLine.push(cell)
    }
    return newLine
}

function checkForLine(){
    console.log("checking for line");

    //check, clear and return num of  lines
    let score = 0, line = [], cellsLine = [];
    board.childNodes.forEach((cell, index)=>{
        let color = cell.style.backgroundColor;
        let x = index % width, y = Math.floor(index / width);
        
        if(y > 0 && y < height ){
            cellsLine.push(cell);
            line.push(color);

            if(x == 11 && index < 300){
                if(!line.includes("white")){
                    cellsLine.forEach(cell=> cell.innerHTML= "X")
                    
                    //move everything down, and check gor line again
                    cellsLine.forEach(lineCell=>{lineCell.remove()})
                    genNewEmptyBoardLine().forEach(newCell =>{
                        board.insertBefore(newCell, board.childNodes[width])
                    })
                    console.log("found a line!!!!!!!!");
                    score += 1;
                    score += checkForLine();
                    return  score;
                }
                cellsLine = [];
                line  = [];
            }
        }

    })

    return score;
}

function genNewTetromino(){
    console.log("Generating new tetromino");
    gameScore += checkForLine();
    currentTetromino = {tetromino: Object.assign({}, tetrominos[Math.round(Math.random() * (tetrominos.length-1))]), position:{x:4, y:1 }}
    scoreElem.innerHTML = `Score: ${gameScore}`;
}


function onGameOver(){
    //called when a tetromino collides at y = 0
    alert("bruhh game over...")
    //clean board
    isGameOver = true;
    board.childNodes.forEach((cell, i)=>{
        let x = i % width, y = Math.floor(i/width);
        if(y == 0 || y == height-1 || x ==0 || x == width-1)
            cell.style.backgroundColor = "black";
        else
            cell.style.backgroundColor = "white";
        cell.innerHTML="";
    })
    //gen new tetromino
    genNewTetromino();
}

//gameloop
let delayFirstMove = 1;
setInterval(() => {
    const {x, y} = currentTetromino.position;
    
    if(y == 1 && delayFirstMove == 1){
        delayFirstMove = 0;
    }else{
        delayFirstMove = 1;
    }

    //delay 1 time on the first move
    let collides = !moveTetromino({x, y:y+delayFirstMove});

    if(collides && !isGameOver)
    {
        genNewTetromino();
    }
}, 800);



