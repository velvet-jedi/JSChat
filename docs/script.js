const socket = io().connect(window.location.origin); // Connect to the Socket.io server

$(() => {
    $("#send").click(() => {
        sendMessage({
            name: $("#name").val(),
            message: $("#message").val(),
        });
        $("#name").val("");
        $("#message").val("");
    });
    getMessages();
});

socket.on("message", message => {
    addMessages(message);
});

function addMessages(message) {
    $("#messages").append(`
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>`);
}

function getMessages() {
    const url = `${window.location.origin}/messages`;

    $.get(url, data => {
        data.forEach(addMessages);
    });
}

function sendMessage(message) {
    const url = `${window.location.origin}/messages`;
    $.post(url, message);
}
