import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currentUser: User | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

}
