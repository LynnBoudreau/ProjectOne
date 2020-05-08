$(".check-age").on("click", function () {
  var month = $(".month").val();
  var day = $(".day").val();
  var year = $(".year").val();
  var userDOB = month + " " + day + " " + year;
  console.log(userDOB);
  var ageCheck = moment().diff(userDOB, "years");
});
