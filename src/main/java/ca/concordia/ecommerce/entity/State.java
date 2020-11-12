package ca.concordia.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by Hanford Wu on 2020-11-12 4:47 p.m.
 */
@Entity
@Table(name = "state")
@Data
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id  ;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;



}
