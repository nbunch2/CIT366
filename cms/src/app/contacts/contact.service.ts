import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contacts.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";


@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();


  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[]{
    return this.contacts.slice();
  }


  getContact(id: string) : Contact{
    for (let Contact of this.contacts){
      if(Contact.id = id) {
        return Contact;
      }
      else{
        return null;
      }

    }
  }


}
