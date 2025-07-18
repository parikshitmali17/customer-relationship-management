package com.example.crmbackend.controller;

import com.example.crmbackend.model.Contact;
import com.example.crmbackend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportingController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/distribution")
    public Map<String, Long> getContactDistribution() {
        return contactService.getContactDistribution();
    }

    @GetMapping("/recent-contacts")
    public List<Contact> getRecentContacts() {
        return contactService.getRecentlyAddedContacts();
    }
}
