import { describe, it, expect } from 'vitest';
import {
  aggregateSpellsBySchool,
  aggregateSpellsByLevel,
  levelLabelForSpell,
} from './chartData';

describe('levelLabelForSpell', () => {
  it('labels cantrips', () => {
    expect(levelLabelForSpell({ level: 0 })).toBe('Cantrip');
    expect(levelLabelForSpell({ level: '0' })).toBe('Cantrip');
  });

  it('maps numeric levels to ordinal labels', () => {
    expect(levelLabelForSpell({ level: 1 })).toBe('1st');
    expect(levelLabelForSpell({ level: 3 })).toBe('3rd');
  });

  it('parses nth-level strings (v1-style)', () => {
    expect(levelLabelForSpell({ level: '3rd-level' })).toBe('3rd');
  });
});

describe('aggregateSpellsBySchool', () => {
  it('counts v2 school objects', () => {
    const rows = aggregateSpellsBySchool([
      { school: { key: 'evocation', name: 'Evocation' } },
      { school: { key: 'evocation', name: 'Evocation' } },
      { school: { key: 'abjuration', name: 'Abjuration' } },
    ]);
    expect(rows.find((r) => r.key === 'evocation')?.value).toBe(2);
    expect(rows.find((r) => r.key === 'abjuration')?.name).toBe('Abjuration');
  });
});

describe('aggregateSpellsByLevel', () => {
  it('fills ordered levels including zeros', () => {
    const data = aggregateSpellsByLevel([
      { level: 3 },
      { level: 0 },
      { level: 3 },
    ]);
    expect(data.find((d) => d.level === '3rd')?.count).toBe(2);
    expect(data.find((d) => d.level === 'Cantrip')?.count).toBe(1);
    expect(data.find((d) => d.level === '1st')?.count).toBe(0);
  });
});
