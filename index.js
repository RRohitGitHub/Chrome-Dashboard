let urlLink


fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
.then(response => response.json())
.then(data=>{console.log(data)
    urlLink  = data.urls.regular;
    console.log(urlLink)
    document.body.style.backgroundImage = `url(${urlLink})`
    document.getElementById("author").textContent = `Author: ${data.user.first_name} ${data.user.last_name}`
})
.catch(error=>{console.log("Something went wrong")
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`        
})

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
.then(response => response.json())
.then(data=>{
    console.log(data)
    document.getElementById("crypto-top").innerHTML = 
    `
    <img class="crypto__image" src=${data.image.small}>
    <h2 class="crypto__heading">$ ${data.market_data.current_price.usd}</h2>
    ` 
    document.getElementById("currentPrice").textContent = `Current Price : $ ${data.market_data.current_price.usd}`
    document.getElementById("highestPrice").textContent = `Highest Price : $ ${data.market_data.high_24h.usd}`
    document.getElementById("lowestPrice").textContent = `Lowest Price : $ ${data.market_data.low_24h.usd}`
    console.log(data)})
.catch(error => console.log("Something went wrong!!"))

function clock() {
    const date = new Date()
    
    let currentTime = date.toLocaleTimeString()
    
    document.getElementById("time").textContent = currentTime
}

setInterval(clock, 1000);

navigator.geolocation.getCurrentPosition(
    (pos)=>{
        console.log("hello")
        console.log(pos)
        let latitude = pos.coords.latitude
        let longitude = pos.coords.longitude

        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}`)
        .then(response=>{
            if(!response.ok){
                throw Error("Weather data not available")
            }
                return response.json()
        })
        .then(data=>{
            console.log(data)
            let weatherIcon = data.weather[0].icon
            document.getElementsByClassName("weather__details")[0].innerHTML= `
            <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
            <h3>${Math.round(data.main.temp-273.15)}° C</h3>
            `
            console.log(data.name)
            document.getElementsByClassName("weather__city")[0].innerHTML = `<h2>${data.name}</h2>`
        })
        .catch(error=>console.log(error))
    }
)