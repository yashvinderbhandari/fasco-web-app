import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../style/newarrivals.module.css';
import Buttons from './Buttons';

function NewArrivals() {
    const [products, setProducts] = useState([]);
    const [showAllProducts, setShowAllProducts] = useState(false); 
    const [showConfirmDialog, setShowConfirmDialog] = useState(null); 
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                if (response.status === 200) {
                    setProducts(response.data);
                } else {
                    console.error('Error fetching products: Status code', response.status);
                }
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts();
    }, []);

    const handleAddProductClick = () => {
        navigate('/add-product');
    };

    const handleEditClick = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setShowConfirmDialog(id);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/products/${productToDelete}`);
            setProducts(products.filter(product => product.id !== productToDelete));
            setShowConfirmDialog(null);
            setProductToDelete(null);
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmDialog(null);
        setProductToDelete(null);
    };

    const handleViewMoreClick = () => {
        setShowAllProducts(true); 
    };

    const displayedProducts = showAllProducts ? products : products.slice(0, 6);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>New Arrivals</h1>
            <div className={styles.content}>
                <p className={styles.paragraph}>Latest Collection of Men's and Women's Fashion Clothes.</p>
                <button className={styles.addButton} onClick={handleAddProductClick}>
                    Add Products
                </button>
            </div>
            <Buttons></Buttons>
            <div className={styles.productGrid}>
                {displayedProducts.map((product) => (
                    <div key={product.id} className={styles.productBlock}>
                        <div className={styles.productImageWrapper}>
                            <img
                                src={`http://localhost:5000/uploads/${product.image}`}
                                alt={product.name}
                                className={styles.productImage}
                            />
                        </div>
                        <div className={styles.iconContainer}>
                            <FaEdit
                                className={styles.icon}
                                onClick={() => handleEditClick(product.id)}
                            />
                            <FaTrash
                                className={styles.icon}
                                onClick={() => handleDeleteClick(product.id)}
                            />
                        </div>
                        {showConfirmDialog === product.id && (
                            <div className={styles.confirmDialog}>
                                <p>CONFIRM DELETE</p>
                                <button className={styles.confirmButton} onClick={handleConfirmDelete}>
                                    Yes
                                </button>
                                <button className={styles.cancelButton} onClick={handleCancelDelete}>
                                    No
                                </button>
                            </div>
                        )}
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productBrand}>{product.brand}</p>
                        <p className={styles.productPrice}>${product.price}</p>
                    </div>
                ))}
            </div>
            {!showAllProducts && products.length > 6 && (
                <button className={styles.viewMoreButton} onClick={handleViewMoreClick}>
                    View More
                </button>
            )}
        </div>
    );
}

export default NewArrivals;
