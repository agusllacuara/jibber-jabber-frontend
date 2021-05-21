import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Jib} from "../../../model/Jib";

@Component({
  selector: 'app-jib',
  templateUrl: './jib.component.html',
  styleUrls: ['./jib.component.scss']
})
export class JibComponent implements OnInit, AfterViewInit {

  @Input() jib: Jib | undefined;
  mobile: boolean = false;

  constructor() {
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
    const [day, time] = datetime.split('T');
    const [year, month, date] = day.split('-');
    const [useTime, deleteTime] = time.split('.')
    const [hour, minute, seconds] = useTime.split(':');
    return date + '/' + month + '/' + year + ' - ' + hour + ':' + minute + ':' + seconds;
  }

  setFiles(elementId: string, base64: string, type: 'video' | 'image') {
    console.log(elementId)
    if (type === 'image') {
      document.getElementById(elementId)?.setAttribute('src', 'data:image/jpeg;base64,' + base64);
    }
    if (type === 'video') {
      document.getElementById(elementId)?.setAttribute('src', 'data:video/mp4;base64,' + base64);
    }
  }

}
