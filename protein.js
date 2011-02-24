var updateProteinGoal = function() {
  var weightInPounds = $("#bodyweight").val();
  var perPound = $("#protein_per_pound_of_bodyweight").val();
  var grams = weightInPounds * perPound;
  $("#protein_goal").val(grams);
};

$("#bodyweight").change(updateProteinGoal);
$("#protein_per_pound_of_bodyweight").change(updateProteinGoal);

$(function() {
  $("#add").click( function(e) {
    var foodItem = $("#food ul li:first").clone(true);
    foodItem.find('input[type="text"]').val("");
    $("#food ul").append(foodItem);
  });
});

var progressMessage = function(percentage) {
  var msg = "Let's get some chow!";
  if (percentage < 25) {
    msg = "Keep eatin'";
  } else if (percentage < 50) {
    msg = "Your on your way!";
  } else if (percentage < 75) {
    msg = "Getting closer!";
  } else if (percentage < 100) {
    msg = "How about some protein snacks!";
  } else if (percentage > 99) {
    msg = "Congrats! This is enough protein for you on a given day.";
  }
  return msg;
}


var updateProgressBar = function() {
  var total_protein_grams = Number(0);
  var qtys = $("#food ul").children().find('.qty');
  var proteinInEach = $("#food ul").children().find('.protein_source');
  $.each(qtys, function(index, value) {
    var grams_for_this_item = Number(value.value) * Number(proteinInEach[index].value);
    total_protein_grams += grams_for_this_item;
  });
  var goal = $("#protein_goal").val();
  var percentage = (total_protein_grams / Number(goal) * 100);
  $("#progressbar").progressbar({ value: percentage });
  $("#percent_complete").html(percentage + "%");
  $("#congrats").html(progressMessage(percentage));
};

$("#progressbar").progressbar({ value: 0 });
$("#food ul li .qty").live('change', updateProgressBar);
$("#food ul li .protein_source").live('change', updateProgressBar);