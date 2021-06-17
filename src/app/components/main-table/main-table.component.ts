import {Component, Input, OnInit} from '@angular/core';
import {Jib} from "../../../model/Jib";
import {JibService} from "../../../services/jib.service";
import {User} from "../../../model/User";

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  @Input() user: User | undefined;
  jibs: Jib[] = [];
  isSelf: boolean = false;

  constructor(private jibService: JibService) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.user) {
      this.isSelf = false;
      this.subscribeObservers();
      await this.jibService.getAllJibs();
    } else {
      this.isSelf = true;
      this.jibService.getUserJibs(this.user)
        .then((res) => {
          this.jibs = res;
        })
        .catch(e => {
          console.log(e)
        });
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
}
