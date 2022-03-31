
const city = document.getElementById('city');  

const cards = document.getElementById('cards');

let form= "Paris";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const farToCelsius = fahrenheit => (fahrenheit - 32) * 5/9;

async function getCity() {
    const response= await fetch('https://api.openweathermap.org/data/2.5/weather?q='+form+'&appid=7f6e4f71bf73df5761d14e26a9d5d16b'); 
    const cityData= await response.json(); 
    
    city.textContent=cityData.name;
    console.log(cityData);
    console.log(cityData.name)
}
    getCity(); 

const getDate = (() => {
    let today = new Date(); 
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    

    let date= today.toLocaleDateString('fr-FR', options);
    console.log(date); 

    const displayDate = (() => {
        const dateDiv = document.getElementById('date');
        dateDiv.textContent=date;
    })();
})(); 

const getSearch = () => { 
    cards.innerHTML='';
    form = document.getElementById('cityform').value; 
    const cityName=form.textContent; 
    console.log(form); 
    document.getElementById('cityform').value=''; 
    getCity();
    getCurrentWeather();
    
} 


    
const searchBut= document.getElementById('searchbut'); 
searchBut.addEventListener('click' , getSearch);

const cityForm = document.getElementById('cityform'); 
cityForm.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      getSearch();
    }
  });

const getCurrentWeather = () => {

    const current = document.getElementById('currentweather');
    const temp = document.getElementById('currentemp'); 
    const humidity = document.getElementById('humidity'); 
    const rain = document.getElementById('rain'); 
    const wind = document.getElementById('wind'); 

  async function getCurrent() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+form+'&appid=7f6e4f71bf73df5761d14e26a9d5d16b&units=metric', {mode: 'cors'});
    const catData = await response.json();
    current.innerHTML = capitalizeFirstLetter(catData.weather[0].description);
    temp.innerHTML = Math.round(catData.main.temp)+"°C";
    humidity.innerHTML=catData.main.humidity+'%'; 
    wind.innerHTML=Math.round(catData.wind.speed)+'km/h'; 
    
    const lat = catData.coord.lat;
    const lon = catData.coord.lon; 
    const tt = catData.dt; 
    console.log(tt);

    

 
  
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=7f6e4f71bf73df5761d14e26a9d5d16b&units=metric'
  const response2 = await fetch(url)
  const weekData = await response2.json(); 

  rain.innerHTML=(weekData.daily[0].pop)*100+'%';

  console.log(weekData);  


  const getWeatherCode = () => {
    const weatherIcon = document.getElementById('currentlogo'); 
    
    code = catData.weather[0].icon; 
    console.log(code); 

    if (code=="01d") {
    weatherIcon.innerHTML= '<img class="log" src="./src/sun1.svg" alt="" width="150px"></img>';
    } 
    else if (code=="02d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/sunny.svg" alt="" width="150px"></img>';
            } 
    else if (code=="03d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/cloud1.svg" alt="" width="150px"></img>';
            } 
    else if (code=="04d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/clouds.svg" alt="" width="150px"></img>';
            } 
    else if (code=="09d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/hardrain.svg" alt="" width="150px"></img>';
            } 
    else if (code=="10d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/rain.svg" alt="" width="150px"></img>';
            } 
    else if (code=="11d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/thunder.svg" alt="" width="150px"></img>';
            } 
    else if (code=="13d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/snow.svg" alt="" width="150px"></img>';
            } 
    else if (code=="50d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/mist.svg" alt="" width="150px"></img>';
            } 
    }
    getWeatherCode();


   


    //for (let i=1 ; i < daily.length ; i++) { 
    weekData.daily.slice(1).forEach(function(card) {
        const box= document.createElement('div'); 
        box.id = "box";
        

        const getDayString = () => {
            
            const dayNum = card.dt; 
            let dateWeekly = new Date(dayNum*1000);
            
            todayWeekly = dateWeekly.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' }); 
            
            console.log(todayWeekly);
        } 
        getDayString(); 

        const boxDate = document.createElement('div'); 
        boxDate.id = "boxDate";
        boxDate.textContent = capitalizeFirstLetter(todayWeekly);  

        const dailyTemp = document.createElement('div'); 
        dailyTemp.classList="dailytemp";
        dailyTemp.innerHTML = Math.round(card.temp.day)+'°C'; 

        const minTemp = document.createElement('div'); 
        minTemp.classList="mintemp";
        minTemp.innerHTML = Math.round(card.temp.min)+'°C'; 

        const dailyLogo = document.createElement('div'); 
        dailyCode = card.weather[0].icon; 


        if (dailyCode=="01d") {
            weatherIcon.innerHTML= '<img class="log" src="./src/sun1.svg" alt="" width="80px"></img>';
            } 
            else if (dailyCode=="02d") {
                    dailyLogo.innerHTML= '<img class="log" src="./src/sunny.svg" alt="" width="80px"></img>';
                    } 
            else if (dailyCode=="03d") {
                dailyLogo.innerHTML= '<img class="log" src="./src/cloud1.svg" alt="" width="80px"></img>';
                    } 
            else if (dailyCode=="04d") {
                dailyLogo.innerHTML= '<img class="log" src="./src/clouds.svg" alt="" width="80px"></img>';
                    } 
            else if (dailyCode=="09d") {
                    dailyLogo.innerHTML= '<img class="log" src="./src/hardrain.svg" alt="" width="80px"></img>';
                    } 
            else if (dailyCode=="10d") {
                    dailyLogo.innerHTML= '<img class="log" src="./src/rain.svg" alt="" width="80px"></img>';
                    } 
            else if (dailyCode=="11d") {
                    dailyLogo.innerHTML= '<img class="log" src="./src/thunder.svg" alt="" width="80px"></img>';
                    } 
            else if (dailyCode=="13d") {
                    dailyLogo.innerHTML= '<img class="log" src="./src/snow.svg" alt="" width="80px"></img>';
                    } 
            else if (dailyCode=="50d") {
                    dailyLogo.innerHTML= '<img class="log" src="./src/mist.svg" alt="" width="80px" height="80px"></img>';
                    } 




        box.appendChild(boxDate); 
        box.appendChild(dailyLogo); 
        box.appendChild(dailyTemp); 
        box.appendChild(minTemp);

        cards.appendChild(box);
    });

    

   

}
getCurrent(); 

}; 
getCurrentWeather();

