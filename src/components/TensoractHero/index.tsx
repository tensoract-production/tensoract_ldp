'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type HeroCopy = {
  affiliations: string
  body: string
  imageAlt: string
}

type Affiliation = {
  height: number
  logo: string
  name: string
  showName?: boolean
  width: number
}

const wordmarkCharacters = [...'tensor']

export function TensoractHero({
  affiliations,
  copy,
}: {
  affiliations: readonly Affiliation[]
  copy: HeroCopy
}) {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.dataset.motion = reducedMotion ? 'reduced' : 'enabled'

    if (reducedMotion) {
      return () => {
        delete root.dataset.motion
      }
    }

    let marqueeObserver: IntersectionObserver | undefined
    let refreshHandler: (() => void) | undefined

    const context = gsap.context(() => {
      const intro = root.querySelector<HTMLElement>('.brand-hero__intro')
      const marquee = root.querySelector<HTMLElement>('.brand-hero__marquee')
      const marqueeTrack = root.querySelector<HTMLElement>('.brand-hero__marquee-track')
      const media = root.querySelector<HTMLElement>('.brand-hero__media')
      const mediaFrame = root.querySelector<HTMLElement>('.brand-hero__media-frame')
      const mediaNote = root.querySelector<HTMLElement>('.brand-hero__media-note')
      const summaryText = root.querySelector<HTMLElement>('.brand-hero__summary-text')
      const target = root.querySelector<HTMLElement>('.brand-hero__target')
      const title = root.querySelector<HTMLElement>('.brand-hero__title')
      const titleCharacters = gsap.utils.toArray<HTMLElement>('.brand-hero__character', root)
      const wordmark = root.querySelector<HTMLElement>('.brand-hero__wordmark')

      if (
        !intro ||
        !marquee ||
        !marqueeTrack ||
        !media ||
        !mediaFrame ||
        !mediaNote ||
        !summaryText ||
        !target ||
        !title ||
        !wordmark
      ) return

      const isMobile = () => window.matchMedia('(max-width: 48rem)').matches
      const isTablet = () => window.matchMedia('(max-width: 64rem)').matches
      const mobile = isMobile()
      const destination = { scale: 1, x: 0, y: 0 }
      const introStart = { x: 0, y: 0 }
      const summaryEnd = { x: 0 }

      gsap.set(wordmark, { x: 0, xPercent: -50, y: 0, yPercent: -50 })
      gsap.set(title, { scale: 1, transformOrigin: 'top left' })
      gsap.set(titleCharacters, {
        autoAlpha: 0,
        willChange: 'transform, opacity',
        yPercent: 70,
      })
      gsap.set(media, {
        autoAlpha: 0,
        pointerEvents: 'none',
        scale: mobile ? 0.14 : 0.08,
        transformOrigin: '50% 100%',
      })
      gsap.set(mediaFrame, {
        filter: 'blur(14px)',
      })
      gsap.set(mediaNote, { autoAlpha: 0, y: -8 })

      const titleReveal = gsap.to(titleCharacters, {
        autoAlpha: 1,
        duration: 0.76,
        ease: 'power3.in',
        stagger: 0.04,
        yPercent: 0,
        onComplete: () => gsap.set(titleCharacters, { clearProps: 'willChange' }),
      })

      const measure = () => {
        const header = document.querySelector<HTMLElement>('.wire-header')
        const headerHeight = header?.getBoundingClientRect().height ?? 0
        root.style.setProperty('--brand-header-height', `${headerHeight}px`)

        // Both elements share the same positioned container. Offset geometry is
        // unaffected by the current GSAP transform, so refreshes cannot compound
        // the previous viewport's translation while a scrub is in progress.
        const sourceLeft = wordmark.offsetLeft - wordmark.offsetWidth / 2
        const sourceTop = wordmark.offsetTop - wordmark.offsetHeight / 2
        const introGap = mobile
          ? Math.min(32, Math.max(16, window.innerHeight * 0.04))
          : Math.min(64, Math.max(24, window.innerHeight * 0.08))

        destination.scale = target.offsetWidth / wordmark.offsetWidth
        destination.x = target.offsetLeft - sourceLeft
        destination.y = target.offsetTop - sourceTop
        introStart.x = (intro.parentElement!.clientWidth - intro.offsetWidth) / 2 - intro.offsetLeft
        introStart.y = sourceTop + wordmark.offsetHeight + introGap - intro.offsetTop
        summaryEnd.x = -(intro.offsetWidth - summaryText.offsetWidth) / 2
      }

      refreshHandler = measure
      measure()
      ScrollTrigger.addEventListener('refreshInit', measure)

      gsap.set(intro, {
        autoAlpha: 1,
        pointerEvents: 'auto',
      })
      gsap.set(marquee, { autoAlpha: 1 })

      const marqueeTween = gsap.to(marqueeTrack, {
        duration: mobile ? 18 : 24,
        ease: 'none',
        repeat: -1,
        xPercent: -50,
      })

      marqueeObserver = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) marqueeTween.play()
        else marqueeTween.pause()
      }, {
        rootMargin: '100px 0px',
      })
      marqueeObserver.observe(root)

      const scrollDistance = () => {
        const viewportIsMobile = isMobile()
        const factor = viewportIsMobile ? 0.72 : isTablet() ? 1.2 : 1.45
        return Math.max(window.innerHeight * factor, viewportIsMobile ? 520 : 760)
      }

      let animationProgress = 0
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        paused: true,
      })

      timeline
        .to(
          wordmark,
          {
            duration: 0.68,
            x: () => destination.x,
            y: () => destination.y,
          },
          0,
        )
        .to(
          title,
          {
            duration: 0.68,
            scale: () => destination.scale,
          },
          0,
        )
        .fromTo(
          intro,
          {
            x: () => introStart.x,
            y: () => introStart.y,
          },
          {
            duration: 0.68,
            ease: 'power2.inOut',
            x: 0,
            y: 0,
          },
          0,
        )
        .to(
          summaryText,
          {
            duration: 0.68,
            ease: 'power2.inOut',
            x: () => summaryEnd.x,
          },
          0,
        )
        .to(
          media,
          {
            duration: 0.66,
            ease: 'power2.inOut',
            pointerEvents: 'auto',
            scale: 1,
          },
          0,
        )
        .to(
          mediaFrame,
          {
            duration: 0.66,
            ease: 'power2.inOut',
            filter: 'blur(0px)',
          },
          0,
        )
        .to(
          media,
          {
            autoAlpha: 1,
            duration: 0.1,
            ease: 'power1.out',
          },
          0.08,
        )
        .to(
          mediaNote,
          {
            autoAlpha: 1,
            duration: 0.18,
            ease: 'power2.out',
            y: 0,
          },
          0.36,
        )

      if (!mobile) {
        timeline
          .to(
            wordmark,
            {
              autoAlpha: 0,
              duration: 0.32,
              ease: 'power2.in',
              y: () => destination.y - Math.min(180, window.innerHeight * 0.16),
            },
            0.68,
          )
          .to(
            intro,
            {
              autoAlpha: 0,
              duration: 0.3,
              ease: 'power2.in',
              y: () => -Math.min(120, window.innerHeight * 0.11),
            },
            0.7,
          )
          .to(
            media,
            {
              autoAlpha: 0,
              duration: 0.32,
              ease: 'power2.in',
              pointerEvents: 'none',
              scale: 0.985,
              y: () => -Math.min(160, window.innerHeight * 0.14),
            },
            0.68,
          )
          .to(
            marquee,
            {
              autoAlpha: 0,
              duration: 0.28,
              ease: 'power2.in',
              y: () => -Math.min(80, window.innerHeight * 0.075),
            },
            0.72,
          )
      }

      ScrollTrigger.create({
        anticipatePin: 1,
        end: () => `+=${scrollDistance()}`,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          animationProgress = progress
          const released = progress > 0.995
          root.classList.toggle('brand-hero--transitioned', progress > 0.005)
          root.classList.toggle('brand-hero--released', released)
          if (root.parentElement?.classList.contains('pin-spacer')) {
            root.parentElement.style.zIndex = released ? '0' : '2'
          }
          if (progress > 0.005 && titleReveal.progress() < 1) titleReveal.progress(1)
          timeline.progress(animationProgress)
        },
        onRefresh: () => {
          timeline.invalidate()
          timeline.progress(animationProgress)
        },
        pin: true,
        pinSpacing: true,
        start: () => {
          const header = document.querySelector<HTMLElement>('.wire-header')
          return `top top+=${header?.getBoundingClientRect().height ?? 0}`
        },
        trigger: root,
      })
    }, root)

    return () => {
      marqueeObserver?.disconnect()
      if (refreshHandler) ScrollTrigger.removeEventListener('refreshInit', refreshHandler)
      context.revert()
      root.classList.remove('brand-hero--transitioned')
      root.classList.remove('brand-hero--released')
      root.style.removeProperty('--brand-header-height')
      delete root.dataset.motion
    }
  }, [])

  return (
    <section className="brand-hero" ref={rootRef}>
      <div className="brand-hero__stage">
        <div className="brand-hero__container wire-container">
          <span aria-hidden="true" className="brand-hero__target">
            <span>&gt;tensor</span>
            <span className="brand-hero__target-selection">
              <span>act</span>
              <span className="brand-hero__target-cursor">_</span>
            </span>
          </span>

          <div className="brand-hero__wordmark">
            <h1 aria-label="Tensoract" className="brand-hero__title">
              <span
                aria-hidden="true"
                className="brand-hero__character brand-hero__title-prefix"
              >
                &gt;
              </span>
              {wordmarkCharacters.map((character, index) => (
                <span
                  aria-hidden="true"
                  className="brand-hero__character"
                  key={`${character}-${index}`}
                >
                  {character}
                </span>
              ))}
              <span
                aria-hidden="true"
                className="brand-hero__character brand-hero__title-selection"
              >
                <span>act</span>
                <span className="brand-hero__title-cursor" />
              </span>
            </h1>
          </div>

          <div className="brand-hero__intro">
            <p className="brand-hero__summary">
              <span className="brand-hero__summary-text">{copy.body}</span>
            </p>
          </div>

          <figure className="brand-hero__media">
            <figcaption className="brand-hero__media-note">Demo Day UII</figcaption>
            <div className="brand-hero__media-frame">
              <Image
                alt={copy.imageAlt}
                className="brand-hero__media-image"
                fill
                priority
                quality={85}
                sizes="(max-width: 48rem) calc(100vw - 2rem), min(76rem, calc(100vw - 2rem))"
                src="/assets/demo-day-uii/vnp-9609.jpg"
              />
            </div>
          </figure>
        </div>

        <div aria-label={copy.affiliations} className="brand-hero__marquee">
          <div className="brand-hero__marquee-track">
            <div className="brand-hero__marquee-group" role="list">
              {affiliations.map((affiliation) => (
                <span className="brand-hero__partner" key={affiliation.name} role="listitem">
                  <Image
                    alt={affiliation.showName ? '' : affiliation.name}
                    className="brand-hero__partner-logo"
                    height={affiliation.height}
                    loading="eager"
                    src={affiliation.logo}
                    width={affiliation.width}
                  />
                  {affiliation.showName && (
                    <span className="brand-hero__partner-name">{affiliation.name}</span>
                  )}
                </span>
              ))}
            </div>
            <div aria-hidden="true" className="brand-hero__marquee-group">
              {affiliations.map((affiliation) => (
                <span className="brand-hero__partner" key={affiliation.name}>
                  <Image
                    alt=""
                    className="brand-hero__partner-logo"
                    height={affiliation.height}
                    loading="eager"
                    src={affiliation.logo}
                    width={affiliation.width}
                  />
                  {affiliation.showName && (
                    <span className="brand-hero__partner-name">{affiliation.name}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
