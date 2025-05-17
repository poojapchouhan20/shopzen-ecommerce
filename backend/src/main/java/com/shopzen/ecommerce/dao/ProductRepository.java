package com.shopzen.ecommerce.dao;

import com.shopzen.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;


public interface ProductRepository extends JpaRepository<Product,Long> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
//    SEARCH FOR PRODUCTS BY KEYWORD
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
//SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name , '%');

}
