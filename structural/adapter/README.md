# Adapter

O Adapter é um padrão estrutural que permite que objetos com interfaces incompatíveis trabalhem juntos. Ele funciona como um tradutor: envolve o objeto incompatível e expõe a interface que o cliente já espera.

---

## Como funciona

```
Cliente ──► IPaymentProcessor
              ├── StripeProcessor      (já compatível)
              └── PaypalAdapter ──► LegacyPaypalGateway (API incompatível)
```

| Parte | Responsabilidade |
|---|---|
| **Interface alvo** (`IPaymentProcessor`) | Contrato que o cliente conhece |
| **Adaptado** (`LegacyPaypalGateway`) | Serviço externo com assinatura diferente, que não podemos alterar |
| **Adapter** (`PaypalAdapter`) | Implementa a interface alvo e traduz a chamada para o adaptado |
| **Cliente** (`index.ts`) | Usa apenas `IPaymentProcessor`, sem saber quem está por trás |

---

## Como usar

```typescript
import { PaypalAdapter } from './PaypalAdapter';

const processor = new PaypalAdapter();
processor.pay(19990, 'BRL'); // [PayPal legado] Valor: 199.90 | Código da moeda: 986
```

O cliente chama `pay(centavos, 'BRL')`. O adapter converte centavos em string decimal e a sigla da moeda no código ISO numérico que o gateway legado exige.

---

## Benefícios

- **Reuso de código legado** — integra APIs que você não pode (ou não quer) modificar
- **Responsabilidade única** — a lógica de conversão fica isolada no adapter
- **Aberto/fechado** — novos serviços entram como novos adapters, sem tocar no cliente

## Malefícios

- **Mais uma camada** — aumenta o número de classes e a indireção
- **Pode virar muleta** — às vezes é mais simples corrigir a interface original do que adaptá-la

---

## Quando usar

| Use Adapter | Não use Adapter |
|---|---|
| Precisa integrar uma API externa/legada com assinatura diferente | Você controla o código e pode ajustar a interface |
| Quer reaproveitar uma classe existente sem alterá-la | A conversão é trivial e usada em um único lugar |
| Vários serviços diferentes devem ser tratados de forma uniforme | Existe apenas uma implementação e ela já é compatível |

---

## Estrutura dos arquivos

```
structural/adapter/src/
  IPaymentProcessor.ts    ← interface alvo (o que o cliente espera)
  StripeProcessor.ts      ← implementação já compatível
  LegacyPaypalGateway.ts  ← serviço externo incompatível (adaptado)
  PaypalAdapter.ts        ← adapter (traduz a chamada)
  index.ts                ← exemplo de uso (checkout)
  PaypalAdapter.test.ts   ← checagem da tradução feita pelo adapter
```

---

## Referência

[Refactoring Guru — Adapter](https://refactoring.guru/pt-br/design-patterns/adapter)
