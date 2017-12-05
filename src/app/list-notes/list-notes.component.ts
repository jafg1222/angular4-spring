import { Component, OnInit } from '@angular/core';
import {consultingService} from "../services/http.service"
import {NoteItem} from '../class/notes-item';
import { Observable } from "rxjs/Rx"

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {
  Notes :NoteItem[] = []


  constructor(private note:consultingService) {}
  
  ngOnInit() {    
  this.note.getAllNotes().subscribe(data => {
    this.Notes = data;                            
    console.log(this.Notes)
}); 



  
   
  }  

  delete(note:NoteItem): void{
    console.log(note.id);
    this.note.deletedNotes(note.id).then(()=>{
      console.log(note);
      console.log(this.Notes);
      this.Notes = this.Notes.filter(h => h !== note);
    });
  }

}
