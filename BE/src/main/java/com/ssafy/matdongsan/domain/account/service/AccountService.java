package com.ssafy.matdongsan.domain.account.service;

import com.ssafy.matdongsan.domain.account.dto.*;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.ssafy.matdongsan.domain.account.repository.PersonTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final PersonTagRepository personTagRepository;

    public void savePersonTag(PersonTagSaveRequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        personTagRepository.save(dto.toEntity(account));
    }

    public AccountResponse modifyAccount(AccountModifyRequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        account.modify(dto);
        Account savedAccount = accountRepository.save(account);
        return AccountResponse.from(savedAccount);
    }

    public AccountResponse modifyAccount(AccountModifyStep1RequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        account.modify(dto);
        Account savedAccount = accountRepository.save(account);
        return AccountResponse.from(savedAccount);
    }

    public AccountResponse modifyAccount(AccountModifyStep2RequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        account.modify(dto);
        Account savedAccount = accountRepository.save(account);
        return AccountResponse.from(savedAccount);
    }

    public Account saveAccount(AccountSaveRequestDto dto) {
        return accountRepository.save(dto.toEntity());
    }

    public AccountResponse getAccount(Integer accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        return AccountResponse.from(account);
    }

    public AccountResponse getAccount(String email) {
        Account account = accountRepository.findByEmail(email);
        return AccountResponse.from(account);
    }

    public List<PersonTag> getPersonTags(String email) {
        Account account = accountRepository.findByEmail(email);
        return account.getPersonTags();
    }

    public List<AccountSimpleResponseDto> getAccountsTop10() {
        List<AccountSimpleResponseDto> ret = new ArrayList<>();
        List<Account> accounts = accountRepository.findAllOrderByFollower();
        for (Account account : accounts) {
            AccountSimpleResponseDto dto = AccountSimpleResponseDto.builder()
                    .id(account.getId())
                    .nickname(account.getNickname())
                    .follower(account.getFollower())
                    .build();
            ret.add(dto);
            if (ret.size() == 10)
                break;
        }
        return ret;
    }

    public List<AccountSearchResponseDto> searchNickname(String query) {
        List<Account> accounts = accountRepository.findAllByNickname(query);

        return accounts.stream().map(
                account -> new AccountSearchResponseDto(
                        account.getId(),
                        account.getNickname(),
                        account.getPicture(),
                        account.getFollower()
                )
        ).toList();

    }
}