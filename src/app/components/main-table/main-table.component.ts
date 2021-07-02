import {Component, Input, OnInit} from '@angular/core';
import {Jib} from "../../../model/Jib";
import {JibService} from "../../../services/jib.service";
import {User} from "../../../model/User";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  user: User | undefined;
  @Input() set _user(user: User | undefined) {
    this.user = user;
    this.update();
  };

  jibs: Jib[] = [];
  isSelf: boolean = false;

  constructor(private jibService: JibService, private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.user) {
      this.isSelf = false;
      this.subscribeObservers();
      await this.jibService.getAllJibs();
    } else {
     this.update()
    }
  }

  private subscribeObservers() {
    this.jibService.allJibsObservable.subscribe((allJibs => {
      this.jibs = allJibs;
    }));
  }

  async deletedJib(jib: number) {
    this.jibs.filter(x => x.id = jib);
    if (this.user) await this.jibService.getUserJibs(this.user)
  }

  private update() {
    if (this.user){
      this.isSelf = this.authService.currentUser!.id == this.user.id;
      this.jibService.getUserJibs(this.user)
        .then((res) => {
          this.jibs = res;
        })
        .catch(e => {
          console.log(e)
        });
    }
  }
}
