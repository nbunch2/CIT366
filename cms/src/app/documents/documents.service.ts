import {EventEmitter, Injectable,} from '@angular/core';
import {MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Document} from "./document.model";
import {Subject} from 'rxjs/internal/Subject';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";


@Injectable()
export class DocumentsService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;


  constructor(private http: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId();
    this.getDocuments();
  }


  getDocuments(): Document[] {
    if (this.documents.length > 0) {
      return this.documents.slice();
    }

    this.http.get('https://jacksonrkjcms-e69ca.firebaseio.com/documents.json ')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents = this.documents.sort(this.compareNames)
          this.documentListChangedEvent.next(this.documents.slice())
          return this.documents.slice();
        },
        (error: any) => {
          console.log("Http Error: " + error.msgText);
        });

  }


  compareNames(documenta: Document, documentb: Document) {
    const documentA = documenta.name.toUpperCase();
    const documentB = documentb.name.toUpperCase();
    if (documentA < documentB) {
      return -1;
    }
    if (documentA > documentB) {
      return 1;
    }
    else {
      return 0;
    }

  }

  storeDocuments(){
    const documents = JSON.stringify(this.documents)
    const header = new HttpHeaders({
      'Content-type': 'application/json'
    })
    return this.http.put( 'https://jacksonrkjcms-e69ca.firebaseio.com/documents.json'
                    , documents
                      , {headers: header})
      .subscribe( () => this.documentListChangedEvent.next(this.documents.slice()));

  }

  getDocument(id: string): Document {
    for (let Document of this.documents) {
      if (Document.id === id) {
        return Document;

      }
    }
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
    //this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {

      let documentID: number = parseInt(document.id);

      if (documentID > maxId) {
        maxId = documentID;
      }
      return maxId;

    }
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    else {
      this.maxDocumentId++;
      newDocument.id = String(this.maxDocumentId);
      this.documents.push(newDocument);
      this.storeDocuments();
      //this.documentListChangedEvent.next(this.documents.slice());

    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
    //this.documentListChangedEvent.next(this.documents.slice());
  }
}

/*saveContacts(){
  const strContacts = JSON.stringify(this.contacts);
  const headers = new HttpHeaders( (
    'Content-type'
  ))
}*/

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
