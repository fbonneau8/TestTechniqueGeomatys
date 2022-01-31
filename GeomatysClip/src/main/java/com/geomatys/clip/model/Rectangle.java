package com.geomatys.clip.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Rectangle {
    private float length;
    private float height;

    private Coordinates coordinatesUpperLeft;

    public Coordinates getCoordinatesUpperLeft() {
        return coordinatesUpperLeft;
    }

    public void setCoordinatesUpperLeft(Coordinates coordinatesUpperLeft) {
        this.coordinatesUpperLeft = coordinatesUpperLeft;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }


    public static Rectangle getJson(String json) throws JsonProcessingException {
        Rectangle rectangleJson = new Rectangle();

            ObjectMapper objectMapper = new ObjectMapper();
            rectangleJson = objectMapper.readValue(json,Rectangle.class);
        return rectangleJson;
    }
}
