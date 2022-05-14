window.addEventListener('load', () => {

    let lat;
    let lon;

    let temperaturaValor = document.getElementById('temperatura-valor'); 
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');

    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');

    let vientoVelocidad = document.getElementById('viento-velocidad');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
            // console.log(posicion.coords.latitude);
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            //Ubicacion auctual
            // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a60682abb5d571699c6425dc0520d2a1`;

            //Ubicacion por ciudad
            const url = `https://api.openweathermap.org/data/2.5/weather?q=mazatlan&lang=es&units=metric&appid=a60682abb5d571699c6425dc0520d2a1`;
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = `${temp} °C`;

                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();

                    let ciudad = data.name;
                    ubicacion.textContent = ciudad.toUpperCase();

                    let velocidad = data.wind.speed;
                    vientoVelocidad.textContent = `${velocidad} m/s`;
                    
                    //Iconos estaticas
                    // console.log(data.weather[0].icon);
                    // let iconCode = data.weather[0].icon;
                    // const urlIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                    //Para iconos animados
                    console.log(data.weather[0].main)
                    switch(data.weather[0].main){
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg'
                            console.log('LIMPIO');
                            break;
                        case 'Thunderstorm':
                            iconoAnimado.src = 'animated/thunder.svg'
                            console.log('Tormenta');
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'animated/rainy-2.svg'
                            console.log('LLovizna');
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'animated/rainy-7.svg'
                            console.log('Lluvia');
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'animated/snowy-6.svg'
                            console.log('Nieve');
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'animated/weather.svg'
                            console.log('Atmosfera');
                            break;
                        case 'Clouds':
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                            console.log('LIMPIO');
                            break;
                        default: break;
                    }
                    
                    
                    
                })
                .catch(error => console.log(erro))
        })
    }
})