import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Contact} from '../contacts.model';
import {ContactService} from "../contact.service";
import {Document} from "../../documents/document.model";
import {Subscription} from "rxjs/internal/Subscription";
import { ContactsFilterPipe} from "../contacts-filter.pipe";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  subscription: Subscription;
  term = '';

  onKeyPress(value: string){
    this.term = value;
  }

  constructor(private contactService: ContactService) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}


//new Contact('1', 'Bro.Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
//new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/employee/barzeer.jpg', null)

