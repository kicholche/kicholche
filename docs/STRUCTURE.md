# Kicholche Project Structure

## Product layers
- Public multilingual website
- AI and utility tools
- Optional visitor account
- Admin
- Manager with permission controls
- Supabase backend
- Automated QA

## Visual architecture
Desktop and mobile are intentionally separate component/layout systems.
The supplied reference image contains both designs; they are not one responsive layout.

Desktop components:
- DesktopHeader
- DesktopNavigation
- DesktopHero
- DesktopNewsGrid
- DesktopSidebar
- DesktopCards
- DesktopFooter

Mobile components:
- MobileHeader
- MobileHero
- MobileCategoryIcons
- MobileCards
- MobileBottomNav
- MobileFooter

## Content domains
News, breaking, trending, jobs, education, exams, results, government,
weather, sports, business, technology, entertainment, important dates,
district, India, world and useful tools.

## Tool domains
PDF, image, text, language, developer, resume, calculator, student and finance tools.

## Backend domains
Auth, roles, permissions, articles, translations, jobs, results, media,
analytics, notifications, SEO, ads, backups, audit logs and errors.

## Development workflow
PLAN -> DESIGN -> DATABASE -> CODE -> RUN -> BROWSER TEST -> SCREENSHOT ->
VISUAL INSPECTION -> FIX -> RETEST -> SECURITY -> SEO -> PERFORMANCE -> FINAL QA

## Hosting
Hosting is intentionally deferred. Local development, Git and Supabase are the current foundation.
