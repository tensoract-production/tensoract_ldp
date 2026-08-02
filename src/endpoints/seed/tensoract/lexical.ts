/**
 * Small builders for the Lexical JSON that Payload stores. Writing these by
 * hand for every seeded paragraph is unreadable; these keep the content files
 * about the words.
 */

type Child = Record<string, unknown>

const textNode = (text: string, format = 0): Child => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

export const p = (...text: string[]): Child => ({
  type: 'paragraph',
  children: text.map((t) => textNode(t)),
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const h = (tag: 'h2' | 'h3' | 'h4', text: string): Child => ({
  type: 'heading',
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

export const ul = (items: string[]): Child => ({
  type: 'list',
  children: items.map((item, index) => ({
    type: 'listitem',
    children: [textNode(item)],
    direction: 'ltr',
    format: '',
    indent: 0,
    value: index + 1,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  version: 1,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const doc = (...children: Child[]): any => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})
