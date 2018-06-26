import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contacts.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Document} from "../documents/document.model";
import { Subject} from "rxjs/internal/Subject";


@Injectable()
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  currentContact: Contact;
  maxContactId : number;



  constructor() {
    this.contacts = MOCKCONTACTS;
    this.currentContact = this.contacts[2];
    this.maxContactId=this.getMaxId();
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
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {

      let contactID: number = parseInt('contact.id');

      if (contactID < maxId){
        maxId = contactID;
      }
      return maxId;

    }
  }

  addContact(newContact: Contact){
    if (!newContact){
      return;
    }
    else{
      this.maxContactId++;
      newContact.id = String(this.maxContactId);
      this.contacts.push(newContact);
      this.contactListChangedEvent.next(this.contacts.slice());

    }
  }

  updateContact( originalContact: Contact, newContact: Contact){
    if(!originalContact || !newContact){
      return
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0 ){
      return;
    }
    document[pos] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }



}
