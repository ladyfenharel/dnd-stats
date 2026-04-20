/**
 * Unique playable classes from spell.class entries (Open5e v2 shape: { key, name }).
 * Collapses duplicate display names (e.g. SRD vs other sourcebooks) by preferring `srd_*` keys.
 * @param {Array<{ classes?: Array<{ key?: string, name?: string }> }>} spells
 * @returns {Array<[string, string]>} [key, name] pairs sorted by name
 */
function preferClassEntry(current, candidate) {
  const rank = (key) => (key.startsWith('srd_') ? 0 : 1);
  const rc = rank(candidate.key);
  const rr = rank(current.key);
  if (rc < rr) return candidate;
  if (rc > rr) return current;
  return candidate.key.localeCompare(current.key) < 0 ? candidate : current;
}

export function collectClassOptionsFromSpells(spells) {
  /** @type {Map<string, { key: string, name: string }>} normalized display name -> chosen entry */
  const byName = new Map();

  for (const spell of spells) {
    for (const c of spell.classes || []) {
      if (!c?.key || !c?.name) continue;
      const name = c.name.trim();
      if (!name) continue;
      const norm = name.toLowerCase();
      const entry = { key: c.key, name };
      const existing = byName.get(norm);
      byName.set(norm, existing ? preferClassEntry(existing, entry) : entry);
    }
  }

  return [...byName.values()]
    .map(({ key, name }) => [key, name])
    .sort((a, b) => a[1].localeCompare(b[1], undefined, { sensitivity: 'base' }));
}
