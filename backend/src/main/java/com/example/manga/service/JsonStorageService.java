package com.example.manga.service;

import com.example.manga.model.Manga;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Service;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Service
public class JsonStorageService {
    private final String FILE_PATH = "mangas.json";
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public List<Manga> loadMangas() {
        File file = new File(FILE_PATH);
        
        if (!file.exists()) {
            saveMangas(new ArrayList<>());
            return new ArrayList<>();
        }

        try (Reader reader = new FileReader(file)) {
            Type listType = new TypeToken<ArrayList<Manga>>() {}.getType();
            List<Manga> mangas = gson.fromJson(reader, listType);
            return mangas != null ? mangas : new ArrayList<>();
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    public void saveMangas(List<Manga> mangas) {
        File file = new File(FILE_PATH);
        try (Writer writer = new FileWriter(file)) {
            gson.toJson(mangas, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
