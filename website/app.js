/* Global Variables */
const API_Key = "73af546d6dc3a3c17246aa130a2162bb";
const WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?zip";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//generate data
const generateButton = document.getElementById('generate');
generateButton.addEventListener("click", function() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherTemp(WEATHER_URL, zipCode, API_Key)
    .then(data => sendDataToServer({temp: data.main.temp, date: newDate, feelings}))
    .then(() => updateUI())
});

// get weather temp
async function getWeatherTemp(baseUel, zipCode, apiKey) {
    const fetchingTemp = await fetch('${baseUrl}${zipCode}&appid=${apiKey}&units=metric');
    try {
        const result = await fetchingTemp.json();
        return result;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

// send data to the server
async function sendDataToServer(data={}) {
    const sendData = await fetch('/sendData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await sendData.json();
        return result;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

// update UI
async function updateUI() {
    const fetchingTemp = await fetch('/getData');
    try {
        const result = await fetchingTemp.json();
        
        document.getElementById('temp').innerHTML = result.temp;
        document.getElementById('date').innerHTML = result.date;
        document.getElementById('content').innerHTML = result.feelings;
    }catch(error) {
        console.log(error);
        throw error;
    }
}

