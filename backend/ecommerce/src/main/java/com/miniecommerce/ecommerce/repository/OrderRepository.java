package com.miniecommerce.ecommerce.repository;

import com.miniecommerce.ecommerce.model.Order;
import com.miniecommerce.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user); // get all orders of a user
}
