const colors = {
    morning: "linear-gradient(90deg, rgba(255,253,227,1) 0%, #ff912c 100%)",
    afternoon: "linear-gradient(90deg, rgba(248,194,224,1) 0%, rgba(194,233,251,1) 100%)",
    evening: "linear-gradient(90deg, rgba(0,55,241,1) 0%, rgba(255,73,111,1) 100%)",
    night: "linear-gradient(90deg, rgba(255,248,239,1) 0%, rgba(73,51,109,1) 100%)"
};

function updateBackground() {
    const now = new Date();
    const hours = now.getHours();
    console.log(hours)
    document.body.style.background = hours >= 6 && hours < 12 ? colors.morning :
                                     hours >= 12 && hours < 17 ? colors.afternoon :
                                     hours >= 17 && hours < 22 ? colors.evening :
                                     colors.night;
    document.body.style.backgroundSize = "1600% 1600%";
    document.body.style.animation = "gradient 15s ease infinite";
}

window.onload = updateBackground;
