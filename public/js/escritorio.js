// Regerencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {

    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none';


const socket = io();




socket.on('connect', () => {
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    btnAtender.disabled = true;

});

socket.on('ultimo-ticket', (payload) => {
    // lblNuevoTicket.innerText = payload;

});

socket.on('tickets-pendientes', (payload) => {
    lblPendientes.innerText = payload.length;
    if (payload.length === 0) {
        lblPendientes.style.display = 'none';
        divAlerta.style.display = '';
    } else {
        lblPendientes.style.display = ''
        lblPendientes.innerText = payload.length;
        divAlerta.style.display = 'none';
    }
});


btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, (payload) => {
        const { ok, ticket, msg } = payload;

        if (!ok) {
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`;

    });

    socket.on('tickets-pendientes', (payload) => {
        if (payload.length === 0) {
            lblPendientes.style.display = 'none';
            divAlerta.style.display = '';
        } else {
            lblPendientes.style.display = ''
            lblPendientes.innerText = payload.length;
            divAlerta.style.display = 'none';
        }
    });


});

console.log('Nuevo Ticket HTML');