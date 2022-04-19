

let action = "Create";
function setAction(actionParam) {
  action = actionParam;
}

function uploadSuccess(data) {

  if (action == "Create")
  {
    if (data.error)
    {
      alert("bad");    
      return;
    }
          $.ajax({
            url: "/create",
            type: "POST",
            data: {
                    filename2:data.filename2
                  },
            success: function(data2){
                if (data2.error)
                  alert("bad");
                else {
                  alert("good");
                  display.src = "images/" + data2.filename2;
                }
              } ,     
            dataType: "json"
          });   

  }
  else if (action == "Read")
  {
          $.ajax({
            url: "/read",
            type: "GET",
            data: {},
            success: function(data2){
                if (data2.error)
                  alert("bad");
                else {
                  display.src = "images/" + data2.filename2;
                }
              } ,     
            dataType: "json"
          });       
  }

}

$(document).ready(function(){ 
  $("form").submit(function(event) {
    let data = new FormData($(this)[0]);
    $.ajax({
      url: '/fileupload',
      type: 'POST',
      data: data,
      processData: false, // These two are needed to prevent JQuery from processing the form data
      contentType: false,
      mimeType: 'multipart/form-data',
      dataType: 'json', // Without this, the server's response will be a string instead of a JSON object
      success: uploadSuccess
    });
    return false;
  });

});     
  