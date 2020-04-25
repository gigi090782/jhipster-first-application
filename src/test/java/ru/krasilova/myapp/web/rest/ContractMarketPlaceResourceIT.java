package ru.krasilova.myapp.web.rest;

import ru.krasilova.myapp.JhipsterFirstApplicationApp;
import ru.krasilova.myapp.domain.ContractMarketPlace;
import ru.krasilova.myapp.repository.ContractMarketPlaceRepository;
import ru.krasilova.myapp.service.ContractMarketPlaceService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ru.krasilova.myapp.domain.enumeration.MarketPlaceType;
/**
 * Integration tests for the {@link ContractMarketPlaceResource} REST controller.
 */
@SpringBootTest(classes = JhipsterFirstApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ContractMarketPlaceResourceIT {

    private static final Long DEFAULT_CONTRACT_ID = 1L;
    private static final Long UPDATED_CONTRACT_ID = 2L;

    private static final MarketPlaceType DEFAULT_MARKET_PLACE_TYPE = MarketPlaceType.FOND;
    private static final MarketPlaceType UPDATED_MARKET_PLACE_TYPE = MarketPlaceType.OTC;

    private static final String DEFAULT_DATE_ADD = "AAAAAAAAAA";
    private static final String UPDATED_DATE_ADD = "BBBBBBBBBB";

    @Autowired
    private ContractMarketPlaceRepository contractMarketPlaceRepository;

    @Autowired
    private ContractMarketPlaceService contractMarketPlaceService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContractMarketPlaceMockMvc;

    private ContractMarketPlace contractMarketPlace;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContractMarketPlace createEntity(EntityManager em) {
        ContractMarketPlace contractMarketPlace = new ContractMarketPlace()
            .contractId(DEFAULT_CONTRACT_ID)
            .marketPlaceType(DEFAULT_MARKET_PLACE_TYPE)
            .dateAdd(DEFAULT_DATE_ADD);
        return contractMarketPlace;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContractMarketPlace createUpdatedEntity(EntityManager em) {
        ContractMarketPlace contractMarketPlace = new ContractMarketPlace()
            .contractId(UPDATED_CONTRACT_ID)
            .marketPlaceType(UPDATED_MARKET_PLACE_TYPE)
            .dateAdd(UPDATED_DATE_ADD);
        return contractMarketPlace;
    }

    @BeforeEach
    public void initTest() {
        contractMarketPlace = createEntity(em);
    }

    @Test
    @Transactional
    public void createContractMarketPlace() throws Exception {
        int databaseSizeBeforeCreate = contractMarketPlaceRepository.findAll().size();

        // Create the ContractMarketPlace
        restContractMarketPlaceMockMvc.perform(post("/api/contract-market-places").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contractMarketPlace)))
            .andExpect(status().isCreated());

        // Validate the ContractMarketPlace in the database
        List<ContractMarketPlace> contractMarketPlaceList = contractMarketPlaceRepository.findAll();
        assertThat(contractMarketPlaceList).hasSize(databaseSizeBeforeCreate + 1);
        ContractMarketPlace testContractMarketPlace = contractMarketPlaceList.get(contractMarketPlaceList.size() - 1);
        assertThat(testContractMarketPlace.getContractId()).isEqualTo(DEFAULT_CONTRACT_ID);
        assertThat(testContractMarketPlace.getMarketPlaceType()).isEqualTo(DEFAULT_MARKET_PLACE_TYPE);
        assertThat(testContractMarketPlace.getDateAdd()).isEqualTo(DEFAULT_DATE_ADD);
    }

    @Test
    @Transactional
    public void createContractMarketPlaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contractMarketPlaceRepository.findAll().size();

        // Create the ContractMarketPlace with an existing ID
        contractMarketPlace.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContractMarketPlaceMockMvc.perform(post("/api/contract-market-places").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contractMarketPlace)))
            .andExpect(status().isBadRequest());

        // Validate the ContractMarketPlace in the database
        List<ContractMarketPlace> contractMarketPlaceList = contractMarketPlaceRepository.findAll();
        assertThat(contractMarketPlaceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContractMarketPlaces() throws Exception {
        // Initialize the database
        contractMarketPlaceRepository.saveAndFlush(contractMarketPlace);

        // Get all the contractMarketPlaceList
        restContractMarketPlaceMockMvc.perform(get("/api/contract-market-places?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contractMarketPlace.getId().intValue())))
            .andExpect(jsonPath("$.[*].contractId").value(hasItem(DEFAULT_CONTRACT_ID.intValue())))
            .andExpect(jsonPath("$.[*].marketPlaceType").value(hasItem(DEFAULT_MARKET_PLACE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].dateAdd").value(hasItem(DEFAULT_DATE_ADD)));
    }
    
    @Test
    @Transactional
    public void getContractMarketPlace() throws Exception {
        // Initialize the database
        contractMarketPlaceRepository.saveAndFlush(contractMarketPlace);

        // Get the contractMarketPlace
        restContractMarketPlaceMockMvc.perform(get("/api/contract-market-places/{id}", contractMarketPlace.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contractMarketPlace.getId().intValue()))
            .andExpect(jsonPath("$.contractId").value(DEFAULT_CONTRACT_ID.intValue()))
            .andExpect(jsonPath("$.marketPlaceType").value(DEFAULT_MARKET_PLACE_TYPE.toString()))
            .andExpect(jsonPath("$.dateAdd").value(DEFAULT_DATE_ADD));
    }

    @Test
    @Transactional
    public void getNonExistingContractMarketPlace() throws Exception {
        // Get the contractMarketPlace
        restContractMarketPlaceMockMvc.perform(get("/api/contract-market-places/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContractMarketPlace() throws Exception {
        // Initialize the database
        contractMarketPlaceService.save(contractMarketPlace);

        int databaseSizeBeforeUpdate = contractMarketPlaceRepository.findAll().size();

        // Update the contractMarketPlace
        ContractMarketPlace updatedContractMarketPlace = contractMarketPlaceRepository.findById(contractMarketPlace.getId()).get();
        // Disconnect from session so that the updates on updatedContractMarketPlace are not directly saved in db
        em.detach(updatedContractMarketPlace);
        updatedContractMarketPlace
            .contractId(UPDATED_CONTRACT_ID)
            .marketPlaceType(UPDATED_MARKET_PLACE_TYPE)
            .dateAdd(UPDATED_DATE_ADD);

        restContractMarketPlaceMockMvc.perform(put("/api/contract-market-places").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContractMarketPlace)))
            .andExpect(status().isOk());

        // Validate the ContractMarketPlace in the database
        List<ContractMarketPlace> contractMarketPlaceList = contractMarketPlaceRepository.findAll();
        assertThat(contractMarketPlaceList).hasSize(databaseSizeBeforeUpdate);
        ContractMarketPlace testContractMarketPlace = contractMarketPlaceList.get(contractMarketPlaceList.size() - 1);
        assertThat(testContractMarketPlace.getContractId()).isEqualTo(UPDATED_CONTRACT_ID);
        assertThat(testContractMarketPlace.getMarketPlaceType()).isEqualTo(UPDATED_MARKET_PLACE_TYPE);
        assertThat(testContractMarketPlace.getDateAdd()).isEqualTo(UPDATED_DATE_ADD);
    }

    @Test
    @Transactional
    public void updateNonExistingContractMarketPlace() throws Exception {
        int databaseSizeBeforeUpdate = contractMarketPlaceRepository.findAll().size();

        // Create the ContractMarketPlace

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContractMarketPlaceMockMvc.perform(put("/api/contract-market-places").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contractMarketPlace)))
            .andExpect(status().isBadRequest());

        // Validate the ContractMarketPlace in the database
        List<ContractMarketPlace> contractMarketPlaceList = contractMarketPlaceRepository.findAll();
        assertThat(contractMarketPlaceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContractMarketPlace() throws Exception {
        // Initialize the database
        contractMarketPlaceService.save(contractMarketPlace);

        int databaseSizeBeforeDelete = contractMarketPlaceRepository.findAll().size();

        // Delete the contractMarketPlace
        restContractMarketPlaceMockMvc.perform(delete("/api/contract-market-places/{id}", contractMarketPlace.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ContractMarketPlace> contractMarketPlaceList = contractMarketPlaceRepository.findAll();
        assertThat(contractMarketPlaceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
