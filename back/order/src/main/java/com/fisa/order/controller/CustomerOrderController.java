package com.fisa.order.controller;

import com.fisa.order.dto.CustomerOrderDTO;
import com.fisa.order.dto.ProductOrderDTO;
import com.fisa.order.entity.CustomerOrder;
import com.fisa.order.repo.CustomerOrderRepository;
import com.fisa.order.service.CustomerOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-orders")
public class CustomerOrderController {

    @Autowired
    private CustomerOrderService customerOrderService;
    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    /*
        @PostMapping
        public ResponseEntity<CustomerOrder> create(@RequestBody CustomerOrder customerOrder) {
            return ResponseEntity.ok(customerOrderService.create(customerOrder));
        }
    */
    @PostMapping
    public ResponseEntity<CustomerOrder> createCustomerOrder(@RequestBody CustomerOrderDTO customerOrderDTO) {
        CustomerOrder savedOrder = customerOrderService.createCustomerOrder(customerOrderDTO);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CustomerOrder>> findAll() {
        return ResponseEntity.ok(customerOrderService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerOrder> findById(@PathVariable Long id) {
        return ResponseEntity.ok(customerOrderService.findById(id));
    }

    @PutMapping
    public ResponseEntity<CustomerOrder> update(@RequestBody CustomerOrderDTO customerOrder) {
        return ResponseEntity.ok(customerOrderService.update(customerOrder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        customerOrderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

