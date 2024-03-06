export default class ClientWithEmailAlreadyExistsError extends Error {
  constructor() {
    super('Esse e-mail já foi resgistrado!');
  }
}