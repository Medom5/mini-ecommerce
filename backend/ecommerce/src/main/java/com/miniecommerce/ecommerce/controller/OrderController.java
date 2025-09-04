package com.miniecommerce.ecommerce.controller;

import com.miniecommerce.ecommerce.dto.CreateOrderRequest;
import com.miniecommerce.ecommerce.dto.OrderResponse;
import com.miniecommerce.ecommerce.model.Order;
import com.miniecommerce.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // User: place order
    /**
     * {
     *   "userId": 1,
     *   "items": [
     *     {"product": {"id": 1}, "quantity": 2},
     *     {"product": {"id": 2}, "quantity": 1}
     *   ]
     * }
     */
    @PostMapping("/orders")
    public ResponseEntity<OrderResponse> addOrder(@Valid @RequestBody CreateOrderRequest request) {
        Order order = orderService.placeOrder(request.userId(), request.items());
        return ResponseEntity.status(201).body(orderService.mapToOrderResponse(order));
    }

    // Admin: get all orders
    @GetMapping("/admin/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrdersDto());
    }

}
