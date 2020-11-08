package ca.concordia.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Hanford Wu on 2020-11-07 11:11 p.m.
 */
@Entity
@Table(name = "product_category")
@Data
public class ProductCategory {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @Column(name = "category_name")
    private String categoryName;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;


}
