package com.example.crmbackend.service;

import com.example.crmbackend.model.Contact;
import com.example.crmbackend.model.User;
import com.example.crmbackend.repository.ContactRepository;
import com.example.crmbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    public Contact createContact(Contact contact) {
        // Ensure the user exists before creating a contact
        User user = userRepository.findById(contact.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + contact.getUser().getId()));
        contact.setUser(user);
        return contactRepository.save(contact);
    }

    public Contact updateContact(Long id, Contact contactDetails) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id " + id));
        contact.setName(contactDetails.getName());
        contact.setEmail(contactDetails.getEmail());
        contact.setPhone(contactDetails.getPhone());

        // Update associated user if provided
        if (contactDetails.getUser() != null && contactDetails.getUser().getId() != null) {
            User user = userRepository.findById(contactDetails.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found with id " + contactDetails.getUser().getId()));
            contact.setUser(user);
        }
        return contactRepository.save(contact);
    }

    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    public List<Contact> searchContacts(String query) {
        return contactRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query);
    }

    public List<Contact> getRecentlyAddedContacts() {
        return contactRepository.findTop5ByOrderByCreatedAtDesc();
    }

    public Map<String, Long> getContactDistribution() {
        List<Object[]> results = contactRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        contact -> contact.getUser().getName(),
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(entry -> new Object[]{entry.getKey(), entry.getValue()})
                .collect(Collectors.toList());

        return results.stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));
    }
}
