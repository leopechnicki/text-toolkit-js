# text-toolkit-js

Lightweight text analysis and transformation library. Zero dependencies. Works in Node.js and browsers.

## Install

```bash
npm install text-toolkit-js
```

## Usage

```javascript
const tt = require('text-toolkit-js');

// Word count
tt.wordCount('Hello world');  // 2

// Full analysis
tt.analyze('Your text here...');
// { words, characters, sentences, paragraphs, readingTime, fleschScore, keywords }

// Readability
tt.fleschReadingEase(text);  // 60-70 = ideal for general audience

// Transform
tt.slugify('My Blog Post!');     // 'my-blog-post'
tt.truncate('Long text...', 50); // Truncates at word boundary
tt.titleCase('hello world');     // 'Hello World'
tt.stripHtml('<p>Hello</p>');    // 'Hello'

// Extract keywords
tt.extractKeywords(text, 10);
// [{ word: 'javascript', count: 5 }, ...]
```

## API

| Function | Description |
|---|---|
| `wordCount(text)` | Count words |
| `charCount(text)` | Character count (total & no-spaces) |
| `sentenceCount(text)` | Count sentences |
| `paragraphCount(text)` | Count paragraphs |
| `readingTime(text, wpm?)` | Estimated reading time (minutes) |
| `fleschReadingEase(text)` | Readability score (0-100) |
| `slugify(text)` | URL-friendly slug |
| `truncate(text, max, suffix?)` | Smart truncation at word boundaries |
| `extractKeywords(text, topN?)` | Frequency-based keyword extraction |
| `titleCase(text)` | Title Case Conversion |
| `stripHtml(html)` | Remove HTML tags |
| `analyze(text)` | Full text analysis object |

## License

MIT
