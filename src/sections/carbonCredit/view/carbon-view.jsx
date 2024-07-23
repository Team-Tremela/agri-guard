import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import DeleteModal from 'src/sections/Modal/deleteModal';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { token, url } from 'src/sections/url';
import TableNoData from '../table-no-data';
import TableToolbar from '../user-table-toolbar';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import CarbonModal from './CarbonModal';

export default function CarbonPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openDltModal, setOpenDltModal] = useState(false);
  const [allCarbonCredits, setAllCarbonCredits] = useState([]);
  const [carbonEditData, setCarbonEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});

  const getAllCarbonCredits = () => {
    axios.get(`${url}/others/fetch-carbon-credit`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((res) => {
        console.log(res, "res");
        if (res.data.success) {
          setAllCarbonCredits(res.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAllCarbonCredits();
  }, []);
  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseDltModal = () => {
    setOpenDltModal(false);
  }
  const dataFiltered = applyFilter({
    inputData: allCarbonCredits,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleEdit = (val) => {
    setOpenModal(true);
    setCarbonEditData(val);
  }
  const handleDelete = (val) => {
    setOpenDltModal(true);
    setDeleteData(val)
  }
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Carbon Credits</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
          >
            Add Carbon Credit
          </Button>
        </Stack>
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell

                  >
                    #
                  </TableCell>
                  <TableCell
                    sortDirection={orderBy === 'name' ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={(event) => handleSort(event, 'name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Farmer Id</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Farm Size</TableCell>
                  <TableCell>Land Use</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow
                      key={row.id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      selected={selected.indexOf(row.name) !== -1}
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.farmer_id}</TableCell>
                      <TableCell>{row.email_id}</TableCell>
                      <TableCell>{row.mobile_no}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.farm_size}</TableCell>
                      <TableCell>{row.land_use}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <EditIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEdit(row)}
                          />
                          <DeleteIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDelete(row)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, allCarbonCredits.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={allCarbonCredits.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <CarbonModal open={openModal} editData={carbonEditData} handleClose={handleCloseModal} getData={getAllCarbonCredits} />
      <DeleteModal open={openDltModal} handleClose={handleCloseDltModal} deleteData={deleteData} getData={getAllCarbonCredits} endPoint="carbon-credit" />
    </Container>
  );
}
