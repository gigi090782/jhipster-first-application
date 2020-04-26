package ru.krasilova.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import ru.krasilova.myapp.domain.enumeration.MarketPlaceType;

/**
 * A ContractMarketPlace.
 */
@Entity
@Table(name = "contract_market_place")
public class ContractMarketPlace implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "market_place_type")
    private MarketPlaceType marketPlaceType;

    @Column(name = "date_add")
    private String dateAdd;

    @ManyToOne
    @JsonIgnoreProperties("contractMarketPlaces")
    private Contract contract;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MarketPlaceType getMarketPlaceType() {
        return marketPlaceType;
    }

    public ContractMarketPlace marketPlaceType(MarketPlaceType marketPlaceType) {
        this.marketPlaceType = marketPlaceType;
        return this;
    }

    public void setMarketPlaceType(MarketPlaceType marketPlaceType) {
        this.marketPlaceType = marketPlaceType;
    }

    public String getDateAdd() {
        return dateAdd;
    }

    public ContractMarketPlace dateAdd(String dateAdd) {
        this.dateAdd = dateAdd;
        return this;
    }

    public void setDateAdd(String dateAdd) {
        this.dateAdd = dateAdd;
    }

    public Contract getContract() {
        return contract;
    }

    public ContractMarketPlace contract(Contract contract) {
        this.contract = contract;
        return this;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContractMarketPlace)) {
            return false;
        }
        return id != null && id.equals(((ContractMarketPlace) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ContractMarketPlace{" +
            "id=" + getId() +
            ", marketPlaceType='" + getMarketPlaceType() + "'" +
            ", dateAdd='" + getDateAdd() + "'" +
            "}";
    }
}
