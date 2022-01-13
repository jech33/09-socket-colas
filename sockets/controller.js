const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();



const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimoTicket());
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets);
    
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets);
        callback( siguiente );
        
        // TODO: Notificar que hay un nuevo ticket que asignar
        
    })

    socket.on('atender-ticket', ( {escritorio}, callback ) => {
        
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        // TODO: Notificar cambio en los ultimos4
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        socket.emit('tickets-pendientes', ticketControl.tickets);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay mas tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
        
    })
    
}



module.exports = {
    socketController
}

