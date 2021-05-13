// we get io from index.html client script 
const socket =io() 
let naame;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do {
    naame = prompt('Please Write your Name: ')
} while (!naame);
textarea.addEventListener('keyup',(event)=>{
if(event.key === 'Enter'){
    sendMessage(event.target.value)

}
})

function sendMessage(message){
    let msg = {
        user:naame,
        message:message.trim()
    }
    //append(showing msg in the messsage arrea and then send the msg )
appendMessage(msg,'outgoing')
textarea.value=''
// to scroll new ms automatically
scrollToBottom();
//send to server
socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
let className = type
mainDiv.classList.add(className,'message')
let markup = `
<h4> ${msg.user}</h4>
<p>${msg.message}</p>
`
mainDiv.innerHTML = markup
messageArea.appendChild(mainDiv)
}
//recieve msg client ka code h

socket.on('message',(msg)=>{
appendMessage(msg,'incoming')
//to show new msg automatically
scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}