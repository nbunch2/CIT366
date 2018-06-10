import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "./documents.service";

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documentService.documentSelectedEvent
      .subscribe(
        (document: Document) => {
          this.selectedDocument = document;
        }
      );
  }

}
