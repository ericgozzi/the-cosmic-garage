var textDisplayed = false
function makeTextAppear(){

    if ("ontouchstart" in document.documentElement)
        {
            window.location.replace("https://ericgozzi.github.io/about/")
        }
        else
        {
            if(textDisplayed){
                document.getElementById("info_div").style.display = "none"
                textDisplayed = false
            }else{
                document.getElementById("info_div").style.display = "block"
                textDisplayed = true
            }
        }
        
}

function makeTextDisapper(){
        document.getElementById("info_div").style.display = "none"
        textDisplayed = false

}

function goToList(){
    const listOfThnigsSection = document.getElementById("listOfThingsSection");
    console.log(listOfThnigsSection)
    if(listOfThnigsSection.style.display === "none"){
        listOfThnigsSection.style.display = "block"
    }else{
        listOfThnigsSection.style.display = "none";
    }
}

function openInstagram(){
    window.open("https://www.instagram.com/eriksson.348/");
};



//document.getElementById('cosmicgarage').onclick = makeTextAppear;
//document.getElementById('cosmicgarage').ontouchend = makeTextAppear;

//document.getElementById('close_div_info').onclick = makeTextDisapper;
//document.getElementById('close_div_info').ontouchend = makeTextDisapper;

//document.getElementById('listOfThings').onclick = goToList;
//document.getElementById('listOfThings').ontouchend = goToList

//document.getElementById('close_div_list').onclick = goToList;
//document.getElementById('close_div_list').ontouchend = goToList

//document.getElementById('instagram').onclick = openInstagram;
//document.getElementById('instagram').ontouchend = openInstagram;


