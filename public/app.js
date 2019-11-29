//show and hide comment section
$(document).on("click", "#showComments", function() {
  const thisId = $(this).attr("data-id");
  $("#getComments").removeClass("is-hidden");
  $.ajax({
    method: "GET",
    url: "/news/" + thisId,
  }).then(function(data) {
    console.log(data);
  });
});

$(document).on("click", ".delete", function() {
  $("#getComments").addClass("is-hidden");
});
$(document).on("click", "#addComment", function() {
  $("#postComment").removeClass("is-hidden");
});
//post comment
$(document).on("click", "a.button", function() {
  const thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/news/ " + thisId,
    data: {
      // Value taken from note textarea
      body: $(".textarea")
        .val()
        .trim(),
    },
  }).then(function(data) {
    $(".textarea").empty();
    console.log(data);
  });
});
