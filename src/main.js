import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }
    }
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {
    const body = JSON.parse(response);
    const conversionRates = Object.entries(body.conversion_rates)
    for(let i = 0; i < conversionRates.length; i++) {
      $('#mySelect').append($('<option>', {
        value: rates[i][0],
        text: rates[i][1]
      }));
    }

    //build option selector -- 

    // $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
    // $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    // $('.showErrors').text("");
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error}`);
    $('.showHumidity').text("");
    $('.showTemp').text("");
  });

  $('#weatherLocation').click(function() {

    //use options to select currency to exchange
    let cur1 = $('#currency1').val();
    let cur2 = $('#currency2').val();
    $('#location').val("");
  });
});

//call the api using latest to get all currencies