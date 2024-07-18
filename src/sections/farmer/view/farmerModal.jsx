import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import Rating from '@mui/material/Rating';
// import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
// import FormControl from '@mui/material/FormControl';
// import CardContent from '@mui/material/CardContent';
import { token, url } from 'src/sections/url';
import axios from 'axios';

const mainModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
    scrollbars: 'none',
    borderRadius: '10px',
};

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

/* eslint-disable react/prop-types */
const FarmerModal = ({ open, handleClose, editData, getAllCategory }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [attributeModalOpen, setAttributeModalOpen] = useState(false);
    const [taxProfileModalOpen, setTaxProfileModalOpen] = useState(false);

    const handleCategoryModalOpen = () => setCategoryModalOpen(true);
    const handleCategoryModalClose = () => setCategoryModalOpen(false);

    const handleAttributeModalOpen = () => setAttributeModalOpen(true);
    const handleAttributeModalClose = () => setAttributeModalOpen(false);

    const handleTaxProfileModalOpen = () => setTaxProfileModalOpen(true);
    const handleTaxProfileModalClose = () => setTaxProfileModalOpen(false);
    useEffect(() => {
        if (editData) {
            setCategoryName(editData.name || '');
        }
    }, [editData]);
    const handleAddCategory = (e) => {
        e.preventDefault();
        const payload = {
            name: categoryName,
        };
        axios.post(`${url}/category/add`, payload, {
            headers: {
                Authorization: `${token}`
            }
        }).then((res) => {
            if (res.data.success) {
                handleClose();
                getAllCategory();
            }
        }).catch((error) => {
            console.log(error);
        })
    };
    const handleEditCategory = (e) => {
        e.preventDefault();
        const payload = {
            name: categoryName
        }
        axios.put(`${url}/category/update/${editData.id}`, payload, {
            headers: {
                Authorization: `${token}`
            }
        }).then((res) => {
            if (res.data.success) {
                handleClose();
                getAllCategory();
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={mainModalStyle}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Category
                        </Typography>
                        <IconButton onClick={handleClose}>
                            {/* <CloseIcon /> */}
                        </IconButton>
                    </Box>
                    <form onSubmit={Object.keys(editData)?.length === 0 ? handleAddCategory : handleEditCategory}>
                        <TextField
                            fullWidth
                            label="Category Name"
                            margin="normal"
                            value={categoryName}
                            variant="outlined"
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                        >
                            Add Category
                        </Button>
                    </form>
                </Box>
            </Modal>

            <Modal
                open={categoryModalOpen}
                onClose={handleCategoryModalClose}
                aria-labelledby="category-modal-title"
            >
                <Box sx={secondaryModalStyle}>
                    <Typography id="category-modal-title" variant="h6" component="h2">
                        Add Category
                    </Typography>
                    <TextField
                        fullWidth
                        label="Category Name"
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Save Category
                    </Button>
                </Box>
            </Modal>

            <Modal
                open={attributeModalOpen}
                onClose={handleAttributeModalClose}
                aria-labelledby="attribute-modal-title"
            >
                <Box sx={secondaryModalStyle}>
                    <Typography id="attribute-modal-title" variant="h6" component="h2">
                        Add Attribute
                    </Typography>
                    <TextField
                        fullWidth
                        label="Attribute Name"
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Save Attribute
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default FarmerModal;
