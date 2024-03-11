

$(() => {
                $("#send").click(()=>{
                    sendMessage({
                        name: $("#name").val(), 
                        message:$("#message").val()});
                    })
                getMessages()
        })
    
function addMessages(message){
   $("#messages").append(`
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>`)
   }
   
    function getMessages() {
    const url = `${window.location.origin}/messages`;
    console.log('GET URL:', url);

    $.get(url, (data) => {
        data.forEach(addMessages);
    });
}

function sendMessage(message) {
    const url = `${window.location.origin}/messages`;
    console.log('POST URL:', url);

    $.post(url, message);
}