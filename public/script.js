$(document).ready(function(){
  const searchField = $("#txt-search");

  searchField.on("keypress", function(keypress){
    var key = keypress.which || keypress.keyCode;
    if (key === 13) {
      let searchString = searchField.val();

      console.log(searchString);

      $.ajax({
        url: "/scrape/"+searchString,
        dataType: 'text',
        success: function(data) {
          console.log(data);
          document.write(data);
        }
      });

    }
  })

});
