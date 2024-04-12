package client.api.authentification.controller;

import client.api.authentification.model.Client;
import client.api.authentification.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private ClientService clientService;

    @PostMapping("/register")
    public Client register(@RequestParam String username, @RequestParam String password) {
        return clientService.createClient(username, password);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        clientService.deleteClient(id);
    }
}

