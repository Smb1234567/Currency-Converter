const BASE_URL = "https://api.frankfurter.app/latest?";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const finalMsg = document.querySelector("#finalMsg");


for(let select of dropdowns){
    for(currCode in countryList){
        // console.log(currCode, countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        // console.log(newOption);
        select.append(newOption)

        if(select.name === "from" && currCode==="USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode==="INR"){
            newOption.selected = "selected";
        }

       

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newSrc;

}

 btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".Amount input");
    //console.log(amount.value);
    let amountVal = amount.value;

    if(amountVal==="" || amountVal<1){
        amountVal=1;
        amount.value="1";
    }

    // https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

    // console.log(fromCurr.value, toCurr.value);
    
    
    const URL = `${BASE_URL}amount=${amount.value}&from=${fromCurr.value}&to=${toCurr.value}`;

    let response = await fetch(URL);
    // console.log(response);

    if(toCurr.value===fromCurr.value){
        finalMsg.innerText=`Same Currency Exchange is not possible ${fromCurr.value} to ${toCurr.value}`;
    }



    let data = await response.json();
    // console.log(data);

    let rate = data.rates[toCurr.value];
    console.log(rate);
    console.log(amount.value);
    
   

    console.log(`finalMsg is ${finalMsg.innerText}`);
    

    finalMsg.innerText=`${amount.value}${fromCurr.value} = ${rate}${toCurr.value}`;

            
});