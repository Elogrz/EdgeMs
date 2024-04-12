package client.api.authentification;

import client.api.authentification.config.SecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Import;

@EntityScan("client.api.authentification.model")
@EnableAutoConfiguration
@SpringBootApplication
public class AuthentificationApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthentificationApplication.class, args);
	}

}

