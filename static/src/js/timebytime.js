// src/js/timebytime.js 파일 내에 배경 변경 로직을 모듈화합니다.
export const colors = {
    morning: "linear-gradient(90deg, rgba(255,253,227,1) 0%, #ff912c 100%)",
    afternoon: "linear-gradient(90deg, rgba(248,194,224,1) 0%, rgba(194,233,251,1) 100%)",
    evening: "linear-gradient(90deg, rgba(0,55,241,1) 0%, rgba(255,73,111,1) 100%)",
    night: "linear-gradient(90deg, rgba(255,248,239,1) 0%, rgba(73,51,109,1) 100%)"
};

export function updateBackground() {
    // 여기에 window 객체나 document 객체 사용하는 부분을 조건부로 처리하거나, 이를 대체할 수 있는 방법을 고려해야 합니다.
    // 예를 들어, Node.js 환경에서는 window 객체가 기본적으로 존재하지 않습니다.
    const now = new Date();
    const hours = now.getHours();
    let background = hours >= 6 && hours < 12 ? colors.morning :
                     hours >= 12 && hours < 17 ? colors.afternoon :
                     hours >= 17 && hours < 22 ? colors.evening :
                     colors.night;

    // 배경 업데이트 로직을 환경에 따라 조건부로 실행
    if (typeof document !== 'undefined') {
        document.body.style.background = background;
        document.body.style.backgroundSize = "1600% 1600%";
        document.body.style.animation = "gradient 15s ease infinite";
    } else {
        // Node.js 환경이나 document 객체가 없는 경우에 대한 처리
        console.log("updateBackground 함수는 브라우저 환경에서만 사용할 수 있습니다.");
    }
}


window.onload = updateBackground;
