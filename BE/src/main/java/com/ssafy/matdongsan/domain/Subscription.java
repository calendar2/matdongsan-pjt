package com.ssafy.matdongsan.domain;

import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Subscription extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscription_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account subscriber;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account subscribed;
}
