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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import DeleteModal from 'src/sections/Modal/deleteModal';
import Scrollbar from 'src/components/scrollbar';
import { token, url } from 'src/sections/url';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import TableNoData from '../table-no-data';
import TableToolbar from '../user-table-toolbar';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import CategoryModal from './soilModal';
import DetailModal from './detailModal';

export default function SoilPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openDltModal, setOpenDltModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [allSoilTests, setAllSoilTests] = useState([]);
  const [catEditData, setCatEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllSoilTests = () => {
    setLoading(true);
    axios.get(`${url}/soil-test/fetch-soil-test`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          setAllSoilTests(res.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    getAllSoilTests();
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
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const dataFiltered = applyFilter({
    inputData: allSoilTests,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleEdit = (val) => {
    setOpenModal(true);
    setCatEditData(val);
  };

  const handleView = (data) => {
    setOpenDetailModal(true);
    setDetailData(data);
  };

  const handleDelete = (val) => {
    setOpenDltModal(true);
    setDeleteData(val);
  };

  const handleStatusChange = (event, row) => {
    const newStatus = event.target.value;

    // Optimistically update the UI
    const updatedTests = allSoilTests.map(test =>
      test.id === row.id ? { ...test, testing_status: newStatus } : test
    );
    setAllSoilTests(updatedTests);

    // Call the API to update the status in the backend
    axios.put(`${url}/soil-test/update/${row.id}`, {
      testing_status: newStatus
    }, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((res) => {
        if (res.data.success) {
          console.log('Status updated successfully');
          alert(res.data.message);
          toast.success(res.message, {
            position: 'top-right'
          });
          getAllSoilTests();
        } else {
          alert("errorororororor");
          toast.error(res.message, {
            position: 'top-right'
          });
          // Optionally, you can revert the status in the UI if the update fails
          setAllSoilTests(allSoilTests.map(test =>
            test.id === row.id ? { ...test, testing_status: row.testing_status } : test
          ));
        }
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Revert the status in case of an error
        setAllSoilTests(allSoilTests.map(test =>
          test.id === row.id ? { ...test, testing_status: row.testing_status } : test
        ));
      });
  };

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
        <Typography variant="h4">Soil Tests</Typography>
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
                  <TableCell>#</TableCell>
                  <TableCell sortDirection={orderBy === 'first_name' ? order : false}>
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
                  <TableCell>Crop Name</TableCell>
                  <TableCell>Soil Type</TableCell>
                  <TableCell>Testing Status</TableCell>
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
                      selected={selected.indexOf(row.first_name) !== -1}
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                      <TableCell>{row.farmer_id}</TableCell>
                      <TableCell>{row.mobile_no}</TableCell>
                      <TableCell>{row.crop_name}</TableCell>
                      <TableCell>{row.soil_type}</TableCell>
                      <TableCell>
                        <Select
                          value={row.testing_status}
                          onChange={(event) => handleStatusChange(event, row)}
                          displayEmpty
                          fullWidth
                        >
                          <MenuItem value="Booked">Booked</MenuItem>
                          <MenuItem value="Document verification">Document Verification</MenuItem>
                          <MenuItem value="Arrived at lab">Arrived at Lab</MenuItem>
                          <MenuItem value="Sample collected">Sample Collected</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <VisibilityIcon
                            style={{ cursor: 'pointer', color: "green" }}
                            onClick={() => handleView(row)}
                          />
                          <DeleteIcon
                            style={{ cursor: 'pointer', color: "red" }}
                            onClick={() => handleDelete(row)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, allSoilTests.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={allSoilTests.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <CategoryModal open={openModal} editData={catEditData} handleClose={handleCloseModal} getAllSoilTests={getAllSoilTests} />
      <DeleteModal open={openDltModal} handleClose={handleCloseDltModal} deleteData={deleteData} getData={getAllSoilTests} endPoint="soil-test" />
      <DetailModal open={openDetailModal} data={detailData} handleClose={handleCloseDetailModal} /> {/* Add this for the details modal */}
    </Container>
  );
}
