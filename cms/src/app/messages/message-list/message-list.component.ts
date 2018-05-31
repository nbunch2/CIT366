import { Component, OnInit } from '@angular/core';
import {Contact} from "../../contacts/contacts.model";
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1432, 'John Doe', 'Loving Class', 'I thought class was Supes fun today wowza' ),
    new Message(4352, "Steve Johnson", "Assignment 3?", "When is assignment 3 due? I'm so confused"),
    new Message(8694, 'Bro. Jackson', 'Assignment 3', 'Steve, its due on saturday'),
    new Message(9477, 'Mark Smith', 'Meeting', 'Can I meet with you sometimes to talk about assignment 3?')
  ]
  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
