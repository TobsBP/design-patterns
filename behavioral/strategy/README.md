# Strategy

O Strategy é um padrão comportamental que coloca cada algoritmo em uma classe própria e permite trocá-los em runtime. É o substituto direto do `switch` de regra de negócio: em vez de o contexto conhecer todas as variações, ele só conhece a interface e recebe a que deve usar.

---

## Como funciona

```
ShippingCalculator (contexto)
        │ usa
        ▼
   IShippingStrategy
        ├── StandardShipping  (PAC)
        ├── ExpressShipping   (Sedex)
        └── PickupShipping    (retirada na loja)
```

| Parte | Responsabilidade |
|---|---|
| **Interface** (`IShippingStrategy`) | Contrato comum: `calculate` e `estimatedDays` |
| **Strategies concretas** (`StandardShipping`, `ExpressShipping`, `PickupShipping`) | Cada uma implementa um algoritmo de frete |
| **Contexto** (`ShippingCalculator`) | Sabe *quando* calcular, nunca *como*; delega para a strategy atual |
| **Cliente** (`index.ts`) | Escolhe a strategy e injeta no contexto |

---

## Como usar

```typescript
import { ShippingCalculator } from './ShippingCalculator';
import { ExpressShipping } from './ExpressShipping';

const calculator = new ShippingCalculator(new ExpressShipping());
calculator.quote({ weightInGrams: 800, distanceInKm: 420 });
// { method: 'Sedex', costInCents: 14680, days: 2 }

calculator.setStrategy(new StandardShipping()); // troca em runtime
```

Adicionar um novo método de envio (ex: `DroneShipping`) é criar uma classe — nenhuma linha do `ShippingCalculator` muda.

---

## Benefícios

- **Aberto/fechado** — novo algoritmo = nova classe, sem editar o contexto
- **Sem `switch` gigante** — cada regra fica isolada e testável sozinha
- **Troca em runtime** — o algoritmo pode depender da escolha do usuário, do plano, do A/B test

## Malefícios

- **Mais classes** — para duas variações simples e estáveis, um `if` resolve
- **O cliente precisa conhecer as strategies** — para escolher qual usar (uma [factory](../../creational/factory/) resolve isso)

---

## Quando usar

| Use Strategy | Não use Strategy |
|---|---|
| Existem várias formas de fazer a mesma coisa | Só existe um algoritmo e ele não muda |
| O algoritmo é escolhido em runtime | A escolha é fixa em tempo de compilação |
| Um `switch` de regra de negócio cresce a cada feature | São duas linhas de diferença entre os casos |

---

## Strategy x Factory

A [Factory](../../creational/factory/) decide **qual objeto criar**; o Strategy decide **qual algoritmo executar**. Combinam bem: a factory recebe `'sedex'` e devolve a strategy pronta para o contexto usar.

---

## Estrutura dos arquivos

```
behavioral/strategy/src/
  IShippingStrategy.ts       ← interface (contrato do algoritmo)
  StandardShipping.ts        ← strategy concreta (PAC)
  ExpressShipping.ts         ← strategy concreta (Sedex)
  PickupShipping.ts          ← strategy concreta (retirada)
  ShippingCalculator.ts      ← contexto (delega para a strategy atual)
  index.ts                   ← exemplo de uso (opções de frete no checkout)
  ShippingCalculator.test.ts ← checagem da troca de strategy
```

---

## Referência

[Refactoring Guru — Strategy](https://refactoring.guru/pt-br/design-patterns/strategy)
