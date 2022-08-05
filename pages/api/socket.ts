import { Server } from "Socket.IO";
let users = new Set()

const SocketHandler = (req:any, res:any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {

      socket.on('add-user', (user)=>{users.add(user)})

      socket.on('delete-user', (user)=>{users.delete(user)})
      
      socket.on('send-msg', async  (msg) => {
        const message = await JSON.parse(msg)
        if (users.has(message.user.id))  io.emit('got-msg', {message: message.message, author: message.user.login});

        await fetch(`${process.env.SERVER_URL}/api/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: msg,
        })
      })
    })
  }
  res.end()
}

export default SocketHandler
