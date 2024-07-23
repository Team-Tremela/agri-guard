import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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
const CarbonModal = ({ open, handleClose, editData, getData }) => {
    // const [farmerId, setFarmerId] = useState('');
    const [name, setName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const [landUse, setLandUse] = useState('');
    const [landUseImage, setLandUseImage] = useState('');

    useEffect(() => {
        if (editData) {
            // setFarmerId(editData.farmer_id || '');
            setName(editData.name || '');
            setEmailId(editData.email_id || '');
            setMobileNo(editData.mobile_no || '');
            setAddress(editData.address || '');
            setFarmSize(editData.farm_size || '');
            setLandUse(editData.land_use || '');
            setLandUseImage(editData.land_use_image || '');
        }
    }, [editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCarbonCredit = {
            // farmer_id: farmerId,
            name,
            email_id: emailId,
            mobile_no: mobileNo,
            address,
            farm_size: farmSize,
            land_use: landUse,
            land_use_image: landUseImage,
        };
        axios.post(`${url}/others/carbon-credit`, newCarbonCredit, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((res) => {
                if (res.data.success) {
                    handleClose();
                    getData();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
                            Add Carbon Credit
                        </Typography>
                        <IconButton onClick={handleClose}>
                            {/* <CloseIcon /> */}
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        {/* <TextField
                            fullWidth
                            label="Farmer ID"
                            margin="normal"
                            value={farmerId}
                            variant="outlined"
                            onChange={(e) => setFarmerId(e.target.value)}
                        /> */}
                        <TextField
                            fullWidth
                            label="Name"
                            margin="normal"
                            value={name}
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Email ID"
                            margin="normal"
                            value={emailId}
                            variant="outlined"
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Mobile No"
                            margin="normal"
                            value={mobileNo}
                            variant="outlined"
                            onChange={(e) => setMobileNo(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            margin="normal"
                            value={address}
                            variant="outlined"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Farm Size"
                            margin="normal"
                            value={farmSize}
                            variant="outlined"
                            onChange={(e) => setFarmSize(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Land Use"
                            margin="normal"
                            value={landUse}
                            variant="outlined"
                            onChange={(e) => setLandUse(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Land Use Image URL"
                            margin="normal"
                            value={landUseImage}
                            variant="outlined"
                            onChange={(e) => setLandUseImage(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>

        </>
    );
};

export default CarbonModal;
