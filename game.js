import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'
// figure out how long it's been since the last time we rendered
let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
/* main: make a game loop so we can constantly update our render to update snake position and food
 * inputs:
 *      currentTime: the exact time stamp of when this function runs
 */
function main(currentTime){
    if(gameOver){
        if(confirm('You lost. Press ok to restart.')){
            window.location = '/'
        }
        return
    }
    // asks the browser to tell us when we can render the next frame and tells us the current time
    window.requestAnimationFrame(main)
    // convert to seconds
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    // we don't need to move our snake if the threshold isn't met
    if(secondsSinceLastRender < 1/SNAKE_SPEED) return

    lastRenderTime = currentTime
    
    // udpate all the logic for the game 
    update()
    
    //draws everything on the screen based on data collected from update
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()

}