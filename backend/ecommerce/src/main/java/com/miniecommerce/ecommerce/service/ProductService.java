package com.miniecommerce.ecommerce.service;

import com.miniecommerce.ecommerce.model.Product;
import com.miniecommerce.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Add or update product
    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    // Get all products
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    // Get product by ID
    public Optional<Product> getProductById(Long id){
        return productRepository.findById(id);
    }

    // Get products below a stock threshold
    public List<Product> getLowStockProducts(int threshold){
        return productRepository.findByStockLessThan(threshold);
    }

}
