# Composite

O Composite é um padrão estrutural que organiza objetos numa **árvore** e faz com que o item individual e o grupo respondam à mesma interface. O cliente chama `totalInCents()` sem perguntar se está falando com um produto ou com um kit de produtos.

---

## Como funciona

```
        ICartItem
        ├── ProductItem  (folha: só sabe o próprio preço)
        └── Bundle       (composto: contém outros ICartItem)
                └── ICartItem ──► pode ser folha ou outro Bundle
```

| Parte | Responsabilidade |
|---|---|
| **Componente** (`ICartItem`) | Contrato comum: `name`, `totalInCents` e `print` |
| **Folha** (`ProductItem`) | Um produto; não contém ninguém |
| **Composto** (`Bundle`) | Guarda filhos, delega o cálculo para eles e aplica o próprio desconto |
| **Cliente** (`index.ts`) | Monta a árvore e chama um método só, na raiz |

---

## Como usar

```typescript
import { Bundle } from './Bundle';
import { ProductItem } from './ProductItem';

const cart = new Bundle('Carrinho')
  .add(
    new Bundle('Kit Setup Gamer', 10)
      .add(new ProductItem('Teclado Mecânico', 35000))
      .add(new Bundle('Combo Áudio', 5).add(new ProductItem('Headset', 20000))),
  )
  .add(new ProductItem('Mousepad', 4000, 2));

cart.totalInCents(); // a soma desce a árvore inteira, com os descontos de cada nível
```

Adicionar um nível novo — um kit dentro do kit — não muda uma linha do código que usa o carrinho.

---

## Benefícios

- **Cliente simples** — um `if` a menos para cada tipo de item; folha e grupo são a mesma coisa
- **Árvore de profundidade livre** — kits dentro de kits saem de graça pela recursão
- **Aberto/fechado** — um tipo novo de folha entra sem tocar no composto

## Malefícios

- **Interface no mínimo denominador comum** — `add` e `remove` não fazem sentido na folha; ou ficam só no composto (e o cliente volta a precisar do tipo) ou sujam a interface
- **Difícil restringir a árvore** — se certos filhos não podem entrar em certos pais, a checagem vira código em tempo de execução
- **Esconde o custo** — uma chamada na raiz pode percorrer milhares de nós

---

## Quando usar

| Use Composite | Não use Composite |
|---|---|
| Os dados têm forma de árvore (categorias, kits, menus, pastas) | A estrutura é uma lista plana |
| O cliente precisa tratar item e grupo da mesma forma | Item e grupo têm operações realmente diferentes |
| A profundidade varia ou pode crescer | Existe exatamente um nível de agrupamento |

---

## Composite x Decorator

Os dois montam objetos que embrulham outros objetos com a mesma interface. O Composite embrulha **vários filhos para somar um resultado**; o [Decorator](../decorator/) embrulha **um só, para acrescentar comportamento**. Um é sobre estrutura, o outro é sobre responsabilidade.

---

## Estrutura dos arquivos

```
structural/composite/src/
  ICartItem.ts     ← componente (contrato comum de folha e composto)
  ProductItem.ts   ← folha (um produto)
  Bundle.ts        ← composto (kit que contém outros itens)
  index.ts         ← exemplo de uso (carrinho com kit dentro de kit)
  Bundle.test.ts   ← checagem de que o total percorre a árvore
```

---

## Referência

[Refactoring Guru — Composite](https://refactoring.guru/pt-br/design-patterns/composite)
