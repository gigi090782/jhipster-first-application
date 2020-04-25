package ru.krasilova.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import ru.krasilova.myapp.domain.enumeration.ChannelType;

/**
 * A Contract.
 */
@Entity
@Table(name = "contract")
public class Contract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "client_id")
    private Long clientId;

    @Enumerated(EnumType.STRING)
    @Column(name = "channel_type")
    private ChannelType channelType;

    @Column(name = "date_add")
    private String dateAdd;

    @OneToMany(mappedBy = "contractId")
    private Set<ContractMarketPlace> contractMarketPlaces = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("contracts")
    private Client clientId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public Contract clientId(Long clientId) {
        this.clientId = clientId;
        return this;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public ChannelType getChannelType() {
        return channelType;
    }

    public Contract channelType(ChannelType channelType) {
        this.channelType = channelType;
        return this;
    }

    public void setChannelType(ChannelType channelType) {
        this.channelType = channelType;
    }

    public String getDateAdd() {
        return dateAdd;
    }

    public Contract dateAdd(String dateAdd) {
        this.dateAdd = dateAdd;
        return this;
    }

    public void setDateAdd(String dateAdd) {
        this.dateAdd = dateAdd;
    }

    public Set<ContractMarketPlace> getContractMarketPlaces() {
        return contractMarketPlaces;
    }

    public Contract contractMarketPlaces(Set<ContractMarketPlace> contractMarketPlaces) {
        this.contractMarketPlaces = contractMarketPlaces;
        return this;
    }

    public Contract addContractMarketPlace(ContractMarketPlace contractMarketPlace) {
        this.contractMarketPlaces.add(contractMarketPlace);
        contractMarketPlace.setContractId(this);
        return this;
    }

    public Contract removeContractMarketPlace(ContractMarketPlace contractMarketPlace) {
        this.contractMarketPlaces.remove(contractMarketPlace);
        contractMarketPlace.setContractId(null);
        return this;
    }

    public void setContractMarketPlaces(Set<ContractMarketPlace> contractMarketPlaces) {
        this.contractMarketPlaces = contractMarketPlaces;
    }

    public Client getClientId() {
        return clientId;
    }

    public Contract clientId(Client client) {
        this.clientId = client;
        return this;
    }

    public void setClientId(Client client) {
        this.clientId = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contract)) {
            return false;
        }
        return id != null && id.equals(((Contract) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Contract{" +
            "id=" + getId() +
            ", clientId=" + getClientId() +
            ", channelType='" + getChannelType() + "'" +
            ", dateAdd='" + getDateAdd() + "'" +
            "}";
    }
}
