const body = document.body;
let activeTheme = 'default'; //the value determines which them is to be toggled
const div = document.querySelector(".calc"); 
let opActive = false; // check if an operator was the last button clicked.
let eqActive = false; // check if an operator was the last button clicked.
const toggler = document.querySelector(".toggler");

function getAnswer(){
    return document.querySelector("#ans").innerText;
}

function setAnswer(num){
    return document.querySelector("#ans").innerText = getFormattedNumber(num);
}

function getEquation(){
    return document.querySelector("#eqn").innerText
}

function setEquation(num){
    return document.querySelector("#eqn").innerText = num;
}

function getFormattedNumber(num) { 
    // sets a given value to a string format (eg 1000 becomes 1,000) 
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    // sets a value of string type to number 
    return Number(num.replace(/,/g, ""));
}


// Toggle Event
toggler.addEventListener('click', e => {
    const theme1 = toggler.querySelector('span:nth-child(1)')
    const theme2 = toggler.querySelector('span:nth-child(2)')
    const theme3 = toggler.querySelector('span:nth-child(3)')

    if(e.target.matches(".two")){
        if(!e.target.classList.contains('active')){
            if(!body.classList.contains(activeTheme)){
                body.classList.add('theme-bright')
            }else  document.body.classList.replace(activeTheme,'theme-bright');
            
            e.target.classList.toggle('active');
            theme1.classList.remove('active');
            theme3.classList.remove('active');
            activeTheme = 'theme-bright';
        }
    }else if(e.target.matches(".three")){
        if(!e.target.classList.contains('active')){
            if(!body.classList.contains(activeTheme)){
                body.classList.add('theme-cyber')
            }else  document.body.classList.replace(activeTheme,'theme-cyber');
            document.getElementById('equals').style.color = '#0F262D'
            e.target.classList.toggle('active');
            theme1.classList.remove('active');
            theme2.classList.remove('active');
            activeTheme = 'theme-cyber';
        }

    }else{
        
        if(!e.target.classList.contains('active')){
            if(!body.classList.contains(activeTheme)){
                body.classList.add('default')
            }else  document.body.classList.replace(activeTheme,'default');
            e.target.classList.toggle('active');   
            theme2.classList.remove('active');
            theme3.classList.remove('active');
            activeTheme = 'default';
        }
    }

})


div.addEventListener("click", e => {
    if(e.target.matches(".number")){ // if the button clicked is a number(using ".number" selector)
        if(opActive || eqActive ){
            setAnswer("")
        } //sets the answer to an empty value if an operator is pressed.`
        let output = reverseNumberFormat(getAnswer());
        if (output != NaN) {
            output +=  e.target.id;
            // output.slice(1);
            setAnswer(output)
        }
        opActive = false;
        eqActive = false
    }
})



div.addEventListener("click", e => { 
    if (e.target.matches(".operator")){ // if the button clicked is an operator(using ".operator" selector)
        if(e.target.id == "reset"){
            
            setAnswer("");
            setEquation("");
        }
        if (e.target.id == "del"){
            let output = getAnswer().toString();
            output = output.substr(0, output.length - 1);
            setAnswer(output);
        }else {
            
            var output = getAnswer();
            var equation = getEquation();
            if(!opActive){
                output = reverseNumberFormat(output);
                if(e.target.classList.contains("o")){
                    opActive = true;
                    if(eqActive) output  = ""                
                    equation += output;
                    equation += e.target.id;
                    setEquation(equation);
                    setAnswer(output);
                    
                }
                if(e.target.id == "equals"){
                    eqActive = true;
                    // opActive = true;
                    equation += output;
                    let result = eval(equation); 
                    result = result.toString()
                    setAnswer(result);
                    setEquation(result);
                }
            }
        }
    }
});
