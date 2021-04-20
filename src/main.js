import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

$(document).ready(function () {
  let promise = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
    request.onload = function () {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promise.then(
    function (response) {
      const body = JSON.parse(response);
      const conversionRates = Object.entries(body.conversion_rates);
      console.log("ive triggered!");
      for (let i = 0; i < conversionRates.length; i++) {
        $("#currencyOne").append(
          $("<option>", {
            value: conversionRates[i][1],
            text: conversionRates[i][0],
          })
        );
        $("#currencyTwo").append(
          $("<option>", {
            value: conversionRates[i][1],
            text: conversionRates[i][0],
          })
        );
      }

      //build option selector --

      // $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      // $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      // $('.showErrors').text("");
    },
    function (error) {
      $(".showErrors").text(
        `There was an error processing your request: ${error}`
      );
      $(".showHumidity").text("");
      $(".showTemp").text("");
    }
  );

  $("#converterSubmit").submit(function (event) {
    //use options to select currency to exchange
    let originRate = $("#currencyOne option:selected").val();
    let targetRate = $("#currencyTwo option:selected").val();
    // let curOneText = $("#currencyOne option:selected").text();
    // let curTwoText = $("#currencyTwo option:selected").text();

    let curToDollar = parseInt($("#convertedAmount").val()) / originRate;
    let convertedAmount = curToDollar * targetRate;

    //value and convert to dollar curOrgin to dollar
    //convert dollar to target dollar to curTarget

    $("#output").text(`The converted amount is ${convertedAmount}`);

    event.preventDefault();
  });
});

//call the api using latest to get all currencies
//convert made up currency 6.50 for every 1 us dollar
//1 to made up currency =
