package ca.concordia.ecommerce.dao;

import ca.concordia.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Hanford Wu on 2020-11-07 11:19 p.m.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {

}
