import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';

const Trade = ({username, stockname}) => {
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('');
  const [error,setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log({username, stockname, quantity, action });
    
    try {
        const response = await fetch('http://localhost:3000/trade', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, stockname, quantity, action }),
        });
  
        if (!response.ok) {
          throw new Error('Transaction could not be processed!');
        }
  
        // Handle successful signup (e.g., redirect to login or dashboard)
        alert('Transaction was successful');
       
      } catch (error) {
        setError(error.message);
      }

  };

  return (
    <Container maxWidth="sm" style={{ padding: '2rem 0' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Buy/Sell Stocks
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Action</InputLabel>
          <Select
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <MenuItem value="buy">Buy</MenuItem>
            <MenuItem value="sell">Sell</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Trade;
 
