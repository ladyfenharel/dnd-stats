// src/components/SpellList.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSpells } from '../context/spellContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link as MuiLink,
  Box,
  Chip,
  Checkbox,
  Tooltip,
} from '@mui/material';
import {
  formatRange,
  tableLevelLabel,
  tableSchoolLabel,
  classNamesForSpell,
} from '../utils/spellDisplay';
import { SpellTableSkeleton } from './loading/SpellTableSkeleton';

const TAG_COLORS = [
  '#7c3aed',
  '#2563eb',
  '#0d9488',
  '#059669',
  '#ca8a04',
  '#ea580c',
  '#db2777',
  '#4f46e5',
];

function colorForTag(label = '') {
  let hash = 0;
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash << 5) - hash + label.charCodeAt(i);
    hash |= 0;
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

function hasActiveSpellFilters(searchQuery, filters) {
  return (
    Boolean(searchQuery?.trim()) ||
    Boolean(filters?.level) ||
    Boolean(filters?.school) ||
    Boolean(filters?.classKey)
  );
}

const SpellList = () => {
  const navigate = useNavigate();
  const {
    spells,
    loading,
    error,
    searchQuery,
    filters,
    sortResetToken,
    comparisonKeys,
    toggleComparisonSpell,
    spellListDraftKeys,
    toggleSpellListSpell,
  } = useSpells();
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [classFocus, setClassFocus] = useState(null);
  const [schoolFocus, setSchoolFocus] = useState(null);

  const toggleSort = useCallback((field) => {
    setClassFocus(null);
    setSchoolFocus(null);
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortField(field);
    setSortDirection('asc');
  }, [sortField]);

  const toggleClassFocus = useCallback((className) => {
    if (sortField === 'class-focus' && classFocus === className) {
      setClassFocus(null);
      setSortField(null);
      setSortDirection('asc');
      return;
    }
    setClassFocus(className);
    setSchoolFocus(null);
    setSortField('class-focus');
    setSortDirection('asc');
  }, [sortField, classFocus]);

  const toggleSchoolFocus = useCallback((schoolName) => {
    if (sortField === 'school-focus' && schoolFocus === schoolName) {
      setSchoolFocus(null);
      setSortField(null);
      setSortDirection('asc');
      return;
    }
    setSchoolFocus(schoolName);
    setClassFocus(null);
    setSortField('school-focus');
    setSortDirection('asc');
  }, [sortField, schoolFocus]);

  const sortedSpells = useMemo(() => {
    if (!sortField) return spells;
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (sortField === 'class-focus' && classFocus) {
      return [...spells].sort((a, b) => {
        const aClasses = classNamesForSpell(a);
        const bClasses = classNamesForSpell(b);
        const aHas = aClasses.includes(classFocus);
        const bHas = bClasses.includes(classFocus);
        if (aHas !== bHas) {
          return aHas ? -1 : 1;
        }
        return a.name.localeCompare(b.name) * direction;
      });
    }

    if (sortField === 'school-focus' && schoolFocus) {
      return [...spells].sort((a, b) => {
        const aSchool = tableSchoolLabel(a);
        const bSchool = tableSchoolLabel(b);
        const aHas = aSchool === schoolFocus;
        const bHas = bSchool === schoolFocus;
        if (aHas !== bHas) {
          return aHas ? -1 : 1;
        }
        return a.name.localeCompare(b.name) * direction;
      });
    }

    return [...spells].sort((a, b) => {
      const aValue =
        sortField === 'school'
          ? tableSchoolLabel(a)
          : sortField === 'class'
            ? (classNamesForSpell(a)[0] ?? '')
            : '';
      const bValue =
        sortField === 'school'
          ? tableSchoolLabel(b)
          : sortField === 'class'
            ? (classNamesForSpell(b)[0] ?? '')
            : '';
      return aValue.localeCompare(bValue) * direction;
    });
  }, [spells, sortField, sortDirection, classFocus, schoolFocus]);

  useEffect(() => {
    setSortField(null);
    setSortDirection('asc');
    setClassFocus(null);
    setSchoolFocus(null);
  }, [sortResetToken]);

  const tableBody = useMemo(
    () => (
      <TableBody>
        {sortedSpells.map((spell) => {
          const detailPath = `/spells/${encodeURIComponent(spell.key)}`;
          return (
            <TableRow
              key={spell.key}
              hover
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(detailPath);
                }
              }}
              sx={(theme) => ({
                '&:last-child td, &:last-child th': { border: 0 },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
              })}
            >
              <TableCell
                align="center"
                onClick={(e) => e.stopPropagation()}
                sx={{ width: 52, p: 0.5 }}
              >
                <Tooltip title="Add to compare (max 2)">
                  <Checkbox
                    checked={comparisonKeys.includes(spell.key)}
                    onChange={() => toggleComparisonSpell(spell.key)}
                    inputProps={{ 'aria-label': `Compare ${spell.name}` }}
                    size="small"
                  />
                </Tooltip>
              </TableCell>
              <TableCell
                align="center"
                onClick={(e) => e.stopPropagation()}
                sx={{ width: 76, maxWidth: 76, p: 0.5 }}
              >
                <Tooltip title="Add/remove from current spell list draft">
                  <Checkbox
                    checked={spellListDraftKeys.includes(spell.key)}
                    onChange={() => toggleSpellListSpell(spell.key)}
                    inputProps={{ 'aria-label': `Add ${spell.name} to spell list` }}
                    size="small"
                  />
                </Tooltip>
              </TableCell>
              <TableCell component="th" scope="row">
                {spell.name}
              </TableCell>
              <TableCell align="right">{tableLevelLabel(spell)}</TableCell>
              <TableCell align="right">
                {(() => {
                  const schoolLabel = tableSchoolLabel(spell);
                  const chipColor = colorForTag(`school:${schoolLabel}`);
                  const isFocused = sortField === 'school-focus' && schoolFocus === schoolLabel;
                  return (
                <Chip
                  size="small"
                  variant={isFocused ? 'filled' : 'outlined'}
                  label={schoolLabel}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSchoolFocus(schoolLabel);
                  }}
                  sx={{
                    borderColor: chipColor,
                    color: chipColor,
                    bgcolor: isFocused ? `${chipColor}55` : `${chipColor}22`,
                    '&:hover': {
                      bgcolor: `${chipColor}33`,
                    },
                  }}
                />
                  );
                })()}
              </TableCell>
              <TableCell align="right">
                <Box
                  sx={{
                    display: 'flex',
                    gap: 0.5,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                  }}
                >
                  {(() => {
                    const classNames = classNamesForSpell(spell);
                    if (classNames.length === 0) {
                      return (
                        <Chip
                          size="small"
                          variant="outlined"
                          label="—"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSort('class');
                          }}
                        />
                      );
                    }
                    return classNames.map((className) => {
                      const chipColor = colorForTag(`class:${className}`);
                      const isFocused = sortField === 'class-focus' && classFocus === className;
                      return (
                        <Chip
                          key={`${spell.key}-${className}`}
                          size="small"
                          variant={isFocused ? 'filled' : 'outlined'}
                          label={className}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleClassFocus(className);
                          }}
                          sx={{
                            borderColor: chipColor,
                            color: chipColor,
                            bgcolor: isFocused ? `${chipColor}55` : `${chipColor}22`,
                            '&:hover': {
                              bgcolor: `${chipColor}33`,
                            },
                          }}
                        />
                      );
                    });
                  })()}
                </Box>
              </TableCell>
              <TableCell align="right">{formatRange(spell)}</TableCell>
              <TableCell align="right">
                <MuiLink component={Link} to={detailPath} underline="hover">
                  View details
                </MuiLink>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    ),
    [
      sortedSpells,
      navigate,
      sortField,
      classFocus,
      schoolFocus,
      toggleSort,
      toggleClassFocus,
      toggleSchoolFocus,
      comparisonKeys,
      toggleComparisonSpell,
      spellListDraftKeys,
      toggleSpellListSpell,
    ],
  );

  if (loading) {
    return <SpellTableSkeleton />;
  }

  if (error) {
    return (
      <Typography color="error" role="alert">
        Could not load spells: {error}
      </Typography>
    );
  }

  if (spells.length === 0) {
    const narrowed = hasActiveSpellFilters(searchQuery, filters);
    return (
      <Box
        sx={{
          py: 6,
          px: 3,
          textAlign: 'center',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
        role="status"
      >
        <Typography variant="h6" gutterBottom>
          No spells to show
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, mx: 'auto' }}>
          {narrowed
            ? 'Nothing matched your search or filters. Try clearing filters in the sidebar or using a shorter name search.'
            : 'No spells were returned from the API for this request.'}
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Spells in the current results">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: 52, p: 0.5 }}>
              Compare
            </TableCell>
            <TableCell
              align="center"
              sx={{
                width: 76,
                maxWidth: 76,
                p: 0.5,
                fontSize: '0.7rem',
                lineHeight: 1.2,
                whiteSpace: 'normal',
              }}
            >
              Spell list
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">
              <Chip
                size="small"
                clickable
                variant={sortField === 'school' || sortField === 'school-focus' ? 'filled' : 'outlined'}
                color={sortField === 'school' || sortField === 'school-focus' ? 'primary' : 'default'}
                label={
                  sortField === 'school-focus' && schoolFocus
                    ? `School: ${schoolFocus}`
                    : `School ${sortField === 'school' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}`
                }
                onClick={() => toggleSort('school')}
              />
            </TableCell>
            <TableCell align="right">
              <Chip
                size="small"
                clickable
                variant={sortField === 'class' || sortField === 'class-focus' ? 'filled' : 'outlined'}
                color={sortField === 'class' || sortField === 'class-focus' ? 'secondary' : 'default'}
                label={
                  sortField === 'class-focus' && classFocus
                    ? `Class: ${classFocus}`
                    : `Class ${sortField === 'class' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}`
                }
                onClick={() => toggleSort('class')}
              />
            </TableCell>
            <TableCell align="right">Range</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        {tableBody}
      </Table>
    </TableContainer>
  );
};

export default SpellList;
