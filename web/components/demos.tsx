"use client";

import { CartHandler } from "@repo/behavioral/chain-of-responsibility/src/CartHandler";
import { CreditHandler } from "@repo/behavioral/chain-of-responsibility/src/CreditHandler";
import { FraudHandler } from "@repo/behavioral/chain-of-responsibility/src/FraudHandler";
import { StockHandler } from "@repo/behavioral/chain-of-responsibility/src/StockHandler";
import { AddItemCommand } from "@repo/behavioral/command/src/AddItemCommand";
import { ApplyCouponCommand } from "@repo/behavioral/command/src/ApplyCouponCommand";
import { Cart } from "@repo/behavioral/command/src/Cart";
import { CommandBus } from "@repo/behavioral/command/src/CommandBus";
import { RemoveItemCommand } from "@repo/behavioral/command/src/RemoveItemCommand";
import { PagedCatalog } from "@repo/behavioral/iterator/src/PagedCatalog";
import { CheckoutMediator } from "@repo/behavioral/mediator/src/CheckoutMediator";
import { CouponField } from "@repo/behavioral/mediator/src/CouponField";
import { PlaceOrderButton } from "@repo/behavioral/mediator/src/PlaceOrderButton";
import type { ShippingMethod } from "@repo/behavioral/mediator/src/ShippingSelect";
import { ShippingSelect } from "@repo/behavioral/mediator/src/ShippingSelect";
import { TotalLabel } from "@repo/behavioral/mediator/src/TotalLabel";
import { History } from "@repo/behavioral/memento/src/History";
import { TextEditor } from "@repo/behavioral/memento/src/TextEditor";
import { AnalyticsObserver } from "@repo/behavioral/observer/src/AnalyticsObserver";
import { EmailObserver } from "@repo/behavioral/observer/src/EmailObserver";
import { InvoiceObserver } from "@repo/behavioral/observer/src/InvoiceObserver";
import { OrderService } from "@repo/behavioral/observer/src/OrderService";
import { ExpressShipping } from "@repo/behavioral/strategy/src/ExpressShipping";
import type { IShippingStrategy } from "@repo/behavioral/strategy/src/IShippingStrategy";
import { PickupShipping } from "@repo/behavioral/strategy/src/PickupShipping";
import { ShippingCalculator } from "@repo/behavioral/strategy/src/ShippingCalculator";
import { StandardShipping } from "@repo/behavioral/strategy/src/StandardShipping";
import { BrazilCheckoutFactory } from "@repo/creational/abstract-factory/src/BrazilCheckoutFactory";
import { Checkout } from "@repo/creational/abstract-factory/src/Checkout";
import { UsaCheckoutFactory } from "@repo/creational/abstract-factory/src/UsaCheckoutFactory";
import { OrderBuilder } from "@repo/creational/builder/src/OrderBuilder";
import { NotifierFactory, type NotifierType } from "@repo/creational/factory/src/NotifierFactory";
import { Product } from "@repo/creational/prototype/src/Product";
import { ProductRegistry } from "@repo/creational/prototype/src/ProductRegistry";
import type { IPaymentProcessor } from "@repo/structural/adapter/src/IPaymentProcessor";
import { PaypalAdapter } from "@repo/structural/adapter/src/PaypalAdapter";

import { StripeProcessor } from "@repo/structural/adapter/src/StripeProcessor";
import { CsvRenderer } from "@repo/structural/bridge/src/CsvRenderer";
import { InventoryReport } from "@repo/structural/bridge/src/InventoryReport";
import type { IReportRenderer } from "@repo/structural/bridge/src/IReportRenderer";
import { JsonRenderer } from "@repo/structural/bridge/src/JsonRenderer";
import { SalesReport } from "@repo/structural/bridge/src/SalesReport";
import { TableRenderer } from "@repo/structural/bridge/src/TableRenderer";
import { Bundle } from "@repo/structural/composite/src/Bundle";
import { ProductItem } from "@repo/structural/composite/src/ProductItem";
import { AuditChannel } from "@repo/structural/decorator/src/AuditChannel";
import { EmailChannel } from "@repo/structural/decorator/src/EmailChannel";
import type { INotificationChannel } from "@repo/structural/decorator/src/INotificationChannel";
import { RetryChannel } from "@repo/structural/decorator/src/RetryChannel";
import { SignedChannel } from "@repo/structural/decorator/src/SignedChannel";
import { OrderFacade } from "@repo/structural/facade/src/OrderFacade";
import { ProductTypeFactory } from "@repo/structural/flyweight/src/ProductTypeFactory";
import { Shipment } from "@repo/structural/flyweight/src/Shipment";
import { CachedReportProxy } from "@repo/structural/proxy/src/CachedReportProxy";
import { useMemo, useRef, useState } from "react";
import { Action, Choice, capture, Field, type Run, Stage, Toggle, useRun } from "./stage";

const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Mapa slug → demo. Um padrão sem entrada aqui simplesmente não mostra a seção. */
export const DEMOS: Record<string, () => React.ReactElement> = {
  strategy: StrategyDemo,
  observer: ObserverDemo,
  memento: MementoDemo,
  "chain-of-responsibility": ChainDemo,
  command: CommandDemo,
  iterator: IteratorDemo,
  mediator: MediatorDemo,
  factory: FactoryDemo,
  builder: BuilderDemo,
  singleton: SingletonDemo,
  "abstract-factory": AbstractFactoryDemo,
  prototype: PrototypeDemo,
  adapter: AdapterDemo,
  proxy: ProxyDemo,
  facade: FacadeDemo,
  composite: CompositeDemo,
  decorator: DecoratorDemo,
  bridge: BridgeDemo,
  flyweight: FlyweightDemo,
};

// ── Comportamentais ─────────────────────────────────────────────

const STRATEGIES: Record<string, () => IShippingStrategy> = {
  standard: () => new StandardShipping(),
  express: () => new ExpressShipping(),
  pickup: () => new PickupShipping(),
};

function StrategyDemo() {
  const [kind, setKind] = useState("express");
  const [weight, setWeight] = useState(800);
  const [distance, setDistance] = useState(420);

  const quote = useMemo(() => {
    const calculator = new ShippingCalculator(STRATEGIES[kind]());
    return calculator.quote({ weightInGrams: weight, distanceInKm: distance });
  }, [kind, weight, distance]);

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Strategy no contexto"
            value={kind}
            onChange={setKind}
            options={[
              { value: "standard", label: "PAC" },
              { value: "express", label: "Sedex" },
              { value: "pickup", label: "Retirada" },
            ]}
          />
          <Slider
            label="Peso"
            value={weight}
            onChange={setWeight}
            min={100}
            max={5000}
            step={100}
            unit="g"
          />
          <Slider
            label="Distância"
            value={distance}
            onChange={setDistance}
            min={5}
            max={3000}
            step={5}
            unit="km"
          />
        </>
      }
      run={{
        logs: [
          {
            kind: "log",
            text: `calculator.quote({ weightInGrams: ${weight}, distanceInKm: ${distance} })`,
          },
        ],
        result: `{ method: '${quote.method}', costInCents: ${quote.costInCents}, days: ${quote.days} }\n${money(quote.costInCents)} · entrega em ${quote.days} ${quote.days === 1 ? "dia" : "dias"}`,
      }}
    />
  );
}

function ObserverDemo() {
  const [run, setRun] = useRun();
  const [active, setActive] = useState({ email: true, invoice: true, analytics: true });

  const confirm = () =>
    setRun(
      capture(() => {
        const service = new OrderService();
        if (active.email) service.subscribe(new EmailObserver());
        if (active.invoice) service.subscribe(new InvoiceObserver());
        if (active.analytics) service.subscribe(new AnalyticsObserver());
        service.confirm({
          orderId: `ord-${Math.floor(Math.random() * 900 + 100)}`,
          customerId: "cus-42",
          amountInCents: 24900,
        });
      }),
    );

  return (
    <Stage
      controls={
        <>
          <Field label="Inscritos no OrderService">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Toggle
                label="EmailObserver"
                checked={active.email}
                onChange={(email) => setActive({ ...active, email })}
              />
              <Toggle
                label="InvoiceObserver"
                checked={active.invoice}
                onChange={(invoice) => setActive({ ...active, invoice })}
              />
              <Toggle
                label="AnalyticsObserver"
                checked={active.analytics}
                onChange={(analytics) => setActive({ ...active, analytics })}
              />
            </div>
          </Field>
          <Action onClick={confirm}>Confirmar pedido</Action>
        </>
      }
      run={run}
    />
  );
}

function MementoDemo() {
  // O editor e o histórico são os objetos do padrão; o estado do React guarda só o
  // que a tela mostra — mutar dentro do updater executaria duas vezes em dev.
  const objects = useRef(createEditor()).current;
  const [view, setView] = useState({ content: "", saves: 0 });

  const act = (fn: (editor: TextEditor, history: History) => void) => {
    const { editor, history } = objects;
    fn(editor, history);
    setView({ content: editor.read(), saves: history.size });
  };

  return (
    <Stage
      controls={
        <>
          <Field label="Editor">
            <div className="flex flex-wrap gap-1.5">
              {["Padrões ", "de projeto ", "em TypeScript"].map((word) => (
                <Action
                  key={word}
                  tone="ghost"
                  onClick={() =>
                    act((editor, history) => {
                      history.backup();
                      editor.type(word);
                    })
                  }
                >
                  digitar “{word.trim()}”
                </Action>
              ))}
            </div>
          </Field>
          <Field label="Histórico">
            <div className="flex gap-1.5">
              <Action onClick={() => act((_, history) => void history.undo())}>Desfazer</Action>
              <Action
                tone="ghost"
                onClick={() =>
                  act((editor, history) => {
                    history.backup();
                    editor.backspace(editor.read().length);
                  })
                }
              >
                Apagar tudo
              </Action>
            </div>
          </Field>
        </>
      }
      run={{
        logs: [{ kind: "log", text: `history.size → ${view.saves} snapshot(s) guardados` }],
        result: view.content ? `"${view.content}"` : '"" (editor vazio)',
      }}
    />
  );
}

function createEditor() {
  const editor = new TextEditor();
  return { editor, history: new History(editor) };
}

function ChainDemo() {
  const [run, setRun] = useRun();
  const [sku, setSku] = useState("livro-ddd");
  const [risk, setRisk] = useState(12);
  const [amount, setAmount] = useState(24900);
  const [empty, setEmpty] = useState(false);

  const checkout = () =>
    setRun(
      capture(() => {
        const chain = new CartHandler();
        chain.setNext(new StockHandler()).setNext(new FraudHandler()).setNext(new CreditHandler());

        const result = chain.handle({
          customerId: "cus-42",
          items: empty ? [] : [{ sku, quantity: 1 }],
          amountInCents: amount,
          riskScore: risk,
          creditLimitInCents: 500000,
        });

        return result.approved
          ? `aprovado por ${result.by}`
          : `rejeitado por ${result.by} — ${result.reason}`;
      }),
    );

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Produto"
            value={sku}
            onChange={setSku}
            options={[
              { value: "livro-ddd", label: "livro-ddd (3 em estoque)" },
              { value: "teclado-hhkb", label: "teclado-hhkb (esgotado)" },
            ]}
          />
          <Field label="Carrinho">
            <Toggle label="enviar vazio" checked={empty} onChange={setEmpty} />
          </Field>
          <Slider
            label="Risco"
            value={risk}
            onChange={setRisk}
            min={0}
            max={100}
            step={5}
            unit="/100"
          />
          <Slider
            label="Valor"
            value={amount}
            onChange={setAmount}
            min={10000}
            max={900000}
            step={10000}
            unit="centavos"
          />
          <Action onClick={checkout}>Enviar ao checkout</Action>
        </>
      }
      run={run}
    />
  );
}

const ITEMS = {
  livro: { sku: "livro-ddd", name: "Livro DDD", quantity: 1, unitPriceInCents: 12900 },
  mousepad: { sku: "mousepad", name: "Mousepad XL", quantity: 1, unitPriceInCents: 4000 },
};

function CommandDemo() {
  const objects = useRef({ cart: new Cart(), bus: new CommandBus() }).current;
  const [view, setView] = useState({ cart: objects.cart.describe(), log: [] as string[] });
  const [logs, setLogs] = useState<string[]>([]);

  const dispatch = (make: (cart: Cart) => Parameters<CommandBus["run"]>[0] | null) => {
    const run = capture(() => {
      const command = make(objects.cart);
      if (command) objects.bus.run(command);
    });
    setLogs((current) => [...current, ...run.logs.map((line) => line.text)].slice(-6));
    setView({ cart: objects.cart.describe(), log: objects.bus.log });
  };

  const undo = () => {
    const run = capture(() => {
      objects.bus.undo();
    });
    setLogs((current) => [...current, ...run.logs.map((line) => line.text)].slice(-6));
    setView({ cart: objects.cart.describe(), log: objects.bus.log });
  };

  return (
    <Stage
      controls={
        <>
          <Field label="Comandos">
            <div className="flex flex-wrap gap-1.5">
              <Action
                tone="ghost"
                onClick={() => dispatch((cart) => new AddItemCommand(cart, ITEMS.livro))}
              >
                adicionar livro
              </Action>
              <Action
                tone="ghost"
                onClick={() => dispatch((cart) => new AddItemCommand(cart, ITEMS.mousepad))}
              >
                adicionar mousepad
              </Action>
              <Action
                tone="ghost"
                onClick={() => dispatch((cart) => new ApplyCouponCommand(cart, 10))}
              >
                cupom de 10%
              </Action>
              <Action
                tone="ghost"
                onClick={() => dispatch((cart) => new RemoveItemCommand(cart, "livro-ddd", 1))}
              >
                remover livro
              </Action>
            </div>
          </Field>
          <Action onClick={undo}>Desfazer</Action>
        </>
      }
      run={{
        logs: logs.map((text) => ({ kind: "log" as const, text })),
        result: [
          `carrinho: ${view.cart}`,
          `histórico (${view.log.length}): ${view.log.join(" → ") || "vazio"}`,
        ].join("\n"),
      }}
    />
  );
}

const CATALOG_PRODUCTS = [
  { sku: "livro-ddd", name: "Livro DDD", priceInCents: 12900, inStock: true },
  { sku: "teclado-hhkb", name: "Teclado HHKB", priceInCents: 245000, inStock: false },
  { sku: "mousepad", name: "Mousepad XL", priceInCents: 4000, inStock: true },
  { sku: "headset", name: "Headset", priceInCents: 20000, inStock: false },
  { sku: "monitor-4k", name: "Monitor 4K", priceInCents: 180000, inStock: true },
];

function IteratorDemo() {
  const [run, setRun] = useRun();
  const [kind, setKind] = useState("all");
  const [limit, setLimit] = useState(5);

  const walk = () =>
    setRun(
      capture(() => {
        const catalog = new PagedCatalog(CATALOG_PRODUCTS);
        const iterator =
          kind === "all" ? catalog.createIterator() : catalog.createInStockIterator();

        const names: string[] = [];
        // O limite vem primeiro: hasNext() busca a página seguinte, e checá-lo
        // depois de completar a lista faria uma requisição desnecessária.
        while (names.length < limit && iterator.hasNext()) names.push(iterator.next().name);

        return [
          `produtos lidos: ${names.join(", ") || "nenhum"}`,
          `páginas buscadas: ${catalog.pageRequests} (de 3)`,
        ].join("\n");
      }),
    );

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Iterador"
            value={kind}
            onChange={setKind}
            options={[
              { value: "all", label: "PageIterator" },
              { value: "stock", label: "InStockIterator" },
            ]}
          />
          <Slider
            label="Parar depois de"
            value={limit}
            onChange={setLimit}
            min={1}
            max={5}
            step={1}
            unit="itens"
          />
          <Action onClick={walk}>Percorrer</Action>
        </>
      }
      run={run}
    />
  );
}

function MediatorDemo() {
  const form = useRef(
    new CheckoutMediator(
      25800,
      new CouponField(),
      new ShippingSelect(),
      new TotalLabel(),
      new PlaceOrderButton(),
    ),
  ).current;

  const [logs, setLogs] = useState<string[]>([]);
  const [, setTick] = useState(0);

  const act = (fn: () => void) => {
    const run = capture(fn);
    setLogs(run.logs.map((line) => line.text));
    setTick((n) => n + 1);
  };

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Cupom digitado"
            value={form.coupon.code || "none"}
            onChange={(code) => act(() => form.coupon.type(code === "none" ? "" : code))}
            options={[
              { value: "none", label: "nenhum" },
              { value: "BEMVINDO", label: "BEMVINDO (10%)" },
              { value: "FRETEGRATIS", label: "FRETEGRATIS" },
              { value: "NAOEXISTE", label: "NAOEXISTE" },
            ]}
          />
          <Choice
            label="Frete"
            value={form.shipping.method}
            onChange={(method) => act(() => form.shipping.choose(method as ShippingMethod))}
            options={[
              { value: "pac", label: "PAC" },
              { value: "sedex", label: "Sedex" },
              { value: "retirada", label: "Retirada" },
            ]}
          />
          <Action
            tone={form.button.enabled ? "primary" : "ghost"}
            onClick={() => act(() => form.button.click())}
          >
            {form.button.enabled ? "Finalizar pedido" : "Finalizar (desabilitado)"}
          </Action>
        </>
      }
      run={{
        logs: logs.map((text) => ({ kind: "log" as const, text })),
        result: [
          form.total.text || "aguardando",
          `botão: ${form.button.enabled ? "habilitado" : `desabilitado — ${form.button.reason}`}`,
        ].join("\n"),
      }}
    />
  );
}

// ── Criacionais ─────────────────────────────────────────────────

function FactoryDemo() {
  const [run, setRun] = useRun();
  const [type, setType] = useState<NotifierType>("email");

  const send = () =>
    setRun(
      capture(() => {
        const notifier = NotifierFactory.create(type);
        notifier.send("tobias@exemplo.com", "Seu pedido saiu para entrega.");
        return `NotifierFactory.create('${type}') → ${notifier.constructor.name}`;
      }),
    );

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Tipo pedido à factory"
            value={type}
            onChange={setType}
            options={[
              { value: "email", label: "email" },
              { value: "sms", label: "sms" },
              { value: "push", label: "push" },
            ]}
          />
          <Action onClick={send}>Enviar notificação</Action>
        </>
      }
      run={run}
    />
  );
}

function BuilderDemo() {
  const [gift, setGift] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [notes, setNotes] = useState(false);
  const [extraItem, setExtraItem] = useState(false);

  const order = useMemo(() => {
    const builder = new OrderBuilder()
      .setCustomer("cus-42")
      .addItem("prod-001", "Teclado Mecânico", 1, 350)
      .setShippingAddress("Av. Paulista, 1000", "São Paulo", "SP", "01310-100")
      .setPaymentMethod("pix");

    if (extraItem) builder.addItem("prod-002", "Mouse Gamer", 2, 150);
    if (discount) builder.applyDiscount(10);
    if (gift) builder.addGiftWrapping();
    if (notes) builder.addNotes("Parabéns pelo aniversário!");

    return builder.build();
  }, [gift, discount, notes, extraItem]);

  const chain = [
    ".setCustomer('cus-42')",
    ".addItem('prod-001', 'Teclado Mecânico', 1, 350)",
    extraItem && ".addItem('prod-002', 'Mouse Gamer', 2, 150)",
    ".setShippingAddress(…)",
    ".setPaymentMethod('pix')",
    discount && ".applyDiscount(10)",
    gift && ".addGiftWrapping()",
    notes && ".addNotes('Parabéns pelo aniversário!')",
    ".build()",
  ].filter(Boolean) as string[];

  return (
    <Stage
      controls={
        <Field label="Passos opcionais do builder">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Toggle label="segundo item" checked={extraItem} onChange={setExtraItem} />
            <Toggle label="desconto de 10%" checked={discount} onChange={setDiscount} />
            <Toggle label="embrulho para presente" checked={gift} onChange={setGift} />
            <Toggle label="observação" checked={notes} onChange={setNotes} />
          </div>
        </Field>
      }
      run={{
        logs: [
          { kind: "log", text: "new OrderBuilder()" },
          ...chain.map((text) => ({ kind: "log" as const, text: `  ${text}` })),
        ],
        result: [
          `itens: ${order.items.length}`,
          `subtotal: ${money(order.subtotal * 100)}`,
          `desconto: ${money(order.discount * 100)}`,
          `total: ${money(order.total * 100)}`,
          `presente: ${order.giftWrapping ? "sim" : "não"}`,
          order.notes ? `observação: ${order.notes}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      }}
    />
  );
}

/**
 * ponytail: espelho local de creational/singleton/lib/db.ts — o arquivo real
 * abre uma conexão Supabase, que não roda no navegador. A mecânica (construtor
 * privado + getInstance com cache estático) é idêntica.
 */
class Database {
  private static instance: Database;
  readonly id = `conn_${Math.random().toString(36).slice(2, 8)}`;
  private constructor() {
    console.log(`[Database] conexão aberta (${this.id})`);
  }
  static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }
}

function SingletonDemo() {
  const [run, setRun] = useState<Run | null>(null);
  const [calls, setCalls] = useState(0);

  const request = () => {
    setCalls((n) => n + 1);
    setRun(
      capture(() => {
        const db = Database.getInstance();
        return `Database.getInstance() → ${db.id}`;
      }),
    );
  };

  return (
    <Stage
      controls={
        <>
          <Action onClick={request}>Pedir a instância</Action>
          <Field label="Chamadas">
            <span className="font-mono text-sm text-fg">{calls}</span>
          </Field>
        </>
      }
      run={
        run && {
          ...run,
          logs: run.logs.length
            ? run.logs
            : [{ kind: "log", text: "instância já existia — nenhuma conexão nova foi aberta" }],
        }
      }
    />
  );
}

function AbstractFactoryDemo() {
  const [run, setRun] = useRun();
  const [country, setCountry] = useState("BR");

  const finish = () =>
    setRun(
      capture(() => {
        const factory = country === "BR" ? new BrazilCheckoutFactory() : new UsaCheckoutFactory();
        const summary = new Checkout(factory).finish("ord-901", 24900);
        return [
          `região: ${summary.region}`,
          `imposto: ${summary.currency} ${(summary.taxInCents / 100).toFixed(2)}`,
          `total: ${summary.currency} ${(summary.totalInCents / 100).toFixed(2)}`,
          `documento: ${summary.invoiceNumber}`,
        ].join("\n");
      }),
    );

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Fábrica injetada no Checkout"
            value={country}
            onChange={setCountry}
            options={[
              { value: "BR", label: "BrazilCheckoutFactory" },
              { value: "US", label: "UsaCheckoutFactory" },
            ]}
          />
          <Action onClick={finish}>Fechar pedido de 249,00</Action>
        </>
      }
      run={run}
    />
  );
}

function PrototypeDemo() {
  const registry = useRef(createRegistry()).current;
  const [copies, setCopies] = useState<string[]>([]);

  const spawn = (change: (product: Product) => void) => {
    const product = registry.spawn("camiseta");
    change(product);
    setCopies((current) => [...current, product.describe()]);
  };

  return (
    <Stage
      controls={
        <>
          <Field label="Criar variação a partir do protótipo">
            <div className="flex flex-wrap gap-1.5">
              <Action
                tone="ghost"
                onClick={() =>
                  spawn((product) => {
                    product.name = "Camiseta preta";
                    product.specs.set("cor", "preta");
                  })
                }
              >
                versão preta
              </Action>
              <Action
                tone="ghost"
                onClick={() =>
                  spawn((product) => {
                    product.name = "Camiseta estampada";
                    product.priceInCents = 9900;
                    product.tags.push("estampa");
                  })
                }
              >
                versão estampada
              </Action>
            </div>
          </Field>
          <Action onClick={() => setCopies([])}>Limpar</Action>
        </>
      }
      run={{
        logs: copies.map((text) => ({ kind: "log" as const, text })),
        result: `protótipo no registro: ${registry.spawn("camiseta").describe()}`,
      }}
    />
  );
}

function createRegistry() {
  const registry = new ProductRegistry();
  registry.register(
    "camiseta",
    new Product({
      name: "Camiseta básica",
      priceInCents: 7900,
      specs: new Map([
        ["tecido", "algodão penteado"],
        ["gramatura", "180g"],
      ]),
      tags: ["vestuario", "basico"],
    }),
  );
  return registry;
}

// ── Estruturais ─────────────────────────────────────────────────

function AdapterDemo() {
  const [run, setRun] = useRun();
  const [gateway, setGateway] = useState("paypal");
  const [currency, setCurrency] = useState("BRL");

  const pay = () =>
    setRun(
      capture(() => {
        const processor: IPaymentProcessor =
          gateway === "stripe" ? new StripeProcessor() : new PaypalAdapter();
        processor.pay(24900, currency);
        return `O cliente chamou pay(24900, '${currency}') sem saber qual gateway está por trás.`;
      }),
    );

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Implementação de IPaymentProcessor"
            value={gateway}
            onChange={setGateway}
            options={[
              { value: "stripe", label: "StripeProcessor" },
              { value: "paypal", label: "PaypalAdapter" },
            ]}
          />
          <Choice
            label="Moeda"
            value={currency}
            onChange={setCurrency}
            options={[
              { value: "BRL", label: "BRL" },
              { value: "USD", label: "USD" },
              { value: "JPY", label: "JPY" },
            ]}
          />
          <Action onClick={pay}>Cobrar R$ 249,00</Action>
        </>
      }
      run={run}
    />
  );
}

function ProxyDemo() {
  const [run, setRun] = useRun();
  const [proxy, setProxy] = useState(() => new CachedReportProxy());

  const generate = (month: string) => setRun(capture(() => proxy.generate(month)));

  return (
    <Stage
      controls={
        <>
          <Field label="Pedir relatório de">
            <div className="flex flex-wrap gap-1.5">
              {["2025-01", "2025-02", "2025-03"].map((month) => (
                <Action key={month} tone="ghost" onClick={() => generate(month)}>
                  {month}
                </Action>
              ))}
            </div>
          </Field>
          <Action
            onClick={() => {
              setProxy(new CachedReportProxy());
              setRun({
                logs: [
                  { kind: "log", text: "novo proxy — cache vazio e serviço ainda não criado" },
                ],
              });
            }}
          >
            Recomeçar
          </Action>
        </>
      }
      run={run}
    />
  );
}

function FacadeDemo() {
  const [run, setRun] = useRun();
  const [sku, setSku] = useState("livro-ddd");
  const [facade, setFacade] = useState(() => new OrderFacade());

  const place = () =>
    setRun(
      capture(() => {
        const tracking = facade.placeOrder({
          customerId: "cus-42",
          sku,
          quantity: 1,
          amountInCents: 24900,
          address: "Av. Paulista, 1000",
        });
        return `placeOrder(…) → ${tracking}`;
      }),
    );

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Produto"
            value={sku}
            onChange={setSku}
            options={[
              { value: "livro-ddd", label: "livro-ddd (3 em estoque)" },
              { value: "teclado-hhkb", label: "teclado-hhkb (esgotado)" },
            ]}
          />
          <Action onClick={place}>Fazer pedido</Action>
          <Action
            tone="ghost"
            onClick={() => {
              setFacade(new OrderFacade());
              setRun({ logs: [{ kind: "log", text: "estoque reposto" }] });
            }}
          >
            Repor estoque
          </Action>
        </>
      }
      run={run}
    />
  );
}

function CompositeDemo() {
  const [audio, setAudio] = useState(true);
  const [mousepads, setMousepads] = useState(2);
  const [discount, setDiscount] = useState(10);

  const run = useMemo(
    () =>
      capture(() => {
        const kit = new Bundle("Kit Setup Gamer", discount)
          .add(new ProductItem("Teclado Mecânico", 35000))
          .add(new ProductItem("Mouse Gamer", 15000));

        if (audio) {
          kit.add(
            new Bundle("Combo Áudio", 5)
              .add(new ProductItem("Headset", 20000))
              .add(new ProductItem("Suporte de headset", 6000)),
          );
        }

        const cart = new Bundle("Carrinho").add(kit);
        if (mousepads > 0) cart.add(new ProductItem("Mousepad", 4000, mousepads));

        cart.print();
        return `cart.totalInCents() → ${money(cart.totalInCents())}`;
      }),
    [audio, mousepads, discount],
  );

  return (
    <Stage
      controls={
        <>
          <Field label="Árvore do carrinho">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Toggle
                label="combo de áudio (kit dentro do kit)"
                checked={audio}
                onChange={setAudio}
              />
            </div>
          </Field>
          <Slider
            label="Mousepads"
            value={mousepads}
            onChange={setMousepads}
            min={0}
            max={5}
            step={1}
            unit="un"
          />
          <Slider
            label="Desconto do kit"
            value={discount}
            onChange={setDiscount}
            min={0}
            max={40}
            step={5}
            unit="%"
          />
        </>
      }
      run={run}
    />
  );
}

function DecoratorDemo() {
  const [run, setRun] = useRun();
  const [signed, setSigned] = useState(true);
  const [retry, setRetry] = useState(true);
  const [audit, setAudit] = useState(true);
  const [failures, setFailures] = useState(2);

  const send = () =>
    setRun(
      capture(() => {
        let channel: INotificationChannel = new EmailChannel(failures);
        const layers = ["EmailChannel"];

        if (retry) {
          channel = new RetryChannel(channel);
          layers.push("RetryChannel");
        }
        if (audit) {
          channel = new AuditChannel(channel);
          layers.push("AuditChannel");
        }
        if (signed) {
          channel = new SignedChannel(channel);
          layers.push("SignedChannel");
        }

        channel.send("cliente@exemplo.com", "Pedido confirmado.");
        return layers.reverse().join(" › ");
      }),
    );

  return (
    <Stage
      controls={
        <>
          <Field label="Camadas em volta do EmailChannel">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Toggle label="SignedChannel" checked={signed} onChange={setSigned} />
              <Toggle label="AuditChannel" checked={audit} onChange={setAudit} />
              <Toggle label="RetryChannel" checked={retry} onChange={setRetry} />
            </div>
          </Field>
          <Slider
            label="Falhas do SMTP"
            value={failures}
            onChange={setFailures}
            min={0}
            max={4}
            step={1}
            unit="x"
          />
          <Action onClick={send}>Enviar</Action>
        </>
      }
      run={run}
    />
  );
}

const SALES = [
  { month: "2025-01", orders: 128, revenueInCents: 4820000 },
  { month: "2025-02", orders: 96, revenueInCents: 3610000 },
];

const STOCK = [
  { sku: "livro-ddd", available: 3, reserved: 1 },
  { sku: "teclado-hhkb", available: 0, reserved: 0 },
];

const RENDERERS: Record<string, () => IReportRenderer> = {
  table: () => new TableRenderer(),
  csv: () => new CsvRenderer(),
  json: () => new JsonRenderer(),
};

function BridgeDemo() {
  const [report, setReport] = useState("sales");
  const [renderer, setRenderer] = useState("table");

  const output = useMemo(() => {
    const target = RENDERERS[renderer]();
    return report === "sales"
      ? new SalesReport(target, SALES).export()
      : new InventoryReport(target, STOCK).export();
  }, [report, renderer]);

  return (
    <Stage
      controls={
        <>
          <Choice
            label="Abstração"
            value={report}
            onChange={setReport}
            options={[
              { value: "sales", label: "SalesReport" },
              { value: "inventory", label: "InventoryReport" },
            ]}
          />
          <Choice
            label="Implementação"
            value={renderer}
            onChange={setRenderer}
            options={[
              { value: "table", label: "TableRenderer" },
              { value: "csv", label: "CsvRenderer" },
              { value: "json", label: "JsonRenderer" },
            ]}
          />
        </>
      }
      run={{
        logs: [{ kind: "log", text: `report.export() → formato ${renderer}` }],
        result: output,
      }}
    />
  );
}

const CATALOG = [
  { sku: "livro-ddd", name: "Domain-Driven Design", weight: 900, dimensions: "23x16x4cm" },
  { sku: "teclado-hhkb", name: "Teclado HHKB", weight: 540, dimensions: "30x11x4cm" },
  { sku: "mousepad", name: "Mousepad XL", weight: 320, dimensions: "90x40x0.4cm" },
];

function FlyweightDemo() {
  const [shipments, setShipments] = useState(3000);
  const [skus, setSkus] = useState(3);

  const run = useMemo(() => {
    const factory = new ProductTypeFactory();
    const labels: string[] = [];

    for (let i = 0; i < shipments; i += 1) {
      const item = CATALOG[i % skus];
      const type = factory.get(item.sku, item.name, item.weight, item.dimensions);
      const shipment = new Shipment(type, `ord-${i}`, (i % 3) + 1, "Av. Paulista, 1000");
      if (i < 2) labels.push(shipment.printLabel());
    }

    return {
      logs: labels.map((text) => ({ kind: "log" as const, text })),
      result: [
        `envios criados: ${shipments.toLocaleString("pt-BR")}`,
        `fichas de produto em memória: ${factory.size}`,
        `instâncias criadas: ${factory.instancesCreated}`,
      ].join("\n"),
    };
  }, [shipments, skus]);

  return (
    <Stage
      controls={
        <>
          <Slider
            label="Envios"
            value={shipments}
            onChange={setShipments}
            min={100}
            max={30000}
            step={100}
            unit="un"
          />
          <Slider
            label="Produtos no catálogo"
            value={skus}
            onChange={setSkus}
            min={1}
            max={3}
            step={1}
            unit="sku"
          />
        </>
      }
      run={run}
    />
  );
}

// ── Controles auxiliares ────────────────────────────────────────

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}) {
  return (
    <Field label={`${label} · ${value.toLocaleString("pt-BR")} ${unit}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1 w-44 cursor-pointer appearance-none rounded-full bg-line accent-[var(--family)]"
      />
    </Field>
  );
}
