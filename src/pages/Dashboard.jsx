// src/pages/Dashboard.jsx
import React, { useMemo, useState } from 'react';
import SpellList from '../components/SpellList';
import PaginationControls from '../components/PaginationControls';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpellsBySchoolChart from '../components/SpellsBySchoolChart';
import SpellsByLevelChart from '../components/SpellsByLevelChart';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { useSpells } from '../context/spellContext';
import { formatCastingTime, formatRange, formatClasses, formatLevelSchoolLine } from '../utils/spellDisplay';

const Dashboard = () => {
  const [showCharts, setShowCharts] = useState(false);
  const [spellListName, setSpellListName] = useState('');
  const {
    comparisonKeys,
    clearComparison,
    allSpellsForCharts,
    spells,
    spellListDraftKeys,
    clearSpellListDraft,
    saveSpellList,
  } = useSpells();
  const lookupPool = allSpellsForCharts.length > 0 ? allSpellsForCharts : spells;
  const selectedSpells = comparisonKeys
    .map((key) => lookupPool.find((s) => s.key === key))
    .filter(Boolean);
  const spellListPreviewNames = useMemo(
    () =>
      spellListDraftKeys
        .slice(0, 6)
        .map((key) => lookupPool.find((s) => s.key === key)?.name ?? key),
    [spellListDraftKeys, lookupPool],
  );

  const handleSaveSpellList = () => {
    const saved = saveSpellList(spellListName);
    if (saved) {
      setSpellListName('');
    }
  };

  return (
    <Box sx={{ width: '100%', flexGrow: 1, padding: { xs: 1.5, sm: 2 }, minHeight: '100vh' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 640 }}>
          Search and filter spells; optional charts summarize the full list. Open saved spell lists from the list icon in the header.
        </Typography>
      </Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" component="h2" sx={{ mb: 1 }}>
          Search and filters
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: { xs: '1fr', md: 'minmax(280px, 1fr) 2fr' },
            alignItems: 'start',
          }}
        >
          <Box>
            <SearchBar />
          </Box>
          <Box>
            <FilterPanel compact />
          </Box>
        </Box>
      </Paper>
      <Box sx={{ display: 'grid', gap: 2, width: '100%' }}>
        <Accordion
          defaultExpanded={false}
          disableGutters
          elevation={0}
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 48, '& .MuiAccordionSummary-content': { my: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', pr: 1 }}>
              <Typography variant="subtitle2" component="span" fontWeight={600}>
                Save spell list
              </Typography>
              <Chip
                size="small"
                label={spellListDraftKeys.length === 0 ? 'No spells in draft' : `${spellListDraftKeys.length} in draft`}
                color={spellListDraftKeys.length > 0 ? 'primary' : 'default'}
                variant={spellListDraftKeys.length > 0 ? 'filled' : 'outlined'}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0, px: 2, pb: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
              Use the Spell list column in the table below, then name and save. Open saved lists from the header icon.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'flex-start' }} sx={{ mb: 1.5 }}>
              <TextField
                label="Spell list name"
                size="small"
                value={spellListName}
                onChange={(e) => setSpellListName(e.target.value)}
                placeholder="e.g. Wizard fire kit"
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleSaveSpellList}
                disabled={spellListDraftKeys.length === 0 || spellListName.trim().length === 0}
                sx={{ flexShrink: 0 }}
              >
                Save
              </Button>
              <Button variant="outlined" size="medium" onClick={clearSpellListDraft} disabled={spellListDraftKeys.length === 0}>
                Clear draft
              </Button>
            </Stack>
            {spellListDraftKeys.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                Preview: {spellListPreviewNames.join(', ')}
                {spellListDraftKeys.length > spellListPreviewNames.length
                  ? ` +${spellListDraftKeys.length - spellListPreviewNames.length} more`
                  : ''}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>

        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
            }}
          >
            <Box>
              <Typography variant="subtitle1" component="h2">
                Data charts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Optional visual summary of the full Open5e corpus.
              </Typography>
            </Box>
            <Button
              variant={showCharts ? 'contained' : 'outlined'}
              onClick={() => setShowCharts((prev) => !prev)}
              aria-expanded={showCharts}
              aria-controls="dashboard-charts"
            >
              {showCharts ? 'Hide charts' : 'Show charts'}
            </Button>
          </Box>
        </Paper>

        {showCharts && (
          <Box id="dashboard-charts" sx={{ display: 'grid', gap: 3 }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: 400, sm: 480, md: 520 },
              }}
            >
              <SpellsBySchoolChart />
            </Paper>

            <Paper sx={{ p: 2, height: 350, display: 'flex', flexDirection: 'column' }}>
              <SpellsByLevelChart />
            </Paper>
          </Box>
        )}

        {selectedSpells.length > 0 && (
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle1" component="h2">
                  Spell comparison
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select up to 2 spells from the table using Compare checkboxes.
                </Typography>
              </Box>
              <Button variant="outlined" size="small" onClick={clearComparison}>
                Clear compare
              </Button>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns:
                  selectedSpells.length === 1
                    ? '1fr'
                    : { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              }}
            >
              {selectedSpells.map((spell) => (
                <Paper key={spell.key} variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" component="h3">
                    {spell.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {formatLevelSchoolLine(spell)}
                  </Typography>
                  <Stack spacing={0.75}>
                    <Typography variant="body2">
                      <strong>Casting:</strong> {formatCastingTime(spell)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Range:</strong> {formatRange(spell)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Duration:</strong> {spell.duration || '—'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Classes:</strong> {formatClasses(spell)}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Paper>
        )}

        <SpellList />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <PaginationControls />
      </Box>
    </Box>
  );
};

export default Dashboard;