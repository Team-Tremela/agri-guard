import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { token, url } from 'src/sections/url';

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
const AttributesModal = ({ open, handleClose, editData, getAllAttributes }) => {
    const [attributeName, setAttributeName] = useState('');
    const [attributeValue, setAttributeValue] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editData) {
            setAttributeName(editData.name || '');
            setAttributeValue(editData.value || '');
            setRegularPrice(editData.regular_price || '');
            setSalePrice(editData.sale_price || '');
        }
    }, [editData]);

    const validate = () => {
        const tempErrors = {};
        tempErrors.attributeName = attributeName ? "" : "This field is required.";
        tempErrors.attributeValue = attributeValue ? "" : "This field is required.";
        tempErrors.regularPrice = regularPrice ? "" : "This field is required.";
        tempErrors.salePrice = salePrice ? "" : "This field is required.";

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    }

    const handleAddAttribute = (e) => {
        e.preventDefault();
        if (validate()) {
            const payload = {
                name: attributeName,
                value: attributeValue,
                regular_price: regularPrice,
                sale_price: salePrice,
            };
            axios.post(`${url}/attribute/add`, payload, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((res) => {
                if (res.data.success) {
                    handleClose();
                    getAllAttributes();
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    const handleEditAttribute = (e) => {
        e.preventDefault();
        if (validate()) {
            const payload = {
                name: attributeName,
                value: attributeValue,
                regular_price: regularPrice,
                sale_price: salePrice,
            };
            axios.put(`${url}/attribute/update/${editData.id}`, payload, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((res) => {
                if (res.data.success) {
                    handleClose();
                    getAllAttributes();
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="attribute-modal-title"
        >
            <Box sx={secondaryModalStyle}>
                <Typography id="attribute-modal-title" variant="h6" component="h2">
                    {Object.keys(editData).length === 0 ? 'Add Attribute' : 'Edit Attribute'}
                </Typography>
                <form onSubmit={Object.keys(editData).length === 0 ? handleAddAttribute : handleEditAttribute}>
                    <TextField
                        fullWidth
                        label="Attribute Name"
                        margin="normal"
                        variant="outlined"
                        value={attributeName}
                        onChange={(e) => setAttributeName(e.target.value)}
                        error={!!errors.attributeName}
                        helperText={errors.attributeName}
                    />
                    <TextField
                        fullWidth
                        label="Attribute Value"
                        margin="normal"
                        variant="outlined"
                        value={attributeValue}
                        onChange={(e) => setAttributeValue(e.target.value)}
                        error={!!errors.attributeValue}
                        helperText={errors.attributeValue}
                    />
                    <TextField
                        fullWidth
                        label="Regular Price"
                        margin="normal"
                        variant="outlined"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(e.target.value)}
                        error={!!errors.regularPrice}
                        helperText={errors.regularPrice}
                    />
                    <TextField
                        fullWidth
                        label="Sale Price"
                        margin="normal"
                        variant="outlined"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                        error={!!errors.salePrice}
                        helperText={errors.salePrice}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        {Object.keys(editData).length === 0 ? 'Save Attribute' : 'Update Attribute'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AttributesModal;
