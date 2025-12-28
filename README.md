# Ntandostore Website

Welcome to Ntandostore - Your Digital Solutions Partner for WhatsApp recovery, website services, and more!

## 🚀 Features

- **WhatsApp Services**
  - Temporary ban recovery ($5)
  - Permanent ban recovery ($10)
  - Hacked account recovery ($10)

- **Website Services**
  - Professional website building ($25)
  - Reliable hosting ($15/month)
  - Anti-DDOS & security upgrades ($20)

- **Digital Services**
  - Log making ($5)
  - Banner making
  - Business cards
  - WhatsApp bots (autotyping, autobio, music dl, video dl)
  - Group renting ($5/month)
  - Private groups ($7/month)

## 🔐 Admin Panel

The website includes a powerful admin panel with the following features:

- **Login Credentials**
  - Username: `Ntando`
  - Password: `Ntando`

- **Admin Features**
  - Add, edit, and delete services
  - Manage advertisements
  - Upload service images
  - Add background music
  - Update site settings (title, text, etc.)
  - All changes are saved and persist

## 📱 Contact Information

- **Owner**: Ntandoyenkosi Chisaya
- **WhatsApp & Calls**: +263 771 629 199
- **Ecocash**: 263 786 831 091

## 🚀 Deploy to Render.com

### Prerequisites
- A Render.com account (free)
- GitHub account

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ntandostore.git
   git push -u origin main
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Sign up or log in
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `ntandostore` repository
   - Configure settings:
     - **Name**: ntandostore (or your preferred name)
     - **Environment**: Static Site
     - **Build Command**: Leave empty (or use `echo "No build needed"`)
     - **Publish Directory**: `.` (root directory)
   - Click "Create Web Service"

3. **Access Your Site**
   - Render will deploy your site
   - Wait for the deployment to complete (usually 2-3 minutes)
   - Access your site at the provided URL (e.g., `https://ntandostore.onrender.com`)

### Alternative: Using render.yaml

The project includes a `render.yaml` configuration file for automated deployment:

1. Push your code to GitHub
2. Go to Render.com dashboard
3. Click "New +" → "Web Service"
4. Connect your repository
5. Render will automatically detect and use the `render.yaml` configuration

## 🛠️ Local Development

To run the website locally:

1. **Using Python**
   ```bash
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

2. **Using Node.js**
   ```bash
   npm start
   ```
   Then visit: `http://localhost:8000`

3. **Using VS Code Live Server**
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

## 📁 File Structure

```
ntandostore/
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # JavaScript functionality
├── package.json        # Node.js configuration
├── render.yaml         # Render.com deployment config
├── .gitignore          # Git ignore file
├── README.md           # This file
└── todo.md            # Project tracking
```

## 🎨 Customization

All content can be customized through the admin panel:

1. Access the admin panel (login required)
2. Use the tabs to manage:
   - **Services**: Add, edit, or remove services
   - **Ads**: Manage advertisements
   - **Images**: Upload images for services
   - **Music**: Add background music
   - **Settings**: Update site title, hero text, about section

All changes are automatically saved to localStorage and will persist.

## 🔒 Security Features

- Password-protected admin panel
- Secure login system
- Data persistence using localStorage
- XSS protection headers (on Render)

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎵 Background Music

The site supports background music that:
- Plays continuously when enabled
- Can be toggled on/off
- Can be changed through the admin panel
- Supports various audio formats

## 💾 Data Storage

All website data is stored in:
- **localStorage**: For services, ads, settings, and uploaded content
- **Persistent storage**: Data remains even after browser refresh

## 🆘 Support

For any issues or questions:
- WhatsApp: +263 771 629 199
- Email: Contact through the website

## 📄 License

This project is open source and available under the MIT License.

---

**Ntandostore - Your Digital Solutions Partner**
*WhatsApp Recovery | Website Services | Digital Solutions*