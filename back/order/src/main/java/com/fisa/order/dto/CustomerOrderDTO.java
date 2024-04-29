package com.fisa.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor  // Ajouté pour permettre la création d'un DTO sans paramètres initiaux
@AllArgsConstructor // Le constructeur existant qui initialise tous les champs
public class CustomerOrderDTO {
    private Long id;  // Ajouter pour gérer les mises à jour
    private String clientId;
    private Date date;
    private float totalPrice;  // Utiliser double pour la compatibilité avec des calculs de prix
    private boolean paid;
    private List<ProductOrderDTO> productOrders;

    // Les annotations Lombok @Getter et @Setter génèrent automatiquement les getters et setters.
    // L'annotation @AllArgsConstructor génère un constructeur avec tous les champs comme paramètres.
    // L'annotation @NoArgsConstructor génère un constructeur sans paramètre.
}
