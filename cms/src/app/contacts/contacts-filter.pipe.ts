import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "./contacts.model";


@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  //transform(contacts: any, [term]: any) {
  transform(contacts: Contact[], [term]: any) {
    let filteredContacts: Contact[] = [];
    filteredContacts = contacts.filter(
      (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
    );
    if (filteredContacts.length < 1 ){
      return contacts;
    }
    return filteredContacts;
  }

  }


