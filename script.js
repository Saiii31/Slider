// Step 1: Get DOM Elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time');

let timeRunning = 500;  // Adjusted for smoother transition
let timeAutoNext = 3000;

// Event Listeners for Buttons
nextDom.onclick = function () {
    showSlider('next');    
};

prevDom.onclick = function () {
    showSlider('prev');    
};

// Auto-Slide Timer
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

// Function to Show Next or Previous Slide
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    // Check if there are items to move
    if (SliderItemsDom.length === 0 || thumbnailItemsDom.length === 0) {
        console.warn('No items to slide.');
        return;
    }

    if (type === 'next') {
        // Move the first item to the end
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else if (type === 'prev') {
        // Move the last item to the beginning
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    // Disable buttons during transition
    nextDom.disabled = true;
    prevDom.disabled = true;

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        // Remove transition classes and enable buttons
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');

        nextDom.disabled = false;
        prevDom.disabled = false;
    }, timeRunning);

    // Reset the auto-slide timer
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}
