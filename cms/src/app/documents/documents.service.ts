import {EventEmitter, Injectable, } from '@angular/core';
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Document} from "./document.model";
import { Subject } from 'rxjs/internal/Subject';




@Injectable()
export class DocumentsService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[];
  maxDocumentId : number;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  getDocuments(): Document[]{
    return this.documents.slice();
  }


  getDocument(id: string) : Document{
    for (let Document of this.documents){
      if(Document.id === id) {
        return Document;

      }
    }
  }

  deleteDocument(document:Document){
    if (document === null){
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0 ){
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {

      let documentID: number = parseInt('document.id');

      if (documentID < maxId){
        maxId = documentID;
      }
      return maxId;

    }
  }

  addDocument(newDocument: Document){
    if (!newDocument){
      return;
    }
    else{
      this.maxDocumentId++;
      newDocument.id = String(this.maxDocumentId);
      this.documents.push(newDocument);
      this.documentListChangedEvent.next(this.documents.slice());

    }
  }

  updateDocument( originalDocument: Document, newDocument: Document){
    if(!originalDocument || !newDocument){
      return
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0 ){
      return;
    }
    document[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
