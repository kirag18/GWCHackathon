
const wrongSuggestions = ["think about the bank", "what about investment", "what about the stock market", "what about  stock market", "what about the s market","think about the bank", "what about investment", "what about  stock market", "what about the stock market", " about the stock market"]
//TODO: rename these things to be correct feedback

let rightAnswer = document.querySelectorAll(".correct");
for (let i = 0; i < rightAnswer.length; i++){
  rightAnswer[i].addEventListener("click", function(){
  document.getElementById("feedback"+i).innerHTML = "Correct!"})
  
}

function wrongDisplay(x) {
  document.getElementById("feedback"+Math.floor(x/2)).innerHTML = "Wrong!"+wrongSuggestion[x];
}
let wrongAnswer = document.querySelectorAll(".wrong");
for (let i = 0; i < wrongAnswer.length; i++){
  wrongAnswer[i].addEventListener("click", function () {
  document.getElementById("feedback"+Math.floor(i/2)).innerHTML = "Wrong! "+wrongSuggestions[i];
})
}

let dropArrows = document.querySelectorAll(".drop")

for (let i = 0; i < dropArrows.length; i++){
  dropArrows[i].addEventListener("click", function(){
    let text = document.getElementById("moduleInfo"+i);
    if (text.style.display == "none"){
      text.style.display = "block";
      dropArrows[i].style.transform= "rotate(180deg)";
    }
    else{
      text.style.display = "none";
      dropArrows[i].style.transform= "";
    }
  })
}
