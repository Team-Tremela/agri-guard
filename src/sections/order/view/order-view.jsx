import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
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

// import { allOrder } from 'src/_mock/user'; // Assume this is your mock data

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { url, token } from 'src/sections/url';

import { TailSpin } from 'react-loader-spinner';
import ProductModal from './ProductModal';
import TableNoData from '../table-no-data';
import TableToolbar from '../user-table-toolbar';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function OrderPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [allOrder, setAllOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllorder = () => {
      setLoading(true);
      axios.get(`${url}/order/fetch-total-order`, {
        headers: {
          Authorization: `${token}`
        }
      })
        .then((res) => {
          // console.log(res, "res");
          if (res.data.success) {
            setLoading(false);
            setAllOrder(res.data.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    };

    getAllorder();
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

  const handleAcceptOrder = (id) => {
    console.log(`Order ${id} accepted`);
    // Add logic to update order status
  };

  const handleDeclineOrder = (id) => {
    console.log(`Order ${id} declined`);
    // Add logic to update order status
  };

  const dataFiltered = applyFilter({
    inputData: allOrder,
    comparator: getComparator(order, orderBy),
    filterName,
  });

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
        <Typography variant="h4">Orders</Typography>
        <Stack direction="row" spacing={2}>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
          >
            Add Order
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
                  <TableCell sortDirection={orderBy === 'farmer_name' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'farmer_name'}
                      direction={orderBy === 'farmer_name' ? order : 'asc'}
                      onClick={(event) => handleSort(event, 'farmer_name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Date of Order</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                      <TableCell>{row.farmer_name}</TableCell>
                      <TableCell>{row.qty}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.order_status}</TableCell>
                      <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleAcceptOrder(row.id)} color="primary">
                          Accept
                        </Button>
                        <Button onClick={() => handleDeclineOrder(row.id)} color="secondary">
                          Decline
                        </Button>
                      </TableCell>
                      <TableCell><Button color={row.payment_status === "Success" ? "success" : "error"}>{row.payment_status}</Button></TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, allOrder.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={allOrder.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <ProductModal open={openModal} handleClose={handleCloseModal} />
    </Container>
  );
}
