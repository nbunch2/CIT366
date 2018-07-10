import {EventEmitter, Injectable, } from '@angular/core';
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Document} from "./document.model";
import { Subject } from 'rxjs/internal/Subject';
import { Http, Response } from '@angular/http';


@Injectable()
export class DocumentsService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[];
  maxDocumentId : number;


  constructor(private http: Http, documentService: DocumentsService) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  //storeRecipes() {
    //return this.http.put('https://ng-recipe-book.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  //}

/*
  initDocuments(){
    this.http.get('https://nrccms-9f9e2.firebaseio.com/documents.json')
      .map(
        (response: Response) => {
          const documents: Document[] = response.json();
          for (let document of documents) {
            if (!document['name']) {
              document['name'] = [];
            }
          }
          return documents;
        }
      )
      .subscribe(
        (documents: Document[] =>{
          this.documentService.
        })
      )
  }*/

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
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }
}

/*saveContacts(){
  const strContacts = JSON.stringify(this.contacts);
  const headers = new HttpHeaders( (
    'Content-type'
  ))
}*/
