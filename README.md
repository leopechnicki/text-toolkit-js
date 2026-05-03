<div align="center">

# text-toolkit-js

**Lightweight text analysis and transformation library. Zero dependencies.**

[![npm version](https://img.shields.io/npm/v/text-toolkit-js.svg?style=flat-square&color=3b82f6)](https://www.npmjs.com/package/text-toolkit-js)
[![npm downloads](https://img.shields.io/npm/dw/text-toolkit-js.svg?style=flat-square&color=10b981)](https://www.npmjs.com/package/text-toolkit-js)
[![license](https://img.shields.io/npm/l/text-toolkit-js.svg?style=flat-square&color=6366f1)](https://github.com/leopechnicki/text-toolkit-js/blob/main/LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-22c55e?style=flat-square)](https://www.npmjs.com/package/text-toolkit-js)

[npm](https://npmjs.com/package/text-toolkit-js) · [GitHub](https://github.com/leopechnicki/text-toolkit-js)

</div>

---

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
