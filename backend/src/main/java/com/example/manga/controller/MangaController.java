package com.example.manga.controller;

import com.example.manga.model.Manga;
import com.example.manga.repository.MangaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mangas")
@CrossOrigin(origins = "http://localhost:3000")
public class MangaController {
    
    private final MangaRepository repository;

    public MangaController(MangaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Manga> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manga> findById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Manga create(@RequestBody Manga manga) {
        return repository.save(manga);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manga> update(@PathVariable Long id, @RequestBody Manga manga) {
        return repository.update(id, manga)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return repository.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
