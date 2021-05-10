import {Component, Input, OnInit} from '@angular/core';
import {Jib} from "../../../model/Jib";

@Component({
  selector: 'app-jib',
  templateUrl: './jib.component.html',
  styleUrls: ['./jib.component.scss']
})
export class JibComponent implements OnInit {

  @Input() jib: Jib | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
