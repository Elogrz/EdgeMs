package client.api.authentification.service;

import client.api.authentification.model.Client;
import client.api.authentification.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client createClient(String username, String password) {
        Client client = new Client();
        client.setUsername(username);
        client.setPassword(password);
        return clientRepository.save(client);
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }
}
