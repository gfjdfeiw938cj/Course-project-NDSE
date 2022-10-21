import { Chat } from '../module/ChatModule.js';

const chatModule = new Chat();

export const initChat = function (io) {
  io.on('connection', (socket) => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);

    const { idAuthor } = socket.handshake.query;
    console.log(`Socket chat: ${idAuthor}`);
    socket.join(idAuthor);

    socket.on('get-history', async (msg) => {
      const data = JSON.parse(msg);
      let chatHistory;
      const users = {
        idAuthor: idAuthor,
        idReceiver: data.idReceiver
      }

      const connectChat = await chatModule.find(users);
      if (!connectChat) {
        chatHistory = {
          data: 'Такого чата не существует',
          status: 'error',
        };
      } else {
        chatHistory = await chatModule.getHistory(connectChat._id);
      }

      socket.to(idAuthor).emit('chat-history', chatHistory);
      socket.emit('chat-history', chatHistory);
    });

    socket.on('send-message', async (msg) => {
      let data = JSON.parse(msg);
      data.idAuthor = idAuthor;

      await chatModule.sendMessage(data);

      data.type = `id: ${idAuthor}`;

      socket.to(idAuthor).emit('new-message', data);
      socket.emit('new-message', data);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${id}`);
    });
  });
};
