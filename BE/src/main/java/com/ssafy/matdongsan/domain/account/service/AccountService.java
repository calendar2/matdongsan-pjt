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

    public Account modifyAccount(AccountModifyRequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        account.modify(dto);
        return accountRepository.save(account);
    }

    public Account modifyAccount(AccountModifyStep1RequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        account.modify(dto);
        return accountRepository.save(account);
    }

    public Account modifyAccount(AccountModifyStep2RequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        account.modify(dto);
        return accountRepository.save(account);
    }

    public Account saveAccount(AccountSaveRequestDto dto) {
        return accountRepository.save(dto.toEntity());
    }

    public Account getAccount(String email) {
        return accountRepository.findByEmail(email);
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
