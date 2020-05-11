// Make a div that will contain the google map
var mapsEl = $("#mapEl");

var googleApiKey = "AIzaSyADK5Lk6M5yKgWBra5haAe7z-e_l-PlFdE";

// Create a button and event listener for that button
$("#submitButton").on("click", function (e) {
  e.preventDefault();

  // Grab input from the city and state input boxes. Trim the values so the search actually works
  var cityInput = $("#city").val().trim();
  var stateInput = $("#state").val().trim();
  // Url for the breweryAPI call
  var breweryUrl = `https://api.openbrewerydb.org/breweries/?by_city=${cityInput}&by_state=${stateInput}&per_page=5`;

  // Have an empty array to push the coordinates to from the ajax call
  var lonLatLocation = [];

  // Start the ajax call for the brewery api
  $.get(breweryUrl).then(function (response) {
    // Log the response from breweryAPI
    console.log(response);
    // Empty the breweryEl to make space for the new info
    $("#breweryEl").empty();

    // create a new table for the brewery response
    var brewTableEl = $("<table>", {
      class: "table is-bordered",
      id: "breweryTable",
    });
    var theadEl = $("<thead>");
    // have the thead contain name, phone, and address info
    var nameTh = $("<th>").text("Brewery Name");
    var phoneTh = $("<th>").text("Phone Number");
    var addressTh = $("<th>").text("Address");
    theadEl.append(nameTh, phoneTh, addressTh);
    // create a tbody element for where the info will go
    var tbodyEl = $("<tbody>");
    // append the tbody and thead to the table element
    brewTableEl.append(theadEl, tbodyEl);

    // Run a for loop for the length of the response array
    for (var i = 0; i < response.length; i++) {
      // Grab the longitude and latitude of the brewery
      var brewLat = response[i].latitude;
      var brewLon = response[i].longitude;

      // some responses from the brewery api come back with no lon,lat values
      // will show as null,null but still works

      // Join the long and lat together into one string
      var brewLocation = `${brewLat},${brewLon}`;

      // loop over the response to get the name's, brewery type, and address
      var brewName = response[i].name;
      var brewNumber = response[i].phone;
      var brewAddress = response[i].street;

      // we need a div that will contain the brewery info
      var brewInfoEl = $("#breweryEl");

      // Create new tr and td elements for each brewery's name, phone, and address to be displayed

      var trEl = $("<tr>");
      var nameEl = $("<td>").text(`${i + 1}. ${brewName}`);
      var numberEl = $("<td>").text(brewNumber);
      var addressEl = $("<td>").text(brewAddress);
      // Append the info to the tbody
      trEl.append(nameEl, numberEl, addressEl);
      // Append the info to the previously created tbody
      tbodyEl.append(trEl);
      // Append the tbody to the previously created table
      brewTableEl.append(tbodyEl);
      // Append the completed table to the brewery info div
      brewInfoEl.append(brewTableEl);

      // push the brewery locations into the lonLat array to be used in the map source
      lonLatLocation.push(brewLocation);

      // append the necessary search paramaters into the map source
      var mapSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${cityInput},${stateInput}&zoom=10&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:1%7C${lonLatLocation[0]}&markers=color:green%7Clabel:2%7C${lonLatLocation[1]}&markers=color:yellow%7Clabel:3%7C${lonLatLocation[2]}&markers=color:red%7Clabel:4%7C${lonLatLocation[3]}&markers=color:purple%7Clabel:5%7C${lonLatLocation[4]}&key=${googleApiKey}`;
      console.log(mapSrc);

      // create an image element with the source as the google map
      var mapImageEl = $("<img>", {
        src: mapSrc,
        id: "map",
      });

      // empty the maps element each time the button is clicked
      mapsEl.empty();
      // append the new map to the map element
      mapsEl.append(mapImageEl);
    }
  });
});
