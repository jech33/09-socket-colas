// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')



const socket = io();




socket.on('connect', () => {
    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    btnCrear.disabled = true;

});

socket.on('ultimo-ticket', (payload) => {
        lblNuevoTicket.innerText = payload;

    });


btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});

console.log('Nuevo Ticket HTML');