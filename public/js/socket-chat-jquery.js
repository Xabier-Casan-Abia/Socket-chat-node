var params = new URLSearchParams(window.location.search);

const chatUser = params.get('user');
const chatRoom = params.get('room');

// jQuery references
let usersDiv = $('#usersDiv');
let sendForm = $('#sendForm');
let textMessage = $('#textMessage');
let chatboxDiv = $('#chatboxDiv');
let roomMainHeader = $('#roomMainHeader');


// Functions to render Users
const renderUsers = (users) => { // [{}, {}, {}]
    let usersHTML = ''

    usersHTML += '<li>';
    usersHTML += '    <a href = "/index.html" class = "active" > Go  Back' + '</span></a>';
    usersHTML += '</li>';

    for (let i = 0; i < users.length; i++) {
        usersHTML += '<li>';
        usersHTML += '    <a data-id="' + users[i].id + '" href="javascript:void(0)"> <span>' + users[i].name + '<small class="text-success">online</small></span></a>';
        usersHTML += '</li>';
    }

    usersDiv.html(usersHTML);
}

const renderMessage = (message, me) => {
    let date = new Date(message.date);
    let time = '';
    if (date.getMinutes().toString().split('').length === 1) {
        time = date.getHours() + ':0' + date.getMinutes();
    } else {
        time = date.getHours() + ':' + date.getMinutes();
    }
    let adminCLass = 'info';

    if (message.name === 'Admin') {
        adminCLass = 'danger'
    }

    let messagesHTML = '';

    if (me) {
        messagesHTML += '<li class="reverse">';
        messagesHTML += '    <div class="chat-content">';
        messagesHTML += '        <h5>' + message.name + '</h5>';
        messagesHTML += '        <div class="box bg-light-inverse">' + message.message + '</div>';
        messagesHTML += '    </div>';
        messagesHTML += '        <div class="chat-img"><img src="assets/images/users/turquoise.jpg" alt="user" /></div>';
        messagesHTML += '        <div class="chat-time">' + time + '</div>';
        messagesHTML += '</li>';
    } else {
        messagesHTML += '<li class="animated fadeIn">';
        if (message.name != 'Admin') {
            messagesHTML += '    <div class="chat-img"><img src="assets/images/users/Yellow.jpg" alt="user" /></div>';
        } else {
            messagesHTML += '    <div class="chat-img"><img src="assets/images/users/Red.png" alt="user" /></div>';
        }
        messagesHTML += '    <div class="chat-content">';
        messagesHTML += '        <h5>' + message.name + '</h5>';
        messagesHTML += '        <div class="box bg-light-' + adminCLass + '">' + message.message + '</div>';
        messagesHTML += '     </div>';
        messagesHTML += '     <div class="chat-time">' + time + '</div>';
        messagesHTML += '</li>';
    }

    chatboxDiv.append(messagesHTML);

}

const renderRoom = () => {
    roomMainHeader.html(chatRoom);
}

const scrollBottom = () => {

    // selectors
    var newMessage = chatboxDiv.children('li:last-child');

    // heights
    var clientHeight = chatboxDiv.prop('clientHeight');
    var scrollTop = chatboxDiv.prop('scrollTop');
    var scrollHeight = chatboxDiv.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        chatboxDiv.scrollTop(scrollHeight);
    }
}

//Event Listeners
usersDiv.on('click', 'a', function() {

    let id = $(this).data('id');

    if (id) {
        console.log(id);
    }

})

sendForm.on('submit', e => {
    e.preventDefault();

    if (textMessage.val().trim().length === 0) {}

    socket.emit('createMessage', {
        name: chatUser,
        message: textMessage.val()
    }, (message) => {
        textMessage.val('').focus();
        renderMessage(message, true);
        scrollBottom();
    })
})