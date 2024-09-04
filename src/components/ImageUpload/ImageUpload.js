import React, { useState, useEffect } from 'react';
import './ImageUpload.css';

const ImageUpload = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload_image`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setImages([...images, data]);
            } else {
                console.error('Upload failed:', data.error);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_images`);
            const data = await response.json();
            setImages(data.images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete_image/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                setImages(images.filter(image => image.id !== id));
            } else {
                console.error('Delete failed:', data.error);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="image-upload-container">
            <h3>Upload New Image</h3>
            <div className="upload-controls">
                <input type="file" className="file-input" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <h3>Uploaded Images</h3>
            <div className="image-list">
                {images.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image.url} alt={`Uploaded ${image.id}`} />
                        <div className="info-row">
                            <p>ID: {image.id}</p>
                            <button className="delete-button" onClick={() => handleDelete(image.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;
