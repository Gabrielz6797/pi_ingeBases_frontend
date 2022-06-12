import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { BenefitListResults } from '../components/benefit/benefit-list-results';
import { BenefitListToolbar } from '../components/benefit/benefit-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

class Benefits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      benefits: [],
      APIUrl: 'https://localhost:7150/api/benefits',
    };
  }
  componentDidMount() {
    // -------------------------------------------------------------------
    // Eliminar esta linea cuando la conexi�n con los proyectos est� lista
    sessionStorage.setItem("project", "TaBueno Planilla CR");
    // -------------------------------------------------------------------
    
    axios.get(this.state.APIUrl + "?email=" + sessionStorage.getItem("email") + "&project=" + sessionStorage.getItem("project")).then(response => {
      this.setState({ benefits: response.data });
    });
  }

  render() {
    return (
      <>
        <Head>
          <title>
            Benefits | Material Kit
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
            <BenefitListToolbar />
            <Box sx={{ mt: 3 }}>
              <BenefitListResults benefits={this.state.benefits} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}

Benefits.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Benefits;
