// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import SpellList from '../components/SpellList';
import PaginationControls from '../components/PaginationControls';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import SpellsBySchoolChart from '../components/SpellsBySchoolChart';
import SpellsByLevelChart from '../components/SpellsByLevelChart';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { useSpells } from '../context/spellContext';
import { formatCastingTime, formatRange, formatClasses, formatLevelSchoolLine } from '../utils/spellDisplay';

const Dashboard = () => {
  const [showCharts, setShowCharts] = useState(false);
  const { comparisonKeys, clearComparison, allSpellsForCharts, spells } = useSpells();
  const lookupPool = allSpellsForCharts.length > 0 ? allSpellsForCharts : spells;
  const selectedSpells = comparisonKeys
    .map((key) => lookupPool.find((s) => s.key === key))
    .filter(Boolean);

  return (
    <Box sx={{ width: '100%', flexGrow: 1, padding: 2, minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 720 }}>
        Charts summarize the full Open5e spell list. The table below uses search, filters, and pagination
        against the API.
      </Typography>
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
      <Box sx={{ display: 'grid', gap: 3, width: '100%' }}>
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