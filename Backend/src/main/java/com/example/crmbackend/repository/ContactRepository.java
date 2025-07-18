package com.example.crmbackend.repository;

import com.example.crmbackend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
    List<Contact> findTop5ByOrderByCreatedAtDesc();
    List<Contact> findByUserId(Long userId);
}
