import { Component, OnInit } from '@angular/core';
import { Contact} from "../contacts.model";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;

  constructor() { }

  ngOnInit() {
  }

}
