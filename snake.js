import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5 // how many times the snake moves per second
const snakeBody = [{ x: 11, y: 11}] // initialize the starting position to the center of the grid
let newSegments = 0

// purpose: update the snake's location and length
export function update(){
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--){ // take the position of a given segment and the segment after that is going to move into the new position
        // we start at length - 2 (second to last square) because the bottom of our snake is going to disappear anyways
        snakeBody[i+1] = { ...snakeBody[i]} // just shifting our entire snake forward
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

}

// purpose: draw the game board
export function draw(gameBoard){
    snakeBody.forEach(segment => { 
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount){
    newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}){
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y

}

// purpose: once the snake has eaten food, add on the correct amount of squares
function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0
}