# Accessibility Improvements

## Issues Found (Lighthouse Score: 90)

### 1. Contrast Issues
**Problem:** `text-slate-400` has insufficient contrast ratio
- Light mode: #94a3b8 on white = 2.9:1 (needs 4.5:1)
- Dark mode: #94a3b8 on dark = 3.2:1 (needs 4.5:1)

**Solution:** Replace with `text-slate-600 dark:text-slate-300`
- Light mode: #475569 on white = 8.6:1 [DONE]
- Dark mode: #cbd5e1 on dark = 12.1:1 [DONE]

### 2. Link Labels
**Problem:** Links without discernible names (icon-only links)

**Solution:** Add `aria-label` attributes to all icon-only links

### 3. Heading Hierarchy  
**Problem:** Headings not in sequential order (h1 -> h3, skipping h2)

**Solution:** Ensure proper h1 -> h2 -> h3 hierarchy

---

## Files to Update

### High Priority (Most Impact):
1. `src/components/features/Charts.tsx` - Chart titles
2. `src/components/features/GoalTracker.tsx` - Labels
3. `src/components/features/ROICalculator.tsx` - Form labels
4. `src/components/features/PortfolioHealth.tsx` - Metrics
5. `src/components/layout/Footer.tsx` - Footer text
6. `src/app/page.tsx` - Homepage content

### Changes:
- [x] Replace all `text-slate-400` with `text-slate-600 dark:text-slate-300`
- [x] Add `aria-label` to icon-only buttons/links
- [x] Fix heading hierarchy (use h2 instead of h3 for section titles)

---

## Expected Result
- Accessibility score: 95+ (from 90)
- Better readability for all users
- WCAG 2.1 AA compliance
