import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const UsersInfo = () => {
  const { username } = useParams();
  const [data, setData] = useState({
    netWorth: 0,
    totalCash: 0,
    totalStockWorth: 0,
    stockValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch(`http://localhost:3000/finance?username=${username}`, {
            method: 'GET', // Change to GET
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log("rrrrrr",response);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log("result:",result);
        setData({
          netWorth: result.data.netWorth,
          totalCash: result.data.totalCash,
          totalStockWorth: result.data.totalStockWorth,
          stockValue: result.data.stockValue,
          amountInvested: result.data.amount_invested
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]); // Empty dependency array to run only on mount

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Card style={{ margin: '16px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Grid container spacing={4}>
          {/* Net Worth */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Net Worth</Typography>
            <Typography variant="h5" color="text.primary">
              {data.netWorth.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Typography>
          </Grid>

          {/* Total Cash */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Total Cash</Typography>
            <Typography variant="h5" color="text.primary">
              {data.totalCash.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Typography>
          </Grid>

          {/* Total Stock Worth */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Total Stock Worth</Typography>
            <Typography variant="h5" color="text.primary">
              {data.totalStockWorth.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Typography>
          </Grid>

          {/* Current Stock Worth */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Current Stock Worth</Typography>
            <Typography variant="h5" color="text.primary">
              {data.stockValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UsersInfo;
