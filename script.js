async function onClick() {
    const city = document.getElementById('input').value ;
    const response = await( await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=english`)) ;
    const info = await response.json() ;
    console.log(info) ;
    const lat = info.results[0].latitude ;
    const lon = info.results[0].longitude ;
    console.log(lat, lon) ;
    const forecast = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&elevation=nan&current=temperature_2m&temperature_unit=fahrenheit`) ;
    const result = await forecast.json() ;
    console.log(result) ;
    const temp = result.current.temperature_2m ;
    const time = result.current.time ;
    console.log("The temp is:" + temp + "(F)" + "Time:" + time) ;
    document.getElementById('post').innerHTML = "Temperature: " + temp + "(F)"
    document.getElementById('date').innerHTML = "Time: " + time
}