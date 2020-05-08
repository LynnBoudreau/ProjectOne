
$(".search-button").on("click", function(){
    var ingredientInput = $(".ingredient-input").val();
    var urlOne = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientInput}`;
     
    $.get(urlOne).then(function(response){
        console.log(response);
        var drinksArray = response.drinks
        drinksArray.forEach(function(drink){
            var drinkID = drink.idDrink
            var drinkImgEl = $("<img>", {
                src: drink.strDrinkThumb,
                "data-id": drinkID,
                width: "200px",
                class: "drink-button"
            });
            var cocktailNameP = $("<p>").text(drink.strDrink);
            var cocktailDivEl = $("<div>");
            cocktailDivEl.append(cocktailNameP, drinkImgEl);
            $(".recipe-div").append(cocktailDivEl);
        });
        $(".drink-button").on("click", function(){
            var drinkButtonId = $(".drink-button").attr("data-id")
            var urlForRecipe = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkButtonId}`
            console.log(urlForRecipe);
            $.get(urlForRecipe).then(function(drinkdata){
                console.log(drinkdata);
            });
        });
    
    });
});