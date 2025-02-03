const loanFormSubmitter = document.getElementById("loanSubmitter");

loanFormSubmitter.addEventListener("click", function(){
  const monthlyPayment = Number(document.getElementById("monthlyPayment").value);
  const months = Number(document.getElementById("yearsLen").value)*12;
  const monthlyInterest = Number(document.getElementById("yearlyInterest").value)/12;
  if (monthlyPayment === 0 || months === 0|| monthlyInterest===0){
    document.getElementById("loan-incomplete-error").innerHTML = `<p>Error! Fill out all required sections!</p>`;
  }else if(monthlyInterest>=1){
    document.getElementById("loan-incomplete-error").innerHTML = `<p>Error! Please enter a valid interest rate as a decimal</p>`;


  }else{
    document.getElementById("loan-incomplete-error").innerHTML = "";
    let principal = monthlyPayment * (1- Math.pow((1+monthlyInterest),-months))/monthlyInterest;
    principal = Math.round(principal*100)/100;
    

    let principalDecay = [principal];
    let interestDecay = [principal*monthlyInterest];
    let currInterest = interestDecay[0];

    for (let i = 0 ; i<months; i++){
        let principalDecrementer = monthlyPayment - currInterest;
        
        if (principalDecay[i]-principalDecrementer <0){
            principalDecay.push(0);
        }else{
            principalDecay.push(principalDecay[i]-principalDecrementer);
        }
        currInterest = principalDecay[i]*monthlyInterest;
        
        interestDecay.push(currInterest + interestDecay[i]);
        
    }
    
    interestDecay.splice(0,12);
    principalDecay.pop();
    let graphPrincipalDecay = [];
    let graphInterestDecay = [];
    for (let i = 0; i<principalDecay.length; i+=12){
        graphPrincipalDecay.push(Math.round(100*principalDecay[i])/100);
        graphInterestDecay.push(Math.round(100*interestDecay[i])/100);
    }
    document.getElementById("maxLoan").innerHTML = `<h3>Your maximum loan amount is $${principal}
    <br>Your total interest with this loan would be $${graphInterestDecay[graphInterestDecay.length-1]}</h3>`;
    document.getElementById("loan-results").style.display = "block";
    let years = []
    for (let i=0;i<months/12;i++){
        years.push(i+1);
    }

    const principalsInterests = [{
        x:years, 
        y:graphPrincipalDecay, 
        type:"bar" ,
        orientation:"v",
        name:"Principal"
        
    },
    {
        x:years, 
        y:graphInterestDecay, 
        type:"bar" ,
        orientation:"v",
        name:"Interest"
    }
];
    
    Plotly.newPlot("combinedBar", principalsInterests, {title:"Cumulative Principals and Interests over time", 
        paper_bgcolor: "#ADD8E6",
        xaxis:{title: "years"},
        yaxis:{title:"amount($)"},
        barmode: "group"
    })

    
    document.getElementById("all-loan-container").style.display = "flex";
    document.getElementById("all-loan-container").style.justifyItems = "spaceBetween";

  }
});