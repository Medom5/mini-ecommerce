package com.miniecommerce.ecommerce.service;

import com.miniecommerce.ecommerce.dto.OrderItemResponse;
import com.miniecommerce.ecommerce.dto.OrderResponse;
import com.miniecommerce.ecommerce.exceptions.EntityNotFoundException;
import com.miniecommerce.ecommerce.model.Order;
import com.miniecommerce.ecommerce.model.OrderItem;
import com.miniecommerce.ecommerce.model.Product;
import com.miniecommerce.ecommerce.model.User;
import com.miniecommerce.ecommerce.repository.OrderRepository;
import com.miniecommerce.ecommerce.repository.ProductRepository;
import com.miniecommerce.ecommerce.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order placeOrder (Long userId, List<OrderItem> items) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BigDecimal totalPrice = BigDecimal.ZERO;

        // prepare a new order
        Order order = Order.builder()
                .user(user)
                .orderItems(items)
                .total(BigDecimal.ZERO)
                .build();

        for (OrderItem item : items) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found"));

            if (product.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException("Not enough stock for product: " + product.getName());
            }

            // Decrement stock
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);

            // Calculate and set item price
            BigDecimal price = product.getPrice()
                    .multiply(new BigDecimal(item.getQuantity()));
            item.setPrice(price);

            item.setProduct(product);

          totalPrice = totalPrice.add(price);
        }

        order.setOrderItems(items);
        order.setTotal(totalPrice);

        return orderRepository.save(order);
    }

    // admin
    public List<OrderResponse> getAllOrdersDto() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToOrderResponse)
                .toList();
    }



    public OrderResponse mapToOrderResponse(Order order) {
        List<OrderItemResponse> items = order.getOrderItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getPrice(),
                        item.getQuantity(),
                        item.getPrice()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getUser().getId(),
                order.getUser().getEmail(),
                items,
                order.getTotal()
        );
    }

}
