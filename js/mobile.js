//adding spinner
const loadingData = (progress) => {
    document.getElementById("spinner").style.display = progress;
}

// load phone data
const loadDetails = () => {
    const input = document.getElementById("inputField");
    const errorMessage = document.getElementById("errorMessageShow");
    const inputValue = input.value;
    //clear input
    input.value = "";
    //error handling
    if (inputValue === "" || !isNaN(inputValue)) {
        errorMessage.innerText = " Please search by only Phone name !!!!!!!";
    }
    else {

        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
        errorMessage.innerText = "";
        loadingData("block");
    }
}

// display phone 
const displayPhone = (phones) => {
    const showPhone = document.getElementById("display_phone");
    const seeDetails = document.getElementById("showAll");
    const errorMsg = document.getElementById("errorMessageShow");
    showPhone.textContent = "";
    //error handling
    if (phones.length === 0) {
        errorMsg.innerText = " Please input only valid name !!!!!"
        loadingData("none");
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement("div");
            div.classList.add("phone_items");
            div.innerHTML = `
    <div class="row card-phn px-3 " >
      <div class="col-sm-12 col-md-12">
       <div class="card ">
        <div class="card-body p-5 card-size">
        <img class="phone-img" src="${phone.image}">
        <h5>Name : ${phone.phone_name} </h5> 
        <h5>Brand : ${phone.brand}</h5>
        <button class="btn btn-info" onclick="phoneDetails('${phone.slug}')" >Show-More-Info</button>
        </div>
       </div>
      </div>
  
   </div>
        `
            showPhone.appendChild(div);
        });
        loadingData("none");

    }
}

// load phone details
const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayInfo(data.data))
    loadingData("block")
}
// display phone details
const displayInfo = (moreDetails) => {
    const moreInfoResult = document.getElementById("displayResult");
    moreInfoResult.textContent = "";
    const div = document.createElement("div");
    div.classList.add("infos");
    div.innerHTML = `
 
        <div class="row card-phn">
  <div class="col-sm-12 ">
    <div class="card">
      <div class="card-body  ">
      <img src="${moreDetails.image}">
      <h6>Name : ${moreDetails.name}</h6>
      <h6>Release Date : ${moreDetails.releaseDate ? moreDetails.releaseDate : "Not Found"}</h6>
     <h4>Features :</h4><li> <span class='fw-bold'>ChipSet :</span> ${moreDetails.mainFeatures.chipSet}</li>
                        <li> <span class='fw-bold'>DisplaySize :</span> ${moreDetails.mainFeatures.displaySize}</li>
                        <li> <span class='fw-bold'>Memory :</span> ${moreDetails.mainFeatures.memory}</li>
                            
             <h4>Sensors :</h4>${moreDetails.mainFeatures.sensors}
             <h4>Others :</h4> 
             
             <li> <span class='fw-bold'>Bluetooth :</span> ${moreDetails?.others?.Bluetooth ? moreDetails.others?.Bluetooth : "Not Available"}</li>
             <li> <span class='fw-bold'>GPS :</span>  ${moreDetails?.others?.GPS ? moreDetails?.others?.GPS : "Not Available"}</li>
             <li> <span class='fw-bold'>NFC : </span> ${moreDetails?.others?.NFC ? moreDetails?.others?.NFC : "Not Available"}</li>
             <li> <span class='fw-bold'>Radio :</span>  ${moreDetails?.others?.Radio ? moreDetails?.others?.Radio : "Not Available"}</li>
             <li> <span class='fw-bold'>USB :</span>  ${moreDetails?.others?.USB ? moreDetails?.others?.USB : "Not Available"}</li>
             <li> <span class='fw-bold'>WLAN :</span>  ${moreDetails?.others?.WLAN ? moreDetails?.others?.WLAN : "Not Available"}</li>
            
     
      </div>
    </div>
  </div>
</div>
        
 `
    moreInfoResult.appendChild(div);
    loadingData("none");
}