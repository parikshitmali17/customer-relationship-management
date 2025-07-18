package com.example.crmbackend.model;

import java.time.OffsetDateTime;

public class ContactDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private OffsetDateTime createdAt;
    private Long userId;

    public ContactDTO(Long id, String name, String email, String phone, OffsetDateTime createdAt, Long userId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.createdAt = createdAt;
        this.userId = userId;
    }

    // Getters and setters
}
