import React, { useState, useEffect } from "react";
import DataList from "./components/DataList";
import StatsBox from "./components/StatsBox";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import DNDData from "./components/DNDData";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  Paper,
  Tabs,
  Tab,
  styled,
} from "@mui/material";
import { CountUp } from 'use-count-up';

// Define StyledTabs and StyledTab BEFORE the App component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.secondary.main, // Or any color you prefer
    height: 3, // Make the indicator thicker
  },
  '& .MuiTab-root': {
    fontSize: theme.typography.h6.fontSize, // Make the labels larger
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main, // Highlight the selected tab
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
}));

function App() {
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [planes, setPlanes] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => setSearchTerm(term.toLowerCase());

  const [selectedDocumentSlug, setSelectedDocumentSlug] = useState("");

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

  const handleDocumentSlugChange = (event) => {
    setSelectedDocumentSlug(event.target.value);
  };

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRaces = races.filter((race) =>
    race.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPlanes = planes.filter((plane) =>
    plane.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} textAlign={'center'}>
            D&D 5e Data
          </Typography>
        </Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <StyledTabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="data tables"
            centered
          >
            <StyledTab label="Classes" />
            <StyledTab label="Races" />
            <StyledTab label="Planes" />
          </StyledTabs>
        </Box>
      </AppBar>

      <Paper
        sx={{
          width: 280,
          flexShrink: 0,
          p: 3,
          mt: { xs: '56px', sm: '112px' },
          borderRight: '1px solid #eee',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters & Search
        </Typography>
        <SearchBar onSearch={handleSearch} />
        <FilterBar
          selectedDocumentSlug={selectedDocumentSlug}
          handleDocumentSlugChange={handleDocumentSlugChange}
        />
      </Paper>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: '112px', sm: '168px' }, overflow: 'auto' }}>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <StatsBox title="Classes" data={classes} sx={{ flexGrow: 1 }} />
          <StatsBox title="Races" data={races} sx={{ flexGrow: 1 }} />
          <StatsBox title="Planes" data={planes} sx={{ flexGrow: 1 }} />
        </Box>

        {selectedTab === 0 && (
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Classes
            </Typography>
            <DataList data={filteredClasses} title="Classes" secondary={(cls) => cls.hit_dice} secondaryLabel="Hit Dice" />
          </Box>
        )}
        {selectedTab === 1 && (
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Races
            </Typography>
            <DataList data={filteredRaces} title="Races" secondary={(race) => race.asi_desc} secondaryLabel="Ability Scores:" />
          </Box>
        )}
        {selectedTab === 2 && (
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Planes
            </Typography>
            <DataList
              data={filteredPlanes}
              title="Planes"
              secondary={(plane) => plane.desc || "No description listed"}
              secondaryLabel="Description:"
            />
          </Box>
        )}
      </Box>

      {/* Pass the documentSlug to DNDData */}
      <DNDData dataType="classes" onDataFetched={setClasses} documentSlugFilter={selectedDocumentSlug} />
      <DNDData dataType="races" onDataFetched={setRaces} documentSlugFilter={selectedDocumentSlug} />
      <DNDData dataType="planes" onDataFetched={setPlanes} documentSlugFilter={selectedDocumentSlug} />
    </Box>
  );
}

export default App;