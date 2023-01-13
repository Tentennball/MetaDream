clickfunc = () => {
    let menu = document.querySelector(".thumbbtn");
    menu.classList.toggle("active");
}

adress = () => {
    history.pushState(null, null, '?thumb=true');
}

exports.clickfunc = () => {
    let menu = document.querySelector(".thumbbtn");
    menu.classList.toggle("active");
}
