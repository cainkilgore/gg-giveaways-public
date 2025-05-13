# GG Giveaways Website

This is the landing page for the GG Giveaways Discord bot.

## Overview

The GG Giveaways website is a modern, responsive landing page designed to showcase the bot's features and allow users to easily add it to their Discord servers. It's built using pure HTML, CSS, and JavaScript with no dependencies or backend requirements.

## Features

- Modern design with Discord-style UI elements
- Fully responsive for all device sizes
- Interactive command examples
- Animated elements using Intersection Observer
- Expandable FAQ section
- Mobile-friendly navigation

## File Structure

```
website/
├── index.html           # Main HTML file
├── css/
│   └── style.css        # All styles
├── js/
│   └── script.js        # Interactive functionality
├── img/                 # Images
│   ├── favicon.svg      # Website favicon
│   └── giveaway-preview.svg  # Giveaway preview image
└── README.md            # This file
```

## Deployment

### Local Testing

Simply open the `index.html` file in a web browser to view the website locally.

### Web Hosting

To deploy the website to the web:

1. Upload all files to your web hosting provider
2. Ensure the directory structure is maintained
3. Point your domain (https://gg.giveaways) to the uploaded location

## Customization

### Discord Bot Invite URL

To connect the website to your actual Discord bot:

1. Open `js/script.js`
2. Find the line containing `const inviteUrl = 'https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands';`
3. Replace `YOUR_CLIENT_ID` with your Discord bot's client ID

### Color Scheme

The color scheme can be easily modified by changing the CSS variables at the beginning of the `style.css` file:

```css
:root {
    --primary-color: #5865F2;         /* Main brand color */
    --secondary-color: #FF73FA;       /* Accent color */
    /* Additional color variables... */
}
```

### Adding More Commands

To add additional command examples:

1. Add a new command card in the HTML under the `.commands-list` section
2. Add the command details to the `commandExamples` object in `script.js`

## Browser Compatibility

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This website template is available for use with the GG Giveaways bot. 