package com.fisa.payments.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Payment {
    public Integer amount;

    public boolean isPaymentValide(){
        return amount.intValue() < 100;
    }
}
