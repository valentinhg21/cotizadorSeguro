/* Constructors */
function Insurance(brand, category, carOwner, modelCar, year){
    this.brand = brand;
    this.category = category;
    this.carOwner = carOwner;
    this.modelCar = modelCar;
    this.year = year;
}

// Realizar la contización con los datos
Insurance.prototype.insuranceQuote = function(){
     /* 
        1 = Americano 1.15
        2 = Europeo 1.35
        3 = Asiatico 1.05
    
    */
        let quantity;
        /* The user starting with 2000$ */
        const base = 2000;
    
        /* Read Brand */
        switch(this.brand){
            case '1':
                quantity = base * 1.15;
                break;
            case '2':
                quantity = base * 1.35;
                break;
            case '3': 
                quantity = base * 1.05;
                break;
            default:
                break;
        }
    
        /* When the car year is hight the cost reduce 3% */
        const diference = new Date().getFullYear() - this.year;
        quantity -= ((diference * 3) * quantity) / 100
    
        /* If the insurance is basic, it's multiplied by 30%  */
        /* If the insurance is fully, it's multiplied by 50% */
    
        if(this.category === 'Basic'){
            quantity *= 1.30;
    
        } else {
            quantity *= 1.50;
        }
    
        return quantity;
    
}


function UI(){}

/* First Fully options years */
UI.prototype.fullyOptions = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');
    
    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        /* Add value options */
        option.value = i;
        /* Print it */
        option.textContent = i;
        /* Add the select*/
        selectYear.appendChild(option);
    }
}

UI.prototype.showResults = (totaly, insurance)=>{
    /* Apply destructuring object */
    const {brand, category, carOwner, modelCar, year} = insurance;
    let textBrand;
    switch(brand){  
        case '1':
            textBrand = 'American';
            break;
        case '2':
            textBrand = 'European';
            break;    
        case '3':
            textBrand = 'Italy';
            break;  
        default:
            break;
    }
    console.log('text brand',textBrand)
    console.log(carOwner)

    /* CREATE HTML */
    const containerResult = document.querySelector('#containerResults');
    let resultHTML = "";
    resultHTML += `
            <div class="title__results">
                <span>Hello ${carOwner}</span>
            </div>
             <div class="subtitle__results">
                <span>Here you can find your invoice with the total amount.</span>
             </div>
            <div class="results">
                <div>
                    <span>Car brand:</span>
                    <span class="results__description">${textBrand}</span>
                </div>
                <div>
                    <span>Category:</span>
                    <span class="results__description">${category}</span>
                </div>
                <div>
                    <span>Model Car:</span>
                    <span class="results__description">${modelCar}</span>
                </div>
                <div>
                    <span>Year:</span>
                    <span class="results__description">${year}</span>
                </div>
            </div>
            <div class="separator"></div>
            <div class="money">
                <span>Amount to pay:</span>
                <span class="money__results"> $ ${totaly}</span>
            </div>     
    `
    containerResult.innerHTML = resultHTML;
    console.log(containerResult)
    
}

/* Instance UI */
const ui = new UI();

/* When the document fully downloaded */
document.addEventListener('DOMContentLoaded', () => {
    /* Add prototype */
    ui.fullyOptions(); /* Fully the select */
})



/* enventListeners */
enventListeners()
function enventListeners(){
    const form = document.querySelector('#insurance-quote')
    /* const btn = document.querySelector('american') */
    form.addEventListener('submit', insuranceQuote)
    
    
}
/* This function calculates the insurance quote */
function insuranceQuote(e){
       e.preventDefault()

       /* Read value brands */
       const brand = document.querySelector('input[name="brand"]:checked').value
     
       /* Read value category */
       const category = document.querySelector('input[name="category"]:checked').value
      
       /* Car owner */
       const carOwner = document.querySelector('#owner').value
      
       /* Model Car */
       const modelCar = document.querySelector('#model').value
       
       /* Read value year */
       const year = document.querySelector('#year').value




       /* Instance Insurance */
       const insurance = new Insurance(brand, category, carOwner, modelCar, year);
       console.log(insurance)
       /* Totaly amount*/
       const totaly = insurance.insuranceQuote();
       console.log(totaly)
       ui.showResults(totaly, insurance);
}

