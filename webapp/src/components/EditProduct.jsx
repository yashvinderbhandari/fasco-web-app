import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import styles from '../style/addproduct.module.css'; 

function EditProduct() {
    const { id } = useParams(); 
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productPrice, setProductPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                if (response.status === 200) {
                    const { name, brand, image, price } = response.data;
                    setProductName(name);
                    setProductBrand(brand);
                    setProductImage(image);
                    setProductPrice(price);
                } else {
                    console.error('Error fetching product details: Status code', response.status);
                }
            } catch (error) {
                console.error('Error fetching product details:', error.message);
            }
        };

        fetchProduct();
    }, [id]);

    const handleProductNameChange = (e) => setProductName(e.target.value);
    const handleProductBrandChange = (e) => setProductBrand(e.target.value);
    const handleProductImageChange = (e) => setProductImage(e.target.files[0]);
    const handleProductPriceChange = (e) => setProductPrice(e.target.value);

    const validateForm = () => {
        const errors = {};

        if (!productName) errors.productName = 'Product Name is required.';
        if (!productBrand) errors.productBrand = 'Product Brand is required.';
        if (productPrice <= 0 || isNaN(productPrice)) errors.productPrice = 'Price must be greater than 0.';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('productBrand', productBrand);
            formData.append('productImage', productImage);
            formData.append('productPrice', productPrice);

            try {
                const response = await axios.put(`http://localhost:5000/products/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } catch (error) {
                console.error('Error updating product:', error);
                const errorMsg = error.response?.data?.message || error.message || 'An error occurred while updating the product.';
                setErrors({ submit: errorMsg });
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
            
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                    {errors.productName && <p className={styles.error}>{errors.productName}</p>}
                </div>

            
                <div>
                    <label htmlFor="productBrand">Product Brand:</label>
                    <input
                        type="text"
                        id="productBrand"
                        value={productBrand}
                        onChange={handleProductBrandChange}
                    />
                    {errors.productBrand && <p className={styles.error}>{errors.productBrand}</p>}
                </div>

                <div>
                    <label htmlFor="productImage">Upload Product Image:</label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleProductImageChange}
                    />
                    {errors.productImage && <p className={styles.error}>{errors.productImage}</p>}
                </div>

    
                <div>
                    <label htmlFor="productPrice">Price (in USD):</label>
                    <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                        min="0"
                        step="0.01"
                    />
                    {errors.productPrice && <p className={styles.error}>{errors.productPrice}</p>}
                </div>

                <div>
                    <button type="submit">Update Product</button>
                </div>

                {successMessage && <p className={styles.success}>{successMessage}</p>}
                {errors.submit && <p className={styles.error}>{errors.submit}</p>}
            </form>
        </div>
    );
}

export default EditProduct;
