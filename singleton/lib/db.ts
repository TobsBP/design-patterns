import { createClient, SupabaseClient } from "@supabase/supabase-js";

class Database {
  // única instância compartilhada por toda a aplicação
  private static instance: Database
  private db: SupabaseClient

  // impede instanciação externa
  private constructor() {
    this.db = createClient("url", "key")
  }

  // cria a instância apenas na primeira chamada (lazy initialization)
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  getClient(): SupabaseClient {
    return this.db
  }
}

// exporta a instância única — módulos que importarem isso compartilham a mesma conexão
export default Database.getInstance()
