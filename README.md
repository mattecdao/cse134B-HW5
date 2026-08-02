# cse134B-HW5

## Local Instructions:

To install locally, please clone my repo with the following code:

```bash
git clone https://github.com/mattecdao/cse134B-HW5
```
and navigate to the folder. Ensure that you have a recent version of Node.js and installed npm.

With `npm`, you have the following commands:

* `npm run dev`
* `npm run start` (operates same as `dev` command)
* `npm run build`
* `npm run preview`
    
## Part 1: Theme Picker

For theme picker, I adopted a progressive enhancement approach so that if JavaScript is off, the `@media (prefers-color-theme:)` (i.e. system theme) would take over to the user's preferred theme as a fallback. Building on top of that, by using JavaScript, the theme is successfully able to change from light to dark to system/auto through the radio buttons. This data attribute is saved to the localStorage to be fetched on each webpage, allowing for the selected theme to be used for each part of the website. Unfortunately, this is where it led to flash of unstyled content (FOUC) issues.

I tried to address FOUC by testing the placement of the script at the beginning, middle, and end of my html code and through the .js file itself. I found that placing at the beginning rids of FOUC but prevents the radio buttons from working. I suspect that this is due to the script requiring html content to be in place. Due to this, I decided the best place to put the script was at the bottom. 

The logic of the theme picker are as follows: The current theme defaults to the preferred theme and the program checks if there is a theme saved by the localStorage. If so, it switches to the localStorage theme.

Attached to the radio buttons are eventListeners that call the function to change the theme.

## Web Component

### `<cat-fact>`

Similar to the random facts demo done in class, I decided to do a web-component on random facts on cats.

Taking from [catfact.ninja](https://catfact.ninja/fact), my web component begins the moment the site is loaded and displays a fact. Additionally, my template uses a button that allows the user to request for another cat fact until satisfaction.

`<cat-fact>` supports one data attribute titled  `refresh-interval`.  This attribute allows for automatic refresh behavior and is the main reason the site loads the fact during render. Without it, the user is fully in manual control and decides whenever they want to fetch a new fact. To use `refresh-interval`, set the attribute to the number of seconds you want the facts to refresh, represented as a string. For example:

```html
<cat-fact refresh-interval = "5"></cat-fact>
```

Here, `refresh-interval = "5"`, means "make a cat fact on start and refresh the fact every 5 seconds". As mentioned prior, the user is able to manually fetch a cat fact, both with and without refresh-interval.

If the user is unable to use JavaScript, the developer can fall back to preset content by putting a set fact inside the tag and alerting the user through `<no-script>` that they need JavaScript for the web-attribute to work. For example:

```html
<noscript>
  <p>This website requires JavaScript for <cat-fact> to work!</p>
/noscript>
<cat-fact><About 37% of American homes today have at least 1 cat.</cat-fact>
```
This would first result in the warning and then display a preset fact for the user to see rather than a blank display box.

## SSG (Astro)

For the static site generator (SSG) , I selected Astro. Getting used to the structure was my main obstacle but once I got around this, I began to see the potential value within SSGs. 

My main observation is that it allowed the ability to build templates that I intend to save and use across multiple websites. To me, this seems great for efficiency and applying aesthetic features amongst shared parts of the website. Compared to standard html, css, and js, it saved a lot of typing and abstracted much of the details. I think the main benefit is the ability to sync changes rather than having to individually alter each html file. 

The drawbacks that I see, however, is that there requires more attention to structure and ensuring that the built template is not too confusing and abstracted behind multiple layers. Else, I'd imagine there would be a lot of going back to each previous layer and seeing how changes affect the top. Furthermore, since this is more server sided implemented, I imagine more complex interactive features to be harder to implement and use, requiring work arounds.

Nevertheless, I wouldn't use SSG's that require live, quick, and fast data to be present since there would be delays which could be important information to relay to its users. 
