import { Injectable, EventEmitter } from '@angular/core';
import { Message} from "./message.model";
import {MOCKMESSAGES} from "./MOCKMESSAGES";



@Injectable()
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
    return this.messages.slice();
  }


  getMessage(id: string) : Message{
    for (let Message of this.messages){
      if(Message.id = id) {
        return Message;
      }
      else{
        return null;
      }

    }
  }

  addMessage(message: Message) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.messages.push(...message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

}
