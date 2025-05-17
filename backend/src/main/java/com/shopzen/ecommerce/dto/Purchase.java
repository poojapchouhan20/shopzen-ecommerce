package com.shopzen.ecommerce.dto;

import com.shopzen.ecommerce.entity.Address;
import com.shopzen.ecommerce.entity.Customer;
import com.shopzen.ecommerce.entity.Order;
import com.shopzen.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
