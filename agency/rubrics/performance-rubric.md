# Performance Rubric

Score each item from 1 to 5.

| Criterion | 1 (poor) | 3 (acceptable) | 5 (excellent) |
|---|---|---|---|
| **LCP** | > 4s | 2.5-4s | < 2.5s |
| **INP** | > 500ms | 200-500ms | < 200ms |
| **CLS** | > 0.25 | 0.1-0.25 | < 0.1 |
| **Image optimization** | No optimization, large files | Some optimization, inconsistent | WebP/AVIF, lazy loading, explicit dimensions |
| **JavaScript payload** | Large client-side bundle | Moderate JS, some unused code | Minimal JS, islands only where needed |
| **Server response** | > 600ms TTFB | 200-600ms TTFB | < 200ms TTFB |

A page is not ready for launch below an average of 3.
