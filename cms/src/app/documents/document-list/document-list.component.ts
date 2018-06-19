import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Document} from "../document.model";
import {Contact} from "../../contacts/contacts.model";
import {DocumentsService} from "../documents.service";
import {Params} from "@angular/router";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];



  constructor(private documentService: DocumentsService) {
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangedEvent
      .subscribe(
        (document: Document[]) => {
          this.documents = document;
        }
      );
  }



}
