"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * LiquidField: a slow molten-amber-and-smoke WebGL field, the site's
 * atmosphere layer. Brand palette only: graphite base, phosphor-amber
 * ridges. Renders at reduced resolution for softness and performance,
 * pauses when offscreen, and freezes to a single settled frame under
 * prefers-reduced-motion. Decorative only: always behind content,
 * always aria-hidden.
 */

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uIntensity;
  uniform vec2 uDrift;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(7.3, 3.1);
      a *= 0.5;
    }
    return v;
  }

  // Height field of the flowing surface
  float height(vec2 p, float t) {
    vec2 q = vec2(fbm(p * 1.1 + t), fbm(p * 1.1 - t * 0.7 + 5.2));
    vec2 r = vec2(
      fbm(p * 1.1 + q * 2.0 + t * 0.6 + vec2(1.7, 9.2)),
      fbm(p * 1.1 + q * 2.0 - t * 0.4 + vec2(8.3, 2.8))
    );
    return fbm(p * 1.1 + r * 2.6);
  }

  void main() {
    vec2 p = vUv + uDrift; // presence: the field leans a few percent toward the pointer
    p.x *= uRes.x / max(uRes.y, 1.0);
    p.y *= 1.6; // stretch: ribbons flow horizontally
    float t = uTime * 0.035;

    float h = height(p, t);

    // Surface normal from the height field: this is what makes it glass
    float e = 0.02;
    float hx = height(p + vec2(e, 0.0), t);
    float hy = height(p + vec2(0.0, e), t);
    vec3 n = normalize(vec3(-(hx - h) * 34.0, -(hy - h) * 34.0, 1.0));

    // One warm light from upper left
    vec3 L = normalize(vec3(-0.42, 0.68, 0.55));
    float diff = max(dot(n, L), 0.0);
    float spec = pow(max(reflect(-L, n).z, 0.0), 26.0);

    // Ribbon mask: glass only lives in defined bands, edges stay crisp
    float ribbon = smoothstep(0.515, 0.565, h) * smoothstep(0.775, 0.675, h);

    // Near-flat dark base: no grey turbulence, no smoke
    vec3 base = vec3(0.055, 0.059, 0.067) + vec3(0.012) * h;

    vec3 amber = vec3(0.910, 0.640, 0.240);
    vec3 amberDeep = vec3(0.42, 0.27, 0.10);
    vec3 sheen = vec3(0.98, 0.88, 0.70);

    // Shaded glass ribbon: dark underside, lit face, glossy highlight
    vec3 glass = mix(amberDeep, amber, diff);

    // Cool steel rim from the opposite side: glass reflects two lights
    vec3 coolL = normalize(vec3(0.55, -0.5, 0.35));
    float rim = pow(max(dot(n, coolL), 0.0), 3.0);
    vec3 steel = vec3(0.498, 0.698, 0.788);

    vec3 col = base
      + glass * ribbon * 0.56 * uIntensity
      + sheen * spec * ribbon * 0.70 * uIntensity
      + steel * rim * ribbon * 0.16 * uIntensity;

    // Edge vignette so content edges stay calm
    float vig = smoothstep(1.25, 0.35, length(vUv - 0.5) * 1.4);
    col *= mix(0.74, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface LiquidFieldProps {
  className?: string;
  /** 0..1, how loud the amber runs. Default 1. */
  intensity?: number;
}

export function LiquidField({ className, intensity = 1 }: LiquidFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Desktop-only: phones get the calm panel, their battery back, and a
    // text LCP. The container is also CSS-hidden below lg.
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: Renderer;
    try {
      // Render at reduced resolution: soft by design, cheap by design.
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 1.5) * 0.55,
        alpha: false,
        antialias: false,
      });
    } catch {
      return; // No WebGL: the CSS aurora fallback behind us still shows.
    }

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: reduced ? 26.0 : 0 },
        uRes: { value: [1, 1] },
        uIntensity: { value: intensity },
        uDrift: { value: [0, 0] },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.uRes.value = [clientWidth, clientHeight];
      renderer.render({ scene: mesh });
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    if (reduced) {
      // One settled frame, no loop.
      renderer.render({ scene: mesh });
      return () => {
        ro.disconnect();
        canvas.remove();
      };
    }

    let raf = 0;
    let visible = true;
    let start = performance.now();
    let pausedAt = 0;

    // Pointer presence: target a 3% positional lean, ease toward it
    // slowly enough (~1.5s lag) that the effect sits under the threshold
    // of perception. No extra render passes: same field, nudged.
    const driftTarget = [0, 0];
    const onPointer = (e: MouseEvent) => {
      driftTarget[0] = (e.clientX / window.innerWidth - 0.5) * 0.06;
      driftTarget[1] = (e.clientY / window.innerHeight - 0.5) * 0.06;
    };
    window.addEventListener("mousemove", onPointer, { passive: true });

    const loop = (now: number) => {
      program.uniforms.uTime.value = (now - start) / 1000;
      const d = program.uniforms.uDrift.value as [number, number];
      d[0] += (driftTarget[0] - d[0]) * 0.022;
      d[1] += (driftTarget[1] - d[1]) * 0.022;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting;
        if (next === visible) return;
        visible = next;
        if (visible) {
          start += performance.now() - pausedAt; // resume without a jump
          raf = requestAnimationFrame(loop);
        } else {
          pausedAt = performance.now();
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(container);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onPointer);
      io.disconnect();
      ro.disconnect();
      canvas.remove();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none hidden lg:block ${className ?? ""}`}
      aria-hidden
    />
  );
}
