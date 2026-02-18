# Atlantic Food Center - Online Ordering System

## 🍽️ Overview

A professional, responsive restaurant ordering system for Atlantic Food Center featuring:

- **Complete Menu System** with all categories (Appetizers, Breakfast, Sandwiches, Pizzas, Platters, Pastries, Drinks)
- **Interactive Shopping Cart** with real-time updates
- **Customer Checkout Form** with order submission
- **Mobile-Responsive Design** that works on all devices
- **Email Order Integration** to info@atlanticfoodcenter.com

## 📋 Features

### Menu Categories
1. **Appetizers** - Sambousik, Cheese Roll, Garlic Bread, French Fries
2. **Breakfast** - Farmer, American, African Breakfast, Omelets
3. **Sandwiches** - Shawarma, Burgers, Quesadillas, Club Sandwich
4. **Pizzas** - Vegetarian, Pepperoni, Four Season, Atlantic Special
5. **Platters** - Grilled/Fried Chicken, Lobster, Fried Rice, Pasta
6. **Pastries** - Cakes, Doughnuts, Cookies, Croissants
7. **Drinks** - Juices, Sodas, Beer, Wine

### Customer Features
- ✅ Add items to cart with quantity controls
- ✅ Remove items or adjust quantities
- ✅ View real-time order total
- ✅ Complete customer information form
- ✅ Add delivery address and special instructions
- ✅ Order confirmation with order number

### Technical Features
- 📱 Fully responsive (mobile, tablet, desktop)
- 💾 LocalStorage cart persistence
- 🎨 Modern, attractive UI with smooth animations
- 📧 Email order submission system
- 🔒 Form validation
- ⚡ Fast loading and performance

## 📁 Files Included

```
afc-menu/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and responsive design
└── script.js           # JavaScript functionality
```

## 🚀 Deployment Instructions

### Option 1: Simple Web Hosting (Recommended)

1. **Upload to Web Host**:
   - Extract the `afc-menu.zip` file
   - Upload all files (index.html, style.css, script.js) to your web hosting provider
   - Common hosting providers: Hostinger, Bluehost, SiteGround, GoDaddy

2. **Access Your Site**:
   - Navigate to: `www.atlanticfoodcenter.com`
   - The ordering system will be live immediately

### Option 2: Free Hosting Options

**GitHub Pages** (Free):
1. Create a GitHub account at github.com
2. Create a new repository named `atlantic-food-center`
3. Upload all three files to the repository
4. Go to Settings > Pages
5. Enable GitHub Pages from the main branch
6. Your site will be available at: `yourusername.github.io/atlantic-food-center`

**Netlify** (Free):
1. Sign up at netlify.com
2. Drag and drop the `afc-menu` folder
3. Your site will be live with a free subdomain
4. You can connect your custom domain (atlanticfoodcenter.com)

**Vercel** (Free):
1. Sign up at vercel.com
2. Import the project or drag and drop files
3. Deploy instantly with custom domain support

### Option 3: Custom Domain Setup

1. **Purchase Domain** (if not owned):
   - atlanticfoodcenter.com is mentioned in your menu
   - Purchase from: Namecheap, GoDaddy, Google Domains

2. **Connect Domain to Hosting**:
   - Update DNS settings to point to your hosting provider
   - Most hosts provide automatic domain connection

3. **SSL Certificate**:
   - Enable HTTPS for secure connections
   - Most modern hosts provide free SSL (Let's Encrypt)

## 🔧 Configuration

### Email Settings

The system currently uses `mailto:` links to send orders to **info@atlanticfoodcenter.com**. 

**For Better Email Integration** (Production):

1. **Use a Backend Service**:
   - Set up a simple PHP mail script
   - Use services like FormSpree, EmailJS, or SendGrid
   - Recommended: EmailJS (free tier available)

2. **EmailJS Integration** (Easy Setup):
   ```javascript
   // Add to script.js
   // Replace the mailto link section with EmailJS
   // Sign up at emailjs.com and get your credentials
   ```

### Update Contact Information

If you need to change contact details, edit these sections in `index.html`:

```html
<!-- Header Contact -->
<p><i class="fas fa-phone"></i> 0880 080 080</p>

<!-- Footer -->
<p><i class="fas fa-envelope"></i> info@atlanticfoodcenter.com</p>
<p><i class="fas fa-globe"></i> www.atlanticfoodcenter.com</p>
```

### Customize Menu Prices

To update prices, find the menu items in `index.html` and change the `data-price` attribute:

```html
<div class="menu-item" data-name="Item Name" data-price="10.00">
```

## 📧 Order Processing

### Current System
Orders are sent via email to: **info@atlanticfoodcenter.com**

### Order Email Contains:
- Order number (auto-generated)
- Order date and time
- Customer name, phone, email
- Delivery address
- Complete order items with quantities
- Total amount
- Special instructions (if provided)

### Recommended Improvements

1. **Backend Integration**:
   - Set up a server-side script (PHP, Node.js, Python)
   - Store orders in a database
   - Send confirmation emails to customers

2. **Payment Integration**:
   - Add Stripe, PayPal, or local payment gateway
   - Enable online payment processing

3. **Order Management System**:
   - Create admin panel to view orders
   - Update order status (Received, Preparing, Delivered)
   - Send SMS notifications

## 🎨 Customization

### Change Colors

Edit the color scheme in `style.css`:

```css
:root {
    --primary-color: #d4432b;      /* Main red color */
    --secondary-color: #2c3e50;    /* Dark blue-gray */
    --accent-color: #f39c12;       /* Orange accent */
}
```

### Add Restaurant Logo

1. Add your logo image to the project folder
2. Update the header in `index.html`:

```html
<div class="logo">
    <img src="logo.png" alt="Atlantic Food Center Logo" height="60">
    <h1>Atlantic Food Center</h1>
</div>
```

### Add Menu Item Images

Update menu items to include images:

```html
<div class="menu-item" data-name="Item Name" data-price="10.00">
    <img src="images/item-name.jpg" alt="Item Name">
    <div class="item-info">
        <h3>Item Name</h3>
    </div>
    ...
</div>
```

## 📱 Mobile App Options

For a native mobile app experience:

1. **Progressive Web App (PWA)**:
   - Add manifest.json and service worker
   - Enable "Add to Home Screen" functionality
   - Works offline with cached menu

2. **Mobile App Wrapper**:
   - Use Apache Cordova or Ionic
   - Package the web app as iOS/Android app
   - Publish to App Store/Play Store

## 🛠️ Technical Support

### Browser Compatibility
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Requirements
- Modern web browser with JavaScript enabled
- Internet connection for initial load
- LocalStorage support (for cart persistence)

## 📞 Support & Contact

**Atlantic Food Center**
- 📍 Thillers Village Community, Romanian Highway, Paynesville, Liberia
- ☎️ 0880 080 080
- ✉️ info@atlanticfoodcenter.com
- 🌐 www.atlanticfoodcenter.com

## 🔄 Future Enhancements

Consider adding:
- [ ] Real-time order tracking
- [ ] Customer accounts and order history
- [ ] Loyalty program/points system
- [ ] Table reservation system
- [ ] Online payment processing
- [ ] SMS order confirmations
- [ ] Restaurant admin dashboard
- [ ] Delivery time estimation
- [ ] Multiple language support
- [ ] Customer reviews and ratings

## 📄 License

This ordering system is created for Atlantic Food Center. All rights reserved.

---

**Ready to Launch!** 🚀

Simply upload the files to your web hosting and your restaurant ordering system will be live!

For technical assistance with deployment, contact your web hosting provider or a web developer.

---

*Last Updated: February 2026*