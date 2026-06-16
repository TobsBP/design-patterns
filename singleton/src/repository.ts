import database from '../lib/db'

// contrato que o Service depende — não da implementação concreta
export interface IRepository {
  getUsers(): Promise<any>
  createUser(): Promise<any>
}

export class Repository implements IRepository {
  // reutiliza a conexão singleton do Database
  async getUsers() {
    return database.getClient().from("users").select("*")
  }

  async createUser() {
    return database.getClient().from("users").insert("user")
  }
}
