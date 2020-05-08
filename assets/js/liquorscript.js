// search button is clicked:
$(".search-button").on("click", function () {
    // empty the recipe-div and instructions div if there is already text there from a previous search
  $(".recipe-div").empty();
  $(".instruction-div").empty();


  var ingredientInput = $(".ingredient-input").val();
  var urlOne = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientInput}`;

  //  ajax request to get drink name, image, and drink id.
  $.get(urlOne).then(function (response) {
    console.log(response);
    // for each drink in the array, create <p>, <div> and <img> to display drink name and drink image.  Add data attribute to each image of that drink's ID from the ajax response.
    var drinksArray = response.drinks;
    drinksArray.forEach(function (drink) {
      var drinkID = drink.idDrink;
      var drinkImgEl = $("<img>", {
        src: drink.strDrinkThumb,
        "data-id": drinkID,
        width: "150px",
        class: "drink-button",
      });
      var cocktailNameP = $("<p>").text(drink.strDrink);
      var cocktailDivEl = $("<div>");
      // append new <p> and <img> elements to the new <div>, and append the new <div> to the .recipe-div
      cocktailDivEl.append(cocktailNameP, drinkImgEl);
      $(".recipe-div").append(cocktailDivEl);
    });
    var instructionPEl = $("<p>").text("click an image to view recipe");
    $(".instruction-div").prepend(instructionPEl);

    // when the drink image is clicked, run ajax request to get the ingredients and recipe using the drink id data-attribute from the image
    $(".drink-button").on("click", function () {
        $(".table-body").empty();
      var drinkButtonId = $(this).attr("data-id");
      var urlForRecipe = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkButtonId}`;
      console.log(urlForRecipe);
      $.get(urlForRecipe).then(function (drinkdata) {
        console.log(drinkdata);
        $(".modal").addClass("is-active");
        $(".modal-background").on("click", function () {
          $(".modal").removeClass("is-active");
          $(".ingredients").empty();
        });
        $(".modal-close").on("click", function () {
          $(".modal").removeClass("is-active");
          $(".ingredients").empty();
        });

        var drinkinfo = drinkdata.drinks[0];
        // store the image, drink name, glass type and recipe in variables to append to the modal
        var modalImgSrc = drinkinfo.strDrinkThumb;
        var modalDrinkName = drinkinfo.strDrink;
        var modalGlassType = drinkinfo.strGlass;
        var modalRecipe = drinkinfo.strInstructions;

        // Array of all of the possible ingredients for the drink from the ajax response
        var ingredientArray = [
          drinkinfo.strIngredient1,
          drinkinfo.strIngredient2,
          drinkinfo.strIngredient3,
          drinkinfo.strIngredient4,
          drinkinfo.strIngredient5,
          drinkinfo.strIngredient6,
          drinkinfo.strIngredient7,
          drinkinfo.strIngredient8,
          drinkinfo.strIngredient9,
          drinkinfo.strIngredient10,
          drinkinfo.strIngredient11,
          drinkinfo.strIngredient12,
          drinkinfo.strIngredient13,
          drinkinfo.strIngredient14,
          drinkinfo.strIngredient15,
        ];
        console.log(ingredientArray);
        // Array of all the measurements for each ingredient from the ajax response
        var measurementsArray = [
          drinkinfo.strMeasure1,
          drinkinfo.strMeasure2,
          drinkinfo.strMeasure3,
          drinkinfo.strMeasure4,
          drinkinfo.strMeasure5,
          drinkinfo.strMeasure6,
          drinkinfo.strMeasure7,
          drinkinfo.strMeasure8,
          drinkinfo.strMeasure9,
          drinkinfo.strMeasure10,
          drinkinfo.strMeasure11,
          drinkinfo.strMeasure12,
          drinkinfo.strMeasure13,
          drinkinfo.strMeasure14,
          drinkinfo.strMeasure15,
        ];

        // For each measurement in the measurement array, create a table row, with 2 <td> elements.  One for the measurement from the measurementArray, and one for the corresponding ingredient from the ingredient Array and append it to the table body.
        // var i = 0;
        // measurementsArray.forEach(function(measurement){
        //     if (measurement != null) {
        //         var tablerow = $("<tr>").append($("<td>").text(measurement)).append($("<td>").text(ingredientArray[i]));
        //         $(".table-body").append(tablerow);
        //         i++;
        //     }
        // });

        var i = 0;
        ingredientArray.forEach(function(ingredient){
            if (ingredient != null) {
                var tablerow = $("<tr>").append($("<td>").text(measurementsArray[i])).append($("<td>").text(ingredient));
                $(".table-body").append(tablerow);
                i++;
            }
        });

        // render the image, drink name, glass type, and recipe to the modal
        $(".modal-drink-img").attr("src", modalImgSrc);
        $(".drink-name").text(modalDrinkName);
        $(".glass-type").text(`You should serve this in a(n): ${modalGlassType}`);
        $(".recipe").text(modalRecipe);
      });
    });
  });
});
