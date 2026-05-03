package com.example.manga.repository;

import com.example.manga.model.Manga;
import com.example.manga.service.JsonStorageService;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class MangaRepository {
    private List<Manga> store = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong();
    private final JsonStorageService storageService;

    public MangaRepository(JsonStorageService storageService) {
        this.storageService = storageService;
        init();
    }

    private void init() {
        this.store = storageService.loadMangas();
        
        if (!store.isEmpty()) {
            long maxId = store.stream().mapToLong(Manga::getId).max().orElse(0L);
            idGenerator.set(maxId);
        }
    }

    public List<Manga> findAll() {
        return store.stream().collect(Collectors.toList());
    }

    public Optional<Manga> findById(Long id) {
        return store.stream().filter(m -> m.getId().equals(id)).findFirst();
    }

    public Manga save(Manga manga) {
        if (manga == null) {
            storageService.saveMangas(store);
            return null;
        }
        
        if (manga.getId() == null) {
            manga.setId(idGenerator.incrementAndGet());
            store.add(manga);
        }
        storageService.saveMangas(store);
        return manga;
    }

    public Optional<Manga> update(Long id, Manga manga) {
        return findById(id).map(existing -> {
            existing.setTitle(manga.getTitle());
            existing.setAuthor(manga.getAuthor());
            existing.setGenre(manga.getGenre());
            existing.setVolumes(manga.getVolumes());
            existing.setStatus(manga.getStatus());
            existing.setImageUrl(manga.getImageUrl());
            storageService.saveMangas(store);
            return existing;
        });
    }

    public boolean delete(Long id) {
        boolean removed = store.removeIf(m -> m.getId().equals(id));
        if (removed) {
            storageService.saveMangas(store);
        }
        return removed;
    }
}
