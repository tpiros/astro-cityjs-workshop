# ✍️ Lesson 05: Image Optimisation

> Note that Astro 2.1.0 introduced [Assets](https://docs.astro.build/en/guides/assets/) in Astro which is currently experimental. For this workshop we will work with this experimental feature.

> If you'd like to use something that is more stable, please take a look at the [Images Guide](https://docs.astro.build/en/guides/images/) in the Astro documentation.

Astro does offer built-in `<Image />` component that behind the scenes uses either Sharp or Squoosh to optmise images. This is a great starting point, if you'd like to gain some quick wins.

> Note that in the current version of Astro (2.1.3) there's a bug that causes the optimised images to be returned with the `image/jpeg` header but they are actually `WebP` images. This is fixed in `v2.1.4`.

> Note that experimental asset support means that there's another reserved folder that you should not use, which is `src/assets`.

To use the `<Image />` component, all you need to do is to place image assets to the `src/assets` folder (you can also create subfolders in there, if you wish). Then in a `.astro` file, you can simply import them, along with the component:

```javascript
import { Image } from 'astro:assets';
import spain from '~/assets/spain.jpeg';
```

When you're ready to display the image(s), simply add the following:

```
<Image src="{italy}" width="{400}" alt="Some Text" />
```

> As a homework, run `console.log(spain)` to see what properties you can access from an imported image (object).

> Also check the network panel in DevTools to see the new image sizes. Furthermore, when you create a production build of your app, you'll notice that the build log will contain details about the imae optimisation:
>
> ```
> generating optimized images
>  ▶ /_astro/italy.6b3c9ce3_Ny4l1.webp (before: 1872kb, after: 30kb) (+2.53s)
> Completed in 3.51s.
> ```

# More on images

There are times when you'd like to do more with your images - generate thumbnails, cropping or even adding overlays. For such "advanced" scenarios, you'd need to opt-in to use a service. During this workshop we'll be using [Cloudinary](https://cloudinary.com) which has a very generous free tier and can help you achieve a lot of the aforementioned things.

> Note that Cloudinary not only excels at images transformation and optimisaton, but they also excel at video [optimisation](https://cloudinary.com/documentation/video_optimization) and [transformation](https://cloudinary.com/documentation/video_manipulation_and_delivery).

In this workshop we'll look at three advanced use-cases:

- Automatic thumbnail generation
- AI based content analysis and cropping
- Advanced overlays

## Automatic thumbnail generation

Generating thumbnails is an interesting use-case because most of the time the browser would receive an image and we'd apply CSS transformations on the image to make it smaller, round the corners etc. However, this means that the browser still receives a slightly larger images as part of a network request.

With Cloudinary, we can do all the transformations on the "server-side" and receive an optimised, transformed image in the browser.

The following code uses the `@cloudinary/url-gen` package (`npm i @cloudinary/url-gen`) to generate a thumbnail, finding the face automatically:

```javascript
myImage = cld
  .image(publicId)
  .resize(
    thumbnail().width(width).height(height).zoom(0.75).gravity(focusOn(face()))
  )
  .delivery(format('auto'))
  .delivery(quality('auto'));
```

> The `publicId` is a unique identifier of an asset in Cloudinary. `width` and `height` are also props that we can access via `Astro.props`.

## AI based content analysis and cropping

Sometimes we could end up in a scenario where we have a larger images and we need to crop the image but, the crop needs to be around a specific element within the picture - say, it's a picture of a kitchen, and we need to crop the image around the microwave, keeping that in the focus.

Cloudinary has an [AI Content Analysis add-on](https://cloudinary.com/documentation/cloudinary_ai_content_analysis_addon) which is capable of recognising 1,000+ objects.

The code below does exactly this programatically - this is an example that we'll go together but essentially changing `values.target` to `sink`, `microwave` or `refrigerator` will find these objects and crop the image around them.

```javascript
const values = {
  values: [],
  delimiter: '',
  name: target,
} as any;

myImage = cld
  .image(publicId)
  .resize(
    crop()
      .width(width)
      .height(height)
      .aspectRatio('1.0')
      .gravity(autoGravity().autoFocus(autoFocusOn(values)))
  )
  .delivery(format('auto'))
  .delivery(quality('auto'));
```

## Advanced overlays

This example is really amazing. Without digging deep into the details, Cloudinary can use [multiple layers](https://cloudinary.com/documentation/layers) (overlays and underlays) to add text and/or images to any base image. Using the combination of these plus using a [displacement map](https://cloudinary.com/blog/how_to_use_displacement_maps_to_transform_images) we can achieve realistic looking images - for e-commerce purposes (as an example).

> Please note that for the Cloudinary examples a `CloudinaryImage` component was created. This component is really "hacky" and its sole intent is to demonstrate some of these features for the purposes of this workshop and as such should not be used in a production app.
