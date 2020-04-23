package ru.krasilova.myapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.krasilova.myapp.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
