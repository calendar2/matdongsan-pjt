package com.ssafy.matdongsan.domain;

import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Region extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id")
    private Short id;

    @Column(length = 8)
    private String code;

    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String county;

    @Column(length = 50)
    private String district;

    private Integer mapx;
    private Integer mapy;

    @ManyToMany
    private List<Account> accounts = new ArrayList<>();

    @OneToMany
    private List<Restaurant> restaurants = new ArrayList<>();
}
