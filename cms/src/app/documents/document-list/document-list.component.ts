import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Document} from "../document.model";
import {Contact} from "../../contacts/contacts.model";
import {DocumentsService} from "../documents.service";
import {Params} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  private subscription: Subscription;




  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {

    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }




}
