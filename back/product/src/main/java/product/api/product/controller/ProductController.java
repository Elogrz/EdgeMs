package product.api.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import product.api.product.entity.Product;
import product.api.product.repo.ProductRepo;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductRepo productRepo;

    @GetMapping("/")
    public List<Product> getPerson(){
        System.out.println(productRepo.findAll());
        return productRepo.findAll();
    }
    @PostMapping("/")
    public void addPerson(@RequestBody Product product){
        System.out.println(product.toString());
        productRepo.save(product);
    }
}
