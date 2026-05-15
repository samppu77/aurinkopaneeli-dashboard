/* SENSOR ELEMENTS */

const sensor1 = document.getElementById("sensor1");
const sensor2 = document.getElementById("sensor2");

const servoX = document.getElementById("servoX");
const servoY = document.getElementById("servoY");

/* LIVE SENSOR DATA */

let sensor1Value = 820;
let sensor2Value = 835;

let servoXValue = 42;
let servoYValue = 97;

setInterval(() => {

    /* SMALL NATURAL CHANGES */

    sensor1Value += Math.floor(Math.random() * 11 - 5);
    sensor2Value += Math.floor(Math.random() * 11 - 5);

    servoXValue += Math.floor(Math.random() * 7 - 3);
    servoYValue += Math.floor(Math.random() * 7 - 3);

    /* LIMITS */

    sensor1Value =
    Math.max(700, Math.min(950, sensor1Value));

    sensor2Value =
    Math.max(700, Math.min(950, sensor2Value));

    servoXValue =
    Math.max(0, Math.min(180, servoXValue));

    servoYValue =
    Math.max(0, Math.min(180, servoYValue));

    /* UPDATE UI */

    sensor1.textContent = sensor1Value;

    sensor2.textContent = sensor2Value;

    servoX.textContent =
    servoXValue + "°";

    servoY.textContent =
    servoYValue + "°";

}, 2000);

/* CHART */

const ctx = document.getElementById('energyChart');

let energyChart;

if(ctx) {

    energyChart = new Chart(ctx, {

        type: 'line',

        data: {

            labels: [
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00'
            ],

            datasets: [{

                label: 'Energia (W)',

                data: [
                    120,
                    190,
                    300,
                    280,
                    350,
                    400
                ],

                borderColor: '#38bdf8',

                backgroundColor:
                'rgba(56,189,248,0.2)',

                tension: 0.4,

                fill: true

            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    labels: {
                        color: 'white'
                    }
                }

            },

            scales: {

                x: {
                    ticks: {
                        color: 'white'
                    }
                },

                y: {
                    ticks: {
                        color: 'white'
                    }
                }

            }

        }

    });

}

/* CHANGE DATA */

function changeData(type) {

    if(!energyChart) return;

    if(type === "12h") {

        energyChart.data.labels =
        ['06', '08', '10', '12', '14', '16'];

        energyChart.data.datasets[0].data =
        [80, 120, 180, 260, 340, 400];
    }

    if(type === "1d") {

        energyChart.data.labels =
        ['00', '04', '08', '12', '16', '20'];

        energyChart.data.datasets[0].data =
        [50, 100, 220, 320, 400, 260];
    }

    if(type === "30d") {

        energyChart.data.labels =
        ['Vko1', 'Vko2', 'Vko3', 'Vko4'];

        energyChart.data.datasets[0].data =
        [1200, 1800, 2400, 3100];
    }

    if(type === "180d") {

        energyChart.data.labels =
        ['Tammi', 'Maalis', 'Touko', 'Heinä', 'Syys', 'Marras'];

        energyChart.data.datasets[0].data =
        [4000, 6200, 8100, 9000, 7600, 5000];
    }

    if(type === "1y") {

        energyChart.data.labels =
        ['2025'];

        energyChart.data.datasets[0].data =
        [54000];
    }

    energyChart.update();
}

/* LIVE WEATHER */

async function fetchWeather() {

    try {

        const response = await fetch(

            "https://api.open-meteo.com/v1/forecast?latitude=65.0121&longitude=25.4651&current=temperature_2m,relative_humidity_2m"

        );

        const data = await response.json();

        const temperature =
        document.getElementById("temperature");

        const humidity =
        document.getElementById("humidity");

        if(temperature) {

            temperature.textContent =
            data.current.temperature_2m + "°C";

        }

        if(humidity) {

            humidity.textContent =
            data.current.relative_humidity_2m + "%";

        }

    }

    catch(error) {

        console.log("Weather error:", error);

    }

}

/* FETCH WEATHER */

fetchWeather();

/* UPDATE EVERY 60s */

setInterval(fetchWeather, 60000);

/* LIVE WEATHER */

async function fetchSeinajokiWeather() {

    try {

        const response = await fetch(

            "https://api.open-meteo.com/v1/forecast?latitude=62.7945&longitude=22.8282&current=temperature_2m,relative_humidity_2m"

        );

        const data = await response.json();

        document.getElementById("seinajokiTemp").textContent =
            data.current.temperature_2m + "°C";

        document.getElementById("seinajokiHumidity").textContent =
            data.current.relative_humidity_2m + "%";

    }

    catch(error) {

        console.log("Weather error:", error);

    }

}

/* START */

fetchSeinajokiWeather();

/* UPDATE EVERY 60s */

setInterval(fetchSeinajokiWeather, 60000);
