package com.fisa.payments.controller;

import com.fisa.payments.model.Payment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping
    public ResponseEntity<Boolean> createCustomerOrder(@RequestBody Payment payment) {
        return new ResponseEntity<>( payment.isPaymentValide(), HttpStatus.ACCEPTED);
    }
}
