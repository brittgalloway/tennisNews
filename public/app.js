
//post comment
$("a.button").on("click", function() {
  const thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/news/" + thisId,
    data: {
      body: $(`textarea[data-id=${thisId}]`) //specific textarea
        .val()
        .trim(),
      news: thisId
    }
  }).then(function(data) {
    location.reload();
    console.log(data);
  });
});
