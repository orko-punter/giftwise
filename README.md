# 🎁 GiftWise - Gift Recommender App

A modern, flexible gift recommendation app that suggests perfect gifts based on any combination of information you provide about the person and event.

## Features

- **Flexible Input**: Provide as much or as little information as you have
- **Person Information** (all optional):
  - Age
  - Gender
  - Relationship
  - Interests
  - Hobbies
  - Personality traits
  - Lifestyle
- **Event Information** (all optional):
  - Occasion type
  - Budget range
  - Date
  - Location/Setting
  - Theme or style
- **Smart Recommendations**: The system intelligently combines all provided information to suggest relevant gifts
- **Beautiful UI**: Modern, responsive design with a clean interface

## How It Works

1. Fill in any information you know about the person and/or event (or leave everything blank!)
2. Click "Get Gift Recommendations"
3. Receive personalized gift suggestions based on your inputs
4. Each recommendation includes:
   - Gift name and description
   - Price range
   - Why it's a good fit

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **CSS** - Custom styling with modern design

## Project Structure

```
giftwise/
├── src/
│   ├── components/
│   │   ├── GiftForm.jsx      # Form component for user input
│   │   ├── GiftForm.css
│   │   ├── GiftResults.jsx   # Results display component
│   │   └── GiftResults.css
│   ├── utils/
│   │   └── recommendationEngine.js  # Recommendation logic
│   ├── App.jsx               # Main app component
│   ├── App.css
│   └── index.css
└── package.json
```

## How Recommendations Work

The recommendation engine uses a rule-based system that:

1. **Age-based matching**: Suggests age-appropriate gifts
2. **Occasion-based matching**: Recommends gifts suitable for specific events
3. **Interest-based matching**: Matches gifts to hobbies and interests
4. **Budget filtering**: Suggests gifts within the specified price range
5. **Fallback system**: Provides general gift ideas when no specific matches are found

The system works with any combination of inputs - even if you provide no information at all, it will suggest great general gift ideas!

## Future Enhancements

Potential improvements could include:
- Integration with e-commerce APIs for real product suggestions
- Machine learning for more personalized recommendations
- User accounts to save favorite gifts
- Social sharing features
- Gift tracking and reminders

---

Made with ❤️ for thoughtful gift giving
