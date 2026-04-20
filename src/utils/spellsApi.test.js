import { describe, it, expect } from 'vitest';
import {
  buildSpellsListUrl,
  spellDetailUrl,
  chartCorpusFirstPageUrl,
  OPEN5E_SPELLS_BASE,
  SPELLS_PAGE_SIZE_MAX,
} from './spellsApi';

describe('buildSpellsListUrl', () => {
  it('builds v2 list URL with page_size capped', () => {
    const url = buildSpellsListUrl({ pageSize: 20 });
    expect(url.startsWith(`${OPEN5E_SPELLS_BASE}/?`)).toBe(true);
    expect(url).toContain(`page_size=20`);
  });

  it('caps page_size at API maximum', () => {
    const url = buildSpellsListUrl({ pageSize: 500 });
    expect(url).toContain(`page_size=${SPELLS_PAGE_SIZE_MAX}`);
  });

  it('uses name__icontains, level, school__key, and classes__key filters', () => {
    const url = buildSpellsListUrl({
      pageSize: 20,
      searchQuery: 'fire ball',
      filters: { level: '3', school: 'evocation', classKey: 'srd_wizard' },
    });
    expect(url).toMatch(/name__icontains=fire(\+|%20)ball/);
    expect(url).toContain('level=3');
    expect(url).toContain('school__key=evocation');
    expect(url).toContain('classes__key=srd_wizard');
  });

  it('uses level 0 for cantrips', () => {
    const url = buildSpellsListUrl({ pageSize: 20, filters: { level: '0' } });
    expect(url).toContain('level=0');
  });
});

describe('spellDetailUrl', () => {
  it('encodes spell keys for v2 retrieve', () => {
    expect(spellDetailUrl('a5e-ag_fireball')).toBe(`${OPEN5E_SPELLS_BASE}/a5e-ag_fireball/`);
  });
});

describe('chartCorpusFirstPageUrl', () => {
  it('uses max page_size for walking next links', () => {
    expect(chartCorpusFirstPageUrl()).toContain(`page_size=${SPELLS_PAGE_SIZE_MAX}`);
  });
});
