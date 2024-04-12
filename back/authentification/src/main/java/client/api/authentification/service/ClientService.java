import org.springframework.stereotype.Service;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    // Injecter le repository via le constructeur
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client createClient(ClientDTO clientDTO) {
        // Logique de création du client
        Client client = new Client();
        client.setUsername(clientDTO.getUsername());
        client.setPassword(clientDTO.getPassword());
        return clientRepository.save(client); // Enregistrer le nouveau client dans la base de données
    }

    public void deleteClient(Long id) {
        // Logique de suppression du client
        clientRepository.deleteById(id); // Supprimer le client de la base de données par son ID
    }

    public Client authenticateClient(String username, String password) {
        // Logique d'authentification du client
        Client client = clientRepository.findByUsername(username);
        if (client != null && client.getPassword().equals(password)) {
            return client; // Si les identifiants correspondent, retourne le client
        }
        return null; // Si les identifiants ne correspondent pas, retourne null
    }
}
