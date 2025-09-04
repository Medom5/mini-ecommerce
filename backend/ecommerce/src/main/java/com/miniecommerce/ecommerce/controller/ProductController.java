package com.miniecommerce.ecommerce.controller;

import com.miniecommerce.ecommerce.model.Product;
import com.miniecommerce.ecommerce.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Admin: Add product
    @PostMapping("/admin/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedproduct = productService.saveProduct(product);
        return ResponseEntity.status(201).body(savedproduct);
    }

    // User: List all products
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product>  products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // Admin: List low-stock products
    @GetMapping("/admin/low-stock")
    public ResponseEntity<List<Product>> getLowStockProducts() {
        List<Product> lowStock = productService.getLowStockProducts(5);
        return ResponseEntity.ok(lowStock);
    }
}
