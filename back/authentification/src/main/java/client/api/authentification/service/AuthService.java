@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client client = userRepository.findByUsername(username);
        if (client == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(client.getUsername(), client.getPassword(), Collections.emptyList());
    }

    public boolean authenticate(String username, String password) {
        UserDetails userDetails;
        try {
            userDetails = loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            return false;
        }

        return userDetails.getPassword().equals(password);
    }
}
