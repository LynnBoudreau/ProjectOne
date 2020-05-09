$(".grounded").hide();
$(".age-check").on("click", ageCheck);

function ageCheck() {
  var month = $(".month").val();
  var day = $(".day").val();
  var year = $(".year").val();
  if (month === "" || day === "" || year === "") {
    var enterDOB = $("<h1>", {
      class: "dob-check text-center follow-directions",
      text: "Please Follow Directions and...",
    });
    $(".modal-card-body").prepend(enterDOB);
  } else {
    var userDOB = month + " " + day + " " + year;
    console.log(userDOB);
    var ageChecker = moment().diff(userDOB, "years");
    console.log(ageChecker);
    if (ageChecker >= 21) {
      $(".age-check").attr("href", "index.html");
      $(".modal").toggleClass("is-active");
    } else {
      $(".dob-check").hide();
      $(".grounded").show();
    }
  }
}
