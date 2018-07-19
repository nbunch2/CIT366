import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService} from "../messages.service";
import { ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = "Nicole";

  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService : MessagesService, private contactService: ContactService) { }

  ngOnInit() {
  }

  onAddMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const currentContact: string = '1';
      //this.contactService.currentContact.id;
    const newMessage = new Message('', currentContact, subject, msgText);
    this.messageService.addMessage(newMessage);
    //this.addMessageEvent.emit(newMessage);

  }

  onClear(){
    const subject = "";
    const msgText= "";
  }

}
