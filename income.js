
const incomeFormSubmitter = document.getElementById("incomeSubmitter")
const NYtaxBrackets = {13000:5.25, 80000:5.5, 215400:6,  1000000:6.85, 5000000:9.65, 25000000:10.3, 100000000:10.9};
const cutoffs = Object.keys(NYtaxBrackets);


incomeFormSubmitter.addEventListener("click", function(){
  const hourly = Number(document.getElementById("hourly").value);
  const hoursPerWeek = Number(document.getElementById("perWeek").value);
  let months = 12;
  if (document.getElementById("monthsAYear").value !== ""){
    months = Number(document.getElementById("monthsAYear").value);
  }
  let bonus = 0;
  if (document.getElementById("bonus").value !== ""){
    bonus = Number(document.getElementById("bonus").value);
  }
  let weeklyTips = 0;
  if (document.getElementById("tip").value !== ""){
    weeklyTips = Number(document.getElementById("tip").value);
  }
  if (hourly === 0 || hoursPerWeek === 0){
    document.getElementById("income-incomplete-error").innerHTML = `<p>Error! Fill out all required sections!</p>`;
  }else{
    let percentTax = .109;
    document.getElementById("income-incomplete-error").innerHTML = "";
    let total = (hourly * hoursPerWeek *months*4.333) + bonus + (weeklyTips*months*4.333);
    total = Math.round(total*100)/100;
    for (let i = 0; i<cutoffs.length;i++){
      if (total<=cutoffs[i]){
        percentTax = NYtaxBrackets[cutoffs[i]]/100;
        break;
      }
    }
    document.getElementById("income-results").style.display = "block";
    let postTaxTotal = Math.round(((1-percentTax)*total)*100)/100;
    document.getElementById("tax-results").innerHTML =  `<h4>Total Income(Pre-tax): $${total} <br> Actual Income(after-tax): $${postTaxTotal}</h4>`;
    const data = [{labels:["50% on needs", "30% on wants", "20% in savings"], values:[ 0.5*postTaxTotal, 0.3*postTaxTotal,0.2*postTaxTotal], type:"pie", textinfo: "value"}];
    Plotly.newPlot("myPlot", data, {title:"50-30-20 recommended split", paper_bgcolor: "#ADD8E6", legend: { font: { size: 18}}});
    document.getElementById("all-income-container").style.display = "flex";
    document.getElementById("all-income-container").style.justifyItems = "spaceBetween";

  }
});