import React from 'react';
// import Stack from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
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
export default function FarmerDetailsModal({ open, handleClose, farmerDetails }) {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Farmer Details
                    <p className='text-dark'>{farmerDetails?.length === 0 && "No data found"}</p>
                </Typography>
                {farmerDetails && farmerDetails?.map((val, i) => (
                    <Box key={i}>
                        <Typography variant="body1"><strong>Farm ID:</strong> {val.farm_id}</Typography>
                        <Typography variant="body1"><strong>Farm Name:</strong> {val.farm_name}</Typography>
                        <Typography variant="body1"><strong>Village Name:</strong> {val.farm_village_name}</Typography>
                        <Typography variant="body1"><strong>Area Name:</strong> {val.farm_area_name}</Typography>
                        <Typography variant="body1"><strong>Post Office:</strong> {val.farm_post_office || 'N/A'}</Typography>
                        <Typography variant="body1"><strong>Pin Code:</strong> {val.farm_pin_code}</Typography>
                        <Typography variant="body1"><strong>District:</strong> {val.farm_district}</Typography>
                        <Typography variant="body1"><strong>State:</strong> {val.farm_state}</Typography>
                        <Typography variant="body1"><strong>Soil Type:</strong> {val.soil_type}</Typography>
                        <Typography variant="body1"><strong>NPK:</strong> {val.npk}</Typography>
                        <Typography variant="body1"><strong>Farm Area:</strong> {val.farm_area}</Typography>
                        <Typography variant="body1"><strong>Farm Size Type:</strong> {val.farm_size_type}</Typography>
                        <Typography variant="body1"><strong>Khasra No:</strong> {val.khasra_no}</Typography>
                        <Typography variant="body1"><strong>Crops:</strong> {val.crop_names?.join(',    ')}</Typography>
                        <Typography variant="body1"><strong>Farm Location:</strong> {val.farm_loc}</Typography>
                        <Typography variant="body1"><strong>Company Name:</strong> {val.company_name || 'N/A'}</Typography>
                        <Typography variant="body1"><strong>FPO Code:</strong> {val.fpo_code || 'N/A'}</Typography>
                    </Box>
                ))}

            </Box>
        </Modal>
    );
}
