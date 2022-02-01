# GeomatysClip 1.0.0

## Description
Route /clip allows to take as input an image to clip and a rectangle (dimension of the clip)
In entry of the route, it's a multipart form-data containing an image and JSON in a string field.
We couldnt get a MultiPartFile with a classic json body, so multipart form-data was the only way.
But with this, you can only send key-value string pair. 
So i chose to send my rectangle Object as Json in one field.

Nothing complicated here, the method BufferedImage.subimage() does all the work.

## What could be improve
- add unit test
- build a swagger documentation
- real MVC pattern with interface/implementation pattern
