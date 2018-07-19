import { Injectable, EventEmitter } from '@angular/core';
import { Message } from "./message.model";
import {MOCKMESSAGES} from "./MOCKMESSAGES";
import {Document} from "../documents/document.model";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";
import {Contact} from "../contacts/contacts.model";


@Injectable()
export class MessagesService {
  messageListChangedEvent = new Subject<Message[]>();
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    //this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
    if (this.messages.length > 0) {
      return this.messages.slice();
    }

    this.http.get('https://jacksonrkjcms-e69ca.firebaseio.com/messages.json ')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages = this.messages.sort(this.compareNames)
          this.messageListChangedEvent.next(this.messages.slice())
          return this.messages.slice();
        },
        (error: any) => {
          console.log("Http Error: " + error.msgText);
        });
  }

  compareNames(messagea: Message, messageb: Message) {
    const messageA = messagea.subject.toUpperCase();
    const messageB = messageb.subject.toUpperCase();
    if (messageA < messageB) {
      return -1;
    }
    if (messageA > messageB) {
      return 1;
    }
    else {
      return 0;
    }

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

  storeMessages(){
    const messages = JSON.stringify(this.messages)
    const header = new HttpHeaders({
      'Content-type': 'application/json'
    })
    return this.http.put( 'https://jacksonrkjcms-e69ca.firebaseio.com/messages.json'
      , messages
      , {headers: header})
      .subscribe( () => this.messageListChangedEvent.next(this.messages.slice()));
  }


  addMessage(message: Message) {
    if (!message === null)
      return;
    this.messages.push(message);
    this.storeMessages();
    //this.messageChangeEvent.emit(this.messages.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let message of this.messages) {

      let messageID: number = parseInt(message.id);

      if (messageID > maxId){
        maxId = messageID;
      }
    }


    return maxId;
  }



}
