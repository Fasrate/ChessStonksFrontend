import * as React from 'react'; 
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



function createDataLeaderboard(rank, username, netWorth) {
  return { rank, username, netWorth };
}

function createDataHotStocks(name, price, hotness) {
  return { name, price, hotness };
}

function createDataTransactions(buyer, stock, price, quantity, action) {
  return { buyer, stock, price, quantity, action };
}

// Data for Top 10 Leaderboard
const leaderboardRows = [
  createDataLeaderboard(1, 'bugdone', '$3,274,126.3'),
  createDataLeaderboard(2, 'thescrasse', '$532,680.91'),
  createDataLeaderboard(3, 'hemeshdj', '$224,087.76'),
  createDataLeaderboard(4, 'physics0523', '$213,949.3'),
  createDataLeaderboard(5, 'peimuda', '$147,425.03'),
];

// Data for Top 10 Hottest Stocks
const hotStocksRows = [
  createDataHotStocks('feecle6418', '$54.27', 1200),
  createDataHotStocks('ar69420', '$11.78', 1000),
  createDataHotStocks('dj_khalid', '$11.3', 900),
  createDataHotStocks('moksha1729', '$11.54', 900),
  createDataHotStocks('realrainbow_sjy', '$0', 500),
  createDataHotStocks('new_trader_1', '$20.25', 1300),
  createDataHotStocks('wallstreet_cat', '$8.90', 800),
  createDataHotStocks('stockguru', '$150.00', 700),
  createDataHotStocks('cryptoking', '$300.45', 600),
  createDataHotStocks('smallfish', '$50.78', 400),
];

// Data for Latest Transactions
const transactionsRows = [
  createDataTransactions('karma_yogi', 'karma_yogi', '$14.4', 10, 'Sell'),
  createDataTransactions('karma_yogi', 'karma_yogi', '$14.4', 100, 'Sell'),
  createDataTransactions('karma_yogi', 'karma_yogi', '$14.4', 200, 'Buy'),
];

 const Home = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Column Definitions for each table
  const leaderboardColumns = [
    { id: 'rank', label: '#', minWidth: 50 },
    { id: 'username', label: 'Username', minWidth: 100 },
    { id: 'netWorth', label: 'Net Worth', minWidth: 100 },
  ];

  const hotStocksColumns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 70 },
    { id: 'hotness', label: 'Hotness', minWidth: 70 },
  ];

  const transactionsColumns = [
    { id: 'buyer', label: 'Buyer', minWidth: 100 },
    { id: 'stock', label: 'Stock', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 70 },
    { id: 'quantity', label: 'Qut.', minWidth: 50 },
    { id: 'action', label: 'Action', minWidth: 50 },
  ];

  const renderTable = (columns, rows) => (
    <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth: '600px' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: 'lightgray',
                    fontWeight: 'bold',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return <TableCell key={column.id}>{value}</TableCell>;
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', marginLeft:'100px' }}>
      {/* Left side with hottest stocks */}
      <div style={{ flex: 1 }}>
        <h2>Top 10 Hottest Stocks</h2>
        {renderTable(hotStocksColumns, hotStocksRows)}
      </div>

      {/* Right side with leaderboard and transactions stacked */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px', marginLeft:'100px'}}>
        <div>
          <h2>Top 5 Leaderboard</h2>
          {renderTable(leaderboardColumns, leaderboardRows)}
        </div>

        <div>
          <h2>Latest Transactions</h2>
          {renderTable(transactionsColumns, transactionsRows)}
        </div>
      </div>
    </div>
  );
}

export default Home;