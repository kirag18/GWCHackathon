const savingsFormSubmitter = document.getElementById("savingsSubmitter");

savingsFormSubmitter.addEventListener("click", function(){
  const principal = Number(document.getElementById("base").value);
  const monthlyDeposit = Number(document.getElementById("monthly").value);
  const monthlyInterest = Number(document.getElementById("savingsInterest").value)/12;
  const months = Number(document.getElementById("years").value)*12;

  if (principal === 0 || monthlyDeposit === 0|| monthlyInterest===0||years===0){
    document.getElementById("saving-incomplete-error").innerHTML = `<p>Error! Fill out all required sections!</p>`;
  }else if(monthlyInterest>=(1/12)){
    document.getElementById("saving-incomplete-error").innerHTML = `<p>Error! Please enter a valid interest rate as a decimal</p>`;
  }else{


   
    document.getElementById("saving-incomplete-error").innerHTML = "";
    


    let savingsAccount = [principal];

    for (let i = 0 ; i<months; i++){
        savingsAccount.push(savingsAccount[i]*(1+monthlyInterest)+monthlyDeposit)
    }
    

    let graphSavingsAccount = [];
    for (let i = 0; i<savingsAccount.length; i+=12){
        graphSavingsAccount.push(Math.round(100*savingsAccount[i])/100);
    }
    let total = graphSavingsAccount[graphSavingsAccount.length-1];
    let savings = Math.round(100*(total - (principal + (monthlyDeposit*months))))/100;
    document.getElementById("savingsInfo").innerHTML = `<h3>Your savings account total would be $${total}
    <br>You made a profit of $${savings} just by saving!</h3>`;
    document.getElementById("savings-results").style.display = "block";
    let years = [0]
    for (let i=0;i<months/12;i++){
        years.push(i+1);
    }
    graphInputs =[principal];
    for (let i = 0; i<months/12;i++){
        graphInputs.push(graphInputs[i]+(monthlyDeposit*12));

    }

    const savingsTracker = [{
        x:years, 
        y:graphSavingsAccount, 
        type:"scatter",
        mode:"lines",
        name: "Savings Amount"
    },
    {
        x:years,
        y:graphInputs,
        type:"scatter",
        mode:"lines",
        name:"Base Amount"
    }
];
    
    Plotly.newPlot("savingsAccountTracker", savingsTracker, {title:"Savings Account Balance", 
        paper_bgcolor: "#ADD8E6",
        xaxis:{title: "years"},
        yaxis:{title:"amount($)"},
    })
    document.getElementById("all-savings-container").style.display = "flex";
    document.getElementById("all-savings-container").style.justifyItems = "spaceBetween";

  }
});

