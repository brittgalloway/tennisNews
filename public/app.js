//show and hide comment section
$(document).on("click", "#showComments", function() {
  $("#getComments").removeClass("is-hidden");
});

$(document).on("click", ".delete", function() {
  $("#getComments").addClass("is-hidden");
});
$(document).on("click", "#addComment", function() {
  $("#postComment").removeClass("is-hidden");
});
//post comment
$("a.button").on("click", function() {
  const thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/news/" + thisId,
    data: {
      body: $(`textarea[data-id=${thisId}]`)
        .val()
        .trim(),
      news: thisId
    }
  }).then(function(data) {
    location.reload();
    console.log(data);
  });
});
