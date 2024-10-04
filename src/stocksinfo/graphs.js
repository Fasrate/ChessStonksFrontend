import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Container, Typography } from '@mui/material';

const StockGraph = ({ stockname }) => {

    console.log("graphhhhhhhhh:",stockname);
  const [data, setData] = useState([]);

  // Fetch rating data from Chess.com API
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`https://api.chess.com/pub/player/${stockname}/games/archives`);
        const archives = await response.json();

        let ratingsArray = [];

        for (const archive of archives.archives) {
          const monthlyGamesResponse = await fetch(archive);
          const monthlyGames = await monthlyGamesResponse.json();

          monthlyGames.games.forEach(game => {
            const rating = game.white.username === stockname ? game.white.rating : game.black.rating;
            const timestamp = game.end_time * 1000; // Convert UNIX timestamp to milliseconds for JS Date
 
            ratingsArray.push({ timestamp, rating }); // Store timestamp and rating
          });
        }

        setData(ratingsArray);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, [stockname]);

  // Prepare data for chart
  const timestamps = data.map(entry => entry.timestamp); // Use timestamps for x-axis
  const ratings = data.map(entry => entry.rating); // Ratings for y-axis

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        {stockname}'s Chess Ratings
      </Typography>
      {data.length > 0 ? (
        <LineChart
          xAxis={[
            {
              data: timestamps, // Use numerical timestamps for x-axis
              label: 'Date', // Label for x-axis
              valueFormatter: (timestamp) => new Date(timestamp).toLocaleDateString(), // Convert timestamps to readable dates
            },
          ]}
          series={[
            {
              data: ratings, // Ratings for y-axis
              label: 'Rating',
              color: 'blue',
            },
          ]}
          width={600}
          height={400}
        />
      ) : (
        <Typography variant="h6" align="center">
          No rating data available.
        </Typography>
      )}
    </Container>
  );
};

export default StockGraph;
