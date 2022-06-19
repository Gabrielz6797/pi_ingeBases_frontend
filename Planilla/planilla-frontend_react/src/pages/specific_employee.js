import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { SpecificEmployeeProfile } from '../components/specificEmployee/specific-employee-profile';
import { SpecificEmployeeProfileDetails } from '../components/specificEmployee/specific-employee-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';

class SpecificEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isLoaded: false,
      APIUrl: 'https://localhost:7150/api/viewEmployee?id='+sessionStorage.getItem('employeeToVisualize'),
    };
  }

  componentDidMount() {
    // var data = {id: localStorage.getItem('id')};
    axios.get(this.state.APIUrl).then(response => {
      this.setState({ isLoaded: true, user: (response.data)[0] });
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <Head>
            <title>
              Employee Info | Ta' Bueno
            </title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8
            }}
          >
            <Container maxWidth="lg">
              <Typography
                sx={{ mb: 3 }}
                variant="h4"
              >
                Employee's Account
              </Typography>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <SpecificEmployeeProfile user={this.state.user}/>
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xs={12}
                >
                  <SpecificEmployeeProfileDetails user={this.state.user}/>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );
    }
  }
}

SpecificEmployee.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default SpecificEmployee;
