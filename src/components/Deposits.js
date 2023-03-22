import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Shipping Address</Title>
      <Typography component="p" variant="h4">
        123 Main St
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Oakland, CA 95666
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          
        </Link>
      </div>
    </React.Fragment>
  );
}