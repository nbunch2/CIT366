import {EventEmitter, Injectable} from '@angular/core';
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Document} from "./document.model";


@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
  getDocuments(): Document[]{
    return this.documents.slice();
  }


  getDocument(id: string) : Document{
    for (let Document of this.documents){
      if(Document.id = id) {
        return Document;
      }
      else{
        return null;
      }

    }
  }
}
