import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteItem } from "../class/notes-item";
import { consultingService } from "../services/http.service";


@Component({
  selector: 'app-ag-notes',
  templateUrl: './ag-notes.component.html',
  styleUrls: ['./ag-notes.component.css'],
})
export class AgNotesComponent implements OnInit {

  nForm:FormGroup;
  post:any;
  notes:NoteItem[] = [];
  note:NoteItem[];
  titleAlert:string = 'Please enter the title';
  show:boolean =  true;
  show2:boolean = false;



  constructor(private fb:FormBuilder, private noteService:consultingService ) {

    this.nForm = fb.group({
      'title': [null,Validators.required],
      'bodyNote': [null,Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(400)])]      
    });
   }

  ngOnInit() {        
    this.noteService.getAllNotes().subscribe(data => {
      this.notes = data;                            
      console.log(this.notes)
  });
}

  addPost(post){
    let newNote = {'title':post.title,'body':post.bodyNote};
    console.log(JSON.stringify(newNote));
    
    this.noteService.postNotes(JSON.stringify(newNote))
    .then(
      (res)=>this.noteService.getAllNotes()
            .subscribe(
                notas =>  this.notes = notas))
    .catch((err)=>{console.log(err)});
    
        
    this.nForm.reset();
  }

  select(id:any){
    this.noteService.getOneNote(id).subscribe(data => {      
      this.note = data;                            
      this.show=false;
      this.show2=true;
      console.log(this.note)
  });    
    
  }

  back(){
    this.show=true;
    this.show2=false;
  }

}
