import test from 'node:test';
import assert from 'node:assert/strict';
import { diagnose, shuffleChoices } from '../scoring.js';

test('returns 未来提示型 when A is the most selected response', () => {
  const result = diagnose(['A', 'A', 'B', 'C', 'D', 'A', 'B', 'C']);
  assert.equal(result.primaryKey, 'A');
  assert.equal(result.type.name, '未来提示型');
});

test('returns 関係構築型 when B is the most selected response', () => {
  const result = diagnose(['B', 'B', 'A', 'C', 'D', 'B', 'C', 'D']);
  assert.equal(result.primaryKey, 'B');
  assert.equal(result.type.name, '関係構築型');
});

test('returns 自走設計型 when C is the most selected response', () => {
  const result = diagnose(['C', 'C', 'A', 'B', 'D', 'C', 'A', 'B']);
  assert.equal(result.primaryKey, 'C');
  assert.equal(result.type.name, '自走設計型');
});

test('returns 推進突破型 when D is the most selected response', () => {
  const result = diagnose(['D', 'D', 'A', 'B', 'C', 'D', 'A', 'B']);
  assert.equal(result.primaryKey, 'D');
  assert.equal(result.type.name, '推進突破型');
});

test('reports all tied lead types', () => {
  const result = diagnose(['A', 'B', 'A', 'B', 'C', 'D', 'C', 'D']);
  assert.deepEqual(result.tiedKeys, ['A', 'B', 'C', 'D']);
});

test('rejects an incomplete response set', () => {
  assert.throws(() => diagnose(['A', 'B']), /8 answers/);
});

test('shuffles choices without losing or altering their keys', () => {
  const choices = [['A', 'a'], ['B', 'b'], ['C', 'c'], ['D', 'd']];
  const values = [0, 0, 0];
  const shown = shuffleChoices(choices, () => values.shift());
  assert.deepEqual(shown.map(([key]) => key), ['B', 'C', 'D', 'A']);
  assert.deepEqual(shown.map(([key]) => key).sort(), ['A', 'B', 'C', 'D']);
});
