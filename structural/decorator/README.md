# Decorator

O Decorator é um padrão estrutural que acrescenta comportamento a um objeto **embrulhando-o** em outro que tem a mesma interface. Em vez de uma subclasse para cada combinação de recursos, as camadas se empilham em runtime.

---

## Como funciona

```
INotificationChannel
   ├── EmailChannel              (componente concreto: envia de verdade)
   └── ChannelDecorator          (base: guarda o objeto embrulhado)
         ├── SignedChannel       (muda a mensagem)
         ├── RetryChannel        (muda quando a chamada acontece)
         └── AuditChannel        (acrescenta um efeito em volta)

assinatura( auditoria( retry( email ) ) )
```

| Parte | Responsabilidade |
|---|---|
| **Componente** (`INotificationChannel`) | Contrato único: `send(to, message)` |
| **Componente concreto** (`EmailChannel`) | Faz o trabalho real |
| **Decorador base** (`ChannelDecorator`) | Implementa a interface e repassa para o embrulhado |
| **Decoradores** (`SignedChannel`, `RetryChannel`, `AuditChannel`) | Cada um acrescenta uma coisa antes ou depois de repassar |

---

## Como usar

```typescript
import { AuditChannel } from './AuditChannel';
import { EmailChannel } from './EmailChannel';
import { RetryChannel } from './RetryChannel';
import { SignedChannel } from './SignedChannel';

const channel = new SignedChannel(new AuditChannel(new RetryChannel(new EmailChannel())));
channel.send('cliente@exemplo.com', 'Pedido confirmado.');
```

**A ordem é o comportamento.** Com a auditoria por dentro da assinatura, ela registra a mensagem que realmente saiu; por fora, registraria o texto sem assinar. Trocar a ordem é reescrever a regra sem tocar em nenhuma classe.

---

## Benefícios

- **Combinações sem explosão de classes** — três decoradores dão sete combinações, sem `EmailComRetryEAuditoria`
- **Montado em runtime** — a pilha pode depender de config, do ambiente ou do plano do cliente
- **Responsabilidade única** — cada camada resolve um problema e é testável sozinha

## Malefícios

- **Pilha difícil de ler** — no stack trace e no debug, um envio vira várias camadas
- **Remover uma camada do meio é chato** — a pilha é montada de fora para dentro
- **Ordem silenciosamente errada** — como o exemplo acima mostra, o mesmo conjunto de camadas em outra ordem faz outra coisa

---

## Quando usar

| Use Decorator | Não use Decorator |
|---|---|
| Os comportamentos se combinam livremente | Existe uma combinação só, fixa |
| Não dá para (ou não vale) mexer na classe original | A classe é sua e o comportamento é dela |
| O extra é opcional e escolhido em runtime | O extra vale sempre, para todo mundo |

---

## Decorator x Proxy

Os dois embrulham um objeto mantendo a interface. O [Proxy](../proxy/) **controla o acesso** ao objeto real — pode nem chamá-lo (cache, permissão, criação preguiçosa) — e normalmente ele mesmo decide quem é o embrulhado. O Decorator **acrescenta comportamento** e sempre repassa; quem monta a pilha é o cliente.

---

## Estrutura dos arquivos

```
structural/decorator/src/
  INotificationChannel.ts  ← componente (contrato comum)
  EmailChannel.ts          ← componente concreto (envia; falha sob demanda)
  ChannelDecorator.ts      ← decorador base (guarda e repassa)
  SignedChannel.ts         ← decorador (assina a mensagem)
  RetryChannel.ts          ← decorador (repete em caso de falha)
  AuditChannel.ts          ← decorador (registra o envio)
  index.ts                 ← exemplo de uso (canal cru x canal decorado)
  Channel.test.ts          ← checagem do empilhamento e do retry
```

---

## Referência

[Refactoring Guru — Decorator](https://refactoring.guru/pt-br/design-patterns/decorator)
