import {
  Box,
  Button,
  Typography
} from '@mui/material';
import NextLink from 'next/link';

export const BenefitEmployeeListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Benefits
      </Typography>
      <Box sx={{ m: 1 }}>
        <NextLink
          href="/benefits_list"
          passHref
        >
          <Button
            color="primary"
            variant="contained"
          >
            Benefits list 
          </Button>
        </NextLink>
      </Box>
    </Box>
    <br></br>
    <hr></hr>
  </Box>
);
