// Initialize data from localStorage or use defaults
let servicesData = JSON.parse(localStorage.getItem('ntandoServices')) || [
    {
        id: 1,
        name: "WhatsApp Banned Recovery (Temporary)",
        price: "$5",
        description: "Quick recovery of temporarily banned WhatsApp accounts. Get back to messaging in no time!",
        image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=400"
    },
    {
        id: 2,
        name: "WhatsApp Banned Recovery (Permanent)",
        price: "$10",
        description: "Full recovery of permanently banned WhatsApp accounts. Professional service guaranteed.",
        image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=400"
    },
    {
        id: 3,
        name: "Hacked WhatsApp Account Recovery",
        price: "$10",
        description: "Recover your hacked WhatsApp account and secure it from future attacks.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400"
    },
    {
        id: 4,
        name: "Website Building",
        price: "$25",
        description: "Professional website development tailored to your needs. Modern, responsive, and SEO-friendly.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
    },
    {
        id: 5,
        name: "Website Hosting",
        price: "$15/month",
        description: "Reliable and fast website hosting with excellent uptime and support.",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=400"
    },
    {
        id: 6,
        name: "Anti-DDOS & Security Upgrades",
        price: "$20",
        description: "Protect your website from DDoS attacks and enhance overall security.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400"
    },
    {
        id: 7,
        name: "Log Making",
        price: "$5",
        description: "Professional log creation and management for your applications and services.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
    },
    {
        id: 8,
        name: "Banner Making",
        price: "Custom",
        description: "Eye-catching banners for your website, social media, or advertising campaigns.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400"
    },
    {
        id: 9,
        name: "Business Cards",
        price: "Custom",
        description: "Professional business card design and printing services.",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400"
    },
    {
        id: 10,
        name: "WhatsApp Bots",
        price: "Custom",
        description: "Custom WhatsApp bots with autotyping, autobio, music download, and video download features.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400"
    },
    {
        id: 11,
        name: "Group Renting",
        price: "$5/month",
        description: "Rent WhatsApp groups for your business or community needs.",
        image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400"
    },
    {
        id: 12,
        name: "Private Group",
        price: "$7/month",
        description: "Exclusive private WhatsApp groups with premium features and support.",
        image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400"
    }
];

let adsData = JSON.parse(localStorage.getItem('ntandoAds')) || [
    {
        id: 1,
        title: "Special Offer!",
        text: "Get 20% off on all WhatsApp recovery services this month!",
        link: "#contact",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
    }
];

let settingsData = JSON.parse(localStorage.getItem('ntandoSettings')) || {
    siteTitle: "Ntandostore",
    heroTitle: "Welcome to Ntandostore",
    heroText: "Your one-stop shop for WhatsApp recovery, website services, and digital solutions",
    aboutText: "Ntandostore is your trusted partner for digital solutions. We specialize in WhatsApp account recovery, website development, and various digital services to help your business grow.",
    backgroundMusic: ""
};

let currentEditingService = null;
let currentEditingAd = null;
let isLoggedIn = false;

// DOM Elements
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const servicesGrid = document.getElementById('servicesGrid');
const adsContainer = document.getElementById('adsContainer');
const adminModal = document.getElementById('adminModal');
const serviceModal = document.getElementById('serviceModal');
const adModal = document.getElementById('adModal');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const serviceForm = document.getElementById('serviceForm');
const adForm = document.getElementById('adForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
    loadAds();
    loadSettings();
    setupEventListeners();
    setupAdminPanel();
});

// Load services to the grid
function loadServices() {
    servicesGrid.innerHTML = '';
    servicesData.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesGrid.appendChild(serviceCard);
    });
}

// Create service card HTML
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
        <img src="${service.image}" alt="${service.name}" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
        <div class="service-content">
            <h3>${service.name}</h3>
            <span class="service-price">${service.price}</span>
            <p>${service.description}</p>
        </div>
    `;
    return card;
}

// Load ads
function loadAds() {
    adsContainer.innerHTML = '';
    adsData.forEach(ad => {
        const adItem = createAdItem(ad);
        adsContainer.appendChild(adItem);
    });
}

// Create ad item HTML
function createAdItem(ad) {
    const adItem = document.createElement('div');
    adItem.className = 'ad-item';
    const imageHtml = ad.image ? `<img src="${ad.image}" alt="${ad.title}" onerror="this.style.display='none'">` : '';
    const linkHtml = ad.link ? `<a href="${ad.link}" class="contact-button">Learn More</a>` : '';
    
    adItem.innerHTML = `
        ${imageHtml}
        <div class="ad-content">
            <h3>${ad.title}</h3>
            <p>${ad.text}</p>
            ${linkHtml}
        </div>
    `;
    return adItem;
}

// Load settings
function loadSettings() {
    document.title = settingsData.siteTitle;
    document.querySelector('header h1').textContent = settingsData.siteTitle;
    document.querySelector('#home h2').textContent = settingsData.heroTitle;
    document.querySelector('#home p').textContent = settingsData.heroText;
    document.querySelector('#about p').textContent = settingsData.aboutText;
    
    if (settingsData.backgroundMusic) {
        bgMusic.src = settingsData.backgroundMusic;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Music toggle
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = '🔊 Music On';
        } else {
            bgMusic.pause();
            musicToggle.textContent = '🎵 Music';
        }
    });

    // Admin link
    document.getElementById('adminLink').addEventListener('click', function(e) {
        e.preventDefault();
        if (isLoggedIn) {
            showAdminPanel();
        } else {
            showAdminLogin();
        }
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            adminModal.style.display = 'none';
            serviceModal.style.display = 'none';
            adModal.style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === adminModal) adminModal.style.display = 'none';
        if (e.target === serviceModal) serviceModal.style.display = 'none';
        if (e.target === adModal) adModal.style.display = 'none';
    });

    // Login form
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === 'Ntando' && password === 'Ntando') {
            isLoggedIn = true;
            adminModal.style.display = 'none';
            showAdminPanel();
        } else {
            alert('Invalid credentials! Please try again.');
        }
    });

    // Service form
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveService();
    });

    // Ad form
    adForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveAd();
    });

    // Admin buttons
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('addServiceBtn').addEventListener('click', showAddServiceModal);
    document.getElementById('addAdBtn').addEventListener('click', showAddAdModal);
    document.getElementById('uploadImageBtn').addEventListener('click', uploadServiceImage);
    document.getElementById('uploadMusicBtn').addEventListener('click', uploadMusic);
    document.getElementById('removeMusicBtn').addEventListener('click', removeMusic);
    document.getElementById('settingsForm').addEventListener('submit', saveSettings);
}

// Setup admin panel
function setupAdminPanel() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + 'Tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    loadAdminServicesList();
    loadAdminAdsList();
    loadServiceSelect();
    loadSettingsForm();
}

// Show admin login modal
function showAdminLogin() {
    adminModal.style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Show admin panel
function showAdminPanel() {
    adminPanel.classList.remove('hidden');
    document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
}

// Logout
function logout() {
    isLoggedIn = false;
    adminPanel.classList.add('hidden');
    alert('Logged out successfully!');
}

// Load admin services list
function loadAdminServicesList() {
    const adminServicesList = document.getElementById('adminServicesList');
    adminServicesList.innerHTML = '';
    
    servicesData.forEach(service => {
        const item = document.createElement('div');
        item.className = 'admin-list-item';
        item.innerHTML = `
            <div class="admin-list-item-content">
                <h4>${service.name}</h4>
                <p>Price: ${service.price}</p>
                <p>${service.description.substring(0, 100)}...</p>
            </div>
            <div class="admin-list-item-actions">
                <button class="edit-button" onclick="editService(${service.id})">Edit</button>
                <button class="delete-button" onclick="deleteService(${service.id})">Delete</button>
            </div>
        `;
        adminServicesList.appendChild(item);
    });
}

// Load admin ads list
function loadAdminAdsList() {
    const adminAdsList = document.getElementById('adminAdsList');
    adminAdsList.innerHTML = '';
    
    adsData.forEach(ad => {
        const item = document.createElement('div');
        item.className = 'admin-list-item';
        item.innerHTML = `
            <div class="admin-list-item-content">
                <h4>${ad.title}</h4>
                <p>${ad.text.substring(0, 100)}...</p>
            </div>
            <div class="admin-list-item-actions">
                <button class="edit-button" onclick="editAd(${ad.id})">Edit</button>
                <button class="delete-button" onclick="deleteAd(${ad.id})">Delete</button>
            </div>
        `;
        adminAdsList.appendChild(item);
    });
}

// Load service select dropdown
function loadServiceSelect() {
    const serviceSelect = document.getElementById('serviceSelect');
    serviceSelect.innerHTML = '';
    
    servicesData.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        serviceSelect.appendChild(option);
    });
}

// Load settings form
function loadSettingsForm() {
    document.getElementById('siteTitle').value = settingsData.siteTitle;
    document.getElementById('heroTitle').value = settingsData.heroTitle;
    document.getElementById('heroText').value = settingsData.heroText;
    document.getElementById('aboutText').value = settingsData.aboutText;
}

// Show add service modal
function showAddServiceModal() {
    currentEditingService = null;
    document.getElementById('serviceModalTitle').textContent = 'Add New Service';
    document.getElementById('serviceName').value = '';
    document.getElementById('servicePrice').value = '';
    document.getElementById('serviceDescription').value = '';
    document.getElementById('serviceImage').value = '';
    serviceModal.style.display = 'block';
}

// Edit service
function editService(id) {
    currentEditingService = servicesData.find(s => s.id === id);
    if (currentEditingService) {
        document.getElementById('serviceModalTitle').textContent = 'Edit Service';
        document.getElementById('serviceName').value = currentEditingService.name;
        document.getElementById('servicePrice').value = currentEditingService.price;
        document.getElementById('serviceDescription').value = currentEditingService.description;
        document.getElementById('serviceImage').value = currentEditingService.image;
        serviceModal.style.display = 'block';
    }
}

// Save service
function saveService() {
    const name = document.getElementById('serviceName').value;
    const price = document.getElementById('servicePrice').value;
    const description = document.getElementById('serviceDescription').value;
    const image = document.getElementById('serviceImage').value || 'https://via.placeholder.com/400x200?text=No+Image';
    
    if (currentEditingService) {
        // Update existing service
        const index = servicesData.findIndex(s => s.id === currentEditingService.id);
        if (index !== -1) {
            servicesData[index] = {
                ...servicesData[index],
                name,
                price,
                description,
                image
            };
        }
    } else {
        // Add new service
        const newService = {
            id: Date.now(),
            name,
            price,
            description,
            image
        };
        servicesData.push(newService);
    }
    
    saveToLocalStorage();
    loadServices();
    loadAdminServicesList();
    loadServiceSelect();
    serviceModal.style.display = 'none';
}

// Delete service
function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        servicesData = servicesData.filter(s => s.id !== id);
        saveToLocalStorage();
        loadServices();
        loadAdminServicesList();
        loadServiceSelect();
    }
}

// Show add ad modal
function showAddAdModal() {
    currentEditingAd = null;
    document.getElementById('adModalTitle').textContent = 'Add New Ad';
    document.getElementById('adTitle').value = '';
    document.getElementById('adText').value = '';
    document.getElementById('adLink').value = '';
    document.getElementById('adImage').value = '';
    adModal.style.display = 'block';
}

// Edit ad
function editAd(id) {
    currentEditingAd = adsData.find(a => a.id === id);
    if (currentEditingAd) {
        document.getElementById('adModalTitle').textContent = 'Edit Ad';
        document.getElementById('adTitle').value = currentEditingAd.title;
        document.getElementById('adText').value = currentEditingAd.text;
        document.getElementById('adLink').value = currentEditingAd.link || '';
        document.getElementById('adImage').value = currentEditingAd.image || '';
        adModal.style.display = 'block';
    }
}

// Save ad
function saveAd() {
    const title = document.getElementById('adTitle').value;
    const text = document.getElementById('adText').value;
    const link = document.getElementById('adLink').value;
    const image = document.getElementById('adImage').value;
    
    if (currentEditingAd) {
        // Update existing ad
        const index = adsData.findIndex(a => a.id === currentEditingAd.id);
        if (index !== -1) {
            adsData[index] = {
                ...adsData[index],
                title,
                text,
                link,
                image
            };
        }
    } else {
        // Add new ad
        const newAd = {
            id: Date.now(),
            title,
            text,
            link,
            image
        };
        adsData.push(newAd);
    }
    
    saveToLocalStorage();
    loadAds();
    loadAdminAdsList();
    adModal.style.display = 'none';
}

// Delete ad
function deleteAd(id) {
    if (confirm('Are you sure you want to delete this ad?')) {
        adsData = adsData.filter(a => a.id !== id);
        saveToLocalStorage();
        loadAds();
        loadAdminAdsList();
    }
}

// Upload service image
function uploadServiceImage() {
    const serviceId = document.getElementById('serviceSelect').value;
    const fileInput = document.getElementById('imageUpload');
    
    if (!fileInput.files.length) {
        alert('Please select an image file');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageData = e.target.result;
        const service = servicesData.find(s => s.id == serviceId);
        if (service) {
            service.image = imageData;
            saveToLocalStorage();
            loadServices();
            loadAdminServicesList();
            alert('Image uploaded successfully!');
        }
    };
    
    reader.readAsDataURL(file);
}

// Upload music
function uploadMusic() {
    const fileInput = document.getElementById('musicUpload');
    
    if (!fileInput.files.length) {
        alert('Please select a music file');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        settingsData.backgroundMusic = e.target.result;
        saveToLocalStorage();
        bgMusic.src = settingsData.backgroundMusic;
        alert('Music uploaded successfully!');
    };
    
    reader.readAsDataURL(file);
}

// Remove music
function removeMusic() {
    if (confirm('Are you sure you want to remove the background music?')) {
        settingsData.backgroundMusic = '';
        saveToLocalStorage();
        bgMusic.src = '';
        alert('Music removed successfully!');
    }
}

// Save settings
function saveSettings(e) {
    e.preventDefault();
    
    settingsData.siteTitle = document.getElementById('siteTitle').value;
    settingsData.heroTitle = document.getElementById('heroTitle').value;
    settingsData.heroText = document.getElementById('heroText').value;
    settingsData.aboutText = document.getElementById('aboutText').value;
    
    saveToLocalStorage();
    loadSettings();
    alert('Settings saved successfully!');
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('ntandoServices', JSON.stringify(servicesData));
    localStorage.setItem('ntandoAds', JSON.stringify(adsData));
    localStorage.setItem('ntandoSettings', JSON.stringify(settingsData));
}

// Smooth scroll for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});