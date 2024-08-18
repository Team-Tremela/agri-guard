import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { url, token } from 'src/sections/url';
import { TailSpin } from 'react-loader-spinner';

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
const ProductModal = ({ open, handleClose, editData, getAllProducts }) => {
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
    const [stockStatus, setStockStatus] = useState('available');
    const [errors, setErrors] = useState({});
    const [allCategory, setAllCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllCategory = () => {
        axios.get(`${url}/category/fetch-all`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((res) => {
                console.log(res, "res");
                if (res.data.success) {
                    setAllCategory(res.data.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        getAllCategory();
    }, []);
    useEffect(() => {
        if (editData) {
            setErrors({});
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

    const validate = () => {
        const tempErrors = {};
        tempErrors.productName = productName ? "" : "Product name is required.";
        tempErrors.shortDescription = shortDescription ? "" : "Short description is required.";
        tempErrors.productCategory = productCategory ? "" : "Product category is required.";
        tempErrors.skuCode = skuCode ? "" : "SKU code is required.";
        tempErrors.stockQuantity = stockQuantity ? "" : "Stock quantity is required.";
        tempErrors.taxCategory = taxCategory ? "" : "Tax category is required.";
        tempErrors.regularPrice = regularPrice ? "" : "Regular price is required.";
        tempErrors.salePrice = salePrice ? "" : "Sale price is required.";
        tempErrors.deliveryCharges = deliveryCharges ? "" : "Delivery charges are required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

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
        setLoading(true);
        e.preventDefault();
        if (validate()) {
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
            axios.post(`${url}/product/add`, payload, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((res) => {
                console.log(res);
                if (res.data.success) {
                    setLoading(false);
                    handleClose();
                    getAllProducts();
                    toast.success('Successfully add product', {
                        position: 'top-right'
                    });
                } else {
                    toast.error('Failed to add product', {
                        position: 'top-right',
                    });
                }
            }).catch((error) => {
                setLoading(false);
                console.log(error);
                toast.error('Failed to add product', {
                    position: 'top-right',
                });
            });
        } else {
            setLoading(false);
        }
    };

    const handleEditProduct = (e) => {
        setLoading(true);
        e.preventDefault();
        if (validate()) {
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
            axios.put(`${url}/product/update/${editData.id}`, payload, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((res) => {
                console.log(res);
                if (res.data.success) {
                    setLoading(false);
                    handleClose();
                    getAllProducts();
                    toast.success('Successfully update product', {
                        position: 'top-right',
                    });
                } else {
                    setLoading(false);
                    toast.error('Failed to update product', {
                        position: 'top-right',
                    });
                }
            }).catch((err) => {
                toast.error('Failed to update product', {
                    position: 'top-right',
                });
                setLoading(false);
                console.error(err);
            })
        }
    };

    return (
        <>
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
                            error={!!errors.productName}
                            helperText={errors.productName}
                        />
                        <TextField
                            fullWidth
                            label="Short Description"
                            margin="normal"
                            variant="outlined"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            error={!!errors.shortDescription}
                            helperText={errors.shortDescription}
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
                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Box>
                        ))}
                        <Button onClick={handleAddLongDescription}>Add Long Description</Button>

                        <FormControl fullWidth margin="normal" error={!!errors.productCategory}>
                            <InputLabel>Product Category</InputLabel>
                            <Select
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                                label="Product Category"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    allCategory?.map((val, i) => (
                                        <MenuItem key={i} value={val.id}>{val.name}</MenuItem>
                                    ))
                                }
                            </Select>
                            {errors.productCategory && (
                                <Typography color="error" variant="caption">
                                    {errors.productCategory}
                                </Typography>
                            )}
                        </FormControl>

                        <TextField
                            fullWidth
                            label="SKU Code"
                            margin="normal"
                            variant="outlined"
                            value={skuCode}
                            onChange={(e) => setSkuCode(e.target.value)}
                            error={!!errors.skuCode}
                            helperText={errors.skuCode}
                        />
                        <TextField
                            fullWidth
                            label="Stock Quantity"
                            margin="normal"
                            variant="outlined"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                            error={!!errors.stockQuantity}
                            helperText={errors.stockQuantity}
                        />

                        <TextField
                            fullWidth
                            label="Tax Category"
                            margin="normal"
                            variant="outlined"
                            value={taxCategory}
                            onChange={(e) => setTaxCategory(e.target.value)}
                            error={!!errors.taxCategory}
                            helperText={errors.taxCategory}
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
                        <TextField
                            fullWidth
                            label="Delivery Charges"
                            margin="normal"
                            variant="outlined"
                            value={deliveryCharges}
                            onChange={(e) => setDeliveryCharges(e.target.value)}
                            error={!!errors.deliveryCharges}
                            helperText={errors.deliveryCharges}
                        />

                        <Box>
                            <Typography variant="h6">Product Display Image</Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setProductDisplayImage)}
                            />
                            {errors.productDisplayImage && (
                                <Typography color="error" variant="caption">
                                    {errors.productDisplayImage}
                                </Typography>
                            )}
                            {productDisplayImage && (
                                <img src={productDisplayImage} alt="Product" style={{ width: '100%', marginTop: '10px' }} />
                            )}
                        </Box>

                        <Box>
                            <Typography variant="h6">Product Gallery Images</Typography>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleMultipleFilesChange(e, setProductGallery)}
                            />
                            {productGallery && productGallery.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Gallery ${index}`}
                                    style={{ width: '100px', marginTop: '10px', marginRight: '10px' }}
                                />
                            ))}
                        </Box>

                        <FormControl component="fieldset" margin="normal">
                            <Typography variant="h6">Stock Status</Typography>
                            <RadioGroup
                                row
                                aria-label="stock-status"
                                value={stockStatus}
                                onChange={(e) => setStockStatus(e.target.value)}
                            >
                                <FormControlLabel
                                    value="available"
                                    control={<Radio />}
                                    label="Available"
                                />
                                <FormControlLabel
                                    value="not_available"
                                    control={<Radio />}
                                    label="Not Available"
                                />
                            </RadioGroup>
                        </FormControl>

                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            {Object.keys(editData).length === 0 ? 'Add Product' : 'Update Product'}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default ProductModal;
