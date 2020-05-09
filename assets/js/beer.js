// Make a div that will contain the google map
var mapsEl = $("#mapEl");

var googleApiKey = "AIzaSyADK5Lk6M5yKgWBra5haAe7z-e_l-PlFdE";

// Have an empty array to push the coordinates to from the ajax call
var lonLatLocation = [];

// Create a button and event listener for that button
$("#submitButton").on("click", function (e) {
  e.preventDefault();

  // Grab input from the city and state input boxes
  var cityInput = $("#city").val();
  var stateInput = $("#state").val();
  var breweryUrl = `https://api.openbrewerydb.org/breweries/?by_city=${cityInput}&by_state=${stateInput}&per_page=5`;

  // Start the ajax call for the brewery api
  $.get(breweryUrl).then(function (response) {
    console.log(response);

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
      var brewType = response[i].brewery_type;
      var brewAddress = response[i].street;

      // we need a div that will contain the brewery info
      var brewInfoEl = $("#breweryEl");

      // create a new div for each brewery
      var brewResponseEl = $("<div>", {
        class: "",
      });
      // Create a new ul with li elements for the name, type, and address
      var brewUl = $("<ul>");
      var nameEl = $("<li>").text(`Name: ${brewName}`);
      var typeEl = $("<li>").text(`Brewery Type: ${brewType}`);
      var addressEl = $("<li>").text(`Address: ${brewAddress}`);
      brewUl.append(nameEl, typeEl, addressEl);
      brewResponseEl.append(brewUl);
      brewInfoEl.append(brewResponseEl);

      // push the brewery locations into the lonLat array to be used in the map source
      lonLatLocation.push(brewLocation);

      // append the necessary search paramaters into the map source
      var mapSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${cityInput},${stateInput}&zoom=10&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:1%7C${lonLatLocation[0]}&markers=color:green%7Clabel:2%7C${lonLatLocation[1]}&markers=color:yellow%7Clabel:3%7C${lonLatLocation[2]}&markers=color:red%7Clabel:4%7C${lonLatLocation[3]}&markers=color:purple%7Clabel:5%7C${lonLatLocation[4]}&key=${googleApiKey}`;

      // create an image element with the source as the google map
      var mapImageEl = $("<img>", {
        src: mapSrc,
      });

      // empty the maps element each time the button is clicked
      mapsEl.empty();
      // append the new map to the map element
      mapsEl.append(mapImageEl);
    }
  });
});
