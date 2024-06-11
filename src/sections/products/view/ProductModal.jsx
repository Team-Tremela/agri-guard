import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';

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

const ProductModal = ({ open = true, handleClose }) => {
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [attributeModalOpen, setAttributeModalOpen] = useState(false);
    const [taxProfileModalOpen, setTaxProfileModalOpen] = useState(false);

    const handleCategoryModalOpen = () => setCategoryModalOpen(true);
    const handleCategoryModalClose = () => setCategoryModalOpen(false);

    const handleAttributeModalOpen = () => setAttributeModalOpen(true);
    const handleAttributeModalClose = () => setAttributeModalOpen(false);

    const handleTaxProfileModalOpen = () => setTaxProfileModalOpen(true);
    const handleTaxProfileModalClose = () => setTaxProfileModalOpen(false);

    const reviews = [
        {
            id: 1,
            customerName: 'John Doe',
            rating: 4,
            comment: 'Great product!',
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            rating: 5,
            comment: 'Highly recommend!',
        },
        // Add more reviews here
    ];

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
                            Add Product
                        </Typography>
                        <IconButton onClick={handleClose}>
                            {/* <CloseIcon /> */}
                        </IconButton>
                    </Box>
                    <form>
                        <TextField
                            fullWidth
                            label="Product Name"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Short Description"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Long Description"
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                        <TextField
                            fullWidth
                            label="Product Display Image"
                            margin="normal"
                            variant="outlined"
                            type="file"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Product Gallery"
                            margin="normal"
                            variant="outlined"
                            type="file"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ multiple: true }}
                        />
                        <Box display="flex" justifyContent="space-between" marginY={2}>
                            <TextField
                                label="Regular Price (INR)"
                                variant="outlined"
                                type="number"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Sale Price (INR)"
                                variant="outlined"
                                type="number"
                                fullWidth
                                margin="normal"
                                sx={{ marginLeft: 2 }}
                            />
                        </Box>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Product Category</InputLabel>
                            <Select
                                variant="outlined"
                                label="Product Category"
                            // Add your options here
                            >
                                <MenuItem value={1}>Category 1</MenuItem>
                                <MenuItem value={2}>Category 2</MenuItem>
                            </Select>
                            <Button onClick={handleCategoryModalOpen} sx={{ mt: 2 }}>
                                Add Category
                            </Button>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Product SKU Code"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Stock Quantity"
                            margin="normal"
                            variant="outlined"
                            type="number"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Tax Category</InputLabel>
                            <Select
                                variant="outlined"
                                label="Tax Category"
                            // Add your options here
                            >
                                <MenuItem value={1}>Tax Type 1</MenuItem>
                                <MenuItem value={2}>Tax Type 2</MenuItem>
                            </Select>
                            <Button onClick={handleTaxProfileModalOpen} sx={{ mt: 2 }}>
                                Add Tax Profile
                            </Button>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Attributes</InputLabel>
                            <Select
                                variant="outlined"
                                label="Attributes"
                            // Add your options here
                            >
                                <MenuItem value={1}>Attributes Type 1</MenuItem>
                                <MenuItem value={2}>Attributes Type 2</MenuItem>
                            </Select>
                            <Button onClick={handleAttributeModalOpen} sx={{ mt: 2 }}>
                                Add Attributes
                            </Button>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Delivery Charges Settings"
                            margin="normal"
                            variant="outlined"
                        />
                        <Typography variant="h6" component="h3" sx={{ mt: 4, mb: 2 }}>
                            Customer Reviews
                        </Typography>
                        {reviews.map((review) => (
                            <Card key={review.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1">
                                        {review.customerName}
                                    </Typography>
                                    <Rating value={review.rating} readOnly />
                                    <Typography variant="body2" color="textSecondary">
                                        {review.comment}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                        >
                            Add Product
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

            <Modal
                open={taxProfileModalOpen}
                onClose={handleTaxProfileModalClose}
                aria-labelledby="tax-profile-modal-title"
            >
                <Box sx={secondaryModalStyle}>
                    <Typography id="tax-profile-modal-title" variant="h6" component="h2">
                        Add Tax Profile
                    </Typography>
                    <TextField
                        fullWidth
                        label="Tax Profile Name"
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Save Tax Profile
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ProductModal;
