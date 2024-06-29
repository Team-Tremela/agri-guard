import axios from 'axios';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';

import { url, token } from 'src/sections/url';

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
const ProductModal = ({ open, handleClose }) => {
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [attributeModalOpen, setAttributeModalOpen] = useState(false);
    const [setTaxProfileModalOpen] = useState(false);

    const [longDescriptions, setLongDescriptions] = useState([{ title: '', description: '' }]);
    const [attributes, setAttributes] = useState([{ name: '', value: '', regular_price: '', sale_price: '' }]);

    const [productName, setProductName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [skuCode, setSkuCode] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [taxCategory, setTaxCategory] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [deliveryCharges, setDeliveryCharges] = useState('');
    const [productDisplayImage, setProductDisplayImage] = useState(null);
    const [productGallery, setProductGallery] = useState([]);
    const [stockStatus, setStockStatus] = useState('available'); // New state for stock status

    const handleCategoryModalOpen = () => setCategoryModalOpen(true);
    const handleCategoryModalClose = () => setCategoryModalOpen(false);

    // const handleAttributeModalOpen = () => setAttributeModalOpen(true);
    const handleAttributeModalClose = () => setAttributeModalOpen(false);

    const handleTaxProfileModalOpen = () => setTaxProfileModalOpen(true);
    // const handleTaxProfileModalClose = () => setTaxProfileModalClose(false);

    const handleAddLongDescription = () => {
        setLongDescriptions([...longDescriptions, { title: '', description: '' }]);
    };

    const handleRemoveLongDescription = (index) => {
        const newLongDescriptions = longDescriptions.filter((_, i) => i !== index);
        setLongDescriptions(newLongDescriptions);
    };

    const handleLongDescriptionChange = (index, field, value) => {
        const newLongDescriptions = longDescriptions.slice();
        newLongDescriptions[index][field] = value;
        setLongDescriptions(newLongDescriptions);
    };

    const handleAddAttribute = () => {
        setAttributes([...attributes, { name: '', value: '', regular_price: '', sale_price: '' }]);
    };

    const handleRemoveAttribute = (index) => {
        const newAttributes = attributes.filter((_, i) => i !== index);
        setAttributes(newAttributes);
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = attributes.slice();
        newAttributes[index][field] = value;
        setAttributes(newAttributes);
    };

    const handleFileChange = (e, setImageCallback) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageCallback(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMultipleFilesChange = (e, setImagesCallback) => {
        const files = e.target.files[0];
        const fileArray = Array.from(files);
        const promises = fileArray.map(file =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            })
        );

        Promise.all(promises)
            .then(base64Images => {
                setImagesCallback(base64Images);
            })
            .catch(error => {
                console.error('Error converting files to base64:', error);
            });
    };


    const handleAddProduct = (e) => {
        e.preventDefault();
        const payload = {
            product_name: productName,
            short_description: shortDescription,
            long_description: longDescriptions,
            CategoryId: productCategory,
            sku_code: skuCode,
            stock_qty: stockQuantity,
            tax_category: taxCategory,
            regular_price: regularPrice,
            sale_price: salePrice,
            prod_attribute: attributes,
            delivery_charges: deliveryCharges,
            product_single_image: productDisplayImage,
            product_multiple_image: productGallery,
        };
        console.log('Payload:', payload);
        axios.post(`${url}/product/add`, payload, {
            headers: {
                Authorization: `${token}`
            }
        }).then((res) => {
            console.log(res);
        })
    };

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
                    <form onSubmit={handleAddProduct}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            margin="normal"
                            variant="outlined"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Short Description"
                            margin="normal"
                            variant="outlined"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                        />

                        {longDescriptions.map((desc, index) => (
                            <Box key={index} mb={2} position="relative">
                                <TextField
                                    fullWidth
                                    label={`Title ${index + 1}`}
                                    margin="normal"
                                    variant="outlined"
                                    value={desc.title}
                                    onChange={(e) => handleLongDescriptionChange(index, 'title', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label={`Description ${index + 1}`}
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={desc.description}
                                    onChange={(e) => handleLongDescriptionChange(index, 'description', e.target.value)}
                                />
                                {index > 0 && <IconButton
                                    onClick={() => handleRemoveLongDescription(index)}
                                    style={{ position: 'absolute', top: '-25px', right: 0 }}
                                >
                                    <DeleteIcon />
                                </IconButton>}
                            </Box>
                        ))}
                        <Button onClick={handleAddLongDescription} sx={{ mt: 2, mb: 2 }}>
                            Add More Description
                        </Button>

                        <TextField
                            fullWidth
                            label="Product Display Image"
                            margin="normal"
                            variant="outlined"
                            type="file"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => handleFileChange(e, setProductDisplayImage)}
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
                            onChange={(e) => handleMultipleFilesChange(e, setProductGallery)}
                        />

                        <Box display="flex" justifyContent="space-between" marginY={2}>
                            <TextField
                                label="Regular Price (INR)"
                                variant="outlined"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={regularPrice}
                                onChange={(e) => setRegularPrice(e.target.value)}
                            />
                            <TextField
                                label="Sale Price (INR)"
                                variant="outlined"
                                type="number"
                                fullWidth
                                margin="normal"
                                sx={{ marginLeft: 2 }}
                                value={salePrice}
                                onChange={(e) => setSalePrice(e.target.value)}
                            />
                        </Box>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Product Category</InputLabel>
                            <Select
                                variant="outlined"
                                label="Product Category"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
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
                            value={skuCode}
                            onChange={(e) => setSkuCode(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Stock Quantity"
                            margin="normal"
                            variant="outlined"
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                        />
                        <FormControl component="fieldset" margin="normal">
                            <Typography>Stock Status</Typography>
                            <RadioGroup
                                row
                                value={stockStatus}
                                onChange={(e) => setStockStatus(e.target.value)}
                            >
                                <FormControlLabel value="available" control={<Radio />} label="Available" />
                                <FormControlLabel value="not_available" control={<Radio />} label="Not Available" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Tax Category</InputLabel>
                            <Select
                                variant="outlined"
                                label="Tax Category"
                                value={taxCategory}
                                onChange={(e) => setTaxCategory(e.target.value)}
                            >
                                <MenuItem value={1}>Tax Type 1</MenuItem>
                                <MenuItem value={2}>Tax Type 2</MenuItem>
                            </Select>
                            <Button onClick={handleTaxProfileModalOpen} sx={{ mt: 2 }}>
                                Add Tax Profile
                            </Button>
                        </FormControl>
                        {attributes.map((attr, index) => (
                            <Box key={index} mb={2} position="relative">
                                <TextField
                                    fullWidth
                                    label={`Attribute Name ${index + 1}`}
                                    margin="normal"
                                    variant="outlined"
                                    value={attr.name}
                                    onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label={`Attribute Value ${index + 1}`}
                                    margin="normal"
                                    variant="outlined"
                                    value={attr.value}
                                    onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label={`Regular Price ${index + 1} (INR)`}
                                    margin="normal"
                                    variant="outlined"
                                    type="number"
                                    value={attr.regular_price}
                                    onChange={(e) => handleAttributeChange(index, 'regular_price', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label={`Sale Price ${index + 1} (INR)`}
                                    margin="normal"
                                    variant="outlined"
                                    type="number"
                                    value={attr.sale_price}
                                    onChange={(e) => handleAttributeChange(index, 'sale_price', e.target.value)}
                                />
                                {index > 0 && <IconButton
                                    onClick={() => handleRemoveAttribute(index)}
                                    style={{ position: 'absolute', top: '-25px', right: 0 }}
                                >
                                    <DeleteIcon />
                                </IconButton>}
                            </Box>
                        ))}
                        <Button onClick={handleAddAttribute} sx={{ mt: 2, mb: 2 }}>
                            Add More Attributes
                        </Button>
                        <TextField
                            fullWidth
                            label="Delivery Charges Settings"
                            margin="normal"
                            variant="outlined"
                            value={deliveryCharges}
                            onChange={(e) => setDeliveryCharges(e.target.value)}
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
                            Save product
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

            {/* <Modal
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
            </Modal> */}
        </>
    );
};

export default ProductModal;
