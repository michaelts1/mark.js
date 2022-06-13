/**
 * Type definitions for the modded version of mark.js
 *
 * Definitions are based on https://markjs.io and the source code.
 * Method signatures have been adjusted from:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mark.js/index.d.ts
 *
 * Created by Michael Tsaban 2022, MIT licensed.
 */

type accuracy = "partially" | "complementary" | "exactly"
type MarkAccuracy = accuracy | {
	value: accuracy
	limiters?: string[]
}
type markTerm = string | string[]
type markRegExpTerm = RegExp
type markRangesTerm = Array<{
	start: number
	length: number
}>

declare class Mark {
	constructor(context: Element | Element[] | string | NodeList)

	/**
	 * Highlight custom search terms.
	 * @param term The term to be marked. Can also be an array with multiple terms.
	 * Note that terms will be escaped. If you need to mark unescaped terms (e.g. containing a pattern),
	 * have a look at the `markRegExp()`
	 * @param options Optional options
	 * @returns Itself
	 */
	mark(term: markTerm, options?: Mark.MarkOptions): this

	/**
	 * Highlight custom regular expressions.
	 * @param term The regular expression to be marked.
	 * @param options Optional options
	 * @returns Itself
	 */
	markRegExp(term: markRegExpTerm, options?: Mark.MarkRegExpOptions): this

	/**
	 * A method to mark ranges with a start position and length. They will be applied
	 * to text nodes in the specified context.
	 * @param ranges An array of objects with a start and length property.
	 * Note that the start positions must be specified including whitespace characters.
	 * @param options Optional options
	 * @returns Itself
	 */
	markRanges(ranges: markRangesTerm, options?: Mark.MarkOptionsGeneric): this

	/**
	 * A method to remove highlights created by mark.js.
	 * @param options Optional options
	 * @returns Itself
	 */
	unmark(options?: Mark.Options): this
}

declare namespace Mark {
	type MatchInfo = {
		count: number
		groupIndex?: number
		groupStart?: number
		match: RegExpExecArray
		matchStart: boolean
	}

	type FilterInfo = {
		match: RegExpExecArray
		matchStart: boolean
		groupIndex: number
	}

	interface Options {
		element?: string
		className?: string
		exclude?: string[]
		iframes?: boolean
		iframesTimeout?: number
		done?: (marksTotal: number, matchesTotal: number) => void
		debug?: boolean
		log?: { debug: (msg: string) => void }
	}

	interface MarkOptionsGeneric extends Options {
		each?: (element: Element, matchInfo: MatchInfo) => void
		filter?: (textNode: Text, matchedText: string, totalMarks: number, filterInfo: FilterInfo) => boolean
		noMatch?: (term: markTerm | markRegExpTerm) => void
	}

	interface MarkOptions extends MarkOptionsGeneric {
		acrossElements?: boolean
		separateWordSearch?: boolean
		accuracy?: MarkAccuracy
		diacritics?: boolean
		synonyms?: { [index: string]: string }
		caseSensitive?: boolean
		ignoreJoiners?: boolean
		ignorePunctuation?: string[]
		wildcards?: "disabled" | "enabled" | "withSpaces"
	}

	interface MarkRegExpOptions extends MarkOptionsGeneric {
		acrossElements?: boolean
		ignoreGroups?: number
	}
}
