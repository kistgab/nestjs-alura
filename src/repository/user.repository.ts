export class UserRepository {
  private users = [];

  async save(user) {
    this.users.push(user);
  }

  async listAll() {
    return this.users;
  }
}
