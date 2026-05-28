let boxes =document.querySelectorAll(".box");
let resetBtn=document.querySelector("#Reset-btn");
let newGameBtn =document.querySelector("#newGame-btn");
let msgContainer=document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO =true; 
let count =0;
let win = false;
let drawMessage= document.querySelector(".draw");
const winPatterns=[
    [0,1,2],
    [0,3,6], 
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const draw = () => {
    if (count===9 && win===false){
        drawMessage.classList.remove("hide");
        disableBoxes();
    }
}
const resetGame = () =>{
    turnO=true;
    enableBoxes();
    for(let box of boxes){
        box.innerText="";
        box.disabled=false;
    }
    msgContainer.classList.add("hide");
    drawMessage.classList.add("hide");
    count=0;
    win=false;


}
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled =true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled =false;
    }
}

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        if (turnO===true){
            box.innerText = "O";
            turnO= false;
            count=count+1;

        }else{ 
            box.innerText = "X";
            turnO =true;
            count=count+1;
        }
        box.disabled=true;

        checkWinner();
        draw()
    } );
});



const showWinner = (winner) => {
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos0 = boxes[pattern[0]].innerText;
        let pos1 = boxes[pattern[1]].innerText;
        let pos2 = boxes[pattern[2]].innerText;

        if (pos0 !== "" && pos0 === pos1 && pos1 === pos2) {
            console.log("Winner!", pos0); // X or O wins
            win=true;
            showWinner(pos0);


        }
    }
};

newGameBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click" , resetGame)
