package com.ssafy.matdongsan.domain.account.repository;

import com.ssafy.matdongsan.domain.account.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    boolean existsByEmail(String email);

    Account findByEmail(String email);

}
