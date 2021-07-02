export class Jib {
  /**
   *
   * @param id
   * @param username
   * @param userId
   * @param content -> string -> displayable text
   * @param media -> base64String
   * @param likes -> number -> user list -> users that liked the jib [userId]
   * @param reposts -> number -> user list -> users that reJibbed the jib [userId]
   * @param thread
   * @param date
   */
  constructor(
    public id: number,
    public username: string,
    public userId: number,
    public content: string,
    public likes: string[],
    public reposts: string[],
    public thread: Jib[],
    public date: string,
    public media?: string,
  ) {
  }
}
