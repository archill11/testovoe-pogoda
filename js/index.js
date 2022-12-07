$(document).ready(function () {
  fetchWeather();
  exchange();
  addEventListenerOnRefreshButton();
});

/**
 * Функция получает данный о погоде с сервера 
 * и при успешном получении , отображает на экране информацию
 */
function fetchWeather() {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=28c53a3a2a9c652305b6ada6420b9b8d",
    type: "GET",
    dataType: "json",
    success: function (data) {

      const kelvinToCelsiusDifference = 273; // разница между градумаси Цельсия и Фарингейта

      // получаем данный из объета data 
      const city = data.name;
      const description = data.weather[0].description;
      const temp = Math.round(data.main.temp - kelvinToCelsiusDifference);
      const feelsLike = Math.round(data.main.feels_like - kelvinToCelsiusDifference);

      // отображаем на странице 
      $(".weatherAndRefreshBlock__сity").html(city);
      $(".weatherAndRefreshBlock__description").html(description);
      $(".weatherAndRefreshBlock__temperature-val").html(temp);
      $(".weatherAndRefreshBlock__temperature_feels-val").html(feelsLike);
    },
    error: function(xhr, status, error){
      console.log(error);
      alert('Ошибка при запросе погоды с сервера.')
    }
  });
}

/**
 * Функция получает данный о курсе валют с сервера 
 * и при успешном получении , отображает на экране информацию
 */
function exchange() {
  $.ajax({
    url: "https://www.cbr-xml-daily.ru/daily_json.js",
    type: "GET",
    dataType: "json",
    success: function (data) {

      printСurrency('usd', data);
      printСurrency('eur', data);
      printСurrency('sek', data);
      printСurrency('jpy', data);
      printСurrency('cad', data);

    },
    error: function(xhr, status, error){
      console.log(error);
      alert('Ошибка при запросе курса с сервера.')
    }
  });
}

/**
 * Функция навешивает обработчик события клика на кнопку обновления данных
 */
function addEventListenerOnRefreshButton() {
  $('.RefreshBlock').on('click', (e) => {
    exchange();
    fetchWeather();
  });
}

/**
 * Функция берет из data нужные значения валюты и вставляет в 
 * соответствующий этой валюте блок html
 * 
 * @param {String} currency 
 * @param {Object} data 
 */
function printСurrency(currency, data) {

  currency = currency.toLowerCase(); 
  const currencyUpperCase = currency.toUpperCase();

  const Price = data.Valute[currencyUpperCase].Value.toFixed(2);
  const Name = data.Valute[currencyUpperCase].Name ;
  const Char = data.Valute[currencyUpperCase].CharCode;

  $(`.ExchangeBlock__${currency}__price`).html(`1 ${Char} = ${Price} RUB`);
  $(`.ExchangeBlock__${currency}__title`).html(Name);
}
