# Advanced Dashboard Application

## Project Overview

This is a comprehensive 2-page dashboard application built with React, Redux, TanStack Table, and ECharts. The application demonstrates advanced features including editable data tables, interactive visualizations, localStorage-based data persistence, and customizable UI components.

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **React Router** - Nested routing
- **TanStack Table** - Powerful data tables
- **ECharts** - Interactive charts and visualizations
- **Axios** - HTTP client for simulated API calls
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **LocalStorage** - Client-side data persistence

## Features

### Dashboard Page (`/dashboard`)
- **Summary Cards**: Display aggregated metrics (Total Sites, Alarms, Devices, Tickets)
- **Data Table**: 
  - View all site data in a structured table
  - Edit rows inline with input fields
  - Save changes with simulated POST requests
  - View insights modal with line charts for each site
- **Settings Drawer**: Toggle visibility of Summary Cards and Data Table
- **Persistent Settings**: UI preferences saved to localStorage

### Insights Page (`/insights`)
- **Multi-Site Trend Comparison**: Line chart comparing trends across multiple sites
- **Activity Heatmap**: Visual representation of activity patterns

## Architecture

### State Management
- **Redux Store** with three slices:
  - `sitesSlice`: Manages site data
  - `insightsSlice`: Manages multi-site insights
  - `uiSettingsSlice`: Manages UI visibility preferences

### Data Flow
1. On app startup, check if data exists in localStorage
2. If not, load from JSON files in `/public/data/`
3. Save to localStorage for persistence
4. Load into Redux store for global state management
5. Components read from Redux and update both Redux and localStorage

### Data Structure

#### sites.json
```json
[
  {
    "id": 1,
    "name": "Site Alpha",
    "status": "Active",
    "lastUpdated": "2025-04-20",
    "alarms": 12,
    "tickets": 3,
    "devices": 8,
    "insights": [10, 15, 20, 18, 30, 25, 28]
  }
]
```

#### multiSiteInsights.json
```json
[
  {
    "siteId": 1,
    "siteName": "Site Alpha",
    "trend": [10, 20, 25, 18, 30],
    "heatmapData": [[0, 0, 5], [0, 1, 3], ...]
  }
]
```

#### uiSettings.json
```json
{
  "showSummaryCards": true,
  "showDataTable": true
}
```

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── DataTable.tsx          # Editable table with TanStack Table
│   │   ├── SummaryCards.tsx       # Metric summary cards
│   │   ├── SiteInsightsModal.tsx  # Modal with ECharts visualization
│   │   └── SettingsDrawer.tsx     # UI settings panel
│   ├── layout/
│   │   ├── MainLayout.tsx         # Main layout wrapper
│   │   └── Topbar.tsx             # Navigation bar
│   └── ui/                        # shadcn/ui components
├── pages/
│   ├── Dashboard.tsx              # Main dashboard page
│   ├── Insights.tsx               # Multi-site insights page
│   └── NotFound.tsx               # 404 page
├── store/
│   ├── slices/
│   │   ├── sitesSlice.ts          # Sites state management
│   │   ├── insightsSlice.ts       # Insights state management
│   │   └── uiSettingsSlice.ts     # UI settings state management
│   ├── store.ts                   # Redux store configuration
│   └── hooks.ts                   # Typed Redux hooks
├── utils/
│   └── dataInitializer.ts         # LocalStorage initialization
├── App.tsx                        # Main app component
└── main.tsx                       # Entry point

public/
└── data/
    ├── sites.json                 # Sample sites data
    ├── multiSiteInsights.json     # Sample insights data
    └── uiSettings.json            # UI settings
```

## Key Features Implementation

### 1. LocalStorage Integration
- Automatic initialization from JSON files on first load
- Persistent storage of user edits and UI preferences
- Utility functions for easy data access

### 2. Editable Data Table
- Inline editing with input fields
- Simulated POST requests using axios
- Optimistic UI updates
- Toast notifications for user feedback

### 3. Interactive Charts
- Line charts for site-specific insights (modal)
- Multi-site trend comparison
- Activity heatmaps
- Responsive and interactive

### 4. Settings Management
- Toggle component visibility
- Persistent preferences across sessions
- Intuitive drawer interface

### 5. Nested Routing
- Persistent topbar across pages
- Clean URL structure
- Smooth page transitions

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Design System

The application uses a professional blue/indigo color scheme with:
- **Primary**: Modern blue (#3b82f6) for interactive elements
- **Success**: Green for positive actions
- **Warning**: Amber for alerts
- **Info**: Cyan for informational elements
- **Card-based layout** with proper spacing and shadows
- **Responsive design** that works on all screen sizes

## Assumptions & Notes

1. **No Real Backend**: All data operations are simulated with setTimeout delays to mimic API calls
2. **LocalStorage Only**: No server-side persistence; data resets if localStorage is cleared
3. **Sample Data**: Predefined datasets provided for demonstration
4. **Edit Validation**: Basic validation; could be enhanced with form libraries like React Hook Form
5. **Chart Customization**: ECharts configurations can be customized further based on requirements

## Future Enhancements

- Add filtering and sorting to data table
- Implement search functionality
- Add more chart types (bar, pie, scatter)
- Export data to CSV/Excel
- Dark mode toggle
- User authentication
- Real API integration
- Advanced form validation
- Table pagination

## AI Tools Used

This project was built with assistance from Lovable AI, which helped with:
- Code structure and architecture planning
- Component implementation
- Redux store setup
- ECharts configuration
- TypeScript type definitions
- Best practices implementation

## Testing

The application can be tested by:
1. Viewing the dashboard and verifying all metrics
2. Editing rows in the data table and saving changes
3. Opening insights modals for individual sites
4. Toggling UI components via settings drawer
5. Navigating between Dashboard and Insights pages
6. Refreshing the page to verify localStorage persistence

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

## License

This project was created as a technical assessment and demonstration of React development skills.
