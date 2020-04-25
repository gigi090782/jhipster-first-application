package ru.krasilova.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ru.krasilova.myapp.web.rest.TestUtil;

public class ContractMarketPlaceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContractMarketPlace.class);
        ContractMarketPlace contractMarketPlace1 = new ContractMarketPlace();
        contractMarketPlace1.setId(1L);
        ContractMarketPlace contractMarketPlace2 = new ContractMarketPlace();
        contractMarketPlace2.setId(contractMarketPlace1.getId());
        assertThat(contractMarketPlace1).isEqualTo(contractMarketPlace2);
        contractMarketPlace2.setId(2L);
        assertThat(contractMarketPlace1).isNotEqualTo(contractMarketPlace2);
        contractMarketPlace1.setId(null);
        assertThat(contractMarketPlace1).isNotEqualTo(contractMarketPlace2);
    }
}
