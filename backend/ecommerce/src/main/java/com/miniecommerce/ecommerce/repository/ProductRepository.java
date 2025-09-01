package com.miniecommerce.ecommerce.repository;

import com.miniecommerce.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // for low stock product
    List<Product> findByStockLessThan(Integer stockThreshold);
}
