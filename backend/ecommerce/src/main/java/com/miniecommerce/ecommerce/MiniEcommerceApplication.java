package com.miniecommerce.ecommerce;

import com.miniecommerce.ecommerce.model.Product;
import com.miniecommerce.ecommerce.repository.ProductRepository;
import com.miniecommerce.ecommerce.repository.UserRepository;
import com.miniecommerce.ecommerce.service.ProductService;
import com.miniecommerce.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;

@SpringBootApplication
@RequiredArgsConstructor
public class MiniEcommerceApplication implements CommandLineRunner {

	private final UserService userService;
	private final ProductService productService;

	public static void main(String[] args) {
		SpringApplication.run(MiniEcommerceApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		// Users
		if (userService.findByEmail("admin@example.com").isEmpty()) {
			userService.registerUser("admin@example.com", "123", "ADMIN");
		}
		if (userService.findByEmail("user@example.com").isEmpty()) {
			userService.registerUser("user@example.com", "123", "USER");
		}

		// Products
		if (productService.getAllProducts().isEmpty()) {
			productService.saveProduct(Product.builder().name("Laptop").price(new BigDecimal("1500")).stock(4).build());
			productService.saveProduct(Product.builder().name("Phone").price(new BigDecimal("800")).stock(3).build());
			productService.saveProduct(Product.builder().name("Tablet").price(new BigDecimal("400")).stock(2).build());
			productService.saveProduct(Product.builder().name("Headphones").price(new BigDecimal("200")).stock(4).build());
			productService.saveProduct(Product.builder().name("Monitor").price(new BigDecimal("350")).stock(1).build());
			productService.saveProduct(Product.builder().name("Keyboard").price(new BigDecimal("120")).stock(1).build());
			productService.saveProduct(Product.builder().name("Mouse").price(new BigDecimal("60")).stock(8).build());
			productService.saveProduct(Product.builder().name("Printer").price(new BigDecimal("250")).stock(12).build());
			productService.saveProduct(Product.builder().name("Smartwatch").price(new BigDecimal("150")).stock(10).build());
			productService.saveProduct(Product.builder().name("Webcam").price(new BigDecimal("90")).stock(7).build());
		}
	}
}
