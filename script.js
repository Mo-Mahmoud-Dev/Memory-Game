let startButton = document.getElementById("startButton");
let userName = document.querySelector(".name span");

startButton.addEventListener("click", () => {

  let inputName = prompt("What's Your Name ?");

  if (inputName == null || inputName == "") {
    userName.innerHTML = "Anonymous";
  } else {
    userName.innerHTML = inputName;
  }

  document.querySelector(".control-buttons").remove();
});

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
// let orderRange = Array.from(...Array(blocks.length).keys()); => let orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);


blocks.forEach((block, index) => {

  block.style.order = orderRange[index];

  block.addEventListener('click', () => {
    flipBlock(block);

  });
})

// Flip Block Function
function flipBlock(selectedBook) {

  selectedBook.classList.add('is-flipped');
  // collect All Flipped Cards
  let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'));
  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();
    // check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }

}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add('no-clicking');
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove('no-clicking');
  }, duration);
}

// check Matched Block 
function checkMatchedBlocks(firstBlock, secondBlock) {

  let triesElement = document.querySelector('.tries span');

  if(firstBlock.dataset.animals === secondBlock.dataset.animals) {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    
    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    document.getElementById('win').play();

  }else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');  
    }, duration);
    document.getElementById('lose').play();
  }
}

//* shuffle Function
function shuffle(array) {
  //setting vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);
    current--;
    //? Destructuring Swiper
    // [1] save current Element in stash
    temp = array[current];
    // [2] current Element = Random Element
    array[current] = array[random];
    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }

  return array;
}

