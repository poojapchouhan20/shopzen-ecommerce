package com.shopzen.ecommerce.service;

import com.shopzen.ecommerce.dto.Purchase;
import com.shopzen.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
