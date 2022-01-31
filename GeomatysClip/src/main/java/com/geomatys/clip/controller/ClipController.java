package com.geomatys.clip.controller;

import com.geomatys.clip.model.Rectangle;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@CrossOrigin
public class ClipController {

    /**
     *  Allows to take as input an image to clip and a rectangle (dimension of the clip) and return the clipped image as bytes
     * @param rectangleToKeepJson  (properties are percent of image's width
     * @param imageToClip image as MultipartFile
     * @return clipped image as bytes
     * @throws IOException
     */
    @PostMapping(
            value = "/clip",
            produces = MediaType.IMAGE_JPEG_VALUE,
            consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }
    )
    public byte[] clipImage (@RequestPart("rectangleToKeep") String rectangleToKeepJson, @RequestPart("imageToClip") MultipartFile imageToClip) throws IOException {
        //We get Rectangle as JSON object
        Rectangle rectangleToKeep = Rectangle.getJson(rectangleToKeepJson);

        BufferedImage original = ImageIO.read(imageToClip.getInputStream());

        // rectangleToKeep properties are received as percent of image's width(called length in Rectangle)
        // so we need recalculate this properties with pixel unit
        BufferedImage clippedImage = original.getSubimage(
                 (int)rectangleToKeep.getCoordinatesUpperLeft().getX()*original.getWidth()/100,
                (int)rectangleToKeep.getCoordinatesUpperLeft().getY()*original.getWidth()/100,
                (int)rectangleToKeep.getLength()*original.getWidth()/100,
                (int)rectangleToKeep.getHeight()*original.getWidth()/100);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write( clippedImage, "jpg", baos );
        baos.flush();

        return baos.toByteArray();
    }

}
