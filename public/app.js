
//show and hide comment section
$("#showComments").on("click", () => {
    const thisId = $(this).attr("data-id");
  $("#getComments").removeClass("is-hidden");
  $.ajax({
    method: "GET",
    url: "/news/" + thisId
  }).then(function(data){
 console.log(data)
  })
});
$(".delete").on("click", () => {
  $("#getComments").addClass("is-hidden");
});
$("#addComment").on("click", () => {
  $("#postComment").removeClass("is-hidden");
});


// $.getJSON("/news", (data)=>{
//     data.forEach(newsArticle =>)
// })
//post comment
$("a.button").on("click", () => {
    const thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/news/ " + thisId,
    data: {
      // Value taken from note textarea
      body: $(".textarea").val(),
    },
  }).then(function(data) {
  console.log(data)
  });
});
