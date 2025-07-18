package com.example.crmbackend.controller;

import com.example.crmbackend.model.Contact;
import com.example.crmbackend.model.ContactDTO;
import com.example.crmbackend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // @GetMapping
    // public List<Contact> getAllContacts(@RequestParam(required = false) String
    // search) {
    // if (search != null && !search.isEmpty()) {
    // return contactService.searchContacts(search);
    // }
    // return contactService.getAllContacts();
    // }

    @GetMapping
    public ResponseEntity<List<ContactDTO>> getAllContacts(@RequestParam(required = false) String search) {
        List<Contact> contacts = (search != null && !search.isEmpty())
                ? contactService.searchContacts(search)
                : contactService.getAllContacts();

        List<ContactDTO> dtos = contacts.stream().map(contact -> new ContactDTO(
                contact.getId(),
                contact.getName(),
                contact.getEmail(),
                contact.getPhone(),
                contact.getCreatedAt(),
                contact.getUser().getId() // prevent full User serialization
        )).toList();

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        return contactService.getContactById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        try {
            Contact createdContact = contactService.createContact(contact);
            return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Or a more specific error response
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody Contact contactDetails) {
        try {
            Contact updatedContact = contactService.updateContact(id, contactDetails);
            return ResponseEntity.ok(updatedContact);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
