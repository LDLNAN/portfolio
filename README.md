# THIS README IS NOT VERY GOOD
It's essentially used for note-taking, but will/should be updated before Firebase deployment. :)

## **ROUND 1**
_This stuff was done in assessment 1_
- Actually scales properly instead of being huge
- Only gets smaller when it needs to (no more weird overlaps)
- Switches to vertical layout at 1600px width
- Doesn't cause horizontal scrolling anymore
- Made the responsive breakpoints actually make sense
- Text only centers on mobile
- Having trouble implementing the white glass social buttons, they're fine for now but not what I was picturing
- Bebas Neue for headings and Maven Pro for body text. "Glassy" looking stuff and bright, bold accents
- Should probably simplifiy to just black and white css files, instead of having aboutme.css 

- Unsure I like how the photo on about me scales

Useful stuff
https://www.w3schools.com/cssref/atrule_media.php
https://www.w3schools.in/css3/gradient-text
https://css-tricks.com/gradient-borders-in-css/

- added contact (contact.html & contact.css)
- reworked about me page to match closer to contact style, centering and whatnots

https://www.w3schools.com/howto/howto_css_column_cards.asp
https://frontendly.io/blog/responsive-card-grid-layout

## **ROUND 2**
#### _(Commit)_
- Added animations to hero page, some clean-up, some messy-ing.
- Maybe will need to populate nav-bar with JS instead of hardcoding per-page, as now the hero-page differs from the others.
- Should also allow for cool entry animations for other pages, as those do not work statically.
- Do a round of clean-up please.

_TL:DR: Hero page animations, use JS for this stuff later. Clean TF up you dirty rat._

#### _(Commit)_
- README update.
- Compressed hero image.
- Mobile hero page social panel changed -> May need to look for more consistent solution?


### _(Commit)_ 
- Added hamburger menu for mobile breakpoint.
- Design tweaks
- Major cleanup (renaming things, shift things, redo things - proper mixed bag)
- Moved to more hard coded values, change this back later -> just for experimentation.
- Things are a bit messy, but gotta move on.

#### _(Commit)_
- Swap to RGB values for colours consistently
- Created guestbook form
- Removed some media query entries where not needed

## **Actual Implementation Steps**
Each step is a commit

#### _Step 1_ firebase.js
- Tutorial doesn't include DOM, had to make some adjustments
    - getElementById what-not instead of what they did

#### _Step 2 & 3_ comments.js
- Works! Comments display from Firabase DB
- Had to fix firebase.js, old reference

#### _Step 4_ comments.js (cont.)
- Can now write, needs auth verification and other CRUD stuff
---