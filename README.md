# Skip Selection UI

A responsive React (with TypeScript + TailwindCSS) interface for selecting skip hire sizes. It fetches live data from an external API, allowing users to select the appropriate skip, view its details, and calculate total pricing with VAT included.

## Demo

https://github.com/user-attachments/assets/90e99993-603a-4bf3-803d-5213b474aefe

## Features

- Responsive grid layout
- Card selection with animation
- Live price calculation including VAT
- Skeleton loading states while fetching data
- Accessibility-friendly with ARIA roles
- Fully typed with TypeScript

## Tech Stack

- React Vite
- TailwindCSS
- TypeScript
- Lucide-react icons

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/rendivs925/skip-selection-ui.git
cd skip-selection-ui
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## API Endpoint

The app fetches skip data from:

```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

## VAT Calculation

Price calculation is handled via utility:

```ts
calculateTotalWithVAT(price_before_vat: number, vat: number): number
```

## Deployment

You can deploy this app using platforms like Vercel, Netlify, or Railway with minimal configuration.

## Live Preview

A sandbox version is available here:

```
https://codesandbox.io/p/github/YOUR_USERNAME/skip-selection-ui
```

## License

MIT License
