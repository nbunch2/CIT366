import { Component, OnInit } from '@angular/core';
import {ContactService} from "../contacts/contact.service";

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

}
