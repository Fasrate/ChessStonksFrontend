import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from '@mui/material';
import axios from 'axios';

const columns = [
  { id: 'stock_name', label: 'Stock Name', minWidth: 170 },
  { id: 'stock_quantity', label: 'Quantity', minWidth: 100, align: 'right' },
  {
    id: 'invested_amount',
    label: 'Invested Amount',
    minWidth: 170,
    align: 'right',
    format: (value) =>
      value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
  {
    id: 'profit',
    label: 'Profit',
    minWidth: 170,
    align: 'right',
    format: (value) =>
      value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
];

export default function Holdings({ username }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/holdings?username=${username}`
        );
        const holdingsData = response.data.data;
        setRows(holdingsData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch holdings');
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [username]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container maxWidth="lg" style={{ padding: '2rem 0' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Holdings
      </Typography>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.stock_name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        
                        {column.id === 'stock_name' ? (
                          <Link to={`/stocksinfo/${username}/${row.stock_name}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                            {value}
                          </Link>
                          
                        ) : column.format && typeof value === 'number' ? (
                          column.format(value)
                        ) : value}

                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
