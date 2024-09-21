import './style.css'


function returnToMainPage(){
    window.open('https://the-cosmic-garage.netlify.app/')
    console.log("hello")
}


document.getElementById('returnToMainPage').ontouchend = returnToMainPage;
document.getElementById('returnToMainPage').onclick = returnToMainPage;