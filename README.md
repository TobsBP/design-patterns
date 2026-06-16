# Design Patterns

Repositório de estudos dos padrões de projeto (Design Patterns) baseado no catálogo do [Refactoring Guru](https://refactoring.guru/pt-br/design-patterns/catalog).

Os padrões estão organizados em três categorias: **Criacionais**, **Estruturais** e **Comportamentais**.

---

## Padrões Criacionais

Lidam com mecanismos de criação de objetos, aumentando a flexibilidade e o reuso do código existente.

- [x] [Singleton](./creational/singleton/) — Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.
- [ ] Factory Method — Define uma interface para criar objetos, mas deixa as subclasses decidirem quais classes instanciar.
- [ ] Abstract Factory — Permite produzir famílias de objetos relacionados sem especificar suas classes concretas.
- [ ] Builder — Permite construir objetos complexos passo a passo.
- [ ] Prototype — Permite copiar objetos existentes sem tornar o código dependente de suas classes.

---

## Padrões Estruturais

Explicam como montar objetos e classes em estruturas maiores, mantendo essas estruturas flexíveis e eficientes.

- [ ] Adapter — Permite que objetos com interfaces incompatíveis colaborem entre si.
- [ ] Bridge — Divide uma classe grande ou um conjunto de classes intimamente relacionadas em duas hierarquias separadas.
- [ ] Composite — Permite compor objetos em estruturas de árvore e trabalhar com essas estruturas como se fossem objetos individuais.
- [ ] Decorator — Permite adicionar novos comportamentos a objetos colocando-os dentro de invólucros que contêm esses comportamentos.
- [ ] Facade — Fornece uma interface simplificada para uma biblioteca, um framework ou qualquer conjunto complexo de classes.
- [ ] Flyweight — Permite acomodar mais objetos na quantidade de RAM disponível ao compartilhar partes comuns do estado.
- [ ] Proxy — Fornece um substituto ou espaço reservado para outro objeto, controlando o acesso a ele.

---

## Padrões Comportamentais

Cuidam da comunicação eficiente e da atribuição de responsabilidades entre objetos.

- [ ] Chain of Responsibility — Permite passar pedidos por uma corrente de handlers, onde cada handler decide processar ou passar adiante.
- [ ] Command — Transforma pedidos em objetos autônomos, permitindo parametrizar, enfileirar ou desfazer operações.
- [ ] Iterator — Permite percorrer elementos de uma coleção sem expor sua representação subjacente.
- [ ] Mediator — Reduz dependências caóticas entre objetos, restringindo comunicações diretas e forçando colaboração via mediador.
- [ ] Memento — Permite salvar e restaurar o estado anterior de um objeto sem revelar detalhes de sua implementação.
- [ ] Observer — Define um mecanismo de assinatura para notificar múltiplos objetos sobre eventos que aconteçam com o objeto observado.
- [ ] State — Permite que um objeto altere seu comportamento quando seu estado interno muda.
- [ ] Strategy — Define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis.
- [ ] Template Method — Define o esqueleto de um algoritmo na superclasse, permitindo que subclasses sobrescrevam etapas específicas.
- [ ] Visitor — Permite separar algoritmos dos objetos nos quais eles operam.

---

## Tecnologias

- **Node.js**
- **TypeScript**
- **Supabase** (utilizado no exemplo do Singleton)

## Referência

- [Refactoring Guru — Catálogo de Design Patterns](https://refactoring.guru/pt-br/design-patterns/catalog)
