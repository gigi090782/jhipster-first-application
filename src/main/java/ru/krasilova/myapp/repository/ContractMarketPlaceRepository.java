package ru.krasilova.myapp.repository;

import ru.krasilova.myapp.domain.ContractMarketPlace;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ContractMarketPlace entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContractMarketPlaceRepository extends JpaRepository<ContractMarketPlace, Long> {
}
