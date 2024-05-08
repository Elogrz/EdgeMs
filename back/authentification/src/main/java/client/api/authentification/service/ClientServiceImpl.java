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
    public Client createClient(String email, String password, String lastName, String firstName, Number tel) {
        Client client = new Client();
        client.setEmail(email);
        client.setTel(tel);
        client.setLastName(lastName);
        client.setFirstName(firstName);
        client.setPassword(password);
        return clientRepository.save(client);
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public Client getClientByEmail(String username) {
        return clientRepository.findByEmail(username);
    }

}
