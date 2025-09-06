# HubSpot Form Implementation Guide

## Overview
This guide explains the HubSpot form implementation for the "Get Your Free PDF Study" popup modal.

## Current Implementation

### 1. Modal Popup (`default.hbs`)
- **Location**: Added to the bottom of `default.hbs` template
- **Trigger**: Fixed button in bottom-right corner
- **Auto-popup**: Shows automatically after 15 seconds on first visit
- **Features**: 
  - HubSpot form with fallback
  - Loading states
  - Error handling
  - Console logging for debugging

### 2. Configuration
- **Portal ID**: `26874015`
- **Form ID**: `5c1bfe1f-5d33-4d30-ad1c-b14bb6bb4bc3`
- **Region**: `na1` (North America)
- **Script URL**: `//js.hsforms.net/forms/v2.js`

### 3. Fallback System
If HubSpot form fails to load (after 8 seconds), a fallback form appears with:
- Email input field
- Submit button
- Success message
- Basic validation

## Testing the Implementation

### Option 1: Use the Test Page
1. Open `/themes/dentalprice/test-hubspot.html` in your browser
2. This page includes 3 different test scenarios:
   - Direct HubSpot form load
   - Form with error handling
   - Fallback form test
3. Check the debug information section for diagnostics

### Option 2: Use the Debug Script
1. Add the debug script to any page:
   ```html
   <script src="/themes/dentalprice/hubspot-debug.js"></script>
   ```
2. Open browser console to see detailed logs
3. A debug panel will appear in the top-left corner
4. Use `hubspotDebug.testForm("container-id")` to manually test forms

### Option 3: Live Testing
1. Visit your Ghost blog
2. Look for the "Free PDF Study" button in the bottom-right corner
3. Click to open the modal
4. Check browser console for debug messages
5. Test both HubSpot form (if it loads) and fallback form

## Common Issues & Solutions

### Issue 1: Form Not Loading
**Symptoms**: Only shows "Loading form..." indefinitely
**Possible Causes**:
- Network connectivity issues
- HubSpot script blocked by ad blockers
- CORS policy issues
- Invalid Portal ID or Form ID

**Solutions**:
1. Check browser console for error messages
2. Verify network connectivity to `js.hsforms.net`
3. Test with ad blocker disabled
4. Verify Portal ID and Form ID in HubSpot dashboard

### Issue 2: Form Loads But Doesn't Submit
**Symptoms**: Form appears but submission fails
**Possible Causes**:
- Form not published in HubSpot
- Field validation issues
- GDPR/privacy settings blocking submission

**Solutions**:
1. Check HubSpot form settings and ensure it's published
2. Verify required fields are properly configured
3. Check GDPR compliance settings in HubSpot

### Issue 3: Styling Issues
**Symptoms**: Form appears but looks unstyled
**Solution**: The CSS for HubSpot forms is included in `default.hbs`:
```css
/* HubSpot Form Styling */
.hs-form { @apply space-y-4; }
.hs-form .hs-form-field { @apply mb-4; }
/* ... more styles ... */
```

### Issue 4: Script Loading Timeout
**Symptoms**: Fallback form always appears
**Solutions**:
1. Increase timeout in the code (currently 8 seconds)
2. Check if HubSpot script is being loaded correctly
3. Verify no CSP policies are blocking the script

## Customization Options

### 1. Change Auto-Popup Timing
```javascript
// Change this line in default.hbs
setTimeout(function() {
    // ... auto-popup code
}, 15000); // Change 15000 to desired milliseconds
```

### 2. Disable Auto-Popup
Comment out or remove this section in `default.hbs`:
```javascript
// Auto-show modal after 15 seconds on first visit (for testing)
// Comment this out in production if you don't want auto-popup
setTimeout(function() {
    // ... auto-popup code
}, 15000);
```

### 3. Change Trigger Button Text/Style
Modify this section in `default.hbs`:
```html
<button id="open-pdf-modal" class="...">
    <span>📄</span>
    <span class="font-medium">Your Custom Text</span>
</button>
```

### 4. Customize Fallback Form
Modify the fallback form HTML and the submission handler in `default.hbs`.

## Debug Commands

Open browser console and use these commands:

```javascript
// Test form creation manually
hubspotDebug.testForm("your-container-id");

// Check configuration
console.log(hubspotDebug.config);

// Add custom debug message
hubspotDebug.log("Your custom message", "info");
```

## Monitoring Form Performance

### Console Messages to Watch For:
- ✅ `HubSpot script loaded successfully`
- ✅ `HubSpot form ready and rendered`
- 📧 `HubSpot form submitted`
- ✅ `HubSpot form submission completed successfully`
- ❌ `Error loading HubSpot form`
- 📋 `Showing fallback form`

### Key Metrics to Track:
1. **Form Load Success Rate**: How often HubSpot form loads vs fallback
2. **Submission Success Rate**: How many form submissions complete
3. **Load Time**: How long it takes for form to appear
4. **User Interaction**: Click-through rate on the trigger button

## Next Steps

1. **Test the implementation** using the test page or debug script
2. **Monitor the console** for any error messages
3. **Verify form submissions** in your HubSpot dashboard
4. **Customize the styling** and messaging as needed
5. **Set up tracking** in HubSpot to monitor conversions

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Use the debug script to identify specific problems
3. Verify your HubSpot form settings
4. Test with the fallback form to ensure basic functionality works

The implementation includes comprehensive error handling and fallback mechanisms to ensure users can always submit their email, even if the HubSpot integration fails.