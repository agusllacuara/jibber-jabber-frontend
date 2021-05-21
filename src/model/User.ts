export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string) {
    // La password se pasa por separado pero tiene que estar en la tabla
  }
}
