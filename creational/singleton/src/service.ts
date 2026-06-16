import { IRepository } from "./repository";

export class Service {
  // depende da interface, não da implementação — permite trocar o repository sem alterar o Service
  constructor(private readonly repository: IRepository) {}

  async getUsers() {
    const response = await this.repository.getUsers()

    if (!response) {
      throw Error("No response")
    }

    return response
  }
}
