// ---------------------
// Units Database
// ---------------------
const categories = {
    Length:{base:"m",units:{km:1000,m:1,cm:0.01,mm:0.001,mi:1609.34,yd:0.9144,ft:0.3048,in:0.0254,nmi:1852}},
    Mass:{base:"kg",units:{t:1000,kg:1,g:0.001,mg:1e-6,lb:0.453592,oz:0.0283495,st:6.35029}},
    Volume:{base:"L",units:{m3:1000,L:1,mL:0.001,gal:3.78541,qt:0.946353,pt:0.473176,cup:0.24}},
    Time:{base:"s",units:{s:1,min:60,h:3600,d:86400,wk:604800,yr:31557600}},
    Speed:{base:"m/s",units:{"m/s":1,"km/h":0.277778,mph:0.44704,kt:0.514444,"ft/s":0.3048}},
    Temperature:{base:"C",special:true, units:{C:1,F:1,K:1}},
    Pressure:{base:"Pa",units:{Pa:1,kPa:1000,MPa:1000000,bar:100000,atm:101325,psi:6894.76,Torr:133.322}},
    Energy:{base:"J",units:{J:1,kJ:1000,cal:4.184,kcal:4184,Wh:3600,kWh:3600000,BTU:1055}},
    Power:{base:"W",units:{W:1,kW:1000,MW:1e6,HP:745.7}},
    DigitalStorage:{base:"B",units:{B:1,KB:1000,MB:1e6,GB:1e9,TB:1e12}},
    Angle:{base:"deg",units:{deg:1,rad:57.2958,grad:0.9}}
};

let activeCategory = "Length";
let fromUnit = Object.keys(categories[activeCategory].units)[0];

const categoriesDiv = document.getElementById("categories");
const fromUnitsDiv = document.getElementById("fromUnits");
const inputValue = document.getElementById("inputValue");
const resultsDiv = document.getElementById("results");
const allUnitsDiv = document.getElementById("allUnits");
const allUnitsSearch = document.getElementById("allUnitsSearch");


// ---------------------
// LIVE INPUT CONVERSION (NEW)
// ---------------------
inputValue.addEventListener("input", () => {
    convert();
});


// ---------------------
// Build Categories
// ---------------------
function buildCategories() {
    categoriesDiv.innerHTML = "";
    for (let cat in categories) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "category-btn";
        btn.innerText = cat;

        btn.onclick = () => {
            activeCategory = cat;
            fromUnit = Object.keys(categories[cat].units)[0];

            buildFromUnits();
            convert();
            highlightCategory();
        };

        categoriesDiv.appendChild(btn);
    }

    highlightCategory();
}


// ---------------------
// Highlight active category
// ---------------------
function highlightCategory() {
    const buttons = categoriesDiv.querySelectorAll(".category-btn");

    buttons.forEach(b => b.classList.remove("active"));

    buttons.forEach(b => {
        if (b.innerText === activeCategory) {
            b.classList.add("active");
        }
    });
}


// ---------------------
// Build From Units
// ---------------------
function buildFromUnits() {

    fromUnitsDiv.innerHTML = "";
    const units = categories[activeCategory].units;

    const sortedUnits = categories[activeCategory].special
        ? Object.keys(units)
        : Object.keys(units).sort((a,b)=>units[a]-units[b]);

    sortedUnits.forEach(u => {

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "unit-btn";
        btn.innerText = u;

        btn.onclick = () => {

            fromUnit = u;

            highlightFromUnit();

            convert();
        };

        fromUnitsDiv.appendChild(btn);

    });

    highlightFromUnit();
}


// ---------------------
// Highlight From Unit
// ---------------------
function highlightFromUnit() {

    const buttons = fromUnitsDiv.querySelectorAll(".unit-btn");

    buttons.forEach(b=>b.classList.remove("active"));

    buttons.forEach(b=>{
        if(b.innerText===fromUnit){
            b.classList.add("active");
        }
    });

}


// ---------------------
// Convert Function
// ---------------------
function convert(){

    const val=parseFloat(inputValue.value);

    if(isNaN(val)){
        resultsDiv.innerHTML="";
        return;
    }

    const cat=categories[activeCategory];

    resultsDiv.innerHTML="";

    const unitKeys=Object.keys(cat.units);

    const sortedKeys=cat.special
        ? unitKeys
        : unitKeys.sort((a,b)=>cat.units[a]-cat.units[b]);

    sortedKeys.forEach(u=>{

        let result;

        if(cat.special && activeCategory==="Temperature"){

            if(fromUnit==="C"){
                if(u==="C") result=val;
                else if(u==="F") result=val*9/5+32;
                else if(u==="K") result=val+273.15;
            }

            else if(fromUnit==="F"){
                if(u==="C") result=(val-32)*5/9;
                else if(u==="F") result=val;
                else if(u==="K") result=(val-32)*5/9+273.15;
            }

            else if(fromUnit==="K"){
                if(u==="C") result=val-273.15;
                else if(u==="F") result=(val-273.15)*9/5+32;
                else if(u==="K") result=val;
            }

        }

        else{

            const base=val*cat.units[fromUnit];

            result=base/cat.units[u];

        }

        const card=document.createElement("div");

        card.className="result-card";

        let displayValue;

        if(Math.abs(result)<0.01 && result!==0){
            displayValue=result.toFixed(6);
        }
        else{
            displayValue=result.toFixed(2);
        }

        displayValue=displayValue.replace(/\.?0+$/,"");

        card.innerText=`${displayValue} ${u}`;

        resultsDiv.appendChild(card);

    });

}


// ---------------------
// Quick Access Panel
// ---------------------
function buildAllUnits(){

    allUnitsDiv.innerHTML="";

    for(let cat in categories){

        for(let u in categories[cat].units){

            const btn=document.createElement("button");

            btn.type="button";

            btn.className="unit-btn";

            btn.innerText=u;

            btn.onclick=()=>{

                activeCategory=cat;

                fromUnit=u;

                buildFromUnits();

                highlightCategory();

                convert();

            };

            allUnitsDiv.appendChild(btn);

        }

    }

}


// ---------------------
// Quick Access Search
// ---------------------
allUnitsSearch.addEventListener("input",()=>{

    const term=allUnitsSearch.value.toLowerCase();

    allUnitsDiv.querySelectorAll(".unit-btn").forEach(b=>{

        b.style.display=b.innerText.toLowerCase().includes(term)
            ?"inline-flex"
            :"none";

    });

});


// ---------------------
// Initial Setup
// ---------------------
buildCategories();
buildFromUnits();
buildAllUnits();
convert();
