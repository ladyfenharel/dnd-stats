import { levelLabelForSpell } from './chartData';

const CASTING_TIME_LABELS = {
  action: '1 action',
  bonus_action: '1 bonus action',
  reaction: '1 reaction',
};

export function formatCastingTime(spell) {
  const ct = spell.casting_time;
  if (ct == null || ct === '') return '—';
  if (CASTING_TIME_LABELS[ct]) return CASTING_TIME_LABELS[ct];
  return String(ct).replace(/_/g, ' ');
}

export function formatComponents(spell) {
  const parts = [];
  if (spell.verbal) parts.push('V');
  if (spell.somatic) parts.push('S');
  if (spell.material) parts.push('M');
  if (parts.length === 0) {
    if (typeof spell.components === 'string' && spell.components) return spell.components;
    return '—';
  }
  let s = parts.join(', ');
  const mat =
    (typeof spell.material_specified === 'string' && spell.material_specified.trim()) ||
    (spell.material_cost != null && spell.material_cost !== ''
      ? String(spell.material_cost)
      : '');
  if (spell.material && mat) {
    s += ` (${mat})`;
  }
  return s;
}

export function formatRange(spell) {
  if (spell.range_text) return spell.range_text;
  if (spell.range != null && spell.range_unit) {
    return `${spell.range} ${spell.range_unit}`;
  }
  if (spell.range != null) return String(spell.range);
  return '—';
}

export function formatLevelSchoolLine(spell) {
  const levelPart = levelLabelForSpell(spell);
  const schoolPart =
    spell.school && typeof spell.school === 'object' && spell.school.name
      ? spell.school.name
      : spell.school
        ? String(spell.school)
        : '';
  return [levelPart, schoolPart].filter(Boolean).join(' · ');
}

export function formatClasses(spell) {
  if (Array.isArray(spell.classes) && spell.classes.length > 0) {
    return spell.classes.map((c) => (typeof c === 'string' ? c : c.name)).filter(Boolean).join(', ');
  }
  if (spell.dnd_class) return spell.dnd_class;
  return '—';
}

export function classNamesForSpell(spell) {
  if (Array.isArray(spell.classes) && spell.classes.length > 0) {
    return spell.classes.map((c) => (typeof c === 'string' ? c : c.name)).filter(Boolean);
  }
  if (typeof spell.dnd_class === 'string' && spell.dnd_class) {
    return spell.dnd_class
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function tableLevelLabel(spell) {
  if (spell.level === 0) return 'Cantrip';
  if (typeof spell.level === 'number') return String(spell.level);
  return spell.level != null ? String(spell.level) : '—';
}

export function tableSchoolLabel(spell) {
  if (spell.school && typeof spell.school === 'object' && spell.school.name) {
    return spell.school.name;
  }
  return spell.school ? String(spell.school) : '—';
}

export function tableClassTagLabel(spell) {
  const names = classNamesForSpell(spell);
  if (names.length === 0) return '—';
  if (names.length === 1) return names[0];
  return `${names[0]} +${names.length - 1}`;
}
