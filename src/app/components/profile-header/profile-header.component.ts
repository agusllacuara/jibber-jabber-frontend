import {Component, Input, OnInit} from '@angular/core';
import {User, UserProfile} from "../../../model/User";

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() user: UserProfile | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}

