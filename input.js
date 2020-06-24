let inputDirection = { x: 0, y: 0}
let lastInputDirection = { x: 0, y: 0}

// purpose: register the inputs and execute the corresponding action
window.addEventListener('keydown', e => {
    switch(e.key){
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1} // it's good to note that up is a shift down on the y axis
            break
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1}
            break
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break
            inputDirection = { x: -1, y: 0}
            break
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: 0}
            break
            
    }
})

// purpose: store the last input direction, and return the new input direction
export function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection
}