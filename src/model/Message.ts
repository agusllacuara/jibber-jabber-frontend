export class ChatMessageDTO {
  /**
   * @param id -> chat id
   * @param sender -> User id
   * @param receiver -> User id
   * @param content
   */
  constructor(
    public id: number,
    public sender: number,
    public receiver: number,
    public content: string) {
  }
}

export class UserWithUsername {
  constructor(
    public id: number,
    public name: string
  ) {
  }
}

export class Chat {
  constructor(
    public chatId: number,
    public user1: UserWithUsername,
    public user2: UserWithUsername,
    public messages: ChatMessageDTO[]) {
  }
}
