export default class ExpressError extends Error {
  constructor(private status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}
