let programming_languages = [
    'HTML',
    'Python',
    'Java',
    'JavaScript',
    'Swift',
    'C',
    'Bash',
    'R',
    'Go'
]

let player = {};
let message = document.querySelector(".message");
let output1 = document.querySelector(".output1");
let output2 = document.querySelector(".output2");
let btn = document.querySelector("button");
let img = document.querySelector("img");
let clicks = -1;
let pic = ["./0.jpg","./1.jpg","./2.jpg","./3.jpg","./4.jpg","./5.jpg","./6.jpg"]


btn.addEventListener("click", function(){
    output1.innerHTML = "";
    output2.innerHTML = "";

    if (programming_languages.length>0) {
        btn.style.display = "none";
        programming_languages.sort(function(){
            return.5-Math.random();
        });
        let Words = programming_languages.shift();
        player.solution = Words.split("");
        buildBoard();
        console.log(player.solution);
    }else{
        console.log("No more words");
    }
})

function buildBoard(){
    player.solution.forEach(function(letter){
        console.log(letter);
        let div = document.createElement("div");
        div.classList.add("letter2");
        div.innerText= "_";
        div.myLetter = letter;
        output2.appendChild(div);
    });
    confetti.stop()
    let solutionLetter = document.querySelectorAll(".letter2")

    
    for (let x = 0; x < 26; x++) {
        let temp =String.fromCharCode(65+x);
        console.log(temp);
        let div = document.createElement("div");
        div.classList.add("letter");
        div.myLetter = temp;
        
        let handler = function(e) {
          div.removeEventListener("click",handler) 
          div.classList.add("done");
          let counter = 0;
          let guess = 0;
            solutionLetter.forEach(function(letter){
                if(letter.innerHTML != "_"){
                    counter++;
                    console.log("counter: "+counter);
                }
            
            if(letter.myLetter.toUpperCase()=== temp ){
                letter.innerHTML = temp;
                guess++;
            }
            })
            if (guess>0) {
                //console.log("you found "+guess+" letters");
                console.log("guess: "+guess);
            }else{
                clicks += 1
                console.log("clicks: "+clicks)
                img.src= pic[clicks];
            }
            let letterLeft = solutionLetter.length - (guess+counter);
            console.log("letterLeft "+letterLeft);

            if(letterLeft<1){
                btn.style.display = "";
                clicks = -1;
                let body = document.querySelector("body");
                confetti.start(5000)
                setTimeout(function () {
                    alert("You Win!");
                }, 2500);
                
            }
            if (clicks ==6) {
                btn.style.display = "";
                alert("Try Again!")
                clicks = -1; 
            }        
        } 


        div.addEventListener("click",handler);
        div.innerHTML = temp;
        output1.appendChild(div);  
        img.src = pic[clicks];
    }
}