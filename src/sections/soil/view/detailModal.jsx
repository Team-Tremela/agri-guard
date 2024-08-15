import React from 'react';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


/* eslint-disable react/prop-types */
export default function DetailModal({ open, handleClose, data }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Soil Test Details
                </Typography>
                <Stack spacing={2} mt={2}>
                    <Typography><strong>Farmer Name:</strong> {`${data.first_name} ${data.last_name}`}</Typography>
                    <Typography><strong>Farmer ID:</strong> {data.farmer_id}</Typography>
                    <Typography><strong>Address:</strong> {data.address}</Typography>
                    <Typography><strong>Pincode:</strong> {data.pincode}</Typography>
                    <Typography><strong>District:</strong> {data.district}</Typography>
                    <Typography><strong>Mobile No:</strong> {data.mobile_no}</Typography>
                    <Typography><strong>Land Size:</strong> {data.land_size}</Typography>
                    <Typography><strong>Land Type:</strong> {data.land_type}</Typography>
                    <Typography><strong>Crop Name:</strong> {data.crop_name}</Typography>
                    <Typography><strong>Soil Type:</strong> {data.soil_type}</Typography>
                    <Typography><strong>Testing Status:</strong> {data.testing_status}</Typography>
                </Stack>
            </Box>
        </Modal>
    );
}
