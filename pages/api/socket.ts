import { Server } from "Socket.IO";

const SocketHandler = (req:any, res:any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('input-change', msg => {
        io.emit('update-input', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
