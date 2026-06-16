# Singleton

Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.

Neste projeto o padrão é aplicado na camada de banco de dados (`Database`), onde uma única conexão com o Supabase é criada e reutilizada por toda a aplicação.

## Vantagens

- **Economia de recurso** — conexões com banco são caras. Criar uma só vez e reutilizar evita overhead desnecessário.
- **Estado consistente** — todos os módulos compartilham a mesma instância, evitando estados divergentes.
- **Controle de acesso** — o construtor privado impede instanciação acidental fora da classe.
- **Lazy initialization** — a instância só é criada quando é usada pela primeira vez.

## Desvantagens

- **Dificulta testes** — uma instância global é difícil de substituir por um mock. É necessário usar injeção de dependência em cima do Singleton para contornar isso (como foi feito no `Service` com `IRepository`).
- **Acoplamento global** — qualquer módulo pode acessar a instância diretamente, o que pode esconder dependências implícitas.
- **Problemas em ambiente concorrente** — em linguagens com threads reais, a criação da instância precisa de sincronização. Em Node.js isso não é um problema por causa do event loop single-thread.
- **Viola o Single Responsibility Principle** — a classe acumula a responsabilidade de gerenciar seu próprio ciclo de vida além da lógica de negócio.

## Quando usar

Use Singleton para recursos que têm custo alto de inicialização e que devem ser compartilhados: conexões de banco, clientes HTTP, loggers, configurações de ambiente.

Evite para classes de negócio (`Service`, `Repository`) — elas não têm estado e o ciclo de vida delas deve ser gerenciado pelo container ou pelo consumidor.
