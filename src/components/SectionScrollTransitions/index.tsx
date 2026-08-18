'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ReactNode } from 'react'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_MOTION_QUERY = '(min-width: 48.001rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const NON_STACK_HEADER_QUERY = '(max-width: 48rem), (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)'
const MOBILE_BRAND_MOTION_QUERY = '(max-width: 48rem) and (prefers-reduced-motion: no-preference)'
const BACKGROUND_HANDOFF_DURATION = 0.3
const BACKGROUND_HANDOFF_POINT = 0.66
const INCOMING_DURATION = 0.42
const INCOMING_STAGGER_AMOUNT = 0.18
const OUTGOING_DURATION = 0.48
const OUTGOING_STAGGER_AMOUNT = 0.18
const PANEL_SWITCH_POINT = 0.96
const ECOMBOX_REVEAL_DURATION = 2.4
const SECTION_HOLD_DURATION = 0.9
const SECTION_SETTLE_POINT = 1.56
const SECTION_STEP_DURATION = 2.4
const TRANSITION_DISTANCE = 28

const getTransitionDistance = (element: HTMLElement) => {
  const distance = Number.parseFloat(element.dataset.sectionDistance ?? '')
  return Number.isFinite(distance) ? distance : TRANSITION_DISTANCE
}

const getSectionAlpha = (element: HTMLElement) => {
  const alpha = Number.parseFloat(element.dataset.sectionAlpha ?? '')
  return Number.isFinite(alpha) ? alpha : 1
}

const getSectionHold = (element: HTMLElement) => {
  const hold = Number.parseFloat(element.dataset.sectionHold ?? '')
  return Number.isFinite(hold) ? hold : 0
}

const getBrandSequence = (panel: ParentNode) => {
  const letters = Array.from(panel.querySelectorAll<HTMLElement>('[data-brand-letter]'))
  const cutout = panel.querySelector<HTMLElement>('[data-brand-cutout]')
  const media = panel.querySelector<HTMLElement>('[data-brand-media]')
  const note = panel.querySelector<HTMLElement>('[data-brand-note]')
  const story = panel.querySelector<HTMLElement>('[data-brand-story]')
  const tensoract = panel.querySelector<HTMLElement>('[data-brand-tensoract]')
  const items = [media, cutout, note, story, tensoract, ...letters].filter(
    (item): item is HTMLElement => item !== null,
  )

  return { cutout, items, letters, media, note, story, tensoract }
}

export function SectionScrollTransitions({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    let mediaContext: gsap.MatchMedia | undefined
    let refreshFrame = 0

    const context = gsap.context(() => {
      const panels = Array.from(
        root.querySelectorAll<HTMLElement>(':scope > [data-section-panel]'),
      )

      if (!panels.length) return

      mediaContext = gsap.matchMedia()

      let restoreScrollBehaviorFrame = 0
      let savedScrollBehavior: string | undefined
      let scrollStackToHash: ((hash: string) => boolean) | undefined
      const restoreScrollBehavior = () => {
        if (savedScrollBehavior === undefined) return

        document.documentElement.style.scrollBehavior = savedScrollBehavior
        savedScrollBehavior = undefined
      }
      const scrollElementIntoView = (element: HTMLElement) => {
        const documentElement = document.documentElement
        savedScrollBehavior ??= documentElement.style.scrollBehavior

        window.cancelAnimationFrame(restoreScrollBehaviorFrame)
        documentElement.style.scrollBehavior = 'auto'
        element.scrollIntoView({ behavior: 'auto', block: 'start' })
        restoreScrollBehaviorFrame = window.requestAnimationFrame(restoreScrollBehavior)
      }
      const scrollToHash = () => {
        const hash = window.location.hash.slice(1)
        if (!hash || scrollStackToHash?.(hash)) return

        const target = document.getElementById(decodeURIComponent(hash))
        if (!target) return
        if (target.closest('[data-section-stack="enabled"]')) return
        scrollElementIntoView(target)
      }
      let hashNavigationFrame = 0
      const scheduleHashScroll = () => {
        window.cancelAnimationFrame(hashNavigationFrame)
        hashNavigationFrame = window.requestAnimationFrame(scrollToHash)
      }
      const handleAnchorClick = (event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }

        const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
        if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

        const url = new URL(anchor.href, window.location.href)
        if (
          !url.hash ||
          url.origin !== window.location.origin ||
          url.pathname !== window.location.pathname ||
          url.search !== window.location.search
        ) {
          return
        }

        event.preventDefault()
        window.history.pushState(null, '', url)
        scheduleHashScroll()
      }

      window.addEventListener('click', handleAnchorClick, true)
      window.addEventListener('hashchange', scheduleHashScroll)
      window.addEventListener('popstate', scheduleHashScroll)

      mediaContext.add(DESKTOP_MOTION_QUERY, () => {
        const backgrounds = panels.map((panel) =>
          panel.querySelector<HTMLElement>('[data-section-background]'),
        )
        const motionItems = panels.map((panel) =>
          Array.from(panel.querySelectorAll<HTMLElement>('[data-section-animate]')),
        )
        const slideItems = motionItems.map((items) =>
          items.filter((item) => !item.hasAttribute('data-section-fade-only')),
        )
        const fadeOnlyItems = motionItems.map((items) =>
          items.filter((item) => item.hasAttribute('data-section-fade-only')),
        )
        const brandSequences = panels.map(getBrandSequence)
        const getHeaderHeight = () =>
          document.querySelector<HTMLElement>('.wire-header')?.getBoundingClientRect().height ?? 0
        const getPanelHeight = () => Math.max(1, window.innerHeight - getHeaderHeight())
        const header = document.querySelector<HTMLElement>('.wire-header')

        let activePanelIndex = -1

        const setActivePanel = (nextIndex: number) => {
          if (nextIndex === activePanelIndex) return

          panels.forEach((panel, index) => {
            const isActive = index === nextIndex

            if (!isActive && panel.contains(document.activeElement)) {
              (document.activeElement as HTMLElement).blur()
            }

            panel.inert = !isActive
            panel.setAttribute('aria-hidden', String(!isActive))
            panel.style.pointerEvents = isActive ? 'auto' : 'none'
          })

          activePanelIndex = nextIndex
          document.documentElement.dataset.activeSection = panels[nextIndex]?.id ?? ''
        }

        const updateMeasurements = () => {
          root.style.setProperty('--wire-section-viewport-offset', `${getHeaderHeight()}px`)
        }

        root.dataset.sectionStack = 'enabled'
        document.documentElement.dataset.sectionStack = 'enabled'
        updateMeasurements()

        gsap.set(panels, {
          autoAlpha: 1,
          zIndex: (index) => index + 1,
        })
        gsap.set(backgrounds, { autoAlpha: 0 })
        gsap.set(backgrounds[0], { autoAlpha: 1 })
        gsap.set(slideItems.flat(), {
          autoAlpha: 0,
          willChange: 'transform, opacity',
          y: (_, element: HTMLElement) => getTransitionDistance(element),
        })
        gsap.set(fadeOnlyItems.flat(), {
          autoAlpha: 0,
          willChange: 'opacity',
        })
        brandSequences.forEach(({ cutout, letters, media, note, story, tensoract }) => {
          if (media) {
            gsap.set(media, {
              autoAlpha: 0,
              scale: 0.985,
              willChange: 'transform, opacity',
              y: 48,
            })
          }
          if (letters.length) {
            gsap.set(letters, {
              autoAlpha: 0,
              willChange: 'transform, opacity',
              yPercent: 115,
            })
          }
          if (cutout) {
            gsap.set(cutout, {
              autoAlpha: 0,
              scale: 0.985,
              willChange: 'transform, opacity',
              y: 48,
            })
          }
          if (note) gsap.set(note, { autoAlpha: 0, willChange: 'opacity', y: 8 })
          if (story) {
            gsap.set(story, {
              autoAlpha: 0,
              willChange: 'transform, opacity',
              y: 42,
            })
          }
          if (tensoract) {
            gsap.set(tensoract, {
              autoAlpha: 0,
              willChange: 'transform, opacity',
              y: 150,
            })
          }
        })
        setActivePanel(0)

        const transitionCount = Math.max(1, panels.length - 1)
        const firstSectionSettlePoint = INCOMING_DURATION + INCOMING_STAGGER_AMOUNT
        const transitionStarts: number[] = []
        let timelineDuration = firstSectionSettlePoint + SECTION_HOLD_DURATION

        for (let index = 0; index < transitionCount; index += 1) {
          transitionStarts.push(timelineDuration)
          const incomingPanel = panels[index + 1]
          timelineDuration += SECTION_STEP_DURATION + getSectionHold(incomingPanel!)
        }
        const timeline = gsap.timeline()

        timeline
          .to({}, { duration: timelineDuration }, 0)
          .to(
            slideItems[0],
            {
              autoAlpha: (_, element: HTMLElement) => getSectionAlpha(element),
              duration: INCOMING_DURATION,
              ease: 'power2.out',
              stagger: { amount: INCOMING_STAGGER_AMOUNT, from: 'start' },
              y: 0,
            },
            0,
          )

        if (fadeOnlyItems[0].length) {
          timeline.to(
            fadeOnlyItems[0],
            {
              autoAlpha: (_, element: HTMLElement) => getSectionAlpha(element),
              duration: INCOMING_DURATION,
              ease: 'power1.inOut',
            },
            0,
          )
        }

        timeline.addLabel('section-0', firstSectionSettlePoint)

        panels.slice(1).forEach((_, index) => {
          const transitionStart = transitionStarts[index]!
          const previousSlideItems = slideItems[index]
          const previousFadeOnlyItems = fadeOnlyItems[index]
          const incomingSlideItems = slideItems[index + 1]
          const incomingFadeOnlyItems = fadeOnlyItems[index + 1]
          const incomingBrand = brandSequences[index + 1]
          const incomingBackground = backgrounds[index + 1]
          const incomingHeaderColor = panels[index + 1]?.dataset.sectionHeaderColor ?? '#ffffff'
          if (previousSlideItems.length) {
            timeline.to(
              previousSlideItems,
              {
                autoAlpha: 0,
                duration: OUTGOING_DURATION,
                ease: 'power2.in',
                stagger: { amount: OUTGOING_STAGGER_AMOUNT, from: 'start' },
                y: (_, element: HTMLElement) => -getTransitionDistance(element),
              },
              transitionStart,
            )
          }

          if (previousFadeOnlyItems.length) {
            timeline.to(
              previousFadeOnlyItems,
              {
                autoAlpha: 0,
                duration: OUTGOING_DURATION,
                ease: 'power1.inOut',
              },
              transitionStart,
            )
          }

          timeline
            .to(
              incomingBackground,
              {
                autoAlpha: 1,
                duration: BACKGROUND_HANDOFF_DURATION,
                ease: 'power1.inOut',
              },
              transitionStart + BACKGROUND_HANDOFF_POINT,
            )
            .to(
              header,
              {
                backgroundColor: incomingHeaderColor,
                duration: BACKGROUND_HANDOFF_DURATION,
                ease: 'power1.inOut',
              },
              transitionStart + BACKGROUND_HANDOFF_POINT,
            )

          if (incomingSlideItems.length) {
            timeline.to(
              incomingSlideItems,
              {
                autoAlpha: 1,
                duration: INCOMING_DURATION,
                ease: 'power2.out',
                stagger: { amount: INCOMING_STAGGER_AMOUNT, from: 'start' },
                y: 0,
              },
              transitionStart + PANEL_SWITCH_POINT,
            )
          }

          if (incomingFadeOnlyItems.length) {
            timeline.to(
              incomingFadeOnlyItems,
              {
                autoAlpha: (_, element: HTMLElement) => getSectionAlpha(element),
                duration: INCOMING_DURATION,
                ease: 'power1.inOut',
              },
              transitionStart + PANEL_SWITCH_POINT,
            )
          }

          const brandRevealStart = transitionStart + PANEL_SWITCH_POINT
          if (
            incomingBrand?.cutout &&
            incomingBrand.media &&
            incomingBrand.note &&
            incomingBrand.story &&
            incomingBrand.tensoract &&
            incomingBrand.letters.length
          ) {
            timeline
              .to(incomingBrand.media, {
                autoAlpha: 1,
                duration: 0.72,
                ease: 'power2.out',
                scale: 1,
                y: 0,
              }, brandRevealStart)
              .to(incomingBrand.cutout, {
                autoAlpha: 1,
                duration: 0.72,
                ease: 'power2.out',
                scale: 1,
                y: 0,
              }, brandRevealStart)
              .to(incomingBrand.note, {
                autoAlpha: 1,
                duration: 0.36,
                ease: 'power2.out',
                y: 0,
              }, brandRevealStart + 0.42)
              .to(incomingBrand.letters, {
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: { amount: 0.36, from: 'start' },
                yPercent: 0,
              }, brandRevealStart + 0.62)
              .to(incomingBrand.story, {
                autoAlpha: 1,
                duration: 0.55,
                ease: 'power2.out',
                y: 0,
              }, brandRevealStart + 1.45)
              .to(incomingBrand.tensoract, {
                autoAlpha: 1,
                duration: 0.65,
                ease: 'power2.out',
                y: 0,
              }, brandRevealStart + 1.75)
          }
          timeline.addLabel(
            `section-${index + 1}`,
            incomingBrand?.items.length
              ? brandRevealStart + ECOMBOX_REVEAL_DURATION
              : transitionStart + SECTION_SETTLE_POINT,
          )
        })

        const syncActivePanel = () => {
          let nextIndex = 0

          for (let index = 0; index < transitionStarts.length; index += 1) {
            if (timeline.time() < transitionStarts[index]! + PANEL_SWITCH_POINT) break
            nextIndex = index + 1
          }

          setActivePanel(nextIndex)
        }
        timeline.eventCallback('onUpdate', syncActivePanel)

        const scrollTrigger = ScrollTrigger.create({
          animation: timeline,
          anticipatePin: 1,
          end: () => `+=${getPanelHeight() * timelineDuration}`,
          invalidateOnRefresh: true,
          onRefresh: updateMeasurements,
          pin: true,
          scrub: 0.75,
          start: () => `top top+=${getHeaderHeight()}`,
          trigger: root,
        })

        scrollStackToHash = (hash) => {
          const panelIndex = panels.findIndex((panel) => panel.id === decodeURIComponent(hash))
          if (panelIndex < 0) return false

          const panelTime =
            panelIndex === 0
              ? firstSectionSettlePoint
              : transitionStarts[panelIndex - 1]! + SECTION_SETTLE_POINT
          const progress = panelTime / timelineDuration
          window.scrollTo({
            behavior: 'auto',
            top: scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress,
          })
          return true
        }
        const handleRefreshInit = () => updateMeasurements()
        const hashFrame = window.requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          scrollToHash()
        })

        ScrollTrigger.addEventListener('refreshInit', handleRefreshInit)

        return () => {
          window.cancelAnimationFrame(hashFrame)
          scrollStackToHash = undefined
          ScrollTrigger.removeEventListener('refreshInit', handleRefreshInit)
          scrollTrigger.kill()
          timeline.kill()
          panels.forEach((panel) => {
            panel.inert = false
            panel.removeAttribute('aria-hidden')
            panel.style.removeProperty('pointer-events')
          })
          gsap.set(panels, { clearProps: 'opacity,visibility,z-index' })
          gsap.set(backgrounds, { clearProps: 'opacity,visibility' })
          gsap.set(header, { clearProps: 'background-color' })
          gsap.set(motionItems.flat(), {
            clearProps: 'opacity,transform,visibility,will-change',
          })
          gsap.set(brandSequences.flatMap(({ items }) => items), {
            clearProps: 'opacity,transform,visibility,will-change',
          })
          root.style.removeProperty('--wire-section-viewport-offset')
          delete root.dataset.sectionStack
          delete document.documentElement.dataset.sectionStack
          delete document.documentElement.dataset.activeSection
        }
      })

      mediaContext.add(NON_STACK_HEADER_QUERY, () => {
        const brandPanel = panels.find((panel) => panel.hasAttribute('data-brand-reveal'))
        if (!brandPanel) return

        const activateBrandHeader = () => {
          document.documentElement.dataset.activeSection = brandPanel.id
        }
        const clearBrandHeader = () => {
          if (document.documentElement.dataset.activeSection === brandPanel.id) {
            delete document.documentElement.dataset.activeSection
          }
        }
        const headerTrigger = ScrollTrigger.create({
          end: () => `bottom top+=${document.querySelector<HTMLElement>('.wire-header')?.offsetHeight ?? 0}`,
          onRefresh: (trigger) => {
            if (trigger.isActive) activateBrandHeader()
            else clearBrandHeader()
          },
          onToggle: (trigger) => {
            if (trigger.isActive) activateBrandHeader()
            else clearBrandHeader()
          },
          start: 'top 35%',
          trigger: brandPanel,
        })

        return () => {
          headerTrigger.kill()
          clearBrandHeader()
        }
      })

      mediaContext.add(MOBILE_BRAND_MOTION_QUERY, () => {
        const brandPanel = panels.find((panel) => panel.hasAttribute('data-brand-reveal'))
        if (!brandPanel) return

        const brand = getBrandSequence(brandPanel)
        if (!brand.cutout || !brand.media || !brand.note || !brand.story || !brand.tensoract || !brand.letters.length) return

        gsap.set(brand.media, { autoAlpha: 0, scale: 0.985, y: 40 })
        gsap.set(brand.letters, { autoAlpha: 0, yPercent: 115 })
        gsap.set(brand.cutout, { autoAlpha: 0, scale: 0.985, y: 48 })
        gsap.set(brand.note, { autoAlpha: 0, y: 8 })
        gsap.set(brand.story, { autoAlpha: 0, y: 32 })
        gsap.set(brand.tensoract, { autoAlpha: 0, y: 100 })

        const reveal = gsap.timeline({
          scrollTrigger: {
            end: 'bottom 12%',
            scrub: 0.6,
            start: 'top 88%',
            trigger: brandPanel,
          },
        })

        reveal
          .to(brand.media, {
            autoAlpha: 1,
            duration: 0.72,
            ease: 'power2.out',
            scale: 1,
            y: 0,
          })
          .to(brand.cutout, { autoAlpha: 1, duration: 0.72, ease: 'power2.out', scale: 1, y: 0 }, 0)
          .to(brand.note, { autoAlpha: 1, duration: 0.36, ease: 'power2.out', y: 0 }, 0.42)
          .to(
            brand.letters,
            {
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: { amount: 0.36, from: 'start' },
              yPercent: 0,
            },
            0.62,
          )
          .to(brand.story, { autoAlpha: 1, duration: 0.55, ease: 'power2.out', y: 0 }, 1.45)
          .to(
            brand.tensoract,
            { autoAlpha: 1, duration: 0.65, ease: 'power2.out', y: 0 },
            1.75,
          )

        return () => {
          reveal.scrollTrigger?.kill()
          reveal.kill()
          gsap.set(brand.items, { clearProps: 'opacity,transform,visibility' })
        }
      })

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        scrollToHash()
      })

      return () => {
        window.cancelAnimationFrame(hashNavigationFrame)
        window.cancelAnimationFrame(restoreScrollBehaviorFrame)
        restoreScrollBehavior()
        window.removeEventListener('click', handleAnchorClick, true)
        window.removeEventListener('hashchange', scheduleHashScroll)
        window.removeEventListener('popstate', scheduleHashScroll)
      }
    }, root)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      mediaContext?.revert()
      context.revert()
    }
  }, [])

  return (
    <div className="wire-section-flow" ref={rootRef}>
      {children}
    </div>
  )
}
