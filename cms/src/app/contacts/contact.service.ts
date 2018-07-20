import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contacts.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Document} from "../documents/document.model";
import { Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable()
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  currentContact: Contact;
  maxContactId : number;



  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
    //this.currentContact = this.contacts[2];
    //this.maxContactId=this.getMaxId();
    this.getContacts();
  }

  getContacts(): Contact[]{
    if (this.contacts.length > 0) {
      return this.contacts.slice();
    }

    this.http.get('https://jacksonrkjcms-e69ca.firebaseio.com/contacts.json ')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts = this.contacts.sort(this.compareNames)
          this.contactListChangedEvent.next(this.contacts.slice())
          return this.contacts.slice();
        },
        (error: any) => {
          console.log("Http Error: " + error.msgText);
        });
  }

  compareNames(contacta: Contact, contactsb: Contact) {
    const contactsA = contacta.name.toUpperCase();
    const contactsB = contactsb.name.toUpperCase();
    if (contactsA < contactsB) {
      return -1;
    }
    if (contactsA > contactsB) {
      return 1;
    }
    else {
      return 0;
    }

  }

  storeContacts(){
    const contacts = JSON.stringify(this.contacts)
    const header = new HttpHeaders({
      'Content-type': 'application/json'
    })
    return this.http.put( 'https://jacksonrkjcms-e69ca.firebaseio.com/contacts.json'
      , contacts
      , {headers: header})
      .subscribe( () => this.contactListChangedEvent.next(this.contacts.slice()));
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
    this.storeContacts();
    //this.contactListChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {

      let contactID: number = parseInt(contact.id);

      if (contactID > maxId){
        maxId = contactID;
      }
    }


    return maxId;
  }

  addContact(newContact: Contact){
    if (!newContact){
      return;
    }
    else{
      this.maxContactId++;
      newContact.id = String(this.maxContactId);
      this.contacts.push(newContact);
      //this.contactListChangedEvent.next(this.contacts.slice());
      this.storeContacts();

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
    this.contacts[pos] = newContact;
    this.storeContacts();
   // this.contactListChangedEvent.next(this.contacts.slice());
  }



}
