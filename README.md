# cse134B-HW5

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

## Other JS: Theme Picker

For theme picker, I adopted a progressive enhancement approach so that if JavaScript is off, the `@media (prefers-color-theme:)` (i.e. system theme) would take over to the user's preferred theme. Building on top of that, by using JavaScript, the theme is successfully able to change from light to dark to system/auto through the radio buttons. This data attribute is saved to the localStorage to be fetched on each webpage, allowing for the selected theme to be used for each part of the website. Unfortunately, this is where it led to flash of unstyled content (FOUC) issues.

I tried to address FOUC by testing the placement of the script at the beginning, middle, and end of my html code and through the .js file itself. I found that placing at the beginning rids of FOUC but prevents the radio buttons from working. I suspect that this is due to the script requiring html content to be in place. Due to this, I decided the best place to put the script was at the bottom. Furthermore,  


