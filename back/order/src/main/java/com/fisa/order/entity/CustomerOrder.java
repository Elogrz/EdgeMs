package com.fisa.order.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "customer_orders")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id", nullable = false)
    private String clientId;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "total_price", nullable = false)
    private float totalPrice;

    @Column(nullable = false)
    private boolean paid;

    @OneToMany(mappedBy = "customerOrder", cascade = CascadeType.ALL)
    private List<ProductOrder> productOrders;

    // Getters and setters
}
