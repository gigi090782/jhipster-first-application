package ru.krasilova.myapp.web.rest;

import ru.krasilova.myapp.domain.ContractMarketPlace;
import ru.krasilova.myapp.service.ContractMarketPlaceService;
import ru.krasilova.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ru.krasilova.myapp.domain.ContractMarketPlace}.
 */
@RestController
@RequestMapping("/api")
public class ContractMarketPlaceResource {

    private final Logger log = LoggerFactory.getLogger(ContractMarketPlaceResource.class);

    private static final String ENTITY_NAME = "contractMarketPlace";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContractMarketPlaceService contractMarketPlaceService;

    public ContractMarketPlaceResource(ContractMarketPlaceService contractMarketPlaceService) {
        this.contractMarketPlaceService = contractMarketPlaceService;
    }

    /**
     * {@code POST  /contract-market-places} : Create a new contractMarketPlace.
     *
     * @param contractMarketPlace the contractMarketPlace to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contractMarketPlace, or with status {@code 400 (Bad Request)} if the contractMarketPlace has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contract-market-places")
    public ResponseEntity<ContractMarketPlace> createContractMarketPlace(@RequestBody ContractMarketPlace contractMarketPlace) throws URISyntaxException {
        log.debug("REST request to save ContractMarketPlace : {}", contractMarketPlace);
        if (contractMarketPlace.getId() != null) {
            throw new BadRequestAlertException("A new contractMarketPlace cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContractMarketPlace result = contractMarketPlaceService.save(contractMarketPlace);
        return ResponseEntity.created(new URI("/api/contract-market-places/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contract-market-places} : Updates an existing contractMarketPlace.
     *
     * @param contractMarketPlace the contractMarketPlace to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contractMarketPlace,
     * or with status {@code 400 (Bad Request)} if the contractMarketPlace is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contractMarketPlace couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contract-market-places")
    public ResponseEntity<ContractMarketPlace> updateContractMarketPlace(@RequestBody ContractMarketPlace contractMarketPlace) throws URISyntaxException {
        log.debug("REST request to update ContractMarketPlace : {}", contractMarketPlace);
        if (contractMarketPlace.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContractMarketPlace result = contractMarketPlaceService.save(contractMarketPlace);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contractMarketPlace.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contract-market-places} : get all the contractMarketPlaces.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contractMarketPlaces in body.
     */
    @GetMapping("/contract-market-places")
    public List<ContractMarketPlace> getAllContractMarketPlaces() {
        log.debug("REST request to get all ContractMarketPlaces");
        return contractMarketPlaceService.findAll();
    }

    /**
     * {@code GET  /contract-market-places/:id} : get the "id" contractMarketPlace.
     *
     * @param id the id of the contractMarketPlace to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contractMarketPlace, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contract-market-places/{id}")
    public ResponseEntity<ContractMarketPlace> getContractMarketPlace(@PathVariable Long id) {
        log.debug("REST request to get ContractMarketPlace : {}", id);
        Optional<ContractMarketPlace> contractMarketPlace = contractMarketPlaceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contractMarketPlace);
    }

    /**
     * {@code DELETE  /contract-market-places/:id} : delete the "id" contractMarketPlace.
     *
     * @param id the id of the contractMarketPlace to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contract-market-places/{id}")
    public ResponseEntity<Void> deleteContractMarketPlace(@PathVariable Long id) {
        log.debug("REST request to delete ContractMarketPlace : {}", id);
        contractMarketPlaceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
