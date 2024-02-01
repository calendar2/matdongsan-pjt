package com.ssafy.matdongsan.domain.account.model;

import com.ssafy.matdongsan.domain.BaseEntity;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.review.model.Review;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_tag_id")
    private Integer id;

    @Column(name = "person_tag_name", nullable = false, length = 100)
    private String name;

    private int birthYear;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToMany
    private List<Review> reviews = new ArrayList<>();


    @Builder
    public PersonTag(String name, int birthYear, Account account) {
        this.name = name;
        this.birthYear = birthYear;
        this.account = account;
    }
}
