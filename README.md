<div align="center">

# text-toolkit-js

**Lightweight text analysis and transformation library. Zero dependencies.**

[![npm version](https://img.shields.io/npm/v/text-toolkit-js.svg?style=flat-square&color=3b82f6)](https://www.npmjs.com/package/text-toolkit-js)
[![npm downloads](https://img.shields.io/npm/dw/text-toolkit-js.svg?style=flat-square&color=10b981)](https://www.npmjs.com/package/text-toolkit-js)
[![license](https://img.shields.io/npm/l/text-toolkit-js.svg?style=flat-square&color=6366f1)](https://github.com/leopechnicki/text-toolkit-js/blob/main/LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-22c55e?style=flat-square)](https://www.npmjs.com/package/text-toolkit-js)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?style=flat-square&logo=typescript)](https://www.npmjs.com/package/text-toolkit-js)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14-43853d?style=flat-square&logo=node.js)](https://nodejs.org)

[npm](https://npmjs.com/package/text-toolkit-js) Â· [GitHub](https://github.com/leopechnicki/text-toolkit-js)

</div>

---

## Install

```bash
npm install text-toolkit-js
```

## Quick Start

```javascript
const tt = require('text-toolkit-js');

const text = `JavaScript is a versatile programming language.
It runs in browsers and on servers with Node.js.
Developers use it to build everything from simple scripts to complex apps.`;

// Full analysis in one call
const result = tt.analyze(text);
console.log(result);
// {
//   words: 34,
//   characters: { total: 192, noSpaces: 160 },
//   sentences: 3,
//   paragraphs: 1,
//   readingTime: 1,
//   fleschScore: 48.2,
//   keywords: [
//     { word: 'javascript', count: 1 },
//     { word: 'versatile', count: 1 },
//     ...
//   ]
// }
```

## API Reference

### Analysis

#### `wordCount(text)`
Returns the number of words in the text.

```javascript
tt.wordCount('Hello world foo');  // 3
tt.wordCount('');                 // 0
```

#### `charCount(text)`
Returns total character count and count without spaces.

```javascript
tt.charCount('Hello world');
// { total: 11, noSpaces: 10 }
```

#### `sentenceCount(text)`
Counts sentences split on `.`, `!`, and `?`.

```javascript
tt.sentenceCount('Hello! How are you? Fine.');  // 3
```

#### `paragraphCount(text)`
Counts paragraphs separated by blank lines.

```javascript
const multi = 'First paragraph.\n\nSecond paragraph.';
tt.paragraphCount(multi);  // 2
```

#### `readingTime(text, wpm?)`
Estimated reading time in minutes. Default reading speed: 200 wpm.

```javascript
tt.readingTime(shortText);        // 1
tt.readingTime(longArticle, 250); // 4  (faster reader)
```

#### `fleschReadingEase(text)`
Returns a Flesch Reading Ease score (0â€“100). Higher = easier to read.

```javascript
tt.fleschReadingEase(blogPost);  // e.g. 65.4
```

| Score | Difficulty | Typical audience |
|-------|------------|-----------------|
| 90â€“100 | Very easy | 5th grade |
| 70â€“90 | Easy | 6th grade |
| 60â€“70 | Standard | 7thâ€“8th grade |
| 50â€“60 | Fairly difficult | High school |
| 30â€“50 | Difficult | College level |
| 0â€“30 | Very difficult | Academic / professional |

#### `analyze(text)`
Runs all analysis functions at once. Returns an `AnalyzeResult` object.

```javascript
const report = tt.analyze(myArticle);
// report.words, report.characters, report.sentences,
// report.paragraphs, report.readingTime, report.fleschScore,
// report.keywords (top 5)
```

### Transformation

#### `slugify(text)`
Converts text to a URL-safe slug. Normalizes accented characters.

```javascript
tt.slugify('My Blog Post!');         // 'my-blog-post'
tt.slugify('OlÃ¡, mundo cruel!');     // 'ola-mundo-cruel'
tt.slugify('  Multiple   Spaces  '); // 'multiple-spaces'
```

#### `truncate(text, maxLength, suffix?)`
Truncates at word boundaries. Default suffix: `'...'`.

```javascript
tt.truncate('The quick brown fox jumps', 20);
// 'The quick brown...'

tt.truncate('The quick brown fox jumps', 20, ' [more]');
// 'The quick [more]'
```

#### `titleCase(text)`
Converts to title case, respecting minor words (a, an, the, and, etc.).

```javascript
tt.titleCase('the quick brown fox');        // 'The Quick Brown Fox'
tt.titleCase('war and peace by tolstoy');   // 'War and Peace by Tolstoy'
```

#### `stripHtml(html)`
Removes HTML tags and normalizes whitespace.

```javascript
tt.stripHtml('<p>Hello <b>world</b></p>');   // 'Hello world'
tt.stripHtml('<br>&nbsp;<span>hi</span>');   // 'hi'
```

#### `extractKeywords(text, topN?)`
Frequency-based keyword extraction with stop-word filtering. Default: top 10 keywords.

```javascript
tt.extractKeywords('The cat sat on the mat. The cat is fat.', 3);
// [{ word: 'cat', count: 2 }, { word: 'sat', count: 1 }, { word: 'mat', count: 1 }]
```

### Utilities

#### `countSyllables(text)`
Approximates syllable count â€” used internally by `fleschReadingEase`.

```javascript
tt.countSyllables('beautiful garden');  // ~5
```

## API Summary

| Function | Input | Returns |
|---|---|---|
| `wordCount(text)` | string | number |
| `charCount(text)` | string | `{ total, noSpaces }` |
| `sentenceCount(text)` | string | number |
| `paragraphCount(text)` | string | number |
| `readingTime(text, wpm?)` | string, number? | number (minutes) |
| `fleschReadingEase(text)` | string | number (0â€“100) |
| `countSyllables(text)` | string | number |
| `slugify(text)` | string | string |
| `truncate(text, max, suffix?)` | string, number, string? | string |
| `extractKeywords(text, topN?)` | string, number? | `Array<{ word, count }>` |
| `titleCase(text)` | string | string |
| `stripHtml(html)` | string | string |
| `analyze(text)` | string | `AnalyzeResult` |

## TypeScript

Full type declarations are included. No `@types/` package needed.

```typescript
import * as tt from 'text-toolkit-js';

const result: tt.AnalyzeResult = tt.analyze('Hello world.');
console.log(result.fleschScore);
```

## Use Cases

- **Blog platforms** â€” word count, reading time, and readability score for editors
- **SEO tools** â€” keyword extraction and slug generation
- **CMS pipelines** â€” strip HTML from user input before storing
- **Content graders** â€” Flesch score to guide writing complexity
- **URL builders** â€” slugify post titles for clean permalink generation

## License

MIT
