import { Component, OnInit } from '@angular/core';
import {Contact} from "./contacts.model";
import {ContactService} from "./contact.service";

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
displayList= false;
selectedContact: Contact;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => {
          this.selectedContact = contact;
        }
      );
  }

  toggleList() {
    this.displayList = !this.displayList;
  }

}
