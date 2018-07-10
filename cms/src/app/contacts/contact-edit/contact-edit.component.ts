import { Component, OnInit } from '@angular/core';
import { Contact} from "../contacts.model";
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Document} from "../../documents/document.model";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  oldContact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;
  invalidGroupContact: boolean;


  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.oldContact = this.contactService.getContact(this.id);
          if (!this.id) {
            this.editMode = false;
          }
          else if (!this.oldContact) {

            return;
          }
          else {
            this.editMode = true;
            this.contact = JSON.parse(JSON.stringify(this.oldContact));
          }

          if (this.contact.group) {
            this.groupContacts = JSON.parse(JSON.stringify(this.oldContact.group));
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact("", value.name, value.email, value.phone, value.image, null);
    newContact.group = this.groupContacts;
    if (this.editMode) {
      newContact.id = this.oldContact.id;
      this.contactService.updateContact(this.oldContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    //this.editMode = false;
    //form.reset();
    this.router.navigate(['contact']);
  }

  onCancel() {
    this.router.navigate(['contact']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    console.log("newContact = " + JSON.stringify(newContact))
    console.log("this.contact = " + JSON.stringify(this.contact))

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true
      }
    }
    return false;
  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;

    console.log("selectedContact = " + JSON.stringify(selectedContact))

    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if(this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if (idx < 0 || idx >= this.groupContacts.length)
      return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}
