package ru.krasilova.myapp.service;

import ru.krasilova.myapp.domain.ContractMarketPlace;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ContractMarketPlace}.
 */
public interface ContractMarketPlaceService {

    /**
     * Save a contractMarketPlace.
     *
     * @param contractMarketPlace the entity to save.
     * @return the persisted entity.
     */
    ContractMarketPlace save(ContractMarketPlace contractMarketPlace);

    /**
     * Get all the contractMarketPlaces.
     *
     * @return the list of entities.
     */
    List<ContractMarketPlace> findAll();

    /**
     * Get the "id" contractMarketPlace.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ContractMarketPlace> findOne(Long id);

    /**
     * Delete the "id" contractMarketPlace.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
