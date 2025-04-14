import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SpellList from './components/SpellList';
import SpellDetail from './components/SpellDetail';

const App = () => {
  const [spells, setSpells] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch('https://api.open5e.com/spells/');
        const data = await response.json();
        setSpells(data.results);
      } catch (error) {
        console.error('Error fetching spells:', error);
      }
    };
  
    fetchSpells();
  }, []);  

  const filteredSpells = spells.filter((spell) => {
    const nameMatches = spell.name.toLowerCase().includes(filterText.toLowerCase());
    const levelMatches = selectedLevel === '' || spell.level_int === parseInt(selectedLevel);
    const schoolMatches = selectedSchool === '' || spell.school === selectedSchool;
    return nameMatches && levelMatches && schoolMatches;
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Sidebar
              filterText={filterText}
              setFilterText={setFilterText}
              selectedSchool={selectedSchool}
              setSelectedSchool={setSelectedSchool}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
          }
        >
          <Route index element={<SpellList spells={filteredSpells} />} />
          <Route path=":slug" element={<SpellDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
