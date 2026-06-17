# Factory

O Factory é um padrão criacional que centraliza a criação de objetos. Em vez de instanciar classes diretamente com `new`, o cliente pede à factory o objeto que precisa — sem saber qual classe concreta será usada.

---

## Como funciona

```
NotifierFactory.create(type)
  └── retorna ──► INotifier
                    ├── EmailNotifier
                    ├── SMSNotifier
                    └── PushNotifier
```

| Parte | Responsabilidade |
|---|---|
| **Interface** (`INotifier`) | Contrato que todos os produtos devem cumprir |
| **Produtos concretos** (`EmailNotifier`, `SMSNotifier`, `PushNotifier`) | Implementações específicas |
| **Factory** (`NotifierFactory`) | Decide qual produto instanciar com base no tipo recebido |

---

## Como usar

```typescript
import { NotifierFactory } from './NotifierFactory';

const notifier = NotifierFactory.create('email');
notifier.send('usuario@exemplo.com', 'Seu pedido foi confirmado!');
```

O cliente só conhece `INotifier`. Adicionar um novo canal (ex: `WhatsApp`) exige apenas criar `WhatsAppNotifier` e adicionar um `case` na factory — nenhum código cliente muda.

---

## Benefícios

- **Desacoplamento** — o cliente depende da interface, não das classes concretas
- **Ponto único de criação** — lógica de instanciação fica em um só lugar
- **Fácil de estender** — novo produto = nova classe + um `case` na factory

## Malefícios

- **Crescimento da factory** — muitos tipos podem tornar o `switch` longo; nesse caso considere um registry
- **Indireção** — para objetos simples e estáveis, o padrão adiciona complexidade desnecessária

---

## Quando usar

| Use Factory | Não use Factory |
|---|---|
| O tipo do objeto é determinado em runtime | O tipo é sempre o mesmo |
| Você quer isolar o cliente das classes concretas | Há apenas uma implementação possível |
| A lógica de criação pode mudar ou crescer | A instanciação é trivial (`new Foo()`) |

---

## Estrutura dos arquivos

```
creational/factory/src/
  INotifier.ts        ← interface (contrato do produto)
  EmailNotifier.ts    ← produto concreto
  SMSNotifier.ts      ← produto concreto
  PushNotifier.ts     ← produto concreto
  NotifierFactory.ts  ← factory (cria o produto certo para cada tipo)
  index.ts            ← exemplos de uso
```

---

## Referência

[Refactoring Guru — Factory Method](https://refactoring.guru/pt-br/design-patterns/factory-method)
