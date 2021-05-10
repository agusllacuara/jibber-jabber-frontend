import { Component, OnInit } from '@angular/core';
import {Jib} from "../../../model/Jib";
import {JibService} from "../../../services/jib.service";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  jibs: Jib[] = [];

  constructor(private jibService: JibService) { }

  ngOnInit(): void {
    this.jibs = this.jibService.getAllJibs();
  }

}
