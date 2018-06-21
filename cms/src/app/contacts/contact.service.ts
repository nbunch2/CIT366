import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contacts.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Document} from "../documents/document.model";


@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  currentContact: Contact;



  constructor() {
    this.contacts = MOCKCONTACTS;
    this.currentContact = this.contacts[2];
  }

  getContacts(): Contact[]{
    return this.contacts.slice();
  }


  getContact(id: string) : Contact{
    for (let Contact of this.contacts){
      if(Contact.id === id) {
        return Contact;
      }


    }
  }

  deleteContact(contact:Contact){
    if (contact === null){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0 ){
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }




}
