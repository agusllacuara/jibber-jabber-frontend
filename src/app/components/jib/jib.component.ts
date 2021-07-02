import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Jib} from "../../../model/Jib";
import {JibService} from "../../../services/jib.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-jib',
  templateUrl: './jib.component.html',
  styleUrls: ['./jib.component.scss']
})
export class JibComponent implements OnInit, AfterViewInit {

  @Input() jib: Jib | undefined;
  @Input() isSelf: boolean | undefined;
  mobile: boolean = false;
  @Output() deletedSelf: EventEmitter<number> = new EventEmitter<number>();

  constructor(private jibService: JibService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    if (window.innerWidth < 700) this.mobile = true;
  }

  ngAfterViewInit(): void {
    if (this.jib && this.jib.media) {
      this.setFiles('image-' + this.jib.id, this.jib.media, 'image')
    }
  }

  getTimeForTime(datetime: string) {
    try {
      const [day, time] = datetime.split('T');
      const [year, month, date] = day.split('-');
      const [useTime, deleteTime] = time.split('.')
      const [hour, minute, seconds] = useTime.split(':');
      return date + '/' + month + '/' + year + ' - ' + hour + ':' + minute + ':' + seconds;
    } catch (e) {
      return ''
    }
  }

  setFiles(elementId: string, base64: string, type: 'video' | 'image') {
    if (type === 'image') {
      document.getElementById(elementId)?.setAttribute('src', 'data:image/jpeg;base64,' + base64);
    }
    if (type === 'video') {
      document.getElementById(elementId)?.setAttribute('src', 'data:video/mp4;base64,' + base64);
    }
  }

  like(jib: Jib) {
    this.jibService.like(jib);
    jib.likes.push('user')
  }

  async delete(jib: Jib) {
    this.jibService.delete(jib)
      .then((id) => {
        this.deletedSelf.emit(id);
      })
      .catch(e => {
        console.log(e);
        this.notificationService.notify('Could not delete jibby! Try again later.')
      });
  }
}
