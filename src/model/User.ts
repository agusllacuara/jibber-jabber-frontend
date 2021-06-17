export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string) {
  }
}

export class UserProfile extends User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public jibCount: number,
    public followersCount: number,
    public followingCount: number) {
    super(id, username, email);
  }
}
