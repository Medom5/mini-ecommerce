package com.miniecommerce.ecommerce.dto;

import java.math.BigDecimal;
import java.util.List;

public record OrderResponse(
        Long orderId,
        Long userId,
        String username,
        List<OrderItemResponse> items,
        BigDecimal total
) {}
