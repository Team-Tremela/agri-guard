import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import { token, url } from 'src/sections/url';

/* eslint-disable react/prop-types */
const AddBlogModal = ({ open, editData, handleClose, getAllBlogs }) => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogImage, setBlogImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoThumbnail, setVideoThumbnail] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    useEffect(() => {
        if (editData) {
            setBlogTitle(editData.blog_title || '');
            setBlogContent(editData.blog_content || '');
            setBlogImage(editData.blog_image || '');
            setVideoUrl(editData.video_url || '');
            setVideoThumbnail(editData.video_thumbnail || '');
            setCategory(editData.category || '');
            setTags(editData.tags || []);
        }
    }, [editData]);
    const handleSave = () => {
        const payload = {
            blog_title: blogTitle,
            blog_content: blogContent,
            blog_image: blogImage,
            video_url: videoUrl,
            video_thumbnail: videoThumbnail,
            category,
            tags,
        };
        axios.post(`${url}/blog/add`, payload, {
            headers: {
                Authorization: `${token}`
            }
        }).then((res) => {
            if (res.data.success) {
                getAllBlogs();
                handleClose();
            }
        }).catch((error) => {
            console.log(error);
        })

    };
    const handleEdit = () => {
        const payload = {
            blog_title: blogTitle,
            blog_content: blogContent,
            blog_image: blogImage,
            video_url: videoUrl,
            video_thumbnail: videoThumbnail,
            category,
            tags,
        };
        axios.put(`${url}/blog/update/${editData.id}`, payload, {
            headers: {
                Authorization: `${token}`
            }
        }).then((res) => {
            if (res.data.success) {
                getAllBlogs();
                handleClose();
            }
        }).catch((error) => {
            console.log(error);
        })

    };

    const handleTagChange = (event) => {
        setTags(event.target.value);
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setBlogImage(base64String);  // Store the base64 string in the state
                console.log(base64String);   // Log the base64 string for verification
            };
            reader.readAsDataURL(file);  // Convert the file to a base64 string
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>{Object.keys(editData).length > 0 ? 'Edit' : 'Add'} New Blog</DialogTitle>
            <DialogContent>
                <TextField
                    label="Blog Title"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Blog Content"
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />

                <input
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                    style={{ margin: '16px 0' }}
                />
                <TextField
                    label="Video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Video Thumbnail URL"
                    value={videoThumbnail}
                    onChange={(e) => setVideoThumbnail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                    >
                        <MenuItem value="Programming">Programming</MenuItem>
                        <MenuItem value="Design">Design</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tags</InputLabel>
                    <Select
                        multiple
                        value={tags}
                        onChange={handleTagChange}
                        input={<OutlinedInput label="Tags" />}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} style={{ marginRight: 4 }} />
                                ))}
                            </div>
                        )}
                    >
                        <MenuItem value="Node.js">Node.js</MenuItem>
                        <MenuItem value="JavaScript">JavaScript</MenuItem>
                        <MenuItem value="Backend">Backend</MenuItem>
                        <MenuItem value="Web Development">Web Development</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={Object.keys(editData).length === 0 ? handleSave : handleEdit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBlogModal;