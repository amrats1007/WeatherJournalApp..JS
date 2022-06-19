/* Global Variables */
const apiKey = '73af546d6dc3a3c17246aa130a2162bb&units=metric';
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener on generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    const getInfo = document.getElementById('info');
    if (zipCode !== '') {
        document.getElementById('generate').classList.remove('invalid');
        generateDataWeather(baseUrl, zipCode, apiKey)
            .then(function(data) {
                postData('/add', { temp: data.main.temp, date: newDate, content: content }).then(function() { updateUI().then(); });
        }).catch(function(error) {
            console.log(error);
            alert('The entry zip code is invalid. Try again');
        });
        getInfo.reset();
    } else {document.getElementById('generate').classList.add('invalid');}
}

// get data form API
const generateDataWeather = async(baseUrl, zipCode, apiKey) => {
    const res = await fetch(`${baseUrl}${zipCode}&appid=${apiKey}&units=metric`);
    try {
        return await res.json();
    } catch (error) {
        console.log('error', error);
    }
};

// post data
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',},
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content})
    });
    try {
        return await response.json();
    } catch (error) {
        console.log(error);
        }
};

// updates UI
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        {
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp;
            document.getElementById('content').innerHTML = allData.content;
        }
    } catch (error) {
        console.log('error', error);
        }
};
