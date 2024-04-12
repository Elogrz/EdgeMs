import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clients")
public class ClientController {
    private final ClientService clientService;

    // Injecter le service métier via le constructeur
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public ResponseEntity<?> createClient(@RequestBody ClientDTO clientDTO) {
        // Logique de création du client
        Client client = clientService.createClient(clientDTO); // Appel du service pour créer un client
        return ResponseEntity.ok().body(client); // Retourne une réponse HTTP 200 avec le client créé
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable("id") Long id) {
        // Logique de suppression du client
        clientService.deleteClient(id); // Appel du service pour supprimer un client par son ID
        return ResponseEntity.ok().build(); // Retourne une réponse HTTP 200 sans contenu
    }
}
