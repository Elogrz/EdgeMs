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
    public Client register(@RequestParam String email, @RequestParam String password, @RequestParam String lastName, @RequestParam String firstName, @RequestParam Number tel) {
        return clientService.createClient(email, password, lastName, firstName, tel);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        clientService.deleteClient(id);
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        Client client = clientService.getClientByUsername(username);
        if (client != null && client.getPassword().equals(password)) {
            return "redirect:/home";
        } else {
            return "redirect:/auth/login?error=true";
        }
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/";
    }
}

