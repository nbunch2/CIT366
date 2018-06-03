import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Document} from "../document.model";
import {Contact} from "../../contacts/contacts.model";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() SelectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'Test Doc', 'This is the Description', 'test.com', null ),
    new Document(2, 'Lesson 4 Assignment', 'This is an assignment that has instructions for lessons 4', 'test2.com', null),
    new Document(3, 'Lesson 5 Assignment', 'This is an assignment that has instructions for lessons 5', 'test2.com', null),
    new Document(4, 'Lesson 6 Assignment', 'This is an assignment that has instructions for lessons 6', 'test2.com', null)
  ];



  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.SelectedDocumentEvent.emit(document);
  }

}
