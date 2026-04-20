import { describe, it, expect } from 'vitest';
import { collectClassOptionsFromSpells } from './classOptions';

describe('collectClassOptionsFromSpells', () => {
  it('dedupes by key and sorts by display name', () => {
    const spells = [
      { classes: [{ key: 'srd_wizard', name: 'Wizard' }, { key: 'srd_sorcerer', name: 'Sorcerer' }] },
      { classes: [{ key: 'srd_wizard', name: 'Wizard' }] },
      { classes: [{ key: 'srd_bard', name: 'Bard' }] },
    ];
    const opts = collectClassOptionsFromSpells(spells);
    expect(opts.map((o) => o[0])).toEqual(['srd_bard', 'srd_sorcerer', 'srd_wizard']);
  });

  it('collapses same display name with different API keys, preferring srd_*', () => {
    const spells = [
      {
        classes: [
          { key: 'other_wizard', name: 'Wizard' },
          { key: 'srd_wizard', name: 'Wizard' },
        ],
      },
    ];
    const opts = collectClassOptionsFromSpells(spells);
    expect(opts).toHaveLength(1);
    expect(opts[0][0]).toBe('srd_wizard');
    expect(opts[0][1]).toBe('Wizard');
  });

  it('handles missing classes', () => {
    expect(collectClassOptionsFromSpells([{}, { classes: [] }])).toEqual([]);
  });
});
