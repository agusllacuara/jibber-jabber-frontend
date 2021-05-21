import {Component, Inject, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-drawer-user-data',
  templateUrl: './drawer-user-data.component.html',
  styleUrls: ['./drawer-user-data.component.scss']
})
export class DrawerUserDataComponent implements OnInit {

  constructor(public dialog: MatDialog, private userService: UserService, private authService: AuthService) {
  }

  @Input() user: User | undefined = undefined;

  ngOnInit(): void {
  }

  openModal(type: 'username' | 'password' | 'email'){
    if (this.user) {
      const data = new SettingsData(type, this.user);
      const dialogRef = this.dialog.open(SettingsDialog, {
        width: '400px',
        data: data
      });
      dialogRef.afterClosed().subscribe((newUser: User) => {
        if (type == 'username') this.userService.modifyUsername(newUser.username);
        if (type == 'password') this.userService.modifyPassword(newUser.id.toString());
        if (type == 'email') this.userService.modifyEmail(newUser.email);
      });
    }
  }

  logout() {
    this.authService.logout()
  }
}

class SettingsData {
  public modifyMeUser: User = new User(1,'','');
  constructor(public readonly currentSetting: 'username' | 'password' | 'email', public readonly user: User) {
  }
}

@Component({
  selector: 'setting-dialog',
  templateUrl: 'setting-dialog.html',
})
export class SettingsDialog {

  constructor(
    public dialogRef: MatDialogRef<SettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SettingsData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
