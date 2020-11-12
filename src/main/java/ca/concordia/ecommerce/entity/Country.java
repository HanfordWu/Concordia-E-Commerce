package ca.concordia.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Hanford Wu on 2020-11-12 4:44 p.m.
 */


@Entity
@Table(name = "country")
@Data
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;


    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<State> states;




}
