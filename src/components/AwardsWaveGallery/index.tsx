'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export type AwardSlide = {
  alt: string
  detail?: string
  image: string
  name?: string
  year?: string
}

const WAVE_CONFIG = {
  waves: {
    base: { amp: 0.1, freq: 1.0, speed: 1.0, phase: 5.0 },
    flow: { amp: 0.15, freq: 5.0, speed: 5.0, phase: 10.0 },
    detail: { amp: 0.025, freq: 5.0, speed: 1.5, phase: 2.5 },
  },
  clipMax: 20,
  clipPower: 2,
}
const IMAGE_BASE_HEIGHT = 375
const DIAGONAL_X_DRIFT_RATIO = 0.7
const START_RIGHT_OFFSET_RATIO = 0.18
const RIGHT_SHIFT_RATIO = 0.055
const ASPECT_RATIOS = [
  '16/9',
  '4/3',
  '16/9',
  '4/3',
  '4/3',
  '16/9',
  '3/2',
  '16/9',
  '3/2',
  '16/9',
  '3/2',
  '3/2',
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const getWorkWaveImageHeight = (index: number, sizeFactor: number) => {
  const shrinkStartIndex = Math.floor(ASPECT_RATIOS.length * 0.75)
  const shrinkFactor =
    index >= shrinkStartIndex
      ? (index - shrinkStartIndex + 1) / (ASPECT_RATIOS.length - shrinkStartIndex)
      : 0
  return Math.round(
    IMAGE_BASE_HEIGHT * sizeFactor * (1 - shrinkFactor * 0.5),
  )
}

type WaveState = {
  metrics: Array<{ width: number; height: number }>
  positions: Array<{ top: number; height: number }>
  containerPosition: { top: number; bottom: number }
  progress: number[]
  renderStates: Array<{
    frameTransform: string
    imageTransform: string
    isVisible: boolean
  } | null>
}

function updateWorkWaveImageFrame(
  frame: HTMLElement,
  image: HTMLElement,
  normalizedIndex: number,
  progress: number,
  metric: { width: number; height: number },
  viewportWidth: number,
  viewportHeight: number,
  forceVisible: boolean,
  state: WaveState,
  index: number,
) {
  const { base, flow, detail } = WAVE_CONFIG.waves
  const previousState = state.renderStates[index]

  const baseWave = Math.sin(
    normalizedIndex * base.freq + (1 - progress) * base.speed + base.phase,
  )
  const flowWave =
    0.5 + Math.sin(normalizedIndex * flow.freq + flow.phase + progress * flow.speed)
  const detailWave =
    0.5 +
    Math.sin(normalizedIndex * detail.freq + detail.phase + progress * detail.speed)
  const translateX =
    (viewportWidth - metric.width) / 2 -
    viewportWidth * 0.1 +
    viewportWidth * RIGHT_SHIFT_RATIO +
    (1 - progress) * viewportWidth * START_RIGHT_OFFSET_RATIO +
    (0.5 - progress) * viewportWidth * DIAGONAL_X_DRIFT_RATIO +
    baseWave * viewportWidth * base.amp +
    flowWave * viewportWidth * flow.amp +
    detailWave * viewportWidth * detail.amp
  const translateY = (progress * 2 - 1) * (viewportHeight + metric.height)
  const centerOffset = Math.abs(progress - 0.5) * 2
  const clipAmount =
    Math.pow(centerOffset, WAVE_CONFIG.clipPower) * WAVE_CONFIG.clipMax
  const cropScale = Math.max(0.55, 1 - clipAmount * 0.02)
  const isVisible = forceVisible || (progress > 0.001 && progress < 0.999)
  const frameTransform =
    `translate3d(${translateX}px, ${translateY}px, 0) scaleX(${cropScale})`
  const imageTransform = `scaleX(${1 / cropScale})`

  if (previousState?.frameTransform !== frameTransform) {
    frame.style.transform = frameTransform
  }
  if (previousState?.imageTransform !== imageTransform) {
    image.style.transform = imageTransform
  }
  if (previousState?.isVisible !== isVisible) {
    frame.style.opacity = isVisible ? '1' : '0'
    frame.style.visibility = isVisible ? 'visible' : 'hidden'
    frame.classList.toggle('is-render-active', isVisible)
  }

  state.renderStates[index] = {
    frameTransform,
    imageTransform,
    isVisible,
  }
}

export function AwardsWaveGallery({
  intro,
  slides,
  title,
}: {
  intro: string
  slides: AwardSlide[]
  title: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const frameRefs = useRef<Array<HTMLDivElement | null>>([])
  const imageRefs = useRef<Array<HTMLImageElement | null>>([])
  const activeNameRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const imagesContainer = imagesRef.current
    if (!section || !imagesContainer || slides.length === 0) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const items = itemRefs.current
    const frames = frameRefs.current
    const images = imageRefs.current

    const state: WaveState = {
      metrics: [],
      positions: [],
      containerPosition: { top: 0, bottom: 0 },
      progress: Array(slides.length).fill(0),
      renderStates: Array(slides.length).fill(null),
    }

    let viewportWidth = window.innerWidth
    let viewportHeight = window.innerHeight

    const measureGeometry = () => {
      const scrollTop = window.scrollY
      const containerRect = imagesContainer.getBoundingClientRect()
      state.containerPosition = {
        top: containerRect.top + scrollTop,
        bottom: containerRect.bottom + scrollTop,
      }
      state.positions = items.map((item) => {
        const rect = item!.getBoundingClientRect()
        return { top: rect.top + scrollTop, height: rect.height }
      })
    }

    const updateSizes = () => {
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
      const sizeFactor = Math.min(viewportWidth / 750, 1)
      state.metrics = []
      items.forEach((item, index) => {
        const height = getWorkWaveImageHeight(index, sizeFactor)
        const [ratioWidth, ratioHeight] = ASPECT_RATIOS[
          index % ASPECT_RATIOS.length
        ]!
          .split('/')
          .map(Number)
        const width = Math.round((height * ratioWidth) / ratioHeight)
        item!.style.height = `${height}px`
        item!.style.width = `${width}px`
        state.metrics[index] = { width, height }
      })
      measureGeometry()
    }

    const setStaticFrame = () => {
      items.forEach((item, index) => {
        const frame = frames[index]
        const image = images[index]
        const metric = state.metrics[index]
        if (!frame || !image || !metric) return
        const translateX =
          (viewportWidth - metric.width) / 2 +
          viewportWidth * RIGHT_SHIFT_RATIO
        frame.style.transform = `translate3d(${translateX}px, 0px, 0) scaleX(1)`
        image.style.transform = 'scaleX(1)'
        frame.style.opacity = '1'
        frame.style.visibility = 'visible'
        frame.classList.add('is-render-active')
      })
    }

    const syncToScroll = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setStaticFrame()
        return
      }
      const scrollTop = window.scrollY
      const galleryVisible =
        state.containerPosition.bottom > scrollTop &&
        state.containerPosition.top < scrollTop + viewportHeight
      let canonicalIndex = -1
      let canonicalDistance = Number.POSITIVE_INFINITY

      state.positions.forEach((position, index) => {
        const rectTop = position.top - scrollTop
        const progress = clamp(
          (viewportHeight - rectTop) /
            Math.max(1, viewportHeight + position.height),
          0,
          1,
        )
        state.progress[index] = progress

        const distance = Math.abs(
          rectTop + position.height * 0.5 - viewportHeight * 0.5,
        )
        if (distance < canonicalDistance) {
          canonicalDistance = distance
          canonicalIndex = index
        }
      })

      if (galleryVisible && canonicalIndex >= 0) {
        state.progress[canonicalIndex] = clamp(
          state.progress[canonicalIndex],
          0.002,
          0.998,
        )
      }

      frames.forEach((frame, index) => {
        const image = images[index]
        const metric = state.metrics[index]
        if (!frame || !image || !metric) return
        updateWorkWaveImageFrame(
          frame,
          image,
          index / Math.max(1, slides.length - 1),
          state.progress[index],
          metric,
          viewportWidth,
          viewportHeight,
          galleryVisible && index === canonicalIndex,
          state,
          index,
        )
      })

      const hasName = canonicalIndex >= 0 && Boolean(slides[canonicalIndex]?.name)
      captionRef.current?.classList.toggle('is-visible', hasName)
      if (hasName && activeNameRef.current) {
        const slide = slides[canonicalIndex]!
        activeNameRef.current.textContent =
          slide.year ? `${slide.year} · ${slide.name}` : slide.name!
      }
    }

    updateSizes()

    if (reduceMotion) {
      setStaticFrame()
      return () => {
        gsap.set(items, {
          clearProps: 'height,aspect-ratio,transform,opacity,visibility,width',
        })
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: imagesContainer,
      start: 'top bottom',
      end: 'bottom top',
      invalidateOnRefresh: true,
      onUpdate: () => syncToScroll(),
      onRefresh: () => {
        updateSizes()
        syncToScroll()
      },
      onLeave: () => syncToScroll(),
      onLeaveBack: () => syncToScroll(),
    })

    const headerTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 20%',
      end: 'bottom 80%',
      onToggle: (self) => {
        const header = document.querySelector<HTMLElement>('.wire-header')
        if (self.isActive) {
          document.documentElement.dataset.activeSection = 'recognition'
          header?.style.removeProperty('background-color')
        } else if (document.documentElement.dataset.activeSection === 'recognition') {
          delete document.documentElement.dataset.activeSection
        }
      },
    })

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      syncToScroll()
    })

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      trigger.kill()
      headerTrigger.kill()
      gsap.set(items, {
        clearProps: 'height,aspect-ratio,transform,opacity,visibility,width',
      })
      frames.forEach((frame) => {
        frame?.classList.remove('is-render-active')
      })
    }
  }, [slides])

  return (
    <section className="wire-awards-wave" id="recognition" ref={sectionRef}>
      <div className="wire-container wire-awards-wave__heading">
        <div className="wire-heading">
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
      </div>

      <div className="wire-awards-wave__images" ref={imagesRef}>
        {slides.map((slide, index) => (
          <div
            className="wire-awards-wave__item"
            key={`${slide.image}-${index}`}
            ref={(node) => {
              itemRefs.current[index] = node
            }}
          >
            <div
              className="wire-awards-wave__frame"
              ref={(node) => {
                frameRefs.current[index] = node
              }}
            >
              <Image
                alt={slide.alt}
                className="wire-awards-wave__image"
                fill
                loading="eager"
                quality={85}
                ref={(node) => {
                  imageRefs.current[index] = node
                }}
                sizes="(max-width: 48rem) 70vw, 40vw"
                src={slide.image}
              />
            </div>
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className="wire-awards-wave__caption"
        ref={captionRef}
      >
        <span ref={activeNameRef} />
      </p>
    </section>
  )
}
