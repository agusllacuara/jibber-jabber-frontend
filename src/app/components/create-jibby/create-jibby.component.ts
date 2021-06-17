import { Component, OnInit } from '@angular/core';
import {JibService} from "../../../services/jib.service";

@Component({
  selector: 'app-create-jibby',
  templateUrl: './create-jibby.component.html',
  styleUrls: ['./create-jibby.component.scss']
})
export class CreateJibbyComponent implements OnInit {

  content: string = '';

  constructor(private jibService: JibService) { }

  ngOnInit(): void {
  }

  publish() {
    if (this.content.length > 0){
      this.jibService.publish(this.content)
    }
  }
}
