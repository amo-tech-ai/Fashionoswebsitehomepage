# File Upload States - FashionOS

Complete file upload UI system with 4 distinct states, designed for Brand Shoot Wizard, Designer Portfolio, Gallery Management, and Contract Analyzer.

## 📁 Files

- `/components/shared/UploadStates.tsx` - Main upload component with all 4 states
- `/components/examples/FileUploadDemo.tsx` - Comprehensive demo page

## 🎯 4 Upload States

### State 1: Empty Upload Area (Drag & Drop)
- Dashed border (2px, #D1D5DB)
- 64px upload icon (gray)
- Headline: "Drag and drop files here"
- Subtext: "or click to browse"
- Supported formats and max size displayed
- Hover state: Border changes to solid #111111

### State 2: Uploading (In Progress)
- 80px file thumbnail (left)
- File name + size
- Progress bar (4px height, #E5E7EB background, #10B981 fill)
- Percentage text: "Uploading... X%"
- Cancel button (X icon, top right)
- Smooth animation (0.3s ease transition)

### State 3: Upload Complete
- File thumbnail with green checkmark overlay
- File name + size
- "Uploaded successfully" message
- Remove button (trash icon)

### State 4: Multiple Files (Gallery View)
- 3-column grid layout
- 120px square thumbnails
- File name below (truncated)
- Hover: Remove button overlay
- "+ Add More" card at end

## 🎨 File Type Icons

- **PDF**: Red document icon (#DC2626)
- **Images (JPG/PNG)**: Blue image icon (#2563EB)
- **Generic Files**: Gray file icon (#4B5563)

## 💻 Usage

### Basic File Upload (List View)

```tsx
import { FileUpload } from './components/shared/UploadStates';

function MyComponent() {
  const handleUpload = async (files: File[]) => {
    // Your upload logic here
    console.log('Uploading files:', files);
  };

  return (
    <FileUpload
      onUpload={handleUpload}
      acceptedTypes={['image/jpeg', 'image/png', 'application/pdf']}
      maxSize={10 * 1024 * 1024} // 10MB
      multiple={true}
      mode="list"
      maxFiles={10}
    />
  );
}
```

### Gallery View (3 columns)

```tsx
<FileUpload
  onUpload={handleUpload}
  acceptedTypes={['image/jpeg', 'image/png']}
  maxSize={10 * 1024 * 1024}
  multiple={true}
  mode="gallery" // Use gallery mode for grid layout
  maxFiles={12}
/>
```

### Simple Upload Button

```tsx
import { SimpleUploadButton } from './components/shared/UploadStates';

<SimpleUploadButton
  onUpload={handleSingleUpload}
  label="Upload Photo"
  acceptedTypes={['image/*']}
/>
```

## ⚙️ Props

### FileUpload Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onUpload` | `(files: File[]) => Promise<void>` | Required | Callback when files are uploaded |
| `acceptedTypes` | `string[]` | `['image/jpeg', 'image/png', 'application/pdf']` | Accepted MIME types |
| `maxSize` | `number` | `10 * 1024 * 1024` | Max file size in bytes (default 10MB) |
| `multiple` | `boolean` | `true` | Allow multiple file selection |
| `maxFiles` | `number` | `10` | Maximum number of files |
| `mode` | `'list' \| 'gallery'` | `'list'` | Display mode (list or grid) |
| `className` | `string` | `''` | Additional CSS classes |

### SimpleUploadButton Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onUpload` | `(file: File) => Promise<void>` | Required | Callback when file is uploaded |
| `label` | `string` | `'Upload File'` | Button label |
| `acceptedTypes` | `string[]` | `['image/*']` | Accepted MIME types |
| `className` | `string` | `''` | Additional CSS classes |

## 🎨 Design Specifications

### Progress Bar
- Height: 4px
- Background: #E5E7EB
- Fill: #10B981 (green)
- Border radius: 2px
- Transition: width 0.3s ease

### Thumbnail Sizes
- Empty state icon: 64px
- List view thumbnail: 80px
- Gallery view thumbnail: 120px
- File type icons: 24-48px

### Border Styles
- Default: 2px dashed #D1D5DB
- Hover: 2px solid #111111
- Dragging: 2px solid #111111 with #F5F2ED/30 background

### Colors (Calm Luxury Palette)
- Primary text: #1F2125 (charcoal)
- Background: #F5F2ED (ivory)
- Success: #10B981 (green)
- Error: #DC2626 (red)
- Gray: #6B7280

## ❌ Error States

### File Too Large
```
"File too large. Max size: 10 MB"
```
- Red alert icon displayed
- File marked with error status
- Remove button shown

### Wrong Format
```
"Invalid file type. Accepted: JPG, PNG, PDF"
```
- Type validation on selection
- Error message with accepted types
- Remove button shown

### Max Files Exceeded
```
"Maximum 10 files allowed"
```
- Alert dialog shown
- Additional files not added
- User can remove existing files to add new ones

### Upload Failed
```
"Upload failed"
```
- Network error or server error
- Error overlay on thumbnail
- Retry or remove options

## 🚀 Demo

View the complete demo with all 4 states at:

```
http://localhost:5173/upload-demo
```

The demo includes:
- State overview with descriptions
- Brand Shoot Wizard example (gallery view)
- Designer Portfolio example (list view)
- Contract Analyzer example (PDF only)
- Event Assets Gallery (mixed files)
- Simple upload buttons
- File type icons reference
- Design specifications

## 📝 Use Cases

### Brand Shoot Wizard
```tsx
<FileUpload
  onUpload={handleUpload}
  acceptedTypes={['image/jpeg', 'image/png']}
  mode="gallery"
  maxFiles={12}
/>
```

### Designer Portfolio
```tsx
<FileUpload
  onUpload={handleUpload}
  acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
  mode="list"
  maxFiles={8}
/>
```

### Contract Analyzer
```tsx
<FileUpload
  onUpload={handleUpload}
  acceptedTypes={['application/pdf']}
  mode="list"
  maxFiles={5}
/>
```

### Gallery Management
```tsx
<FileUpload
  onUpload={handleUpload}
  acceptedTypes={['image/jpeg', 'image/png', 'application/pdf']}
  mode="gallery"
  maxFiles={15}
/>
```

## ✅ Acceptance Criteria

- [x] All 4 upload states designed and implemented
- [x] File type icons consistent (PDF red, Images blue, Generic gray)
- [x] Progress animation smooth (0.3s ease transition)
- [x] Error handling included (file size, format, max files, upload failure)
- [x] Drag and drop functionality
- [x] List view (80px thumbnails)
- [x] Gallery view (120px thumbnails, 3 columns)
- [x] Hover states and interactions
- [x] Responsive design
- [x] Follows Calm Luxury design philosophy

## 🔧 Technical Details

### Dependencies
- React
- Motion (Framer Motion) - for smooth animations
- Lucide React - for icons

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

### Accessibility
- Keyboard navigation support
- Screen reader compatible
- Focus states on interactive elements
- Alt text for images

## 📦 Integration

To integrate into wizards and dashboards:

1. Import the component:
```tsx
import { FileUpload } from './components/shared/UploadStates';
```

2. Add to your form/wizard:
```tsx
<FileUpload
  onUpload={async (files) => {
    // Upload to your storage (Supabase, S3, etc.)
    const urls = await uploadFiles(files);
    // Update form state
    setFormData({ ...formData, files: urls });
  }}
  acceptedTypes={['image/jpeg', 'image/png']}
  mode="gallery"
/>
```

3. Handle the uploaded files in your backend/storage service.

## 🎯 Production Ready

This component is production-ready and includes:
- Full TypeScript support
- Error handling
- Loading states
- Validation
- Smooth animations
- Responsive design
- Accessibility features

Created for FashionOS with ❤️
