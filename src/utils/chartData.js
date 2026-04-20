const LEVEL_ORDER = ['Cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];

function schoolKey(spell) {
  if (spell.school && typeof spell.school === 'object' && spell.school.key) {
    return spell.school.key;
  }
  if (typeof spell.school === 'string' && spell.school.trim()) {
    return spell.school.trim().toLowerCase();
  }
  return 'unknown';
}

function schoolDisplayName(spell, key) {
  if (spell.school && typeof spell.school === 'object' && spell.school.name) {
    return spell.school.name;
  }
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function aggregateSpellsBySchool(spells) {
  const counts = new Map();
  const labels = new Map();

  for (const spell of spells) {
    const key = schoolKey(spell);
    counts.set(key, (counts.get(key) || 0) + 1);
    if (!labels.has(key)) {
      labels.set(key, schoolDisplayName(spell, key));
    }
  }

  return [...counts.keys()]
    .sort()
    .map((key) => ({
      key,
      name: labels.get(key),
      value: counts.get(key),
    }));
}

export function levelLabelForSpell(spell) {
  const lv = spell.level;
  if (lv === 0 || lv === '0') {
    return 'Cantrip';
  }
  if (typeof lv === 'number' && lv >= 1 && lv <= 9) {
    return LEVEL_ORDER[lv];
  }
  if (lv && String(lv).includes('-level')) {
    return String(lv).split('-')[0];
  }
  return lv != null && lv !== '' ? String(lv) : 'Unknown';
}

export function aggregateSpellsByLevel(spells) {
  const levelCounts = spells.reduce((acc, spell) => {
    const levelLabel = levelLabelForSpell(spell);
    acc[levelLabel] = (acc[levelLabel] || 0) + 1;
    return acc;
  }, {});

  return LEVEL_ORDER.map((level) => ({
    level,
    count: levelCounts[level] || 0,
  }));
}
