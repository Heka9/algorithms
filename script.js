function generateRandomArray (minValue, maxValue, arrayLength) {
    return Array(arrayLength).fill(undefined).map(() => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
}
function parseUserData (string){
    return string.split(',').map((x) => parseInt(x, 10));
}
function swapElements (array, i, j)  {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
function sortArrayWithMethod(sortMethod) {
    let result;

    if (userArrayFlag.checked && userArray.length > 0) {
        result = sortMethod([...userArray]);
    } else if (randomArrayFlag.checked && randomArray.length > 0) {
        result = sortMethod([...randomArray]);
    }
    if (result) {
        sortedArrayParagraph.textContent = result.array.join(',\n');
        iterationsCounterParagraph.textContent = `${result.swapQ} swaps and used ${result.iterationsQ} iterations`;
    }
}
function checkFlags() {
    if(randomArrayFlag.checked && userArrayFlag.checked) {
        bubbleSortButton.disabled = true;
        shakerSortButton.disabled = true;
        oddEvenSortButton.disabled = true;
        combSortButton.disabled = true;
        errorMsg.textContent = "You can't sort two arrays at same time";
    } else {
        bubbleSortButton.disabled = false;
        shakerSortButton.disabled = false;
        oddEvenSortButton.disabled = false;
        combSortButton.disabled = false;
        errorMsg.textContent = "";
    }
}
function resetData () {
    sortedArrayParagraph.textContent = '';
    iterationsCounterParagraph.textContent = ``;
    randomArrayParagraph.textContent = '';
    userArrayParagraph.textContent = '';
    userInput.value = '';
    userArrayFlag.checked = false;
    randomArrayFlag.checked = false;
    errorMsg.textContent = '';
    randomArray = [];
    userArray = [];
}

function bubbleSort (array){
    let iterationsQ = 0;
    let swapQ = 0

    for (let i = 0; i < array.length; i++){
        let wasSwap = false;

        for (let j = 0; j < array.length - i - 1; j++){
            iterationsQ++
            if(array[j] > array[j + 1]){
                swapElements(array, j, j + 1);
                wasSwap = true;
                swapQ++
            }
        }
        if(!wasSwap) break
    }

    return {array, swapQ, iterationsQ}
}
function shakerSort (array){
    let left = 0;
    let right = array.length - 1;
    let wasSwap = true;
    let iterationsQ = 0;
    let swapQ = 0;

    while (left < right && wasSwap) {
        wasSwap = false;

        for (let i = left; i < right; i++) {
            iterationsQ++
            if (array[i] > array[i + 1]) {
                swapElements(array, i, i + 1);
                wasSwap = true;
                swapQ++
            }
        }
        right--;

        for (let i = right; i > left; i--) {
            iterationsQ++
            if (array[i] < array[i - 1]) {
                swapElements(array, i, i - 1);
                wasSwap = true;
                swapQ++
            }
        }
        left++;
    }
    return {array, swapQ, iterationsQ};
}
function oddEvenSort (array){
    let wasSwap = true;
    let iterationsQ = 0;
    let swapQ = 0

    while (wasSwap) {
        wasSwap = false;

        for(let i = 1; i < array.length - 1; i += 2){
            iterationsQ++
            if(array[i] > array[i + 1]){
                swapElements(array, i, i + 1);
                wasSwap = true;
                swapQ++
            }
        }
        for(let i = 0; i < array.length - 1; i += 2){
            iterationsQ++
            if(array[i] > array[i + 1]){
                swapElements(array, i, i + 1);
                wasSwap = true;
                swapQ++
            }
        }
    }

    return {array, swapQ, iterationsQ};
}
function combSort (array){
    const factor = 1.247;
    let gap = array.length;
    let wasSwap = true;
    let iterationsQ = 0;
    let swapQ = 0

    while (gap > 1 || wasSwap) {
        wasSwap = false;
        gap = Math.floor(gap / factor);
        if(gap < 1) gap = 1;

        for (let i = 0; i < array.length - gap; i++) {
            iterationsQ++
            if (array[i] > array[i + gap]) {
                swapElements(array, i, i + gap);
                wasSwap = true;
                swapQ++
            }
        }
    }
    return {array, swapQ, iterationsQ};
}

const randomArrayFlag = document.getElementById('random-input-checkbox');
const userArrayFlag = document.getElementById('user-input-checkbox');
const generateArrayButton= document.getElementById('generate-button');
const userInput= document.getElementById('input-array');
const errorMsg= document.querySelector('.error');

const bubbleSortButton= document.getElementById('bubble-sort');
const shakerSortButton= document.getElementById('shaker-sort');
const oddEvenSortButton= document.getElementById('odd-even-sort');
const combSortButton= document.getElementById('comb-sort');
const resetButton= document.getElementById('reset');

const sortedArrayParagraph = document.querySelector(".sorted-array span")
const iterationsCounterParagraph = document.querySelector(".iterations span")
const randomArrayParagraph = document.querySelector(".random-array span")
const userArrayParagraph = document.querySelector("p.user-array span")

let userArray = []
let randomArray= []

userInput.addEventListener('change', () => {
    userArray = parseUserData(userInput.value);
    userArrayParagraph.textContent = userArray.join(',\n');
})
userArrayFlag.addEventListener('change', () => {
    userInput.disabled = !userArrayFlag.checked;
    checkFlags()
})
generateArrayButton.addEventListener('click', () => {
    const minValueRandomArray = parseInt(document.getElementById("input-min-value").value, 10);
    const maxValueRandomArray = parseInt(document.getElementById("input-max-value").value, 10);
    const randomArrayLength = parseInt(document.getElementById("input-length").value, 10);

    randomArray = generateRandomArray(minValueRandomArray, maxValueRandomArray, randomArrayLength);
    randomArrayParagraph.textContent = randomArray.join(',\n');
})
randomArrayFlag.addEventListener('change', () => {
    const minValueRandomArray= document.getElementById("input-min-value");
    const maxValueRandomArray= document.getElementById("input-max-value");
    const randomArrayLength= document.getElementById("input-length");

    if (randomArrayFlag.checked) {
        generateArrayButton.disabled = false;
        minValueRandomArray.disabled = false;
        maxValueRandomArray.disabled = false;
        randomArrayLength.disabled = false;
    } else {
        generateArrayButton.disabled = true;
        minValueRandomArray.disabled = true;
        maxValueRandomArray.disabled = true;
        randomArrayLength.disabled = true;
    }

    checkFlags()
})
resetButton.addEventListener('click', resetData)

bubbleSortButton.addEventListener('click', () => {
    sortArrayWithMethod(bubbleSort)
})
shakerSortButton.addEventListener('click', () => {
    sortArrayWithMethod(shakerSort)
})
oddEvenSortButton.addEventListener('click', () => {
    sortArrayWithMethod(oddEvenSort)
})
combSortButton.addEventListener('click', () => {
    sortArrayWithMethod(combSort)
})
