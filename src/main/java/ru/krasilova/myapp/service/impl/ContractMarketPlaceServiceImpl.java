package ru.krasilova.myapp.service.impl;

import ru.krasilova.myapp.service.ContractMarketPlaceService;
import ru.krasilova.myapp.domain.ContractMarketPlace;
import ru.krasilova.myapp.repository.ContractMarketPlaceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ContractMarketPlace}.
 */
@Service
@Transactional
public class ContractMarketPlaceServiceImpl implements ContractMarketPlaceService {

    private final Logger log = LoggerFactory.getLogger(ContractMarketPlaceServiceImpl.class);

    private final ContractMarketPlaceRepository contractMarketPlaceRepository;

    public ContractMarketPlaceServiceImpl(ContractMarketPlaceRepository contractMarketPlaceRepository) {
        this.contractMarketPlaceRepository = contractMarketPlaceRepository;
    }

    /**
     * Save a contractMarketPlace.
     *
     * @param contractMarketPlace the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ContractMarketPlace save(ContractMarketPlace contractMarketPlace) {
        log.debug("Request to save ContractMarketPlace : {}", contractMarketPlace);
        return contractMarketPlaceRepository.save(contractMarketPlace);
    }

    /**
     * Get all the contractMarketPlaces.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ContractMarketPlace> findAll() {
        log.debug("Request to get all ContractMarketPlaces");
        return contractMarketPlaceRepository.findAll();
    }

    /**
     * Get one contractMarketPlace by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ContractMarketPlace> findOne(Long id) {
        log.debug("Request to get ContractMarketPlace : {}", id);
        return contractMarketPlaceRepository.findById(id);
    }

    /**
     * Delete the contractMarketPlace by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ContractMarketPlace : {}", id);
        contractMarketPlaceRepository.deleteById(id);
    }
}
