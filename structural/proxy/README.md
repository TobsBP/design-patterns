# Proxy

O Proxy é um padrão estrutural que coloca um substituto na frente de outro objeto para **controlar o acesso** a ele. O proxy implementa a mesma interface do objeto real, então o cliente não percebe a diferença — mas o proxy pode adiar a criação, guardar resultados, checar permissão ou registrar log antes de repassar a chamada.

---

## Como funciona

```
Cliente ──► IReportService ──► CachedReportProxy ──► ReportService (caro)
                                    ├── cache por mês
                                    └── só instancia o serviço na 1ª chamada
```

| Parte | Responsabilidade |
|---|---|
| **Interface** (`IReportService`) | Contrato que proxy e serviço real compartilham |
| **Serviço real** (`ReportService`) | Faz o trabalho caro de verdade |
| **Proxy** (`CachedReportProxy`) | Adia a criação do serviço e devolve do cache quando o mês já foi processado |
| **Cliente** (`index.ts`) | Depende só da interface — não sabe se fala com o proxy ou com o serviço |

---

## Como usar

```typescript
import { CachedReportProxy } from './CachedReportProxy';

const reports = new CachedReportProxy();

reports.generate('2026-01'); // processa (caro)
reports.generate('2026-01'); // cache hit — não toca no serviço real
```

---

## Variações comuns

| Tipo | Para que serve |
|---|---|
| **Virtual** | Adia a criação de um objeto pesado até o primeiro uso (é o caso deste exemplo) |
| **Cache** | Guarda o resultado de chamadas repetidas (também usado aqui) |
| **Proteção** | Só repassa a chamada se o usuário tiver permissão |
| **Log / auditoria** | Registra cada acesso antes de delegar |
| **Remoto** | Esconde que o objeto real está em outra máquina |

---

## Benefícios

- **Transparência** — o cliente não muda: mesma interface, mesma chamada
- **Controle sem tocar no serviço real** — cache, permissão e log entram sem alterar o objeto original
- **Open/Closed** — dá para adicionar um novo proxy sem mexer no código existente

## Malefícios

- **Mais uma camada** — mais classes e um salto extra em cada chamada
- **Resposta atrasada** — a criação preguiçosa empurra o custo para o primeiro acesso, que pode cair num momento ruim
- **Cache desatualizado** — se o dado por trás muda, o proxy precisa saber invalidar

---

## Quando usar

| Use Proxy | Não use Proxy |
|---|---|
| Criar o objeto real é caro e nem sempre é necessário | O objeto é barato de criar e usar |
| As mesmas chamadas se repetem com o mesmo resultado | Cada chamada tem resultado diferente |
| É preciso checar permissão ou logar todo acesso | O controle já está dentro do próprio serviço |

---

## Proxy x Adapter x Facade

- O [Adapter](../adapter/) **traduz** uma interface em outra.
- O [Facade](../facade/) **simplifica** um conjunto de subsistemas atrás de uma interface nova.
- O Proxy **mantém a mesma interface** do objeto real e só controla o acesso a ele.

---

## Estrutura dos arquivos

```
structural/proxy/src/
  IReportService.ts          ← interface compartilhada
  ReportService.ts           ← serviço real (caro)
  CachedReportProxy.ts       ← proxy (lazy + cache)
  index.ts                   ← exemplo de uso
  CachedReportProxy.test.ts  ← checa a criação preguiçosa e o cache
```

---

## Referência

[Refactoring Guru — Proxy](https://refactoring.guru/pt-br/design-patterns/proxy)
