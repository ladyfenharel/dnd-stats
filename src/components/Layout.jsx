// Layout.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  ListItemText,
} from '@mui/material';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSpells } from '../context/spellContext';

const Layout = () => {
  const { savedSpellLists, openSpellList, deleteSpellList } = useSpells();
  const navigate = useNavigate();
  const [spellListsAnchorEl, setSpellListsAnchorEl] = React.useState(null);
  const spellListsMenuOpen = Boolean(spellListsAnchorEl);

  const handleOpenSpellListsMenu = (event) => {
    setSpellListsAnchorEl(event.currentTarget);
  };

  const handleCloseSpellListsMenu = () => {
    setSpellListsAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AppBar position="fixed" component="header" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar variant="dense" sx={{ gap: 1, minHeight: { xs: 48, sm: 56 } }}>
          <Typography
            variant="subtitle1"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 600,
              letterSpacing: 0.2,
            }}
          >
            D&D Spell Explorer
          </Typography>
          <Tooltip title="Saved spell lists">
            <IconButton
              color="inherit"
              onClick={handleOpenSpellListsMenu}
              aria-label={`Saved spell lists, ${savedSpellLists.length} saved`}
              aria-haspopup="true"
              aria-expanded={spellListsMenuOpen ? 'true' : undefined}
              size="small"
              sx={{
                borderRadius: 1,
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 0.5,
                px: savedSpellLists.length > 0 ? 0.75 : undefined,
              }}
            >
              <AutoStoriesOutlinedIcon fontSize="small" />
              {savedSpellLists.length > 0 && (
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    lineHeight: 1,
                    color: 'inherit',
                    opacity: 0.95,
                    minWidth: '1.1em',
                    textAlign: 'center',
                    userSelect: 'none',
                  }}
                  aria-hidden
                >
                  {savedSpellLists.length > 99 ? '99+' : savedSpellLists.length}
                </Typography>
              )}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={spellListsAnchorEl}
            open={spellListsMenuOpen}
            onClose={handleCloseSpellListsMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { maxHeight: 360, minWidth: 280, mt: 1 } } }}
          >
            {savedSpellLists.length === 0 ? (
              <MenuItem disabled dense>
                No saved spell lists yet
              </MenuItem>
            ) : (
              savedSpellLists.map((list) => (
                <MenuItem
                  key={list.id}
                  dense
                  disableRipple
                  sx={{ py: 0.75, pr: 0.5, '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <ListItemText
                    primary={list.name}
                    secondary={`${list.spells.length} spells`}
                    primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                    sx={{ mr: 0.5, minWidth: 0 }}
                  />
                  <Tooltip title="Open printable sheet">
                    <IconButton
                      size="small"
                      aria-label={`Open ${list.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openSpellList(list.id);
                        navigate(`/spell-lists/${encodeURIComponent(list.id)}`);
                        handleCloseSpellListsMenu();
                      }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      aria-label={`Delete ${list.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSpellList(list.id);
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </MenuItem>
              ))
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          width: '100%',
          p: { xs: 2, md: 3, lg: 4 },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
