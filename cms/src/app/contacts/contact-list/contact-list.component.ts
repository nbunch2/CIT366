import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact} from '../contacts.model';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() SelectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(1, 'Bro.Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    new Contact(2, 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/employee/barzeer.jpg', null)
  ];
  //Create an event emmiter for the child
  //@Output() sendMessageEvent = new EventEmitter()

  //creat an element refence to the messageElement defined in the components HTML
  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: Contact) {
    this.SelectedContactEvent.emit(contact);
  }

}
