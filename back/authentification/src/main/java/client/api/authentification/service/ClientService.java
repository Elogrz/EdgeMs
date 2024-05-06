package client.api.authentification.service;

import client.api.authentification.model.Client;

public interface ClientService {

    Client createClient(String email, String password, String lastName, String firstName, Number tel);

    void deleteClient(Long id);

    Client getClientByUsername(String username);
}
