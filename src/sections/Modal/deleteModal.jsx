import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { token, url } from '../url';

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
export default function DeleteModal({ open, handleClose, getData, deleteData, endPoint }) {
    const handleDeleteConfirm = (e) => {
        e.preventDefault();
        axios.delete(`${url}/${endPoint}/delete/${deleteData.id}`, {
            headers: {
                "Authorization": `${token}`
            }
        }).then((res) => {
            console.log(res, "dlt res")
            if (res.data.success || res.success) {
                getData();
                handleClose();
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
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
                    <Button onClick={() => handleClose()} variant="contained" color="secondary" sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="primary">
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
