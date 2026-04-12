# Question And Answer

1. Best practices untuk connect dan menyimpan chat di database:
   Client → (Socket) → Server → (DB)
   ↓
   broadcast (Socket)

   a. User kirim pesan:
   `javascript
       socket.emit("sendMessage", message);
       `
