import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
// import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
// import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
const ProductModal = ({ open, handleClose, editData, getAllProducts }) => {
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [attributeModalOpen, setAttributeModalOpen] = useState(false);
    const [taxProfileModalOpen, setTaxProfileModalOpen] = useState(false);

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

    useEffect(() => {
        if (editData) {
            setProductName(editData.product_name || '');
            setShortDescription(editData.short_description || '');
            setLongDescriptions(editData.long_description || [{ title: '', description: '' }]);
            setProductCategory(editData.CategoryId || '');
            setSkuCode(editData.sku_code || '');
            setStockQuantity(editData.stock_qty || '');
            setTaxCategory(editData.tax_category || '');
            setRegularPrice(editData.regular_price || '');
            setSalePrice(editData.sale_price || '');
            setDeliveryCharges(editData.delivery_charges || '');
            setProductDisplayImage(editData.product_single_image || null);
            setProductGallery(editData.product_multiple_image || []);
            setAttributes(editData.prod_attribute || [{ name: '', value: '', regular_price: '', sale_price: '' }]);
            setStockStatus(editData.stock_status === 'Available' ? 'available' : 'not_available');
        }
    }, [editData]);

    const handleCategoryModalOpen = () => setCategoryModalOpen(true);
    const handleCategoryModalClose = () => setCategoryModalOpen(false);

    const handleAttributeModalOpen = () => setAttributeModalOpen(true);
    const handleAttributeModalClose = () => setAttributeModalOpen(false);

    const handleTaxProfileModalOpen = () => setTaxProfileModalOpen(true);

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
        const files = e.target.files;
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
        }).catch((error) => {
            console.log(error);
        })
    };
    const handleEditProduct = (e) => {
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
        axios.put(`${url}/product/update/${editData.id}`, payload, {
            headers: {
                Authorization: `${token}`
            }
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                handleClose();
                getAllProducts();
            }
        })
    };

    // const reviews = [
    //     {
    //         id: 1,
    //         customerName: 'John Doe',
    //         rating: 4,
    //         comment: 'Great product!',
    //     },
    //     {
    //         id: 2,
    //         customerName: 'Jane Smith',
    //         rating: 5,
    //         comment: 'Highly recommend!',
    //     },
    // ];

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
                            {Object.keys(editData).length === 0 ? 'Add Product' : 'Edit Product'}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            {/* <CloseIcon /> */}
                        </IconButton>
                    </Box>
                    <form onSubmit={Object.keys(editData).length === 0 ? handleAddProduct : handleEditProduct}>
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
                                    rows={3}
                                    value={desc.description}
                                    onChange={(e) => handleLongDescriptionChange(index, 'description', e.target.value)}
                                />
                                {index > 0 && (
                                    <IconButton
                                        onClick={() => handleRemoveLongDescription(index)}
                                        size="small"
                                        color="secondary"
                                        style={{ position: 'absolute', top: '-25px', right: 0 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Box>
                        ))}
                        <Button onClick={handleAddLongDescription} variant="contained" color="primary">
                            Add Description
                        </Button>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                                label="Category"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Category 1</MenuItem>
                                <MenuItem value={2}>Category 2</MenuItem>
                                <MenuItem value={3}>Category 3</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="SKU Code"
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
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                        />
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Tax Category</InputLabel>
                            <Select
                                value={taxCategory}
                                onChange={(e) => setTaxCategory(e.target.value)}
                                label="Tax Category"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Tax Category 1</MenuItem>
                                <MenuItem value={2}>Tax Category 2</MenuItem>
                                <MenuItem value={3}>Tax Category 3</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Regular Price"
                            margin="normal"
                            variant="outlined"
                            value={regularPrice}
                            onChange={(e) => setRegularPrice(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Sale Price"
                            margin="normal"
                            variant="outlined"
                            value={salePrice}
                            onChange={(e) => setSalePrice(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Delivery Charges"
                            margin="normal"
                            variant="outlined"
                            value={deliveryCharges}
                            onChange={(e) => setDeliveryCharges(e.target.value)}
                        />
                        <FormControl component="fieldset" className="w-100" margin="normal">
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {Object.keys(editData).length === 0 ? 'Add Product' : 'Update Product'}
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Category Modal */}
            <Modal
                open={categoryModalOpen}
                onClose={handleCategoryModalClose}
                aria-labelledby="category-modal-title"
                aria-describedby="category-modal-description"
            >
                <Box sx={secondaryModalStyle}>
                    <Typography id="category-modal-title" variant="h6" component="h2">
                        Category
                    </Typography>
                    {/* Add content for Category modal here */}
                    <Button onClick={handleCategoryModalClose} variant="contained" color="primary" fullWidth>
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* Attribute Modal */}
            <Modal
                open={attributeModalOpen}
                onClose={handleAttributeModalClose}
                aria-labelledby="attribute-modal-title"
                aria-describedby="attribute-modal-description"
            >
                <Box sx={secondaryModalStyle}>
                    <Typography id="attribute-modal-title" variant="h6" component="h2">
                        Attribute
                    </Typography>
                    {/* Add content for Attribute modal here */}
                    <Button onClick={handleAttributeModalClose} variant="contained" color="primary" fullWidth>
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* Tax Profile Modal */}
            <Modal
                open={taxProfileModalOpen}
                onClose={handleTaxProfileModalOpen}
                aria-labelledby="tax-profile-modal-title"
                aria-describedby="tax-profile-modal-description"
            >
                <Box sx={secondaryModalStyle}>
                    <Typography id="tax-profile-modal-title" variant="h6" component="h2">
                        Tax Profile
                    </Typography>
                    {/* Add content for Tax Profile modal here */}
                    <Button onClick={handleTaxProfileModalOpen} variant="contained" color="primary" fullWidth>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ProductModal;
