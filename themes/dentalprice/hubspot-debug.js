/**
 * HubSpot Form Debug Script
 * Add this script to your page to debug HubSpot form loading issues
 * 
 * Usage: Add <script src="hubspot-debug.js"></script> after the HubSpot forms script
 */

(function() {
    'use strict';
    
    console.log('🔍 HubSpot Debug Script Loaded');
    
    const DEBUG_CONFIG = {
        portalId: '26874015',
        formId: '5c1bfe1f-5d33-4d30-ad1c-b14bb6bb4bc3',
        region: 'na1',
        scriptUrl: '//js.hsforms.net/forms/v2.js'
    };
    
    // Create debug panel
    function createDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'hubspot-debug-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            width: 350px;
            max-height: 400px;
            background: #1a1a1a;
            color: #00ff00;
            font-family: monospace;
            font-size: 11px;
            border: 1px solid #333;
            border-radius: 5px;
            padding: 10px;
            z-index: 10000;
            overflow-y: auto;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        `;
        
        panel.innerHTML = `
            <div style="color: #fff; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 5px;">
                🔍 HubSpot Debug Panel
                <button onclick="this.parentElement.parentElement.style.display='none'" style="float: right; background: #ff4444; color: white; border: none; padding: 2px 6px; border-radius: 3px; cursor: pointer;">×</button>
            </div>
            <div id="debug-logs"></div>
        `;
        
        document.body.appendChild(panel);
        return panel;
    }
    
    let debugPanel;
    let logContainer;
    
    function log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
            info: '#00ff00',
            warn: '#ffff00', 
            error: '#ff4444',
            success: '#00ff88'
        };
        
        console.log(`[HubSpot Debug] ${message}`);
        
        if (!debugPanel) {
            debugPanel = createDebugPanel();
            logContainer = debugPanel.querySelector('#debug-logs');
        }
        
        const logEntry = document.createElement('div');
        logEntry.style.color = colors[type] || colors.info;
        logEntry.style.marginBottom = '3px';
        logEntry.innerHTML = `[${timestamp}] ${message}`;
        
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    // Check script loading
    function checkScriptLoading() {
        log('🚀 Starting HubSpot debug checks...');
        log(`📋 Config: Portal ${DEBUG_CONFIG.portalId}, Form ${DEBUG_CONFIG.formId}`);
        
        // Check if script is loaded
        const scriptElements = document.querySelectorAll('script[src*="js.hsforms.net"]');
        if (scriptElements.length === 0) {
            log('❌ HubSpot script tag not found in DOM', 'error');
        } else {
            log(`✅ Found ${scriptElements.length} HubSpot script tag(s)`, 'success');
            scriptElements.forEach((script, index) => {
                log(`   Script ${index + 1}: ${script.src}`);
            });
        }
        
        // Check network connectivity
        fetch('https://js.hsforms.net/forms/v2.js', { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    log('✅ HubSpot script URL is reachable', 'success');
                } else {
                    log(`❌ HubSpot script returned ${response.status}`, 'error');
                }
            })
            .catch(error => {
                log(`❌ Network error accessing HubSpot: ${error.message}`, 'error');
            });
        
        // Check hbspt object
        let checkCount = 0;
        const maxChecks = 20;
        
        const checkHbspt = setInterval(() => {
            checkCount++;
            
            if (typeof hbspt !== 'undefined') {
                log('✅ hbspt object is available', 'success');
                log(`   hbspt.forms available: ${typeof hbspt.forms !== 'undefined' ? 'Yes' : 'No'}`);
                clearInterval(checkHbspt);
                
                // Test form creation
                testFormCreation();
            } else if (checkCount >= maxChecks) {
                log(`❌ hbspt object not available after ${maxChecks} checks (10 seconds)`, 'error');
                clearInterval(checkHbspt);
            } else {
                log(`⏳ Waiting for hbspt... (${checkCount}/${maxChecks})`);
            }
        }, 500);
    }
    
    // Test form creation
    function testFormCreation() {
        log('🧪 Testing form creation...');
        
        // Create test container
        const testContainer = document.createElement('div');
        testContainer.id = 'hubspot-test-form';
        testContainer.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(testContainer);
        
        try {
            hbspt.forms.create({
                region: DEBUG_CONFIG.region,
                portalId: DEBUG_CONFIG.portalId,
                formId: DEBUG_CONFIG.formId,
                target: "#hubspot-test-form",
                onFormReady: function() {
                    log('✅ Test form created successfully!', 'success');
                    document.body.removeChild(testContainer);
                },
                onFormError: function(error) {
                    log(`❌ Form creation error: ${error}`, 'error');
                    document.body.removeChild(testContainer);
                }
            });
        } catch (error) {
            log(`❌ Exception during form creation: ${error.message}`, 'error');
            document.body.removeChild(testContainer);
        }
        
        // Set timeout to clean up if form doesn't load
        setTimeout(() => {
            if (document.getElementById('hubspot-test-form')) {
                log('⚠️ Test form did not load within 10 seconds', 'warn');
                document.body.removeChild(testContainer);
            }
        }, 10000);
    }
    
    // Check for common issues
    function checkCommonIssues() {
        log('🔍 Checking for common issues...');
        
        // Check CSP
        const metaCsp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (metaCsp) {
            log('⚠️ CSP detected, may block HubSpot script', 'warn');
            log(`   CSP: ${metaCsp.content}`);
        }
        
        // Check ad blockers (rough detection)
        const testElement = document.createElement('div');
        testElement.className = 'ads banner-ad';
        testElement.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px;';
        document.body.appendChild(testElement);
        
        setTimeout(() => {
            if (testElement.offsetHeight === 0) {
                log('⚠️ Ad blocker may be active (can block HubSpot)', 'warn');
            }
            document.body.removeChild(testElement);
        }, 100);
        
        // Check HTTPS
        if (location.protocol !== 'https:') {
            log('⚠️ Page is not served over HTTPS, may cause mixed content issues', 'warn');
        }
    }
    
    // Manual form test function
    window.testHubSpotForm = function(containerId = 'hubspot-test-manual') {
        log(`🧪 Manual form test started for container: ${containerId}`);
        
        const container = document.getElementById(containerId);
        if (!container) {
            log(`❌ Container ${containerId} not found`, 'error');
            return;
        }
        
        if (typeof hbspt === 'undefined') {
            log('❌ hbspt not available for manual test', 'error');
            return;
        }
        
        try {
            hbspt.forms.create({
                region: DEBUG_CONFIG.region,
                portalId: DEBUG_CONFIG.portalId,
                formId: DEBUG_CONFIG.formId,
                target: `#${containerId}`,
                onFormReady: function() {
                    log('✅ Manual test form ready!', 'success');
                },
                onFormSubmit: function() {
                    log('📤 Manual test form submitted', 'info');
                },
                onFormSubmitted: function() {
                    log('✅ Manual test form submission completed!', 'success');
                }
            });
        } catch (error) {
            log(`❌ Manual test error: ${error.message}`, 'error');
        }
    };
    
    // Start debugging when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                checkScriptLoading();
                checkCommonIssues();
            }, 1000);
        });
    } else {
        setTimeout(() => {
            checkScriptLoading();
            checkCommonIssues();
        }, 1000);
    }
    
    // Expose debug function
    window.hubspotDebug = {
        log: log,
        testForm: window.testHubSpotForm,
        config: DEBUG_CONFIG
    };
    
    log('🔍 Debug script initialized. Use hubspotDebug.testForm("container-id") to manually test forms.');
})();