import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
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
import { TailSpin } from 'react-loader-spinner';
import TableNoData from '../table-no-data';
import TableToolbar from '../user-table-toolbar';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import AttributesModal from './AttributesModal';

export default function AttributesPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openDltModal, setOpenDltModal] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [catEditData, setCatEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [loading, setLoading] = useState(false);
  const getAllAttributes = () => {
    setLoading(true);
    axios.get(`${url}/attribute/fetch-all`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((res) => {
        // console.log(res, "res");
        if (res.data.success) {
          setLoading(false);
          setAllCategory(res.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  useEffect(() => {
    getAllAttributes();
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
    inputData: allCategory,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleEdit = (val) => {
    setOpenModal(true);
    setCatEditData(val);
  }
  const handleDelete = (val) => {
    setOpenDltModal(true);
    setDeleteData(val);
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
        <Typography variant="h4">Attribute</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
          >
            Add Attribute
          </Button>
        </Stack>
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          placeholder="Attributes"
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
                  <TableCell>value</TableCell>
                  <TableCell>Regular Price</TableCell>
                  <TableCell>Sales Price</TableCell>
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
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{row.regular_price}</TableCell>
                      <TableCell>{row.sale_price}</TableCell>
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
                  emptyRows={emptyRows(page, rowsPerPage, allCategory.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={allCategory.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <AttributesModal open={openModal} editData={catEditData} handleClose={handleCloseModal} getAllAttributes={getAllAttributes} />
      <DeleteModal open={openDltModal} handleClose={handleCloseDltModal} deleteData={deleteData} getData={getAllAttributes} endPoint='attribute' />
    </Container>
  );
} 