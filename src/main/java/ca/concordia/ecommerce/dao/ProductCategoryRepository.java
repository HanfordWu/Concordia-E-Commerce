package ca.concordia.ecommerce.dao;

import ca.concordia.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Created by Hanford Wu on 2020-11-07 11:20 p.m.
 */

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
@CrossOrigin("http://localhost:80")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}

