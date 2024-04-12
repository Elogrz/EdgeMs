import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Client, Long> {
    Client findByUsername(String username);
}
