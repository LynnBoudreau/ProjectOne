var googleApiKey = "AIzaSyADK5Lk6M5yKgWBra5haAe7z-e_l-PlFdE";

var breweryUrl = `https://api.openbrewerydb.org/breweries/?by_city=${cityInput}&by_state=${stateInput}&per_page=5`;

// Have an empty array to push the coordinates to from the ajax call
var lonLatLocation = [];

// Create a button and event listener for that button
$("").on("click", function (e) {
  e.preventDefault();

  // Grab input from the city and state input boxes
  var cityInput = $("").val();
  var stateInput = $("").val();



    }
  });
});
