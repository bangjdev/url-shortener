const listBackgroundImages = ["back_1.jpeg", "back_2.jpg", "back_3.jpg", "back_4.jpg", "back_5.jpg", "back_6.jpg", "back_7.jpg", 
                                "back_8.jpg", "back_9.jpg", "back_10.jpg", "back_11.jpg"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const changeBackground = (listBackgroundImages) => {
    const id = getRandomInt(listBackgroundImages.length);
    const imageUrl = `/public/assets/${listBackgroundImages[id]}`;
    document.getElementsByTagName("body")[0].style.background = `url("${imageUrl}") center center no-repeat`;
    document.getElementsByTagName("body")[0].style.backgroundSize = `cover`;
}

setInterval(() => changeBackground(listBackgroundImages), 5000);