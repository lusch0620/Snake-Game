import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0 // figure out how long it's been since the last time we rendered
let gameOver = false 
const gameBoard = document.getElementById('game-board') // essentially just grabs gameBoard from the html file

// purpose: make a game loop so we can constantly update our render to update snake position and food
function main(currentTime){
    if(gameOver){ // check to see if the player lost the game
        if(confirm('You lost. Press ok to restart.')){
            window.location = '/' // the '/' is just the home path name
        }
        return
    }
    window.requestAnimationFrame(main) // asks the browser to tell us when we can render the next frame and tells us the current time
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 // convert to seconds
    if(secondsSinceLastRender < 1/SNAKE_SPEED) return // we don't need to move our snake if the threshold isn't met

    lastRenderTime = currentTime
    
    update() // udpate all the logic for the game 
    draw() //draws everything on the screen based on data collected from update
}

/* window.requestAnimationFrame explanation
    - Syntax: window.requestAnimationFrame(callback)
        -callback: the function to call when it's time to update the animation for the next repaint
    - Essentially just tells the browser that we want to perform an animation. This method then 
        proceeds to request that the browser calls a specified funtion to update an animation before
        the next repaint. It is important to note that the requestAnimationFrame() must be called 
        once in the callback routine and outside of it. 
*/
window.requestAnimationFrame(main) 

// purpose: update all relevant aspects of the game, namely snake and food position, snake length, and game status
function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

//purpose: to draw/update all the relevant aspects of the game
function draw(){
    gameBoard.innerHTML = '' // allows the snake to move without letting us see its previous path
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

// purpose: checks whether or not the player has died
function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()

}