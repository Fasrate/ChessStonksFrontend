import * as React from 'react';
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const columns = [
  { id: 'rank', label: '#', minWidth: 100 },
  { id: 'username', label: 'Username', minWidth: 170 },
  {
    id: 'cash',
    label: 'Cash',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
  {
    id: 'stock_money',
    label: 'Stock Money',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
  {
    id: 'net_worth',
    label: 'Net Worth',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  },
];

export default function Leaderboard() {
  const { username } = useParams();

  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/standings');
        const data = response.data;
        const formattedRows = data.map((item, index) => ({
          rank: index + 1,
          username: item.username,
          cash: item.cash,
          stock_money: item.stock_money,
          net_worth: item.net_worth,
        }));

        // Sort rows by net worth
        formattedRows.sort((a, b) => b.net_worth - a.net_worth);
        const userData = formattedRows.find(item => item.username === username);

        // Prepare final formatted rows
        const finalFormattedRows = [];
        if (userData) {
          finalFormattedRows.push(userData);
        }

        // Push all rows excluding the user to the final rows
        finalFormattedRows.push(...formattedRows);

        console.log("finaldata:", finalFormattedRows);

        setRows(finalFormattedRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

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
        Ranklist
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
            .map((row, index) => {
              const isHighlighted = index === 0; // Check if it's the user's row
              return (
                <TableRow
                hover={!isHighlighted}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.username}
                  sx={{
                    backgroundColor: isHighlighted ? '#5791e6' : 'inherit',
                    fontWeight: isHighlighted ? 'bold' : 'normal'
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
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
