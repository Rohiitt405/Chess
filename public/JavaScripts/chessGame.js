const { Chess } = require("chess.js");
const socket = io();
const chess = new Chess();
const boardElement = document.querySelector("#chessBoard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareIdx) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", (rowindex + squareIdx) %2 === 0? "ligh" : "dark");

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareIdx;

            if(square){
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === "W"? "white": "black");
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if(pieceElement.draggable){
                        draggedPiece = pieceElement;
                        sourceSquare = {row: rowindex, col: squareIdx};
                        e.dataTransfer.setData("text/plain", "");
                    }
                });
                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
                if(draggedPiece) {
                    const targetSource = {row: parseInt(squareElement.dataset.row), col: parseInt(squareElement.dataset.col)}
                }

                handleMove(sourceSquare, targetSource);
            })
        });        
        boardElement.appendChild(squareElement);
    });
};

const handleMove = () => {
    const move = {
    from:`${string.fromCharCode(97+source.col)}${8-source.row}`,
    to:`${string.fromCharCode(97+ target.col)}${8-source.row}`,
    promotion: 'q'}
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙',
        'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟'
    };
    return unicodePieces[piece.type] ||"";
};
