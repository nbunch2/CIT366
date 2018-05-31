import { Component, OnInit } from '@angular/core';
import {Contact} from "./contacts.model";

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
displayList= false;
selectedContact: Contact;
  constructor() { }

  ngOnInit() {
  }

  toggleList() {
    this.displayList = !this.displayList;
  }

}
