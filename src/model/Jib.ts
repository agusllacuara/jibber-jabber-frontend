export class Jib {
  /**
   *
   * @param id
   * @param user -> number -> later will change to User when implemented, userId
   * @param content -> string -> displayable text
   * @param media -> base64String
   * @param likes -> number -> user list -> users that liked the jib [userId]
   * @param reposts -> number -> user list -> users that reJibbed the jib [userId]
   * @param thread
   * @param date
   */
  constructor(
    public id: number,
    public user: string,
    public content: string,
    public likes: string[],
    public reposts: string[],
    public thread: Jib[],
    public date: string,
    public media?: string,
  ) {
  }
}
