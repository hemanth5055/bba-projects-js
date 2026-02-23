//X -> +1;
//O -> -1
const msg = document.querySelector(".msg")
const reset = document.querySelector(".reset")
const cells = document.querySelectorAll(".cell")
let board = [[0,0,0],[0,0,0],[0,0,0]]
let moves = 0;
let currPlayer = +1
function checkWin(arr, val) {
    switch (true) {
        // Horizontal Wins
        case (arr[0][0] === val && arr[0][1] === val && arr[0][2] === val):
            return { win: true, indices: [0, 1, 2] };
        case (arr[1][0] === val && arr[1][1] === val && arr[1][2] === val):
            return { win: true, indices: [3, 4, 5] };
        case (arr[2][0] === val && arr[2][1] === val && arr[2][2] === val):
            return { win: true, indices: [6, 7, 8] };

        // Vertical Wins
        case (arr[0][0] === val && arr[1][0] === val && arr[2][0] === val):
            return { win: true, indices: [0, 3, 6] };
        case (arr[0][1] === val && arr[1][1] === val && arr[2][1] === val):
            return { win: true, indices: [1, 4, 7] };
        case (arr[0][2] === val && arr[1][2] === val && arr[2][2] === val):
            return { win: true, indices: [2, 5, 8] };

        // Diagonal Wins
        case (arr[0][0] === val && arr[1][1] === val && arr[2][2] === val):
            return { win: true, indices: [0, 4, 8] };
        case (arr[0][2] === val && arr[1][1] === val && arr[2][0] === val):
            return { win: true, indices: [2, 4, 6] };

        default:
            return { win: false, indices: [] };
    }
}
cells.forEach((cell)=>{
    cell.addEventListener("click",()=>{
        let r = Number(cell.dataset.row)
        let c = Number(cell.dataset.col)
        if(board[r][c]===0){
            ++moves;
            if(currPlayer===1){ //X's turn
                board[r][c]=1;
                cell.innerHTML =`<i class="fa-solid fa-x"></i>` 
                currPlayer=-1
                validate(1)
            }else{
                board[r][c]=-1;
                cell.innerHTML =`<i class="fa-solid fa-o"></i>` 
                currPlayer=1
                validate(-1)
            }
        }
    })
})

function resetCells(){
    board = [[0,0,0],[0,0,0],[0,0,0]]
    moves = 0;
    currPlayer = +1
    cells.forEach((cell)=>{
            cell.innerHTML =``
            cell.style.backgroundColor="white";
    })
}
function validate(lastVal) {
    const res = checkWin(board, lastVal);
    if (res.win) {
        msg.innerText = `${lastVal === 1 ? "X" : "O"} Won`;
        res.indices.forEach(index => {
            const cellElement = document.querySelector(`.cell:nth-child(${index + 1})`);
            if (cellElement) {
                cellElement.style.backgroundColor = "#A6EC9B";
            }
        });

       setTimeout(() => {
            resetCells()
       }, 1000);
    } else {
        if (moves === 9) {
            msg.innerText = "Tie";
            resetCells();
        } else {
            // console.log("Continue Playing");
        }
    }
}

reset.addEventListener("click",resetCells)