import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../contacts/contacts.model";
import { Message } from '../message.model';
import {ContactService} from "../../contacts/contact.service";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "";
  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    let message: Message = this.messageService.getMessage(this.message.sender);
    this.messageSender = message.subject
  }

}
