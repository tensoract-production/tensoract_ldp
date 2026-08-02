import { domAnimation } from 'motion/react'

/**
 * Split out so `LazyMotion` can fetch it on its own chunk. `domAnimation`
 * carries the `inView` feature that `whileInView` needs; `domMax` would only
 * add drag and layout projection, which nothing here uses.
 */
export default domAnimation
