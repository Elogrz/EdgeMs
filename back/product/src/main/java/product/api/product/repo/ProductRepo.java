package product.api.product.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import product.api.product.entity.Product;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductRepo extends JpaRepository<Product, Long> {
}
