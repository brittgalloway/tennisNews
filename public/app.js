//show and hide comment section
$("#showComments").on("click", function() {
  const thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/news/" + thisId,
  }).then(function(data) {
    console.log(data);
  });
  $("#getComments").removeClass("is-hidden");
});
$(".delete").on("click", () => {
  $("#getComments").addClass("is-hidden");
});
$("#addComment").on("click", () => {
  $("#postComment").removeClass("is-hidden");
});

//post comment
$("a.button").on("click", function() {
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
    console.log(data);
  });
});
