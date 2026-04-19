/**
 * text-toolkit-js
 *
 * Lightweight text analysis and transformation utilities.
 * Zero dependencies. Works in Node.js and browsers.
 */

/**
 * Count words in text.
 * @param {string} text
 * @returns {number}
 */
function wordCount(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

/**
 * Count characters (with and without spaces).
 * @param {string} text
 * @returns {{ total: number, noSpaces: number }}
 */
function charCount(text) {
  if (!text) return { total: 0, noSpaces: 0 };
  return { total: text.length, noSpaces: text.replace(/\s/g, '').length };
}

/**
 * Count sentences.
 * @param {string} text
 * @returns {number}
 */
function sentenceCount(text) {
  if (!text || !text.trim()) return 0;
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
}

/**
 * Count paragraphs.
 * @param {string} text
 * @returns {number}
 */
function paragraphCount(text) {
  if (!text || !text.trim()) return 0;
  return text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || 1;
}

/**
 * Estimate reading time in minutes.
 * @param {string} text
 * @param {number} [wpm=200] - Words per minute
 * @returns {number}
 */
function readingTime(text, wpm = 200) {
  return Math.max(1, Math.ceil(wordCount(text) / wpm));
}

/**
 * Calculate Flesch Reading Ease score.
 * Higher = easier to read. 60-70 is ideal for general audience.
 * @param {string} text
 * @returns {number}
 */
function fleschReadingEase(text) {
  if (!text) return 0;
  const words = wordCount(text);
  const sentences = sentenceCount(text);
  const syllables = countSyllables(text);
  if (words === 0 || sentences === 0) return 0;
  return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

/**
 * Count syllables in text (approximate).
 * @param {string} text
 * @returns {number}
 */
function countSyllables(text) {
  const words = text.toLowerCase().match(/[a-z]+/g) || [];
  return words.reduce((total, word) => {
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return total + (matches ? matches.length : 1);
  }, 0);
}

/**
 * Convert text to URL-friendly slug.
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Truncate text to a maximum length, preserving whole words.
 * @param {string} text
 * @param {number} maxLength
 * @param {string} [suffix='...']
 * @returns {string}
 */
function truncate(text, maxLength, suffix = '...') {
  if (!text || text.length <= maxLength) return text || '';
  const trimmed = text.substring(0, maxLength - suffix.length);
  const lastSpace = trimmed.lastIndexOf(' ');
  return (lastSpace > 0 ? trimmed.substring(0, lastSpace) : trimmed) + suffix;
}

/**
 * Extract keywords from text (simple frequency analysis).
 * @param {string} text
 * @param {number} [topN=10]
 * @returns {Array<{ word: string, count: number }>}
 */
function extractKeywords(text, topN = 10) {
  if (!text) return [];
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'is', 'was', 'are', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'shall', 'it', 'its', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him',
    'her', 'us', 'them', 'my', 'your', 'his', 'our', 'their', 'not', 'no',
    'so', 'if', 'as', 'from', 'up', 'out', 'about', 'into', 'through',
    'then', 'than', 'too', 'very', 'just', 'also', 'more', 'all', 'each',
    'every', 'both', 'few', 'some', 'any', 'most', 'other', 'such', 'only'
  ]);

  const words = (text.toLowerCase().match(/[a-z]{3,}/g) || [])
    .filter(w => !stopWords.has(w));

  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word, count]) => ({ word, count }));
}

/**
 * Convert text to title case.
 * @param {string} text
 * @returns {string}
 */
function titleCase(text) {
  if (!text) return '';
  const minorWords = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of']);
  return text.split(' ').map((word, i) => {
    if (i === 0 || !minorWords.has(word.toLowerCase())) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  }).join(' ');
}

/**
 * Strip HTML tags from text.
 * @param {string} html
 * @returns {string}
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Get full text analysis.
 * @param {string} text
 * @returns {object}
 */
function analyze(text) {
  return {
    words: wordCount(text),
    characters: charCount(text),
    sentences: sentenceCount(text),
    paragraphs: paragraphCount(text),
    readingTime: readingTime(text),
    fleschScore: Math.round(fleschReadingEase(text) * 10) / 10,
    keywords: extractKeywords(text, 5),
  };
}

module.exports = {
  wordCount,
  charCount,
  sentenceCount,
  paragraphCount,
  readingTime,
  fleschReadingEase,
  countSyllables,
  slugify,
  truncate,
  extractKeywords,
  titleCase,
  stripHtml,
  analyze,
};
