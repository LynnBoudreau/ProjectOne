
// when search button is clicked:
$(".search-button").on("click", function(){
    $(".recipe-div").empty();
    var ingredientInput = $(".ingredient-input").val();
    var urlOne = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientInput}`;
    //  ajax request to get drink name, image, and drink id.
    $.get(urlOne).then(function(response){
        console.log(response);
        // for each drink in the array, create <p>, <div> and <img> to display drink name and drink image.  Add data attribute to each image of that drink's ID from the ajax response.
        var drinksArray = response.drinks
        drinksArray.forEach(function(drink){
            var drinkID = drink.idDrink
            var drinkImgEl = $("<img>", {
                src: drink.strDrinkThumb,
                "data-id": drinkID,
                width: "150px",
                class: "drink-button"
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
        $(".drink-button").on("click", function(){
            var drinkButtonId = $(".drink-button").attr("data-id")
            var urlForRecipe = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkButtonId}`
            console.log(urlForRecipe);
            $.get(urlForRecipe).then(function(drinkdata){
                console.log(drinkdata);
                $(".modal").addClass("is-active");
                $(".modal-background").on("click", function(){
                    $(".modal").removeClass("is-active");
                });
                $(".modal-close").on("click", function(){
                    $(".modal").removeClass("is-active");
                });

            });
        });
    
    });
});