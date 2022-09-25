const getCountry=async ()=>{
   try{
     let res=await fetch('https://restcountries.com/v3.1/all')
    let data= await res.json()
    displayCountry(data);
   }
   catch(err){
    console.log(err)
   }
}
getCountry()

const displayCountry=(allCountry)=>{
    let countryContainer=document.getElementById('country-container')
    allCountry.forEach(country=>{
        let div=document.createElement('div')
        div.classList.add('countrys')
        div.innerHTML=`
        <img class="w-3/12 m-auto" src="${country.flags.png}" alt="">
        <div class="pt-5">
        <h3 class="text-lg font-semibold">${country.name.common}</h3>
        <p class="text-slate-800">Capital : ${country.capital}</p>
        </div>
        <button onclick="countryDetails('${country.cca2}')" class="outline-none bg-slate-500 text-white py-1 rounded-lg px-3 mt-4">Details</button>
        `
        countryContainer.appendChild(div)
    })
}

const countryDetails=async (code)=>{
        let res=await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        let data=await res.json()

        let detailsContainer=document.getElementById('country-details')
        data.forEach(country=>{
            const lan=(language)=>{
                let sum=""
                for(let lan in language){
                    sum+=`${country.languages[lan]} ,`
                }
                return sum.slice(0,-1)
            }
            // let {lan1,lan2}=country.languages;

            detailsContainer.innerHTML=
        `
        <h3 class="text-lg font-semibold">Country : ${country.name.common}</h3>
        <p class="text-lg font-semibold">Capital : ${country.capital}</p>
        <p class="text-lg font-semibold">Area : ${country.area}</p>
        <p class="text-lg font-semibold">Language : ${lan(country.languages)}
        </p>
        <p class="text-lg font-semibold">Independent : ${(country.independent===true)? 'Yes Independent':'Not Independent'}</p>
        <div class="w-2/12">
        <span class=" text-lg font-semibold mb-3">Flag : </span>
        <img class="m-auto" src="${country.flags.png}" alt=""> 
        </div>
        
        `
        })
        
}
// (country.languages?.eng)?'English': (country.languages?.ben)?'Bangali' : 'English ✖️ , Bangla ✖️'

// for(let lan in country.independent)