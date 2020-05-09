$(".modal").addClass("is-active");
$(".grounded").hide();
$(".age-check").on("click", ageCheck);

function ageCheck() {
  var month = $(".month").val();
  var day = $(".day").val();
  var year = $(".year").val();
  var userDOB = month + " " + day + " " + year;
  console.log(userDOB);
  var ageChecker = moment().diff(userDOB, "years");
  console.log(ageChecker);
  if (ageChecker >= 21) {
    $(".age-check").attr("href", "index.html");
    $(".modal").removeClass("is-active");
  } else {
    $(".dob-check").hide();
    $(".grounded").show();
  }
}
