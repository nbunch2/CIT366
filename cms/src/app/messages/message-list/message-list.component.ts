import { Component, OnInit } from '@angular/core';
import {Contact} from "../../contacts/contacts.model";
import { Message } from '../message.model';
import {MessagesService} from "../messages.service";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  constructor( private messagesService: MessagesService) {
    this.messages = messagesService.getMessages();
  }

  ngOnInit() {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
