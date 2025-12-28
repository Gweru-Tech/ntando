/**
 * Ntandostore Security System
 * Comprehensive Anti-Hacking and Security Protection
 */

// Security Configuration
const SECURITY_CONFIG = {
    // Rate limiting
    maxRequestsPerMinute: 60,
    maxFailedLogins: 5,
    loginLockoutTime: 15 * 60 * 1000, // 15 minutes
    
    // Session management
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    sessionRefreshInterval: 5 * 60 * 1000, // 5 minutes
    
    // CSRF protection
    csrfTokenExpiry: 60 * 60 * 1000, // 1 hour
    
    // File upload security
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedMusicTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    
    // DDoS protection
    ddosThreshold: 100, // requests per minute
    ddosBanTime: 60 * 60 * 1000, // 1 hour
    
    // Bot detection
    suspiciousUserAgents: [
        'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
        'python', 'java', 'perl', 'ruby', 'php'
    ]
};

// Security State
const SecurityState = {
    ipRequests: {},
    failedLogins: {},
    csrfTokens: {},
    sessions: {},
    blockedIPs: {},
    botScores: {}
};

/**
 * Rate Limiting System
 */
const RateLimiter = {
    checkRequest(ip) {
        const now = Date.now();
        const minute = Math.floor(now / 60000);
        
        if (!SecurityState.ipRequests[ip]) {
            SecurityState.ipRequests[ip] = {};
        }
        
        if (!SecurityState.ipRequests[ip][minute]) {
            SecurityState.ipRequests[ip][minute] = 0;
        }
        
        SecurityState.ipRequests[ip][minute]++;
        
        // Check if IP is blocked
        if (SecurityState.blockedIPs[ip] && SecurityState.blockedIPs[ip] > now) {
            return {
                allowed: false,
                reason: 'IP blocked',
                retryAfter: Math.ceil((SecurityState.blockedIPs[ip] - now) / 1000)
            };
        }
        
        // Check rate limit
        if (SecurityState.ipRequests[ip][minute] > SECURITY_CONFIG.maxRequestsPerMinute) {
            // Block IP for DDoS protection
            SecurityState.blockedIPs[ip] = now + SECURITY_CONFIG.ddosBanTime;
            return {
                allowed: false,
                reason: 'Rate limit exceeded',
                retryAfter: SECURITY_CONFIG.ddosBanTime / 1000
            };
        }
        
        return { allowed: true };
    },
    
    recordFailedLogin(ip) {
        const now = Date.now();
        
        if (!SecurityState.failedLogins[ip]) {
            SecurityState.failedLogins[ip] = { count: 0, lastAttempt: now };
        }
        
        SecurityState.failedLogins[ip].count++;
        SecurityState.failedLogins[ip].lastAttempt = now;
        
        if (SecurityState.failedLogins[ip].count >= SECURITY_CONFIG.maxFailedLogins) {
            SecurityState.blockedIPs[ip] = now + SECURITY_CONFIG.loginLockoutTime;
            return true; // Account locked
        }
        
        return false;
    },
    
    resetFailedLogin(ip) {
        delete SecurityState.failedLogins[ip];
    },
    
    cleanupOldEntries() {
        const now = Date.now();
        const hour = Math.floor(now / 3600000);
        
        // Clean up old IP requests
        Object.keys(SecurityState.ipRequests).forEach(ip => {
            Object.keys(SecurityState.ipRequests[ip]).forEach(minute => {
                if (parseInt(minute) < Math.floor(now / 60000) - 60) {
                    delete SecurityState.ipRequests[ip][minute];
                }
            });
            
            if (Object.keys(SecurityState.ipRequests[ip]).length === 0) {
                delete SecurityState.ipRequests[ip];
            }
        });
        
        // Clean up expired IP blocks
        Object.keys(SecurityState.blockedIPs).forEach(ip => {
            if (SecurityState.blockedIPs[ip] < now) {
                delete SecurityState.blockedIPs[ip];
            }
        });
    }
};

/**
 * Input Sanitization
 */
const InputSanitizer = {
    sanitizeHTML(input) {
        if (typeof input !== 'string') return input;
        
        // Remove potentially dangerous HTML tags and attributes
        return input
            .replace(/<script[^>]*>.*?<\/script>/gi, '')
            .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
            .replace(/<object[^>]*>.*?<\/object>/gi, '')
            .replace(/<embed[^>]*>.*?<\/embed>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '')
            .replace(/<[^>]*>/g, '');
    },
    
    sanitizeSQL(input) {
        if (typeof input !== 'string') return input;
        
        // Prevent SQL injection
        return input
            .replace(/['";\\]/g, '')
            .replace(/--/g, '')
            .replace(/\/\*/g, '')
            .replace(/\*\//g, '')
            .replace(/xp_/gi, '')
            .replace(/exec/gi, '')
            .replace(/union/gi, '')
            .replace(/select/gi, '')
            .replace(/insert/gi, '')
            .replace(/update/gi, '')
            .replace(/delete/gi, '');
    },
    
    sanitizeFilename(filename) {
        return filename
            .replace(/[^a-zA-Z0-9._-]/g, '_')
            .replace(/\.{2,}/g, '.')
            .substring(0, 255);
    },
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
};

/**
 * CSRF Protection
 */
const CSRFProtection = {
    generateToken() {
        const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        
        SecurityState.csrfTokens[token] = Date.now() + SECURITY_CONFIG.csrfTokenExpiry;
        
        return token;
    },
    
    validateToken(token) {
        if (!token || !SecurityState.csrfTokens[token]) {
            return false;
        }
        
        // Check if token is expired
        if (SecurityState.csrfTokens[token] < Date.now()) {
            delete SecurityState.csrfTokens[token];
            return false;
        }
        
        return true;
    },
    
    cleanupExpiredTokens() {
        const now = Date.now();
        Object.keys(SecurityState.csrfTokens).forEach(token => {
            if (SecurityState.csrfTokens[token] < now) {
                delete SecurityState.csrfTokens[token];
            }
        });
    }
};

/**
 * Session Management
 */
const SessionManager = {
    createSession(userId) {
        const sessionId = Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        
        SecurityState.sessions[sessionId] = {
            userId,
            createdAt: Date.now(),
            lastActivity: Date.now(),
            ipAddress: this.getCurrentIP()
        };
        
        return sessionId;
    },
    
    validateSession(sessionId) {
        const session = SecurityState.sessions[sessionId];
        
        if (!session) {
            return false;
        }
        
        // Check session timeout
        if (Date.now() - session.lastActivity > SECURITY_CONFIG.sessionTimeout) {
            delete SecurityState.sessions[sessionId];
            return false;
        }
        
        // Update last activity
        session.lastActivity = Date.now();
        
        return true;
    },
    
    destroySession(sessionId) {
        delete SecurityState.sessions[sessionId];
    },
    
    cleanupExpiredSessions() {
        const now = Date.now();
        Object.keys(SecurityState.sessions).forEach(sessionId => {
            if (now - SecurityState.sessions[sessionId].lastActivity > SECURITY_CONFIG.sessionTimeout) {
                delete SecurityState.sessions[sessionId];
            }
        });
    },
    
    getCurrentIP() {
        // In a real implementation, this would get the actual IP
        return '127.0.0.1';
    }
};

/**
 * Bot Detection
 */
const BotDetector = {
    analyzeRequest(userAgent, ip) {
        let suspiciousScore = 0;
        const reasons = [];
        
        // Check user agent
        if (userAgent) {
            const lowerUA = userAgent.toLowerCase();
            SECURITY_CONFIG.suspiciousUserAgents.forEach(pattern => {
                if (lowerUA.includes(pattern)) {
                    suspiciousScore += 30;
                    reasons.push(`Suspicious user agent: ${pattern}`);
                }
            });
            
            // Check for empty user agent
            if (userAgent.length < 10) {
                suspiciousScore += 20;
                reasons.push('Empty or very short user agent');
            }
        } else {
            suspiciousScore += 40;
            reasons.push('Missing user agent');
        }
        
        // Check request patterns
        if (SecurityState.ipRequests[ip]) {
            const totalRequests = Object.values(SecurityState.ipRequests[ip])
                .reduce((sum, count) => sum + count, 0);
            
            if (totalRequests > SECURITY_CONFIG.ddosThreshold) {
                suspiciousScore += 50;
                reasons.push('High request frequency');
            }
        }
        
        // Store bot score
        SecurityState.botScores[ip] = {
            score: suspiciousScore,
            reasons,
            timestamp: Date.now()
        };
        
        return {
            isBot: suspiciousScore > 50,
            score: suspiciousScore,
            reasons
        };
    }
};

/**
 * File Upload Security
 */
const FileUploadSecurity = {
    validateFile(file, type) {
        // Check file size
        if (file.size > SECURITY_CONFIG.maxFileSize) {
            return {
                valid: false,
                error: 'File too large. Maximum size is 5MB.'
            };
        }
        
        // Check file type
        let allowedTypes;
        if (type === 'image') {
            allowedTypes = SECURITY_CONFIG.allowedImageTypes;
        } else if (type === 'music') {
            allowedTypes = SECURITY_CONFIG.allowedMusicTypes;
        } else {
            return {
                valid: false,
                error: 'Invalid file type specified.'
            };
        }
        
        if (!allowedTypes.includes(file.type)) {
            return {
                valid: false,
                error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
            };
        }
        
        // Sanitize filename
        const safeFilename = InputSanitizer.sanitizeFilename(file.name);
        
        return {
            valid: true,
            safeFilename
        };
    },
    
    scanForMalware(file) {
        // Basic file signature check
        return new Promise((resolve) => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const content = e.target.result;
                const signatures = [
                    /<script/i,
                    /<iframe/i,
                    /<object/i,
                    /<embed/i,
                    /javascript:/i,
                    /vbscript:/i,
                    /onload=/i,
                    /onerror=/i
                ];
                
                for (const signature of signatures) {
                    if (signature.test(content)) {
                        resolve({
                            clean: false,
                            threat: 'Suspicious content detected'
                        });
                        return;
                    }
                }
                
                resolve({ clean: true });
            };
            
            reader.readAsText(file);
        });
    }
};

/**
 * Security Headers
 */
const SecurityHeaders = {
    getHeaders() {
        return {
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
            'X-Download-Options': 'noopen',
            'X-Permitted-Cross-Domain-Policies': 'none'
        };
    }
};

/**
 * Activity Logger
 */
const ActivityLogger = {
    logActivity(action, details, userId = 'anonymous') {
        const logEntry = {
            timestamp: new Date().toISOString(),
            action,
            userId,
            details,
            userAgent: navigator.userAgent,
            ipAddress: SessionManager.getCurrentIP()
        };
        
        // Store logs in localStorage
        const logs = JSON.parse(localStorage.getItem('ntandoSecurityLogs') || '[]');
        logs.push(logEntry);
        
        // Keep only last 1000 logs
        if (logs.length > 1000) {
            logs.shift();
        }
        
        localStorage.setItem('ntandoSecurityLogs', JSON.stringify(logs));
        
        // Alert on suspicious activity
        if (action.includes('failed') || action.includes('blocked')) {
            console.warn('Suspicious activity detected:', logEntry);
        }
    },
    
    getLogs(limit = 100) {
        const logs = JSON.parse(localStorage.getItem('ntandoSecurityLogs') || '[]');
        return logs.slice(-limit).reverse();
    },
    
    clearLogs() {
        localStorage.removeItem('ntandoSecurityLogs');
    }
};

/**
 * Security Monitor
 */
const SecurityMonitor = {
    init() {
        // Clean up old entries every minute
        setInterval(() => {
            RateLimiter.cleanupOldEntries();
            CSRFProtection.cleanupExpiredTokens();
            SessionManager.cleanupExpiredSessions();
        }, 60000);
        
        // Log page load
        this.logPageAccess();
    },
    
    logPageAccess() {
        ActivityLogger.logActivity('page_access', {
            url: window.location.href,
            referrer: document.referrer
        });
    },
    
    getSecurityReport() {
        return {
            activeSessions: Object.keys(SecurityState.sessions).length,
            blockedIPs: Object.keys(SecurityState.blockedIPs).length,
            failedLogins: Object.keys(SecurityState.failedLogins).length,
            activeCSRFtokens: Object.keys(SecurityState.csrfTokens).length,
            recentActivity: ActivityLogger.getLogs(20)
        };
    }
};

// Initialize security system
SecurityMonitor.init();

// Export security functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RateLimiter,
        InputSanitizer,
        CSRFProtection,
        SessionManager,
        BotDetector,
        FileUploadSecurity,
        SecurityHeaders,
        ActivityLogger,
        SecurityMonitor,
        SECURITY_CONFIG
    };
}