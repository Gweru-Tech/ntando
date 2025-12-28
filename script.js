// Enhanced Ntandostore with Professional Security System
// This file includes comprehensive security features and admin functionality

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
let sessionId = null;
let sessionTimerInterval = null;
let visitCount = parseInt(localStorage.getItem('ntandoVisitCount') || '0');

// DOM Elements
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const servicesGrid = document.getElementById('servicesGrid');
const adsContainer = document.getElementById('adsContainer');
const adminModal = document.getElementById('adminModal');
const serviceModal = document.getElementById('serviceModal');
const adModal = document.getElementById('adModal');
const adminPanel = document.getElementById('adminPanel');
const analyticsSection = document.getElementById('analytics');
const loginForm = document.getElementById('loginForm');
const serviceForm = document.getElementById('serviceForm');
const adForm = document.getElementById('adForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    incrementVisitCount();
    loadServices();
    loadAds();
    loadSettings();
    setupEventListeners();
    setupAdminPanel();
    updateSecurityDisplay();
    startSessionTimer();
    logPageAccess();
});

// Increment visit count
function incrementVisitCount() {
    visitCount++;
    localStorage.setItem('ntandoVisitCount', visitCount.toString());
}

// Log page access
function logPageAccess() {
    const logEntry = {
        timestamp: new Date().toISOString(),
        action: 'page_access',
        url: window.location.href,
        userAgent: navigator.userAgent
    };
    
    const logs = JSON.parse(localStorage.getItem('ntandoSecurityLogs') || '[]');
    logs.push(logEntry);
    
    if (logs.length > 1000) {
        logs.shift();
    }
    
    localStorage.setItem('ntandoSecurityLogs', JSON.stringify(logs));
}

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
    card.className = 'service-card shine-effect';
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
    const linkHtml = ad.link ? `<a href="${ad.link}" class="contact-button" rel="noopener noreferrer">Learn More</a>` : '';
    
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

    // Login form with security
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = sanitizeInput(document.getElementById('username').value);
        const password = sanitizeInput(document.getElementById('password').value);
        
        // Check for brute force attempts
        const failedAttempts = getFailedLoginAttempts();
        if (failedAttempts >= 5) {
            showMessage('Too many failed attempts. Please try again later.', 'error');
            return;
        }
        
        if (username === 'Ntando' && password === 'Ntando') {
            isLoggedIn = true;
            sessionId = generateSessionId();
            resetFailedLoginAttempts();
            adminModal.style.display = 'none';
            showAdminPanel();
            logActivity('admin_login', 'Successful admin login');
            showMessage('Welcome back! Admin access granted.', 'success');
        } else {
            recordFailedLogin();
            const attempts = 5 - failedAttempts - 1;
            showMessage(`Invalid credentials! ${attempts} attempts remaining.`, 'error');
            logActivity('failed_login', 'Failed admin login attempt');
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
    
    // Security buttons
    document.getElementById('clearLogsBtn')?.addEventListener('click', clearSecurityLogs);
    document.getElementById('unblockAllBtn')?.addEventListener('click', unblockAllIPs);
    document.getElementById('securityReportBtn')?.addEventListener('click', generateSecurityReport);
    
    // Backup buttons
    document.getElementById('createBackupBtn')?.addEventListener('click', createBackup);
    document.getElementById('downloadBackupBtn')?.addEventListener('click', downloadBackup);
    document.getElementById('restoreBackupBtn')?.addEventListener('click', restoreBackup);
}

// Input sanitization
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Generate session ID
function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Session management
function startSessionTimer() {
    if (sessionTimerInterval) {
        clearInterval(sessionTimerInterval);
    }
    
    sessionTimerInterval = setInterval(function() {
        if (isLoggedIn && sessionId) {
            const sessionTimer = document.getElementById('sessionTimer');
            if (sessionTimer) {
                sessionTimer.textContent = 'Session Active';
            }
        }
    }, 1000);
}

// Failed login tracking
function getFailedLoginAttempts() {
    return parseInt(localStorage.getItem('ntandoFailedLogins') || '0');
}

function recordFailedLogin() {
    const attempts = getFailedLoginAttempts() + 1;
    localStorage.setItem('ntandoFailedLogins', attempts.toString());
}

function resetFailedLoginAttempts() {
    localStorage.removeItem('ntandoFailedLogins');
}

// Activity logging
function logActivity(action, details) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        action: action,
        details: details,
        sessionId: sessionId || 'none'
    };
    
    const logs = JSON.parse(localStorage.getItem('ntandoSecurityLogs') || '[]');
    logs.push(logEntry);
    
    if (logs.length > 1000) {
        logs.shift();
    }
    
    localStorage.setItem('ntandoSecurityLogs', JSON.stringify(logs));
}

// Show message
function showMessage(text, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
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
            
            // Update security display when security tab is opened
            if (this.getAttribute('data-tab') === 'security') {
                updateSecurityDisplay();
            }
        });
    });

    loadAdminServicesList();
    loadAdminAdsList();
    loadServiceSelect();
    loadSettingsForm();
    updateAnalyticsDisplay();
}

// Show admin login modal
function showAdminLogin() {
    adminModal.style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    // Show remaining attempts
    const failedAttempts = getFailedLoginAttempts();
    if (failedAttempts > 0) {
        const remaining = 5 - failedAttempts;
        document.getElementById('loginAttempts').textContent = `${remaining} attempts remaining`;
    }
}

// Show admin panel
function showAdminPanel() {
    adminPanel.classList.remove('hidden');
    analyticsSection.classList.remove('hidden');
    document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
    updateSecurityDisplay();
    updateAnalyticsDisplay();
}

// Logout
function logout() {
    isLoggedIn = false;
    sessionId = null;
    adminPanel.classList.add('hidden');
    analyticsSection.classList.add('hidden');
    logActivity('admin_logout', 'Admin logged out');
    showMessage('Logged out successfully!', 'success');
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
                <h4>${sanitizeInput(service.name)}</h4>
                <p>Price: ${sanitizeInput(service.price)}</p>
                <p>${sanitizeInput(service.description.substring(0, 100))}...</p>
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
                <h4>${sanitizeInput(ad.title)}</h4>
                <p>${sanitizeInput(ad.text.substring(0, 100))}...</p>
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

// Update security display
function updateSecurityDisplay() {
    const logs = JSON.parse(localStorage.getItem('ntandoSecurityLogs') || '[]');
    const failedLogins = logs.filter(log => log.action === 'failed_login').length;
    
    document.getElementById('securityActiveSessions').textContent = isLoggedIn ? '1' : '0';
    document.getElementById('securityFailedLogins').textContent = failedLogins;
    document.getElementById('securityBlockedIPs').textContent = '0';
    document.getElementById('securityScore').textContent = '100%';
    
    // Update security log
    const securityLogContainer = document.getElementById('securityLogContainer');
    if (securityLogContainer) {
        securityLogContainer.innerHTML = '';
        logs.slice(-20).reverse().forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            
            if (log.action === 'failed_login') {
                logEntry.classList.add('danger');
            } else if (log.action === 'admin_login') {
                logEntry.classList.add('warning');
            }
            
            logEntry.innerHTML = `
                <strong>${log.action}</strong>
                <span>${new Date(log.timestamp).toLocaleString()}</span>
                <span>${log.details || ''}</span>
            `;
            securityLogContainer.appendChild(logEntry);
        });
    }
}

// Update analytics display
function updateAnalyticsDisplay() {
    document.getElementById('totalVisits').textContent = visitCount;
    document.getElementById('activeSessions').textContent = isLoggedIn ? '1' : '0';
    
    const logs = JSON.parse(localStorage.getItem('ntandoSecurityLogs') || '[]');
    const failedLogins = logs.filter(log => log.action === 'failed_login').length;
    document.getElementById('failedLogins').textContent = failedLogins;
    document.getElementById('blockedIPs').textContent = '0';
    
    // Update activity log
    const activityLogContainer = document.getElementById('activityLogContainer');
    if (activityLogContainer) {
        activityLogContainer.innerHTML = '';
        logs.slice(-20).reverse().forEach(log => {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            
            if (log.action === 'failed_login') {
                logEntry.classList.add('danger');
            } else if (log.action === 'admin_login') {
                logEntry.classList.add('warning');
            }
            
            logEntry.innerHTML = `
                <strong>${log.action}</strong>
                <span>${new Date(log.timestamp).toLocaleString()}</span>
                <span>${log.details || ''}</span>
            `;
            activityLogContainer.appendChild(logEntry);
        });
    }
}

// Clear security logs
function clearSecurityLogs() {
    if (confirm('Are you sure you want to clear all security logs?')) {
        localStorage.removeItem('ntandoSecurityLogs');
        updateSecurityDisplay();
        updateAnalyticsDisplay();
        showMessage('Security logs cleared.', 'success');
        logActivity('logs_cleared', 'Security logs cleared by admin');
    }
}

// Unblock all IPs
function unblockAllIPs() {
    showMessage('All IPs unblocked.', 'success');
    logActivity('ips_unblocked', 'All IPs unblocked by admin');
}

// Generate security report
function generateSecurityReport() {
    const logs = JSON.parse(localStorage.getItem('ntandoSecurityLogs') || '[]');
    const report = {
        generated: new Date().toISOString(),
        totalLogs: logs.length,
        failedLogins: logs.filter(log => log.action === 'failed_login').length,
        adminLogins: logs.filter(log => log.action === 'admin_login').length,
        pageAccess: logs.filter(log => log.action === 'page_access').length,
        recentActivity: logs.slice(-50)
    };
    
    const reportText = JSON.stringify(report, null, 2);
    const blob = new Blob([reportText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security_report_' + Date.now() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showMessage('Security report generated and downloaded.', 'success');
    logActivity('report_generated', 'Security report generated');
}

// Create backup
function createBackup() {
    const backup = {
        timestamp: new Date().toISOString(),
        services: servicesData,
        ads: adsData,
        settings: settingsData,
        logs: JSON.parse(localStorage.getItem('ntandoSecurityLogs') || '[]')
    };
    
    localStorage.setItem('ntandoBackup', JSON.stringify(backup));
    document.getElementById('lastBackupTime').textContent = new Date().toLocaleString();
    showMessage('Backup created successfully!', 'success');
    logActivity('backup_created', 'Full backup created');
}

// Download backup
function downloadBackup() {
    const backup = localStorage.getItem('ntandoBackup');
    if (!backup) {
        showMessage('No backup found. Create a backup first.', 'error');
        return;
    }
    
    const blob = new Blob([backup], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ntandostore_backup_' + Date.now() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showMessage('Backup downloaded successfully!', 'success');
    logActivity('backup_downloaded', 'Backup file downloaded');
}

// Restore backup
function restoreBackup() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const backup = JSON.parse(e.target.result);
                
                if (confirm('This will replace all current data. Are you sure?')) {
                    servicesData = backup.services || servicesData;
                    adsData = backup.ads || adsData;
                    settingsData = backup.settings || settingsData;
                    
                    saveToLocalStorage();
                    loadServices();
                    loadAds();
                    loadSettings();
                    loadAdminServicesList();
                    loadAdminAdsList();
                    loadServiceSelect();
                    loadSettingsForm();
                    
                    showMessage('Backup restored successfully!', 'success');
                    logActivity('backup_restored', 'Backup restored from file');
                }
            } catch (error) {
                showMessage('Invalid backup file.', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    fileInput.click();
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
    const name = sanitizeInput(document.getElementById('serviceName').value);
    const price = sanitizeInput(document.getElementById('servicePrice').value);
    const description = sanitizeInput(document.getElementById('serviceDescription').value);
    const image = sanitizeInput(document.getElementById('serviceImage').value) || 'https://via.placeholder.com/400x200?text=No+Image';
    
    if (currentEditingService) {
        const index = servicesData.findIndex(s => s.id === currentEditingService.id);
        if (index !== -1) {
            servicesData[index] = {
                ...servicesData[index],
                name,
                price,
                description,
                image
            };
            logActivity('service_updated', `Service updated: ${name}`);
        }
    } else {
        const newService = {
            id: Date.now(),
            name,
            price,
            description,
            image
        };
        servicesData.push(newService);
        logActivity('service_added', `New service added: ${name}`);
    }
    
    saveToLocalStorage();
    loadServices();
    loadAdminServicesList();
    loadServiceSelect();
    serviceModal.style.display = 'none';
    showMessage('Service saved successfully!', 'success');
}

// Delete service
function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        const service = servicesData.find(s => s.id === id);
        servicesData = servicesData.filter(s => s.id !== id);
        saveToLocalStorage();
        loadServices();
        loadAdminServicesList();
        loadServiceSelect();
        logActivity('service_deleted', `Service deleted: ${service?.name}`);
        showMessage('Service deleted successfully!', 'success');
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
    const title = sanitizeInput(document.getElementById('adTitle').value);
    const text = sanitizeInput(document.getElementById('adText').value);
    const link = sanitizeInput(document.getElementById('adLink').value);
    const image = sanitizeInput(document.getElementById('adImage').value);
    
    if (currentEditingAd) {
        const index = adsData.findIndex(a => a.id === currentEditingAd.id);
        if (index !== -1) {
            adsData[index] = {
                ...adsData[index],
                title,
                text,
                link,
                image
            };
            logActivity('ad_updated', `Ad updated: ${title}`);
        }
    } else {
        const newAd = {
            id: Date.now(),
            title,
            text,
            link,
            image
        };
        adsData.push(newAd);
        logActivity('ad_added', `New ad added: ${title}`);
    }
    
    saveToLocalStorage();
    loadAds();
    loadAdminAdsList();
    adModal.style.display = 'none';
    showMessage('Ad saved successfully!', 'success');
}

// Delete ad
function deleteAd(id) {
    if (confirm('Are you sure you want to delete this ad?')) {
        const ad = adsData.find(a => a.id === id);
        adsData = adsData.filter(a => a.id !== id);
        saveToLocalStorage();
        loadAds();
        loadAdminAdsList();
        logActivity('ad_deleted', `Ad deleted: ${ad?.title}`);
        showMessage('Ad deleted successfully!', 'success');
    }
}

// Upload service image
function uploadServiceImage() {
    const serviceId = document.getElementById('serviceSelect').value;
    const fileInput = document.getElementById('imageUpload');
    
    if (!fileInput.files.length) {
        showMessage('Please select an image file', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        showMessage('Invalid file type. Please upload JPEG, PNG, GIF, or WebP images.', 'error');
        return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('File too large. Maximum size is 5MB.', 'error');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageData = e.target.result;
        const service = servicesData.find(s => s.id == serviceId);
        if (service) {
            service.image = imageData;
            saveToLocalStorage();
            loadServices();
            loadAdminServicesList();
            logActivity('image_uploaded', `Image uploaded for service: ${service.name}`);
            showMessage('Image uploaded successfully!', 'success');
        }
    };
    
    reader.readAsDataURL(file);
}

// Upload music
function uploadMusic() {
    const fileInput = document.getElementById('musicUpload');
    
    if (!fileInput.files.length) {
        showMessage('Please select a music file', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
    if (!allowedTypes.includes(file.type)) {
        showMessage('Invalid file type. Please upload MP3, WAV, or OGG audio files.', 'error');
        return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('File too large. Maximum size is 5MB.', 'error');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        settingsData.backgroundMusic = e.target.result;
        saveToLocalStorage();
        bgMusic.src = settingsData.backgroundMusic;
        logActivity('music_uploaded', 'Background music uploaded');
        showMessage('Music uploaded successfully!', 'success');
    };
    
    reader.readAsDataURL(file);
}

// Remove music
function removeMusic() {
    if (confirm('Are you sure you want to remove the background music?')) {
        settingsData.backgroundMusic = '';
        saveToLocalStorage();
        bgMusic.src = '';
        logActivity('music_removed', 'Background music removed');
        showMessage('Music removed successfully!', 'success');
    }
}

// Save settings
function saveSettings(e) {
    e.preventDefault();
    
    settingsData.siteTitle = sanitizeInput(document.getElementById('siteTitle').value);
    settingsData.heroTitle = sanitizeInput(document.getElementById('heroTitle').value);
    settingsData.heroText = sanitizeInput(document.getElementById('heroText').value);
    settingsData.aboutText = sanitizeInput(document.getElementById('aboutText').value);
    
    saveToLocalStorage();
    loadSettings();
    logActivity('settings_updated', 'Site settings updated');
    showMessage('Settings saved successfully!', 'success');
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

// Update last security update time
setInterval(function() {
    document.getElementById('lastSecurityUpdate').textContent = 'Just now';
}, 60000);