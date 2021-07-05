export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public hasUnreadMessages?: boolean) {
  }
}

export class UserProfile extends User {
  constructor(
    public id: number,
    public username: string,
    public email: string,) {
    super(id, username, email);
  }
}
