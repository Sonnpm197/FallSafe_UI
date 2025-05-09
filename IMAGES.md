# Image Assets for FallSafe

This document tracks all the image assets needed for the FallSafe project.

## Required Images

### User Interface Images

1. `/avatar.jpg` - User profile avatar in the header (36x36px)
2. `/placeholder-camera.jpg` - Main camera feed in the CameraView component (recommended size: 800x400px)

### Thumbnail Images for Monitor Grid

3. `/thumbnail-1.jpg` - Monitor grid thumbnail 1 (recommended size: 200x120px)
4. `/thumbnail-2.jpg` - Monitor grid thumbnail 2 (recommended size: 200x120px)
5. `/thumbnail-3.jpg` - Monitor grid thumbnail 3 (recommended size: 200x120px)
6. `/thumbnail-4.jpg` - Monitor grid thumbnail 4 (recommended size: 200x120px)
7. `/thumbnail-5.jpg` - Monitor grid thumbnail 5 (recommended size: 200x120px)
8. `/thumbnail-6.jpg` - Monitor grid thumbnail 6 (recommended size: 200x120px)
9. `/thumbnail-7.jpg` - Monitor grid thumbnail 7 (recommended size: 200x120px)
10. `/thumbnail-8.jpg` - Monitor grid thumbnail 8 (recommended size: 200x120px)

## File References in Code

### Header Component (src/components/Header.tsx)
```jsx
<img src="/avatar.jpg" alt="User profile" />
```

### CameraView Component (src/components/CameraView.tsx)
```jsx
<img 
  src="/placeholder-camera.jpg" 
  alt="Camera view of monitoring area" 
  className="camera-feed"
/>
```

### MonitorGrid Component (src/components/MonitorGrid.tsx)
```jsx
<img 
  src={`/thumbnail-${index + 1}.jpg`} 
  alt={`Monitor ${monitor.id}`} 
  className="thumbnail-image"
/>
```

## Optional Enhancements

- Replace the infinity symbol (∞) used as the logo in the Header component with an actual logo image
- Add favicon.ico to the public directory for browser tab icon