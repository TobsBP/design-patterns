# Builder

O Builder é um padrão criacional que permite construir objetos complexos passo a passo. Em vez de um construtor com dezenas de parâmetros, você chama apenas os métodos que precisa — na ordem que quiser.

---

## Como funciona

O padrão é composto por quatro partes:

```
Director
  └── usa ──► IOrderBuilder (interface)
                   └── implementado por ──► OrderBuilder
                                               └── produz ──► Order
```

| Parte | Responsabilidade |
|---|---|
| **Produto** (`Order`) | O objeto complexo sendo construído |
| **Interface** (`IOrderBuilder`) | Contrato com todos os passos de construção |
| **Builder** (`OrderBuilder`) | Implementa os passos, acumula o estado interno |
| **Director** (`OrderDirector`) | Orquestra os passos em sequências conhecidas (presets) |

### Fluxo interno

1. O `OrderBuilder` começa com um `Order` vazio
2. Cada método de configuração altera o `Order` interno e retorna `this` (method chaining)
3. `build()` retorna o objeto pronto e chama `reset()` internamente, deixando o builder limpo para o próximo uso

---

## Como usar

### Com o Director (presets prontos)

Use quando o tipo de objeto já é conhecido e recorrente.

```typescript
import { OrderBuilder } from './OrderBuilder';
import { OrderDirector } from './OrderDirector';

const builder = new OrderBuilder();
const director = new OrderDirector(builder);

const order = director.buildPremiumOrder('customer-123');
console.log(order.total); // já vem com desconto de 10%
```

### Sem o Director (configuração manual)

Use quando a combinação é única ou definida em tempo de execução.

```typescript
const order = builder
  .setCustomer('customer-789')
  .addItem('prod-004', 'Monitor 4K', 1, 1200)
  .setShippingAddress('Rua XV, 200', 'Florianópolis', 'SC', '88010-000')
  .setPaymentMethod('boleto')
  .applyDiscount(5)
  .addNotes('Entregar após 18h')
  .build();
```

### Reutilizando o builder

`build()` já chama `reset()` internamente, então o mesmo builder pode ser usado para múltiplos objetos em sequência:

```typescript
const order1 = builder.setCustomer('A').addItem(...).build();
const order2 = builder.setCustomer('B').addItem(...).build(); // builder estava limpo
```

---

## Benefícios

- **Sem construtores monstros** — elimina construtores com 8+ parâmetros onde a maioria é opcional ou `undefined`
- **Leitura fluida** — o encadeamento de métodos documenta a intenção: `builder.setCustomer().addItem().applyDiscount().build()`
- **Construção incremental** — você pode montar o objeto em diferentes pontos do código antes de chamar `build()`
- **Reutilização** — o mesmo builder produz variações do objeto sem duplicar lógica
- **Testabilidade** — o Director depende da interface, não da implementação concreta, facilitando mocks

---

## Malefícios

- **Mais arquivos** — para objetos simples, o padrão adiciona complexidade desnecessária (interface + builder + director)
- **Estado mutável interno** — o builder acumula estado; se `build()` não for chamado, o estado vaza para o próximo uso (mitigado pelo `reset()`)
- **Sincronização da interface** — ao adicionar um campo ao produto, você precisa atualizar a interface, o builder e possivelmente o director

---

## Quando usar

| Use Builder | Não use Builder |
|---|---|
| Objeto tem muitos campos opcionais | Objeto tem 2-3 campos simples |
| Existem combinações recorrentes de configuração | Cada instância é criada da mesma forma |
| A construção tem etapas com ordem ou validação | Um construtor padrão já resolve |
| Você precisa de representações diferentes do mesmo objeto | |

---

## Estrutura dos arquivos

```
creational/builder/src/
  Order.ts          ← modelos de domínio (Order, OrderItem, ShippingAddress)
  IOrderBuilder.ts  ← interface com os passos de construção
  OrderBuilder.ts   ← implementação concreta do builder
  OrderDirector.ts  ← presets de montagem conhecidos
  index.ts          ← exemplos de uso
```

---

## Referência

[Refactoring Guru — Builder](https://refactoring.guru/pt-br/design-patterns/builder)
