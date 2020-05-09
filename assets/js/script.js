// hide the div that holds the underage information
$(".grounded").hide();

// on click - run ageCheck function
$(".age-check").on("click", ageCheck);

function ageCheck() {
  // takes the values for the date of birth
  var month = $(".month").val();
  var day = $(".day").val();
  var year = $(".year").val();

  // if no date is entered do not move on
  if (month === "" || day === "" || year === "") {
    var enterDOB = $("<h1>", {
      class: "dob-check text-center follow-directions",
      text: "Please Follow Directions and...",
    });
    // prepend div with message
    $(".modal-card-body").prepend(enterDOB);
  } else {
    var userDOB = month + " " + day + " " + year;
    console.log(userDOB);
    // find the differnce between today's date and the birth date to check age
    var ageChecker = moment().diff(userDOB, "years");
    console.log(ageChecker);
    // if the user is of age, move on
    if (ageChecker >= 21) {
      $(".age-check").attr("href", "index.html");
      $(".modal").toggleClass("is-active");
    } else {
      // if not do not let in, show pic and change button href
      $(".dob-check").hide();
      $(".grounded").show();
    }
  }
}
