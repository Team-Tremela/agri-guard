import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import DeleteModal from 'src/sections/Modal/deleteModal';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { token, url } from 'src/sections/url';
import { TailSpin } from 'react-loader-spinner';
import TableNoData from '../table-no-data';
import TableToolbar from '../user-table-toolbar';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import FarmerModal from './farmerModal';
import FarmerDetailsModal from './detailModal';

export default function FarmerPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openDltModal, setOpenDltModal] = useState(false);
  const [allFarmers, setAllFarmers] = useState([]);
  const [catEditData, setCatEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAllFarmers = () => {
    setLoading(true)
    axios.get(`${url}/farmer/fetch-total-farmer`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((res) => {
        console.log(res, "res");
        if (res.data.success) {
          setLoading(false);
          setAllFarmers(res.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  useEffect(() => {
    getAllFarmers();
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

  // const handleOpenModal = () => {
  //   setOpenModal(true);
  // };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseDltModal = () => {
    setOpenDltModal(false);
  }
  const dataFiltered = applyFilter({
    inputData: allFarmers,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  // const handleEdit = (val) => {
  //   setOpenModal(true);
  //   setCatEditData(val);
  // }
  const handleView = (data) => {
    setFarmerDetails(data.farm_details);
    setOpenDetailsModal(true); 
  }
  const handleDelete = (val) => {
    setOpenDltModal(true);
    setDeleteData({ id: val })
  }
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TailSpin
            visible
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
          />
        </Box>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Farmers</Typography>
        <Stack direction="row" spacing={2}>
          {/* <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
          >
            Add Farmer
          </Button> */}
        </Stack>
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          placeholder="Farmer"
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
                    sortDirection={orderBy === 'first_name' ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === 'first_name'}
                      direction={orderBy === 'first_name' ? order : 'asc'}
                      onClick={(event) => handleSort(event, 'first_name')}
                    >
                      Farmer Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Farmer Id</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
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
                      <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                      <TableCell>{row.farmer_id}</TableCell>
                      <TableCell>{row.mobile_no}</TableCell>
                      <TableCell>{row.email_id}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {/* <EditIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEdit(row)}
                          /> */}
                          <VisibilityIcon
                            style={{ cursor: 'pointer', color: "green" }}
                            onClick={() => handleView(row)}
                          />
                          <DeleteIcon
                            style={{ cursor: 'pointer', color: "red" }}
                            onClick={() => handleDelete(row.farmer_id)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, allFarmers.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={allFarmers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <FarmerDetailsModal open={openDetailsModal} handleClose={() => setOpenDetailsModal(false)} farmerDetails={farmerDetails} />
      <FarmerModal open={openModal} editData={catEditData} handleClose={handleCloseModal} getAllFarmers={getAllFarmers} />
      <DeleteModal open={openDltModal} handleClose={handleCloseDltModal} deleteData={deleteData} endPoint="farmer" getData={getAllFarmers} />
    </Container>
  );
}