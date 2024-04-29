package com.fisa.order.service;

import com.fisa.order.dto.CustomerOrderDTO;
import com.fisa.order.dto.ProductOrderDTO;
import com.fisa.order.entity.CustomerOrder;
import com.fisa.order.entity.Product;
import com.fisa.order.entity.ProductOrder;
import com.fisa.order.repo.CustomerOrderRepository;
import com.fisa.order.repo.ProductOrderRepository;
import com.fisa.order.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerOrderService {

    @Autowired
    private CustomerOrderRepository customerOrderRepository;
    @Autowired
    private ProductOrderRepository productOrderRepository;
    @Autowired
    private ProductRepository productRepository;


    public CustomerOrder createCustomerOrder(CustomerOrderDTO customerOrderDTO) {
        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setClientId(customerOrderDTO.getClientId());
        customerOrder.setDate(new Date()); // Set current date or take from DTO
        customerOrder.setPaid(false); // Default to unpaid
        customerOrder.setTotalPrice(0); // Calculate based on product orders

        List<ProductOrder> productOrders = customerOrderDTO.getProductOrders().stream()
                .map(dto -> {
                    Product product = productRepository.findById(dto.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found with ID: " + dto.getProductId()));
                    ProductOrder productOrder = new ProductOrder();
                    productOrder.setProduct(product);
                    productOrder.setQuantity(dto.getQuantity());
                    productOrder.setCustomerOrder(customerOrder);
                    return productOrder;
                }).collect(Collectors.toList());

        customerOrder.setProductOrders(productOrders);
        return customerOrderRepository.save(customerOrder);
    }


    public void addProductOrders(Long customerOrderId, List<ProductOrder> productOrders) {
        CustomerOrder customerOrder = customerOrderRepository.findById(customerOrderId).orElseThrow(
                () -> new RuntimeException("CustomerOrder not found with ID: " + customerOrderId)
        );

        for (ProductOrder productOrder : productOrders) {
            if (productOrder.getProduct() == null || productOrder.getProduct().getId() == null) {
                throw new RuntimeException("ProductOrder is missing a valid product");
            }
            Product product = productRepository.findById(productOrder.getProduct().getId()).orElseThrow(
                    () -> new RuntimeException("Product not found with ID: " + productOrder.getProduct().getId())
            );
            productOrder.setProduct(product);
            productOrder.setCustomerOrder(customerOrder);
            productOrderRepository.save(productOrder);
        }
    }




    public List<CustomerOrder> findAll() {
        return customerOrderRepository.findAll();
    }

    public CustomerOrder findById(Long id) {
        return customerOrderRepository.findById(id).orElse(null);
    }

    public CustomerOrder update(CustomerOrderDTO customerOrderDTO) {
        // Trouver la commande existante ou lancer une exception
        CustomerOrder customerOrder = customerOrderRepository.findById(customerOrderDTO.getId())
                .orElseThrow(() -> new RuntimeException("CustomerOrder not found with ID: " + customerOrderDTO.getId()));

        // Mettre à jour les champs modifiables
        customerOrder.setClientId(customerOrderDTO.getClientId());
        customerOrder.setDate(customerOrderDTO.getDate());
        customerOrder.setPaid(customerOrderDTO.isPaid());
        customerOrder.setTotalPrice(customerOrderDTO.getTotalPrice());

        // Supprimer les ProductOrders existants pour cette CustomerOrder
        productOrderRepository.deleteAll(customerOrder.getProductOrders());

        // Créer et ajouter les nouveaux ProductOrders
        List<ProductOrder> updatedProductOrders = customerOrderDTO.getProductOrders().stream()
                .map(dto -> {
                    Product product = productRepository.findById(dto.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found with ID: " + dto.getProductId()));
                    ProductOrder productOrder = new ProductOrder();
                    productOrder.setProduct(product);
                    productOrder.setQuantity(dto.getQuantity());
                    productOrder.setCustomerOrder(customerOrder);
                    return productOrder;
                }).collect(Collectors.toList());

        // Associer les nouveaux ProductOrders à la CustomerOrder
        customerOrder.getProductOrders().clear();
        customerOrder.getProductOrders().addAll(updatedProductOrders);

        // Sauvegarder la commande mise à jour
        return customerOrderRepository.save(customerOrder);
    }

    public void delete(long id) {
        customerOrderRepository.deleteById(id);
    }
}
