/**
 * text-toolkit-js
 *
 * Lightweight text analysis and transformation utilities.
 * Zero dependencies. Works in Node.js and browsers.
 */

/** Count words in text. */
export function wordCount(text: string): number;

/** Count characters with and without spaces. */
export function charCount(text: string): { total: number; noSpaces: number };

/** Count sentences. */
export function sentenceCount(text: string): number;

/** Count paragraphs. */
export function paragraphCount(text: string): number;

/**
 * Estimate reading time in minutes.
 * @param wpm Words per minute (default: 200)
 */
export function readingTime(text: string, wpm?: number): number;

/**
 * Calculate Flesch Reading Ease score.
 * Higher = easier to read. 60–70 is ideal for general audience.
 */
export function fleschReadingEase(text: string): number;

/** Count syllables in text (approximate). */
export function countSyllables(text: string): number;

/** Convert text to URL-friendly slug. */
export function slugify(text: string): string;

/**
 * Truncate text to a maximum length, preserving whole words.
 * @param suffix Suffix to append when truncated (default: '...')
 */
export function truncate(text: string, maxLength: number, suffix?: string): string;

/**
 * Extract keywords from text using simple frequency analysis.
 * @param topN Number of top keywords to return (default: 10)
 */
export function extractKeywords(
  text: string,
  topN?: number
): Array<{ word: string; count: number }>;

/** Convert text to title case. */
export function titleCase(text: string): string;

/** Strip HTML tags from text. */
export function stripHtml(html: string): string;

/** Full text analysis result. */
export interface AnalyzeResult {
  words: number;
  characters: { total: number; noSpaces: number };
  sentences: number;
  paragraphs: number;
  readingTime: number;
  fleschScore: number;
  keywords: Array<{ word: string; count: number }>;
}

/** Get full text analysis. */
export function analyze(text: string): AnalyzeResult;
