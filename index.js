document.addEventListener("DOMContentLoaded", function () {
    const api = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php';
    // 本港18區天氣報告
    const immediateWeatherApiUrl = `${api}?dataType=rhrread&lang=tc`;
    // 本港九天天氣預報
    const weatherApiUrl = `${api}?dataType=fnd&lang=tc`;
    //本港地區天氣預報
    const generalWeatherApiUrl = `${api}?dataType=flw&lang=tc`;
    async function fetchImmediateWeatherData() {
        try {
            const response = await fetch(immediateWeatherApiUrl);
            const result = await response.json();
            console.log(result);
            //溫度
            const temperature = result.temperature;
            const data = temperature.data
            console.log(data);

            const place = data.map(item => item.place);
            const value = data.map(item => item.value);
            const immediate = document.getElementById("immediate-weather");
            const select = document.createElement("select");

            select.id = "select";
            immediate.appendChild(select);
            select.appendChild(document.createElement("option"));
            select.options[0].text = "請選擇地區";
            place.forEach((place, index) => {
                const option = document.createElement("option");
                option.value = value[index];
                option.textContent = place;
                select.appendChild(option);
            });
            const temperatureValue = document.createElement("p");
            immediate.appendChild(temperatureValue);
            select.addEventListener("change", function () {
                const selectedValue = this.value;
                const selectedPlace = this.options[this.selectedIndex].text;
                temperatureValue.innerHTML = `<span style="color:blue;font-size:1.2rem">地方: ${selectedPlace}, 現時溫度: ${selectedValue}°C</span>`;
            });
            console.log(place, value);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    async function fetchFutureWeatherData() {
        try {
            const response = await fetch(weatherApiUrl);
            const result = await response.json();
            console.log(result);
            const general = result.generalSituation;
            const future = document.getElementById("future");
            const container = document.getElementById("container");
            future.appendChild(document.createElement("p")).innerHTML = `<span style="color:orange">天氣概況:</span> <br>${general}`;
            console.log(general);
            const forecast = result.weatherForecast;
            console.log(forecast);
            forecast.forEach(item => {
                const card = document.createElement("div");
                card.className = "card";
                container.appendChild(card);
                const date = item.forecastDate;
                const forecastWeather = item.forecastWeather;
                const forecastMaxtemp = item.forecastMaxtemp.value;
                const forecastMintemp = item.forecastMintemp.value;
                const forecastWind = item.forecastWind;
                const forecastWeek = item.week;
                const forecastMinrh = item.forecastMinrh.value;
                const forecastMaxrh = item.forecastMaxrh.value;
                const dateStr = date.substring(0, 8);
                const formattedDate = `${dateStr.substring(0, 4)}/${dateStr.substring(4, 6)}/${dateStr.substring(6, 8)}`;

                const futureDate = document.createElement("h3")
                futureDate.textContent = `${formattedDate} ${forecastWeek}`;
                card.appendChild(futureDate);
                const futureWeather = document.createElement("p");
                futureWeather.innerHTML = `<span style="font-size:1.2rem">天氣: ${forecastWeather} 
                最高溫度: <span style="color:red;font-size:1.5rem">${forecastMaxtemp}</span>°C,
                 最低溫度: <span style="color:blue;font-size:1.5rem">${forecastMintemp}</span>°C,
                 風向: <span style="color:purple;font-size:1.2rem">${forecastWind}</span>
                 <br>
                 濕度:<span style="color:green;font-size:1.2rem"><b>${forecastMinrh}% - ${forecastMaxrh}%</b></span>`;
                card.appendChild(futureWeather);

            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    async function fetchGeneralWeatherData() {
        try {
            const response = await fetch(generalWeatherApiUrl);
            const result = await response.json();
            console.log(result);
            const general = result.generalSituation;
            const forecastPeriod = result.forecastPeriod;
            const forecastDesc = result.forecastDesc;
            const outlook = result.outlook;
            const generalWeather = document.getElementById("general-weather");
            generalWeather.appendChild(document.createElement("p")).innerHTML = `${forecastPeriod} : ${general}<br>${forecastDesc} ${outlook}`;
            console.log(general);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    fetchGeneralWeatherData();
    fetchImmediateWeatherData();
    fetchFutureWeatherData();
});
