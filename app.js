const BASE_URL =
 "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
//"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  const dropdown = document.querySelectorAll(".dropdown select");
  const btn=document.querySelector("form button");
  const formCurr=document.querySelector(".form select")
  const toCurr=document.querySelector(".to select")
  const msg=document.querySelector(".msg")
  for(let select of  dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
          newOption.selected="selected"
        }else if(select.name==="to" && currCode==="INR"){
          newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    });
  }
    const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
    };
    btn.addEventListener("click",async(evt)=>{
     evt.preventDefault();
     let amount=document.querySelector(".amount input");
     let amtVal=amount.value;
     if(amtVal === "" || amtVal<1){
      amtVal=1;
      amount.value="1";
     }
     //console.log(formCurr.value,toCurr.value);
     const URL=`${BASE_URL}/${formCurr.value.toLowerCase()}.json`;
     let response=await fetch(URL);
     let data=await response.json();
     
     let rate=data[formCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
     let finalAmount=amtVal*rate;
     console.log(finalAmount)
     msg.innerText=`${amtVal}${formCurr.value}=${finalAmount}${toCurr.value}`;
    });
    

   