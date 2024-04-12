package client.api.authentification.service;

import client.api.authentification.model.Client;

public interface ClientService {
    Client createClient(String username, String password);
    void deleteClient(Long id);
}
