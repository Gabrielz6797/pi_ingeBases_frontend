import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      APIUrl: 'https://localhost:7150/api/employees',
    };
  }

  componentDidMount() {
    // Using Fetch(), JavaScript method.
    // fetch('https://localhost:7150/api/employees')
    //   .then(response => response.json())
    //   .then(data => this.setState({ customers: data }));

    // Using Axios, React library.
    axios.get(this.state.APIUrl).then(response => {
      this.setState({ customers: response.data });
    });
  }

  render() {
    // This is just something extra required for the library for searching, it is NOT a must to use.
    this.state.customers.forEach(customer => {
      customer.id = uuid();
    });

    return (
      <>
        <Head>
          <title>
            Customers | Material Kit
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbar />
            <Box sx={{ mt: 3 }}>
              <CustomerListResults customers={this.state.customers} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
