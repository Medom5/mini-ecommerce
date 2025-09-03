package com.miniecommerce.ecommerce.dto;

import com.miniecommerce.ecommerce.model.OrderItem;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateOrderRequest(@NotNull(message = "userId is required") Long userId,
                                 @NotEmpty(message = "Order must contain at least one item") List<@NotNull OrderItem> items) {
}
