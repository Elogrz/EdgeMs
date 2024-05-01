package client.api.authentification.repository;

import client.api.authentification.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource
public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByUsername(String username);
}

