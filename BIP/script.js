let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');

function showSlide(index) {
    if (index >= images.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex = index;
    }

    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
}

function moveSlide(direction) {
    showSlide(currentIndex + direction);
}

setInterval(() => {
    moveSlide(1);
}, 5000);


showSlide(currentIndex);