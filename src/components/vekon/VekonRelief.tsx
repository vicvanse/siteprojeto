/**
 * Mobile: the surface around the Living Ring as a contour relief — nested
 * terraces of the same gray, each lifted by a soft light/dark shadow (like a
 * topographic model cut in paper), with two hairline circles and one contour
 * traced in the Papers color. Paths are fixed (seeded), so it never jumps.
 */

const SIZE = 1000;
const C = SIZE / 2;

/** Smooth closed path through points (Catmull-Rom → cubic Bézier). */
function smoothClosed(points: [number, number][]): string {
  const n = points.length;
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

/** One contour: a circle of radius r, pushed in and out by a few slow waves.
 *  Outer contours wander more; inner ones settle toward the ring. */
function contour(r: number, k: number): string {
  const wander = 0.03 + k * 0.022;
  const pts: [number, number][] = [];
  const steps = 64;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const w =
      Math.sin(2 * t + 0.6 + k * 0.18) * 0.55 +
      Math.sin(3 * t + 2.1 - k * 0.11) * 0.3 +
      Math.sin(5 * t + 4.0 + k * 0.07) * 0.15;
    const rr = r * (1 + wander * w);
    /* a slight drift down-right, so the terraces read as a slope */
    const dx = k * 6;
    const dy = k * 9;
    pts.push([C + dx + rr * Math.cos(t), C + dy + rr * Math.sin(t)]);
  }
  return smoothClosed(pts);
}

const RADII = [470, 405, 345, 290, 238, 192, 150];
const PATHS = RADII.map((r, i) => contour(r, RADII.length - 1 - i));

export function VekonRelief() {
  return (
    <svg className="vh-relief" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden focusable="false">
      <defs>
        <filter id="vh-terrace" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="5" dy="7" stdDeviation="6" floodColor="#b9bcc4" floodOpacity="0.75" />
          <feDropShadow dx="-4" dy="-4" stdDeviation="4" floodColor="#ffffff" floodOpacity="0.95" />
        </filter>
      </defs>
      {PATHS.map((d, i) => (
        <path key={i} d={d} className="vh-relief__terrace" filter="url(#vh-terrace)" />
      ))}
      {/* one contour traced in the Papers color */}
      <path d={PATHS[3]} className="vh-relief__accent" />
      {/* hairline circles, as on an instrument */}
      <circle cx={C} cy={C} r={215} className="vh-relief__line" />
      <circle cx={C + 40} cy={C - 30} r={360} className="vh-relief__line" />
    </svg>
  );
}
