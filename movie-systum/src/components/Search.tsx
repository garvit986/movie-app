import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { SearchBarProps } from '../interfaces/Types';

const Search: React.FC<SearchBarProps> = ({ onSearch, suggestions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, suggestions]);

  const handleSearch = () => {
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, position: 'relative' }}>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ flexGrow: 1, mb: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} sx={{ ml: 2, mb: 1 }}>
        Search
      </Button>
      {showSuggestions && (
        <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1 }}>
          <List>
            {filteredSuggestions.map((suggestion, index) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => handleSuggestionClick(suggestion)}>
                  <ListItemText primary={suggestion} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Search;
