import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '21 Mar, 2023',
    'Mr John Smith',
    'Reactville, Anytown',
    'VISA ⠀•••• 1234',
    60.44,
  ),
  createData(
    0,
    '21 Mar, 2023',
    'Mr John Smith',
    'Reactville, Anytown',
    'VISA ⠀•••• 1234',
    60.44,
  ),
  createData(
    0,
    '21 Mar, 2023',
    'Mr John Smith',
    'Reactville, Anytown',
    'VISA ⠀•••• 1234',
    60.44,
  ),
  createData(
    0,
    '21 Mar, 2023',
    'Mr John Smith',
    'Reactville, Anytown',
    'VISA ⠀•••• 1234',
    60.44,
  ),
  createData(
    0,
    '21 Mar, 2023',
    'Mr John Smith',
    'Reactville, Anytown',
    'VISA ⠀•••• 1234',
    60.44,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}