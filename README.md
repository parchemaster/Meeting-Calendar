# Meeting Calendar - Ivan & Vlada

A simple website to display Ivan and Vlada's availability for meetings.

## 🌟 Features

- 📅 Interactive calendar
- ✅ Shows available and busy days
- 📱 Responsive design (works on all devices)
- 🎨 Built with Bootstrap 5
- 🚀 Automatic deployment via GitHub Actions
- 💾 No backend - only HTML, CSS, JavaScript

## 🎨 Technologies

- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5
- GitHub Pages
- GitHub Actions

## 📝 How to Update the Calendar

To update availability in the calendar, edit the `availability-data.js` file:

```javascript
const availabilityData = {
    '2026-03-10': 'available',  // Available
    '2026-03-11': 'busy',       // Busy
    // Add more dates...
};
```

### Possible values:
- `'available'` - you are available on this day
- `'busy'` - you are busy on this day
- Don't specify the date if status is unknown

After changing the file, commit and push your changes:

```bash
git add availability-data.js
git commit -m "Update availability calendar"
git push
```

GitHub Actions will automatically deploy the changes to GitHub Pages.

## 🚀 Deployment

The site is automatically deployed to GitHub Pages on every push to the `main` branch.

### Initial GitHub Pages Setup:

1. Go to repository settings (Settings)
2. In the "Pages" section, select:
   - Source: GitHub Actions
3. The site will be available at: `https://[your-username].github.io/[repository-name]/`

## 📂 Project Structure

```
.
├── index.html              # Main page
├── styles.css              # Styles
├── calendar.js             # Calendar logic
├── availability-data.js    # Availability data (edit here!)
├── css/                    # Bootstrap CSS
├── js/                     # Bootstrap JS
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── sitemap.xml             # Site map
└── README.md               # This file
```

## 🗺️ Sitemap

The `sitemap.xml` file is included for SEO optimization.

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers

## 📄 License

MIT License

## 👥 Authors

Ivan & Vlada
