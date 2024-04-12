package client.api.authentification.controller;

import client.api.authentification.model.Client;
import client.api.authentification.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        return "redirect:/home"; // Redirigez vers la page d'accueil après connexion
    }

    @GetMapping("/login")
    public String getLoginPage() {
        return "login";
    }

    @GetMapping("/logout")
    public String logout() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            SecurityContextHolder.clearContext();
        }
        return "redirect:/";
    }
}

