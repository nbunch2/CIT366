import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../documents.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  document: Document;
  oldDocument: Document;
  id: string;
  editMode: boolean = false;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.oldDocument = this.documentService.getDocument(this.id);
          if(!this.id) {
            this.editMode = false;
          }
          else if(!this.oldDocument){

            return;
          }
          else{
            this.editMode = true;
            this.document = JSON.parse(JSON.stringify(this.oldDocument));
          }

        }
      );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    //const id = this.documentService.getMaxId();
    const newDocument = new Document("", value.name, value.description, value.documentUrl, null);
    if (this.editMode) {
      this.documentService.updateDocument(this.oldDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    //this.editMode = false;
    //form.reset();
    this.router.navigate(['documents']);
  }

  onCancel(){
    this.router.navigate(['documents']);
  }
}
