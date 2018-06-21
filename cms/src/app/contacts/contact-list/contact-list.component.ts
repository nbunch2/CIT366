import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact} from '../contacts.model';
import {ContactService} from "../contact.service";
import {Document} from "../../documents/document.model";
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];


  constructor(private contactService: ContactService) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit() {
    this.contactService.contactChangedEvent
      .subscribe(
        (contact: Contact[]) => {
          this.contacts = contact;
        }
      );
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

}


//new Contact('1', 'Bro.Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
//new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/employee/barzeer.jpg', null)

