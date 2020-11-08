package ca.concordia.ecommerce.dao;

import ca.concordia.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Created by Hanford Wu on 2020-11-07 11:19 p.m.
 */
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

}
