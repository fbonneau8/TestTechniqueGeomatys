# GeomatysClipFront

## Description
Front software to upload an image and select a rectangle of that image to clip.
Call an API to do the clipping et display the result.

We use svg element to select a rectangle on top of a miniature of the imported image.
But the rectangle dimensions that we get are for the miniature, so we calculate them in percent.


## What could be improve
- size of the canvas (svg dimensions are fixed in pixel), should at least have height dynamic with uploaded image
- global css style (white background with 2 button and some text isnt very beautifull!)
