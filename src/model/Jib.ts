export class Jib{
  /**
   *
   * @param creator -> string -> later will change to User when implemented
   * @param content -> string -> displayable text
   * @param media -> base64String
   * @param likes -> string -> user list -> users that liked the jib
   * @param reJib -> string -> user list -> users that reJibbed the jib
   * @param thread
   */
  constructor(public creator: string,
              public content: string,
              public likes: string[],
              public reJib: string[],
              public thread: Jib[],
              public media?: string,
  ) {
  }
}
