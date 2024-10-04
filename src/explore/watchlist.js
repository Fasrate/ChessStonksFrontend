import * as React from 'react';
import { Link,useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const columns = [
  { id: 'stock_name', label: 'Stock Name', minWidth: 100 },
  {
    id: 'current_price',
    label: 'Current Price (USD)',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
  {
    id: 'available_supply',
    label: 'Available QTY',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const Watchlist = () => {
  const { username } = useParams(); // Get username from URL
  const [watchlist, setWatchlist] = React.useState([]);
  const [stockSymbol, setStockSymbol] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Fetch the watchlist on component mount
  React.useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch(`http://localhost:3000/watchlist/${username}`); // Updated to match API
      const data = await response.json();

      console.log("DebigData:",data);
      setWatchlist(data);
    };
    fetchWatchlist();
  }, [username]);

  const handleAddStock = async () => {
    if (!stockSymbol) return; // Prevent adding empty stock symbol

    // Make a POST request to add the stock
    const response = await fetch(`http://localhost:3000/watchlist/add/${username}/${stockSymbol}`, {
      method: 'POST',
    });

    if (response.ok) {
      const addedStock = await response.json();
      setWatchlist((prevWatchlist) => [...prevWatchlist, addedStock]);
      setStockSymbol(''); // Clear the input
    }else if (response.status === 409) {
        alert('This stock is already in your watchlist.'); // Show message for duplicate stock
    }else {
      alert('Failed to add stock to watchlist.');
    }
  };

  const handleRemoveStock = async (stockName) => {
    const response = await fetch(`http://localhost:3000/watchlist/${username}/${stockName}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedWatchlist = watchlist.filter(stock => stock.stock_name !== stockName);
      setWatchlist(updatedWatchlist);
    } else {
      alert('Failed to remove stock from watchlist.');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth="lg" style={{ padding: '2rem 0' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Watchlist  
      </Typography>

      {/* Add stock input */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Stock Symbol"
          variant="outlined"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddStock}>
          Add to Watchlist
        </Button>
      </div>

      {/* Watchlist Table */}
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
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchlist
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.stock_name}>
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
                {/* Remove button */}
                <TableCell align="right">
                  
                  <Link variant="outlined" style={{ color: '#1976d2' }} onClick={() => handleRemoveStock(row.stock_name)}>Remove</Link>

                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={watchlist.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default Watchlist;
