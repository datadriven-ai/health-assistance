import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {DragDropZone} from "./drag-drop.directive";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-drag-drop-zone',
  standalone: true,
  imports: [MaterialModule, DragDropZone, CommonModule],
  templateUrl: './drag-drop-zone.component.html',
  styleUrl: './drag-drop-zone.component.css'
})
export class DragDropZoneComponent implements OnInit{
  @Output() fileAdded = new EventEmitter<File>();
  @ViewChild('fileInput') input: ElementRef | undefined;
  @Input() file: File | undefined;
  @Input() zoneText = "Clicca quì per caricare un documento <br> oppurre trascinalo con il mouse";

  ngOnInit() {
  }

  uploadClickFile(event): void {
    this.file = event.files.item(0);
    this.fileAdded.emit(this.file);
  }
  uploadFile(event: any): void {
    this.file = event.item(0);
    this.fileAdded.emit(this.file);
  }
}
