import assert from 'node:assert';
import { ShippingCalculator } from './ShippingCalculator';
import { StandardShipping } from './StandardShipping';
import { ExpressShipping } from './ExpressShipping';
import { PickupShipping } from './PickupShipping';

const pkg = { weightInGrams: 800, distanceInKm: 420 };
const calculator = new ShippingCalculator(new StandardShipping());

const standard = calculator.quote(pkg);
calculator.setStrategy(new ExpressShipping());
const express = calculator.quote(pkg);
calculator.setStrategy(new PickupShipping());
const pickup = calculator.quote(pkg);

// Trocar a strategy troca o resultado sem tocar no contexto.
assert.ok(express.costInCents > standard.costInCents, 'Sedex deveria custar mais que o PAC');
assert.ok(express.days < standard.days, 'Sedex deveria chegar antes do PAC');
assert.deepStrictEqual(pickup, { method: 'Retirada na loja', costInCents: 0, days: 0 });

console.log('OK: trocar a strategy muda o cálculo sem alterar o ShippingCalculator');
