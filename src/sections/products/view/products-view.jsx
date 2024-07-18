import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
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
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';

import { farmingProducts } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { url, token } from 'src/sections/url';

import ProductModal from './ProductModal';
import TableNoData from '../table-no-data';
import TableToolbar from '../user-table-toolbar';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

const secondaryModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [allProduts, setAllProducts] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [dltId, setDltId] = useState('');
  const [editData, setEditData] = useState({});
  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const getAllProducts = () => {
    axios.get(`${url}/product/fetch-all`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((res) => {
        console.log(res, "res");
        if (res.data.success) {
          setAllProducts(res.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

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
    setEditData({});
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = (product) => {
    // Handle edit product logic here
    console.log('Edit product', product);
    setEditData(product);
    setOpenModal(true);
    // Pass the product details to the modal or set in state
  };

  const handleDelete = (product) => {
    setDeleteModal(true);
    setDltId(product.id)
  };
  const handleDeleteConfirm = async () => {
    await axios.delete(`${url}/product/delete/${dltId}`, {
      headers: {
        Authorization: `${token}`
      }
    }).then((res) => {
      if (res.data.success) {
        setDeleteModal(false);
        getAllProducts();
      }
    }).catch((err) => {
      console.error(err);
    })
  }
  const dataFiltered = applyFilter({
    inputData: allProduts,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={() => console.log('Import button clicked')}
          >
            Import
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:cloud-download-fill" />}
            onClick={() => console.log('Export button clicked')}
          >
            Export
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
          >
            Add Product
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
                  <TableCell>SKU</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Added Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      selected={selected.indexOf(row.name) !== -1}
                    >
                      <TableCell>{row.product_name}</TableCell>
                      <TableCell>{row.sku_code}</TableCell>
                      <TableCell>{row.stock_qty}</TableCell>
                      <TableCell>{row.regular_price}</TableCell>
                      <TableCell>{row.CategoryId}</TableCell>
                      <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
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
                  emptyRows={emptyRows(page, rowsPerPage, farmingProducts.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={farmingProducts.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <ProductModal open={openModal} editData={editData} getAllProducts={getAllProducts} handleClose={handleCloseModal} />
      {/* delete modal */}
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={secondaryModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this item?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={() => setDeleteModal(false)} variant="contained" color="secondary" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="contained" color="primary">
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
