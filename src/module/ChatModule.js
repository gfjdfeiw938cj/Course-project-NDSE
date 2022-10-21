import { ChatModel } from '../model/Chat.js';
import { MessageModel } from '../model/Message.js';
import { EventEmitter } from 'events';

class SendMessage extends EventEmitter {
  execute(fn) {
    this.on('send-message', (data) => {
      fn(data);
    });
  }
}

const sendMessageEvent = new SendMessage();

export class Chat {
  async find(users) {
    try {
      const chat = await ChatModel.findOne({
        $or: [
          { users: [users.idAuthor, users.idReceiver] },
          { users: [users.idReceiver, users.idAuthor] },
        ],
      });
      return chat;
    } catch (e) {
      console.log(e);
    }
  }

  async findById(id) {
    return await ChatModel.findById(id);
  }

  async sendMessage(data) {
    try {
        console.log('data', data);
      const chat = await ChatModel.findOne({
        $or: [
          { users: [data.idAuthor, data.idReceiver] },
          { users: [data.idReceiver, data.idAuthor] },
        ],
      });

      if (!chat) {
        const newChat = new ChatModel({
          users: [data.idAuthor, data.idReceiver],
          createdAt: Date.now(),
        });

        await newChat.save();
      }

      const message = new MessageModel({
        author: data.author,
        sentAt: Date.now(),
        text: data.text,
      });

      const updatedChat = await ChatModel.findOneAndUpdate({
        $or: [
          { users: [data.idAuthor, data.idReceiver] },
          { users: [data.idReceiver, data.idAuthor] },
        ],
        $push:{
            messages: message
        }
      });

      sendMessageEvent.emit('send-message', {
        chatId: updatedChat._id,
        message: message,
      });

      return message;
    } catch (e) {
      console.log(e);
    }
  }

  subscribe(cb) {
    sendMessageEvent.execute(cb);
  }

  async getHistory(id) {
    try {
      const chat = await ChatModel.findById(id);

      return chat.messages;
    } catch (e) {
      console.log(e);
    }
  }
}
