import { Component, OnInit, OnDestroy } from '@angular/core';
import {Contact} from "../../contacts/contacts.model";
import { Message } from '../message.model';
import {MessagesService} from "../messages.service";
import {ContactService} from "../../contacts/contact.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  messages: Message[] = [];
  messageSubscription: Subscription;
  constructor( private messagesService: MessagesService) {
   this.messages = messagesService.getMessages();
  }

  ngOnInit() {
    this.messagesService.messageListChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );

  }

  //onAddMessage(message: Message){
   // this.messages.push(message);
  //}


  /*

  this.messagesService.getMessages();
    this.contactService.getContacts();

    this.messageSubscription = this.messagesService.messageChangeEvent.subscribe(
      ( messages: Message[]) => {
        this.messages = messages;
      }
    )

    ngOnDestroy() {
      this.messageSubscription.unsubscribe();
    }*/

}
