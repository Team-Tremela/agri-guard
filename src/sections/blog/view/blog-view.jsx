import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
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
// import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
// import DeleteModal from 'src/sections/Modal/deleteModal';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { token, url } from 'src/sections/url';
import { TailSpin } from 'react-loader-spinner';
import DeleteModal from 'src/sections/Modal/deleteModal';
import TableNoData from '../table-no-data';
import TableToolbar from '../user-table-toolbar';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import AddBlogModal from './AddBlogModal';
// import FarmerModal from './farmerModal';
// import FarmerDetailsModal from './detailModal';

export default function BlogPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openDltModal, setOpenDltModal] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [blogEditData, setBlogEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAllBlogs = () => {
    setLoading(true)
    axios.get(`${url}/blog/fetch-all`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((res) => {
        console.log(res, "res");
        if (res.data.success) {
          setLoading(false);
          setBlogList(res.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  useEffect(() => {
    getAllBlogs();
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
    setBlogEditData({});
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseDltModal = () => {
    setOpenDltModal(false);
  }
  const dataFiltered = applyFilter({
    inputData: blogList,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleEdit = (val) => {
    setOpenModal(true);
    setBlogEditData(val);
  }
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
        <Typography variant="h4">Blogs</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
          >
            Add Blogs
          </Button>
        </Stack>
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          placeholder="Blog Title"
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell
                    sortDirection={orderBy === 'blog_title' ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === 'blog_title'}
                      direction={orderBy === 'blog_title' ? order : 'asc'}
                      onClick={(event) => handleSort(event, 'blog_title')}
                    >
                      Blog Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Blog Image</TableCell>
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
                      selected={selected.indexOf(row.blog_title) !== -1}
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{row.blog_title}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.tags.join(', ')}</TableCell>
                      <TableCell>
                        <img
                          src={row.blog_image}
                          alt={row.blog_title}
                          style={{ width: '50px', height: '50px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <EditIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEdit(row)}
                          />
                          <DeleteIcon
                            style={{ cursor: 'pointer', color: "red" }}
                            onClick={() => handleDelete(row.id)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, blogList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={blogList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <AddBlogModal open={openModal} editData={blogEditData} setBlogEditData={setBlogEditData} handleClose={handleCloseModal} getAllBlogs={getAllBlogs} />
      <DeleteModal open={openDltModal} handleClose={handleCloseDltModal} deleteData={deleteData} endPoint="blog" getData={getAllBlogs} />
      {/* <FarmerDetailsModal open={openDetailsModal} handleClose={() => setOpenDetailsModal(false)} farmerDetails={farmerDetails} />
      <DeleteModal open={openDltModal} handleClose={handleCloseDltModal} deleteData={deleteData} endPoint="farmer" getData={getAllBlogs} /> */}
    </Container>
  );
}