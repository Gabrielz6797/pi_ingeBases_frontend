import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const BenefitListResults = ({ benefits, ...rest }) => {
  const [selectedBenefitIds, setSelectedBenefitIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedBenefitIds;

    if (event.target.checked) {
        newSelectedBenefitIds = benefits.map((benefit) => benefit.nombreBeneficio);
    } else {
      newSelectedBenefitIds = [];
    }

    setSelectedBenefitIds(newSelectedBenefitIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBenefitIds.indexOf(id);
    let newSelectedBenefitIds = [];

    if (selectedIndex === -1) {
      newSelectedBenefitIds = newSelectedBenefitIds.concat(selectedBenefitIds, id);
    } else if (selectedIndex === 0) {
      newSelectedBenefitIds = newSelectedBenefitIds.concat(selectedBenefitIds.slice(1));
    } else if (selectedIndex === selectedBenefitIds.length - 1) {
      newSelectedBenefitIds = newSelectedBenefitIds.concat(selectedBenefitIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBenefitIds = newSelectedBenefitIds.concat(
        selectedBenefitIds.slice(0, selectedIndex),
        selectedBenefitIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBenefitIds(newSelectedBenefitIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedBenefitIds.length === benefits.length}
                    color="primary"
                    indeterminate={
                      selectedBenefitIds.length > 0
                      && selectedBenefitIds.length < benefits.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Project Name
                </TableCell>



              </TableRow>
            </TableHead>
            <TableBody>
              {benefits.slice(0, limit).map((benefit) => (
                <TableRow
                  hover
                      key={benefit.nombreBeneficio}
                      selected={selectedBenefitIds.indexOf(benefit.nombreBeneficio) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                              checked={selectedBenefitIds.indexOf(benefit.nombreBeneficio) !== -1}
                              onChange={(event) => handleSelectOne(event, benefit.nombreBeneficio)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={benefit.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                         {getInitials(benefit.nombreBeneficio)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                                  {benefit.nombreBeneficio}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                          {benefit.nombreProyecto}
                  </TableCell>



                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={benefits.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BenefitListResults.propTypes = {
  benefits: PropTypes.array.isRequired
};
