# 09 – How to Design Animations in Figma: Step-by-Step Guide

**Last Updated:** December 20, 2024  
**Version:** 1.0  
**Audience:** Product Designers using Figma

---

## 📌 Purpose of This Document

This guide explains **how to design and create each animation type inside Figma** using clear, repeatable steps.

**Who this is for:** Product designers who know Figma basics but need guidance on executing motion design.

**What you'll learn:**
- How to structure animation variants
- How to use Smart Animate effectively
- What timing and easing to apply
- Common mistakes to avoid

---

## 🎯 Standard Animation Design Process

Every animation in Figma follows this pattern:

1. **Create the base component** (starting state)
2. **Duplicate into a second state** (ending state)
3. **Modify only properties that should animate** (position, opacity, scale, color)
4. **Combine states into variants** (use component properties)
5. **Switch to Prototype mode**
6. **Connect states using Smart Animate**
7. **Set trigger, duration, and easing**

---

## A. Micro-Interactions — How to Design Them

### 1. Hover State

**Purpose:** Provide visual feedback when cursor enters an interactive element.

#### **How to Design It in Figma:**

**Step 1: Create the base button component**
- Draw a rectangle (shortcut: R)
- Add text layer inside
- Select both → Create Component (Cmd/Ctrl + Alt + K)
- Name it "Button"

**Step 2: Add a Hover variant**
- Select the component
- In Properties panel → Click "+" next to Variants
- Add a property called "State" with values: Default, Hover
- You now have two variants side-by-side

**Step 3: Modify the Hover variant**
- Select the Hover variant
- Adjust these properties:
  - **Shadow:** Increase blur from 8px to 16px
  - **Y position:** Move up by -4px (creates "lift" effect)
  - **Border color:** Shift to accent color (e.g., #D4C5B0 → #C9A961)
- Do NOT change: width, height, text content, corner radius

**Step 4: Connect in Prototype mode**
- Click Prototype tab (top-right)
- Select Default variant
- Drag blue "+" handle to Hover variant
- In interaction panel:
  - **Trigger:** While Hovering
  - **Action:** Change to
  - **Destination:** Hover (State)
  - **Animation:** Smart Animate
  - **Duration:** 200ms
  - **Easing:** Ease Out

**Step 5: Test**
- Click Play button (top-right)
- Hover over button to see lift effect

#### **Recommended Values:**
- **Duration:** 200-300ms
- **Easing:** Ease Out (feels responsive)

#### **What Should Animate:**
✅ Shadow (blur, Y offset)  
✅ Y position (-2px to -4px lift)  
✅ Border or background color  
✅ Scale (optional: 1.0 → 1.02)

#### **What Should NOT Animate:**
❌ Width or height  
❌ Text content  
❌ Corner radius  
❌ Font size

#### **Common Design Mistakes:**
- ❌ Lift is too large (>6px looks bouncy)
- ❌ Duration too long (>400ms feels sluggish)
- ❌ Animating too many properties at once
- ❌ Using "Ease In" instead of "Ease Out"

---

### 2. Button Press Feedback

**Purpose:** Provide immediate tactile feedback when user clicks.

#### **How to Design It in Figma:**

**Step 1: Start with your Button component (from above)**
- If you followed Hover State guide, you already have Default and Hover variants

**Step 2: Add a Pressed variant**
- Select component set
- Add new variant: State = Pressed
- Position it after Hover variant

**Step 3: Modify the Pressed variant**
- Select the Pressed variant
- Adjust these properties:
  - **Scale:** 98% (slight inward press)
  - **Background brightness:** Reduce by 5% (darken slightly)
  - **Shadow blur:** Reduce to 4px (closer to surface)
- Creates feeling of "pressing into" the button

**Step 4: Connect the interaction**
- Switch to Prototype mode
- Select Hover variant
- Drag connection to Pressed variant
- Set interaction:
  - **Trigger:** While Pressing
  - **Action:** Change to
  - **Destination:** Pressed (State)
  - **Animation:** Smart Animate
  - **Duration:** 100ms
  - **Easing:** Ease In

**Step 5: Add the release interaction**
- Select Pressed variant
- Drag connection back to Hover variant
- Set interaction:
  - **Trigger:** On Click
  - **Action:** Change to
  - **Destination:** Hover (State)
  - **Animation:** Smart Animate
  - **Duration:** 150ms
  - **Easing:** Ease Out

#### **Recommended Values:**
- **Press duration:** 100ms (instant feedback)
- **Release duration:** 150ms (smooth return)
- **Easing:** Ease In (press), Ease Out (release)

#### **What Should Animate:**
✅ Scale (100% → 98%)  
✅ Background brightness  
✅ Shadow distance

#### **What Should NOT Animate:**
❌ Border radius  
❌ Text  
❌ Opacity (makes it look disabled)

#### **Common Design Mistakes:**
- ❌ Scale down too much (<95% looks broken)
- ❌ Using Ease Out on press (should be Ease In)
- ❌ No release animation (feels stuck)
- ❌ Duration too slow (>200ms feels laggy)

---

### 3. Toggle / Switch

**Purpose:** Show binary state change (ON/OFF, enabled/disabled).

#### **How to Design It in Figma:**

**Step 1: Create the OFF state**
- Draw a rounded rectangle (60×32px, corner radius 16px)
- Set fill: #E5E5E5 (light gray)
- Draw a circle inside (24×24px)
- Position circle at left edge (4px from left)
- Set circle fill: white with shadow
- Select all → Create Component → Name "Toggle"

**Step 2: Add an ON variant**
- Create variant property: State = OFF, ON
- Select ON variant

**Step 3: Modify the ON variant**
- **Track (background):**
  - Change fill from #E5E5E5 → #4A7C59 (green accent)
- **Handle (circle):**
  - Move from X: 4px → X: 32px (slides to right edge)
  - Keep same Y position
  - Keep same size and shadow
- Do NOT change track size or corner radius

**Step 4: Connect the interaction**
- Prototype mode
- Select OFF variant
- Drag to ON variant
- Set interaction:
  - **Trigger:** On Click
  - **Action:** Change to
  - **Destination:** ON (State)
  - **Animation:** Smart Animate
  - **Duration:** 250ms
  - **Easing:** Ease Out (0.4, 0.0, 0.2, 1)

**Step 5: Add reverse interaction**
- Select ON variant
- Drag to OFF variant
- Use same settings (On Click, 250ms, Ease Out)

**Step 6: Test the toggle**
- Click Play
- Click toggle repeatedly to see smooth sliding

#### **Recommended Values:**
- **Duration:** 250ms (feels natural)
- **Easing:** Ease Out or Custom (0.4, 0.0, 0.2, 1)

#### **What Should Animate:**
✅ Handle X position (slides left/right)  
✅ Track background color (gray → accent)  
✅ Optional: Handle shadow intensity

#### **What Should NOT Animate:**
❌ Track width or height  
❌ Handle size  
❌ Corner radius  
❌ Y position of handle

#### **Common Design Mistakes:**
- ❌ Handle slides too fast (<200ms feels abrupt)
- ❌ Handle doesn't align to edges (should be 4px from edge)
- ❌ Using Linear easing (feels robotic)
- ❌ Color transition is too jarring (use related colors)

---

### 4. Form Validation Feedback

**Purpose:** Show real-time input state (default, error, success).

#### **How to Design It in Figma:**

**Step 1: Create the Default input field**
- Draw rectangle (320×48px, corner radius 8px)
- Add 1px border: #E5E5E5
- Add placeholder text layer inside: "Enter email"
- Create Component → Name "Input Field"

**Step 2: Add Error and Success variants**
- Add variant property: State = Default, Error, Success
- You now have three variants

**Step 3: Design the Error variant**
- Select Error variant
- Modify:
  - **Border color:** #E53E3E (red)
  - **Border width:** 2px (more prominent)
  - Add error icon (!) to the right: red, 16×16px
  - Add error text below: "Invalid email format" (red, 12px)

**Step 4: Design the Success variant**
- Select Success variant
- Modify:
  - **Border color:** #4A7C59 (green)
  - **Border width:** 2px
  - Add checkmark icon to the right: green, 16×16px
  - No error text below

**Step 5: Add shake animation (for Error)**
- Create 5 frames showing shake positions:
  - Frame 1: X = 0
  - Frame 2: X = -4px
  - Frame 3: X = 4px
  - Frame 4: X = -4px
  - Frame 5: X = 0
- Connect them sequentially with After Delay (80ms each)
- Total shake duration: 400ms

**Step 6: Connect state transitions**
- Default → Error: On Click, Smart Animate, 300ms, Ease Out
- Default → Success: On Click, Smart Animate, 300ms, Ease Out
- Icons should fade in (opacity 0 → 1)

#### **Recommended Values:**
- **State transition:** 300ms, Ease Out
- **Shake duration:** 400ms total (80ms per frame)
- **Icon fade:** 200ms, Ease In

#### **What Should Animate:**
✅ Border color and width  
✅ Icon opacity (fade in)  
✅ Horizontal position (shake)  
✅ Error text fade-in

#### **What Should NOT Animate:**
❌ Input field height  
❌ Corner radius  
❌ Placeholder text color (too distracting)

#### **Common Design Mistakes:**
- ❌ Shake is too aggressive (>6px displacement)
- ❌ Shake on every keystroke (wait for blur/submit)
- ❌ Error text appears instantly (should fade)
- ❌ No success state (users need positive feedback too)

---

## B. Transitions — How to Design Them

### 5. Page Transition

**Purpose:** Smoothly transition between different screens or pages.

#### **How to Design It in Figma:**

**Step 1: Create Page A**
- Design your first page as a full-screen frame (1440×1024px)
- Name it "Page A – Home"
- Add all content (header, hero, footer, etc.)

**Step 2: Create Page B**
- Duplicate Page A frame (Option/Alt + drag)
- Name it "Page B – About"
- Replace content with new page content
- Keep header/footer in same position for continuity

**Step 3: Connect the pages**
- Prototype mode
- Select a button/link on Page A (e.g., "About" nav link)
- Drag connection to Page B frame
- Set interaction:
  - **Trigger:** On Click
  - **Action:** Navigate to
  - **Destination:** Page B – About
  - **Animation:** Smart Animate
  - **Duration:** 400ms
  - **Easing:** Ease In Out

**Step 4: Design the reverse transition**
- On Page B, select "Back" button or "Home" link
- Drag connection to Page A
- Use same settings but consider direction:
  - Option: Use "Move In" from left if navigating back
  - Option: Use Smart Animate for consistent feel

**Step 5: Optimize for Smart Animate**
- Ensure matching layers have **identical names**:
  - If Page A has "Header", Page B should also have "Header"
  - Smart Animate will smoothly morph matching layers
- Elements that don't match will fade in/out

#### **Recommended Values:**
- **Duration:** 400-500ms (not too fast)
- **Easing:** Ease In Out (smooth both ways)

#### **What Should Animate:**
✅ Shared elements (headers, footers) that morph  
✅ Page content that fades or slides  
✅ Background color shifts

#### **What Should NOT Animate:**
❌ Complex images (causes performance issues in handoff)  
❌ Text scaling (looks blurry mid-animation)

#### **Common Design Mistakes:**
- ❌ Transition too fast (<300ms feels jarring)
- ❌ Direction doesn't match user expectation
- ❌ Layer names don't match (causes crossfade instead of morph)
- ❌ Too many elements animating at once

---

### 6. Modal Open / Close

**Purpose:** Bring focus to a specific task by overlaying content.

#### **How to Design It in Figma:**

**Step 1: Create the base page**
- Design your main page frame (1440×1024px)
- Name it "Page – Modal Closed"

**Step 2: Add the modal closed state**
- On same frame, add a semi-transparent overlay (full-screen rectangle)
- Set fill: Black, 0% opacity (invisible when closed)
- Name layer: "Modal Backdrop"
- Add modal container (480×600px, centered)
- Set modal opacity: 0% (invisible when closed)
- Name layer: "Modal Container"

**Step 3: Create the modal open state**
- Duplicate entire frame
- Name it "Page – Modal Open"
- Select Modal Backdrop:
  - Change opacity to 50% (visible overlay)
- Select Modal Container:
  - Change opacity to 100% (visible)
  - Scale: 95% → 100% (slight scale-in effect)

**Step 4: Connect open interaction**
- Prototype mode
- On "Modal Closed" frame, select button that opens modal
- Drag connection to "Modal Open" frame
- Set interaction:
  - **Trigger:** On Click
  - **Action:** Change to
  - **Destination:** Modal Open
  - **Animation:** Smart Animate
  - **Duration:** 300ms
  - **Easing:** Ease Out

**Step 5: Connect close interaction**
- On "Modal Open" frame, select close button (X)
- Drag connection back to "Modal Closed"
- Same settings: 300ms, Ease Out
- Also connect backdrop: clicking outside closes modal

**Step 6: Add overlay dismiss (optional)**
- Select Modal Backdrop on "Modal Open" frame
- Drag connection to "Modal Closed"
- Users can click outside to dismiss

#### **Recommended Values:**
- **Open duration:** 300ms
- **Close duration:** 250ms (slightly faster)
- **Easing:** Ease Out (both directions)

#### **What Should Animate:**
✅ Backdrop opacity (0% → 50%)  
✅ Modal opacity (0% → 100%)  
✅ Modal scale (95% → 100%)  
✅ Modal Y position (optional: -20px → 0)

#### **What Should NOT Animate:**
❌ Page content behind modal  
❌ Modal corner radius  
❌ Modal width/height (should be fixed)

#### **Common Design Mistakes:**
- ❌ Modal scales from 0% (too dramatic)
- ❌ No backdrop fade (modal appears abruptly)
- ❌ Can't dismiss by clicking outside
- ❌ Animation too slow (>400ms feels laggy)

---

### 7. Drawer / Sidebar Transition

**Purpose:** Slide in navigation or settings panel from screen edge.

#### **How to Design It in Figma:**

**Step 1: Create closed state**
- Design main page frame (1440×1024px)
- Name it "Page – Drawer Closed"
- Add drawer panel (320px wide, full height)
- Position drawer **off-canvas to the left** (X = -320px)
- Name layer: "Drawer Panel"
- Add backdrop (full-screen, black, 0% opacity)

**Step 2: Create open state**
- Duplicate frame → Name "Page – Drawer Open"
- Select Drawer Panel:
  - Move X position from -320px → 0px (visible)
- Select Backdrop:
  - Change opacity from 0% → 40%

**Step 3: Connect open interaction**
- Prototype mode
- On Closed frame, select hamburger menu button
- Drag to Open frame
- Set interaction:
  - **Trigger:** On Click
  - **Action:** Change to
  - **Destination:** Drawer Open
  - **Animation:** Smart Animate
  - **Duration:** 400ms
  - **Easing:** Ease Out (cubic-bezier: 0.4, 0.0, 0.2, 1)

**Step 4: Connect close interaction**
- On Open frame, select close button in drawer
- Drag to Closed frame
- Same settings: 400ms, Ease Out
- Also add interaction to Backdrop (click outside to close)

**Step 5: Design drawer content**
- Add navigation links, settings, etc.
- Ensure content is within drawer panel layer
- Keep consistent left padding (24px)

#### **Recommended Values:**
- **Duration:** 400ms (drawers need slightly more time)
- **Easing:** Custom (0.4, 0.0, 0.2, 1) for smooth deceleration

#### **What Should Animate:**
✅ Drawer X position (-320px → 0px)  
✅ Backdrop opacity (0% → 40%)  
✅ Optional: Page content shift (create space for drawer)

#### **What Should NOT Animate:**
❌ Drawer width  
❌ Drawer height  
❌ Content inside drawer (should move with panel)

#### **Common Design Mistakes:**
- ❌ Drawer width animates (should slide, not grow)
- ❌ Content loads after drawer opens (pre-load it)
- ❌ No backdrop (users don't know page is blocked)
- ❌ Drawer slides from wrong edge (left for nav, right for settings)

---

### 8. Tab Switching

**Purpose:** Switch between related content sections without leaving page.

#### **How to Design It in Figma:**

**Step 1: Create Tab 1 active state**
- Design tab bar with 3 tabs (e.g., "Overview", "Details", "Reviews")
- Style first tab as active:
  - Border-bottom: 2px, accent color
  - Text color: darker (#1A1A1A)
- Other tabs: lighter text (#6B6B6B), no border
- Below tabs, show content for Tab 1
- Create component → Name "Tabs – Tab 1"

**Step 2: Create Tab 2 and Tab 3 variants**
- Add variant property: Active Tab = Tab 1, Tab 2, Tab 3
- In Tab 2 variant:
  - Move active indicator to Tab 2
  - Swap content area to Tab 2 content
- In Tab 3 variant:
  - Move active indicator to Tab 3
  - Swap content area to Tab 3 content

**Step 3: Design the indicator animation**
- Ensure indicator is a **separate layer** (not part of tab button)
- Name it "Active Indicator" in all variants
- Position it under correct tab in each variant
- Smart Animate will slide it smoothly

**Step 4: Connect tab interactions**
- Prototype mode
- In Tab 1 variant, select "Details" tab button
- Drag to Tab 2 variant
- Set interaction:
  - **Trigger:** On Click
  - **Action:** Change to
  - **Destination:** Tab 2 (Active Tab)
  - **Animation:** Smart Animate
  - **Duration:** 250ms
  - **Easing:** Ease Out

**Step 5: Connect all tab combinations**
- Repeat for all tabs:
  - Tab 1 → Tab 2
  - Tab 1 → Tab 3
  - Tab 2 → Tab 1
  - Tab 2 → Tab 3
  - Tab 3 → Tab 1
  - Tab 3 → Tab 2

**Step 6: Animate content swap**
- Content can either:
  - **Crossfade** (opacity 100% → 0%, overlap)
  - **Slide horizontally** (move left/right based on direction)
- For crossfade: ensure content layers have different names
- For slide: position content off-frame left/right

#### **Recommended Values:**
- **Indicator slide:** 250ms, Ease Out
- **Content fade:** 200ms, Ease In Out

#### **What Should Animate:**
✅ Active indicator position (slides horizontally)  
✅ Tab text color (subtle shift)  
✅ Content area (crossfade or slide)

#### **What Should NOT Animate:**
❌ Tab button size  
❌ Tab bar height  
❌ Border radius

#### **Common Design Mistakes:**
- ❌ Indicator jumps instead of sliding (layer names don't match)
- ❌ Content flashes (no transition)
- ❌ All tabs animate at once (only indicator and content should)
- ❌ Active state not clear enough

---

## C. Motion for Feedback — How to Design It

### 9. Loading State

**Purpose:** Show that system is processing and prevent duplicate actions.

#### **How to Design It in Figma:**

**Step 1: Create Default button state**
- Design button component (if not already created)
- Variant property: State = Default, Loading, Success

**Step 2: Design Loading variant**
- Duplicate to create Loading variant
- Modify:
  - Replace button text with "Processing..."
  - Add spinner icon (16×16px) to left of text
  - Reduce opacity of button to 60% (shows it's disabled)
  - Change cursor to not-allowed (prototype setting)

**Step 3: Create the spinner animation**
- Draw circle with gap (270° arc, not full circle)
- Or use stroke-dasharray technique
- Create 8 rotation frames:
  - Frame 1: 0° rotation
  - Frame 2: 45° rotation
  - Frame 3: 90° rotation
  - ...
  - Frame 8: 315° rotation
- Connect frames with After Delay (125ms each)
- Loop back to Frame 1 for continuous spin
- Total loop: 1 second

**Step 4: Connect button state flow**
- Default → Loading: On Click, Instant (no animation)
- Loading → Success: After Delay (2000ms), Smart Animate, 300ms
- Success → Default: After Delay (2000ms), Smart Animate, 300ms

**Step 5: Design Success state (optional)**
- Show checkmark icon
- Text: "Completed!"
- Green background or border
- Holds for 2s then returns to Default

#### **Recommended Values:**
- **Spinner speed:** 1s per rotation
- **State transition:** Instant to loading, 300ms to success
- **Success hold time:** 2000ms

#### **What Should Animate:**
✅ Spinner rotation (continuous)  
✅ Text change (Default → Processing → Completed)  
✅ Button opacity (100% → 60%)  
✅ Success icon scale-in

#### **What Should NOT Animate:**
❌ Button width (causes layout shift)  
❌ Button position  
❌ Border radius

#### **Common Design Mistakes:**
- ❌ No loading state (users click multiple times)
- ❌ Spinner too large (distracts from text)
- ❌ Loading state persists too long
- ❌ No success confirmation

---

### 10. Progress Indicator

**Purpose:** Show visual representation of completion percentage.

#### **How to Design It in Figma:**

**Step 1: Create 0% state**
- Draw progress bar container (400×8px, rounded, #E5E5E5)
- Draw progress fill (0×8px initially, rounded, #4A7C59)
- Position fill inside container, aligned left
- Add percentage text above: "0%"
- Create component → Name "Progress Bar"

**Step 2: Create intermediate states**
- Add variant property: Progress = 0%, 25%, 50%, 75%, 100%
- For each variant, adjust:
  - **Fill width:** 0px, 100px, 200px, 300px, 400px
  - **Percentage text:** "0%", "25%", "50%", "75%", "100%"

**Step 3: Connect the sequence**
- Prototype mode
- Connect: 0% → 25% → 50% → 75% → 100%
- Each transition:
  - **Trigger:** After Delay (1000ms) - simulates processing time
  - **Animation:** Smart Animate
  - **Duration:** 400ms
  - **Easing:** Ease Out

**Step 4: Add completion state**
- At 100%, change fill color from #4A7C59 → #2D5A3D (darker green)
- Add checkmark icon at right end
- Scale checkmark in (0 → 1, 300ms)

**Step 5: Optional - Add shimmer effect**
- Create gradient overlay on fill
- Animate X position from left to right
- Loop continuously during progress

#### **Recommended Values:**
- **Fill animation:** 400ms per step, Ease Out
- **Total sequence:** Based on actual process time
- **Completion hold:** 1500ms before next action

#### **What Should Animate:**
✅ Fill width (grows left to right)  
✅ Percentage text (counts up)  
✅ Optional: Fill color shift on completion  
✅ Checkmark scale-in

#### **What Should NOT Animate:**
❌ Container width  
❌ Bar height  
❌ Corner radius

#### **Common Design Mistakes:**
- ❌ Progress jumps backwards (never do this)
- ❌ Fake progress (use skeleton screens for unknown duration)
- ❌ No completion state
- ❌ Width animates in steps (should be smooth)

---

### 11. Skeleton Screens

**Purpose:** Show layout structure while content loads.

#### **How to Design It in Figma:**

**Step 1: Create skeleton layout**
- Design a frame matching your final content layout
- Replace actual content with gray rectangles:
  - Text lines: 100% width, 12px height, #E5E5E5
  - Images: Same size as final, #E5E5E5
  - Buttons: Same size, #E5E5E5
- Add spacing to match real layout
- Name frame "Content – Skeleton"

**Step 2: Add shimmer effect**
- Create gradient overlay:
  - Linear gradient: transparent → white (20% opacity) → transparent
  - Width: 200px
  - Height: Full frame height
- Position gradient off-screen to the left (X = -200px)
- Name layer "Shimmer"

**Step 3: Animate shimmer**
- Duplicate frame → Name "Content – Shimmer 1"
- Move Shimmer X position to -100px
- Duplicate again → Name "Content – Shimmer 2"
- Move Shimmer X position to 100px
- Duplicate again → Name "Content – Shimmer 3"
- Move Shimmer X position to frame width + 100px
- Connect frames: Shimmer 1 → 2 → 3 → loop back to 1
- Each transition:
  - **Animation:** Smart Animate
  - **Duration:** 1000ms
  - **Easing:** Linear
  - **Trigger:** After Delay (0ms for continuous loop)

**Step 4: Create loaded state**
- Design actual content frame: "Content – Loaded"
- Place real text, images, buttons in exact same positions
- Ensure layer names match skeleton layers

**Step 5: Connect skeleton to loaded**
- Connect Shimmer 2 → Loaded (simulates loading complete)
- Trigger: After Delay (3000ms) to simulate loading time
- Animation: Smart Animate, 400ms, Ease Out
- Matching layers will morph; non-matching will crossfade

#### **Recommended Values:**
- **Shimmer speed:** 1000ms per pass
- **Loop:** Continuous until content loads
- **Load transition:** 400ms, Ease Out

#### **What Should Animate:**
✅ Shimmer position (left to right)  
✅ Skeleton → Real content crossfade  
✅ Opacity changes

#### **What Should NOT Animate:**
❌ Layout shifting  
❌ Element sizes changing  
❌ Positions jumping

#### **Common Design Mistakes:**
- ❌ Skeleton doesn't match final layout (causes jarring shift)
- ❌ Shimmer too fast (<800ms feels frantic)
- ❌ No shimmer at all (static skeleton looks broken)
- ❌ Shows skeleton for <300ms loads (use instant load)

---

### 12. Success / Error Feedback

**Purpose:** Confirm action result with clear visual feedback.

#### **How to Design It in Figma:**

**Step 1: Create toast notification base**
- Draw rounded rectangle (360×64px, corner radius 8px)
- Set fill: White with shadow (0 4px 12px rgba(0,0,0,0.15))
- Add icon slot on left (24×24px)
- Add text slot in middle
- Add close button on right
- Position off-screen above frame (Y = -80px)
- Create component → Name "Toast"

**Step 2: Create Success variant**
- Add variant property: Type = Success, Error, Info
- In Success variant:
  - Icon: Checkmark circle, green (#4A7C59)
  - Border-left: 4px solid green
  - Text: "Successfully saved!"

**Step 3: Create Error variant**
- In Error variant:
  - Icon: X circle, red (#E53E3E)
  - Border-left: 4px solid red
  - Text: "An error occurred"

**Step 4: Create animation sequence**
- **Frame 1 – Hidden:** Y = -80px, opacity 0%
- **Frame 2 – Entering:** Y = -40px, opacity 50%
- **Frame 3 – Visible:** Y = 16px, opacity 100%
- **Frame 4 – Exiting:** Y = -40px, opacity 50%
- **Frame 5 – Hidden:** Y = -80px, opacity 0%

**Step 5: Connect the flow**
- Hidden → Entering: Smart Animate, 200ms, Ease Out
- Entering → Visible: Smart Animate, 150ms, Ease Out
- Visible → Exiting: After Delay (3000ms), Smart Animate, 150ms, Ease In
- Exiting → Hidden: Smart Animate, 200ms, Ease In

**Step 6: Add dismissal interaction**
- On Visible frame, connect close button to Hidden
- On Click, Instant (users want immediate response)

#### **Recommended Values:**
- **Slide-in:** 350ms total (200ms + 150ms)
- **Hold time:** 3000ms (user can read message)
- **Slide-out:** 350ms total
- **Easing:** Ease Out (in), Ease In (out)

#### **What Should Animate:**
✅ Y position (slides down from top)  
✅ Opacity (fades in/out)  
✅ Optional: Scale (0.95 → 1 on entry)

#### **What Should NOT Animate:**
❌ Width  
❌ Icon (should appear instantly)  
❌ Text content

#### **Common Design Mistakes:**
- ❌ Auto-dismiss too fast (<2000ms, can't read)
- ❌ No manual dismiss option
- ❌ Slides in from bottom (top is more noticeable)
- ❌ Multiple toasts stack without limit

---

## D. Scroll-Based Animations — How to Design Them in Figma

**⚠️ Important Note:**  
Figma does NOT support real scroll-based animations in prototypes. These techniques simulate scroll behavior using frame sequences and manual advancement.

For production, designers should annotate these animations for developers to implement using code (Framer Motion, GSAP, etc.).

---

### 13. Fade-In on Scroll (Simulated)

**Purpose:** Content appears as user scrolls down the page.

#### **How to Design It in Figma:**

**Step 1: Create initial page state**
- Design long-form page (1440×3000px or taller)
- Position content elements throughout
- Name frame "Page – Scroll 0%"

**Step 2: Mark scroll trigger points**
- Identify where elements should appear (e.g., 25%, 50%, 75% down)
- Add visual markers (dashed lines) to show scroll positions
- These are for designer reference only

**Step 3: Create scroll progression frames**
- Duplicate frame → Name "Page – Scroll 25%"
- In this frame, set elements above 25% mark to:
  - Opacity: 100%
  - Y position: Final position
- Elements below 25% mark:
  - Opacity: 0%
  - Y position: +20px below final
- Repeat for 50%, 75%, 100%

**Step 4: Connect frames**
- Prototype mode
- Connect: 0% → 25% → 50% → 75% → 100%
- Use key press (down arrow) to advance
- Each transition:
  - **Animation:** Smart Animate
  - **Duration:** 600ms
  - **Easing:** Ease Out

**Step 5: Annotate for development**
- Add text annotations:
  - "Fade in when element is 100px from viewport bottom"
  - "Translate Y: +20px → 0px"
  - "Duration: 600ms, Ease Out"
  - "Trigger once: true"

#### **Recommended Values:**
- **Fade duration:** 600ms
- **Y offset:** +20px to +40px
- **Easing:** Ease Out
- **Trigger margin:** -100px from viewport

#### **What Should Animate:**
✅ Opacity (0% → 100%)  
✅ Y position (+20px → 0px)  
✅ Optional: Scale (0.98 → 1)

#### **What Should NOT Animate:**
❌ X position (horizontal shift feels random)  
❌ Rotation  
❌ Size changes

#### **Design Notes:**
- In Figma: Use arrow keys to simulate scroll
- For developers: Annotate with scroll trigger positions
- Mark elements with "Fade on scroll" label

---

### 14. Staggered Card Reveals (Simulated)

**Purpose:** Grid items appear sequentially with delays.

#### **How to Design It in Figma:**

**Step 1: Design card grid**
- Create 3×3 grid of cards (9 total)
- Name frame "Grid – Hidden"
- Set all cards to:
  - Opacity: 0%
  - Scale: 95%
  - Y position: +12px

**Step 2: Create reveal sequence**
- Duplicate frame → Name "Grid – Card 1"
- Set Card 1 to: Opacity 100%, Scale 100%, Y +0px
- Duplicate → Name "Grid – Card 2"
- Also set Card 2 to visible
- Continue through all 9 cards

**Step 3: Connect the sequence**
- Connect Hidden → Card 1 → Card 2 → ... → Card 9
- Each transition:
  - **Trigger:** After Delay (100ms)
  - **Animation:** Smart Animate
  - **Duration:** 300ms
  - **Easing:** Ease Out
- Total sequence: 9 × 100ms = 900ms stagger

**Step 4: Create component variant method (alternative)**
- Create Card component with variants: Hidden, Visible
- In Hidden: opacity 0%, scale 95%
- In Visible: opacity 100%, scale 100%
- Place 9 instances on page
- Manually show stagger in presentation (click each)

**Step 5: Annotate for development**
- Add note: "Cards reveal on scroll into view"
- "Stagger delay: 100ms between each"
- "Animation: opacity 0→1, scale 0.95→1, translateY +12→0"
- "Once: true (don't re-trigger on scroll up)"

#### **Recommended Values:**
- **Per-card duration:** 300ms
- **Stagger delay:** 100-150ms
- **Max delay cap:** 800ms (don't delay card 20 by 2000ms)

#### **What Should Animate:**
✅ Opacity (0% → 100%)  
✅ Scale (95% → 100%)  
✅ Y position (+12px → 0px)

#### **What Should NOT Animate:**
❌ Card width/height  
❌ Grid layout shifting  
❌ Images inside cards (load separately)

#### **Design Notes:**
- In Figma: Show sequence with After Delay
- For developers: Annotate with CSS class or data attribute
- Provide stagger formula: delay = index × 100ms

---

### 15. Sticky Section (Conceptual)

**Purpose:** Keep section header visible while scrolling through content.

#### **How to Design It in Figma (Annotation Method):**

**Step 1: Design the page with sections**
- Create long page (1440×3000px)
- Add multiple sections with headers
- Name frame "Page – Sticky Demo"

**Step 2: Identify sticky element**
- Select the section header you want to stick
- Add visual marker (colored border or highlight)
- Label it: "STICKY: stays at top when scrolling"

**Step 3: Create scroll states (visual only)**
- Duplicate frame → Name "Page – Scrolled 500px"
- Manually position sticky header at top (Y = 0)
- Move content underneath it upward
- Shows what it looks like when sticky is active

**Step 4: Add elevation on stick**
- In "Scrolled" state, add shadow to sticky header:
  - Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Shows it's elevated above content

**Step 5: Annotate for development**
- Add sticky note annotation:
  - "Element: Section Header"
  - "CSS: position: sticky; top: 0px;"
  - "Add shadow when scrollY > 100px"
  - "Z-index: 100"

#### **Design Notes:**
- Figma cannot prototype real sticky behavior
- Show before/after states
- Provide CSS specifications
- Designers should test in browser/code prototype

#### **Common Design Mistakes:**
- ❌ Sticky element too tall (takes up screen on mobile)
- ❌ No visual change when sticking (users don't notice)
- ❌ Multiple sticky elements competing for space
- ❌ No z-index annotation (overlaps content incorrectly)

---

## E. Advanced Motion — How to Design It

### 16. Timeline-Based Sequences

**Purpose:** Choreograph multiple elements with precise timing.

#### **How to Design It in Figma:**

**Step 1: Plan the sequence**
- Write out timeline on paper or in FigJam:
  ```
  0.0s: Logo fade-in
  0.3s: Headline slide-in
  0.8s: Subhead fade-in
  1.2s: CTA button scale-in
  1.5s: Background color shift
  ```

**Step 2: Create Frame 1 – Initial state**
- All elements at starting positions:
  - Logo: opacity 0%, scale 80%
  - Headline: opacity 0%, Y +40px
  - Subhead: opacity 0%
  - CTA: opacity 0%, scale 90%
  - Background: #FDFDFB
- Name frame "Sequence – 0.0s"

**Step 3: Create Frame 2 – Logo appears (0.3s)**
- Duplicate frame → Name "Sequence – 0.3s"
- Logo: opacity 100%, scale 100%
- All other elements: unchanged

**Step 4: Create Frame 3 – Headline appears (0.8s)**
- Duplicate → Name "Sequence – 0.8s"
- Logo: remains visible
- Headline: opacity 100%, Y 0px
- Others: unchanged

**Step 5: Continue for each beat**
- Frame 4 (1.2s): Add subhead
- Frame 5 (1.5s): Add CTA
- Frame 6 (2.0s): Shift background color
- Final frame: All elements visible and interactive

**Step 6: Connect the sequence**
- Prototype mode
- Connect frames in order
- Set transitions:
  - 0.0s → 0.3s: After Delay (300ms), Smart Animate, 400ms, Ease Out
  - 0.3s → 0.8s: After Delay (500ms), Smart Animate, 400ms, Ease Out
  - Continue pattern...

**Step 7: Make final frame interactive**
- On last frame, add button interactions
- Don't replay sequence when user clicks around

#### **Recommended Values:**
- **Individual animations:** 300-600ms each
- **Delays between:** 200-500ms
- **Total sequence:** 1.5-3 seconds max
- **Easing:** Ease Out for most, Ease In Out for color shifts

#### **What Should Animate:**
✅ Opacity (fades)  
✅ Position (slides)  
✅ Scale (grows in)  
✅ Color (background shifts)  
✅ Each property on separate timeline beat

#### **What Should NOT Animate:**
❌ Everything at once (no clear focus)  
❌ Properties that weren't planned  
❌ Elements after user starts interacting

#### **Common Design Mistakes:**
- ❌ Sequence too long (>4 seconds)
- ❌ Can't skip or interrupt
- ❌ Replays on every page visit
- ❌ No clear reading order

---

### 17. Animated Diagrams

**Purpose:** Explain systems or processes with progressive reveal.

#### **How to Design It in Figma:**

**Step 1: Design final diagram state**
- Create complete diagram (e.g., hub-and-spoke)
- Central hub: circle, 256×256px
- 4 spoke cards: rectangles around hub
- Connector lines: from hub to each card
- Name frame "Diagram – Complete"

**Step 2: Break into stages**
- Stage 1: Hub appears
- Stage 2: Connector lines draw
- Stage 3: Spoke cards appear
- Each stage should tell part of the story

**Step 3: Create Stage 1 frame**
- Name "Diagram – Stage 1"
- Show only central hub
- Hub: opacity 100%, scale 100%
- Connectors: opacity 0% (or use stroke-dashoffset)
- Cards: opacity 0%, scale 90%

**Step 4: Create Stage 2 frame**
- Name "Diagram – Stage 2"
- Hub: remains visible
- Connectors: opacity 100% (lines "draw in")
- For line drawing effect:
  - Create 4 connector frames showing progressive draw
  - Line 1: 0% → 25% → 50% → 75% → 100% length
- Cards: still hidden

**Step 5: Create Stage 3 frame**
- Name "Diagram – Stage 3"
- Hub: visible
- Connectors: fully visible
- Cards: opacity 100%, scale 100% (staggered)

**Step 6: Connect the stages**
- Stage 1 → Stage 2: After Delay (800ms), Smart Animate, 600ms
- Stage 2 → Stage 3: After Delay (500ms), Smart Animate, 400ms
- For line drawing, use multiple intermediate frames

**Step 7: Add labels last**
- Create Stage 4 with labels/annotations
- Labels fade in after diagram is complete

#### **Recommended Values:**
- **Hub appearance:** 600ms, Ease Out, scale 0.95→1
- **Line drawing:** 800ms per line, Linear easing
- **Card reveals:** 400ms each, stagger 120ms
- **Total sequence:** 2-3 seconds

#### **What Should Animate:**
✅ Hub scale and fade  
✅ Connector line length (stroke-dashoffset)  
✅ Card opacity and scale  
✅ Labels fade-in at end

#### **What Should NOT Animate:**
❌ Diagram layout shifting  
❌ Element sizes changing mid-animation  
❌ Text scaling (looks blurry)

#### **Line Drawing Technique:**
- Use stroke-dasharray and stroke-dashoffset
- Or create multiple line segments showing progressive reveal
- Animate path length from 0% to 100%

---

### 18. State-Driven UI Motion

**Purpose:** Animate UI based on data or app state changes.

#### **How to Design It in Figma:**

**Step 1: Identify states**
- Example: Dashboard notification badge
- States: Empty, New (1), New (5+), Viewed
- Each state has different visual and animation

**Step 2: Create component variants**
- Create Notification Badge component
- Add variant property: State = Empty, New, NewMultiple, Viewed
- Design each variant:
  - **Empty:** No badge visible
  - **New:** Red dot, number "1"
  - **NewMultiple:** Red dot, number "5+"
  - **Viewed:** Gray dot, no number

**Step 3: Design state transitions**
- Empty → New: Badge scales in (0 → 1.2 → 1)
- New → NewMultiple: Number counts up, badge pulses
- NewMultiple → Viewed: Color shifts red → gray
- Viewed → Empty: Badge scales out (1 → 0)

**Step 4: Create animation frames**
- For Empty → New transition:
  - Frame 1: scale 0, opacity 0
  - Frame 2: scale 1.2, opacity 100
  - Frame 3: scale 1, opacity 100
- Connect with Smart Animate, 300ms total

**Step 5: Add pulse effect for New state**
- Create pulse loop (while in New state):
  - Frame A: scale 1
  - Frame B: scale 1.1
  - Frame C: scale 1
- Connect: A → B → C → A (loop)
- Each step: 400ms, Ease In Out

**Step 6: Connect all state flows**
- Map out every possible state transition
- Some transitions are instant (no animation)
- Others are animated (user needs to notice)
- Add After Delay triggers for auto-transitions

#### **Recommended Values:**
- **Badge appear:** 300ms, Ease Out, scale 0→1.2→1
- **Pulse:** 400ms per beat, continuous loop
- **Color shift:** 250ms, Ease In Out
- **Badge dismiss:** 200ms, Ease In, scale 1→0

#### **What Should Animate:**
✅ Badge scale (entrance/exit)  
✅ Badge color (state changes)  
✅ Number count (incremental)  
✅ Pulse effect (attention-grabbing)

#### **What Should NOT Animate:**
❌ Badge shape  
❌ Position (should stay anchored)  
❌ Font (number should not resize)

#### **Common Design Mistakes:**
- ❌ Animates on every data update (too distracting)
- ❌ Pulse never stops (becomes annoying)
- ❌ State change instant (users miss it)
- ❌ No clear visual difference between states

#### **Design Pattern:**
```
Idle → Data Change → Animation → New Idle State
```

- Only animate on meaningful changes
- Return to calm idle state after animation
- Don't loop indefinitely (except loading)

---

## 🎯 Final Notes for Designers

### **Reusing Patterns**

✅ **Create a motion library:**
- Save common animations as components
- Document timing values in a single source
- Reuse button hovers, modal opens, etc. across designs

✅ **Component-based motion:**
- Build animations into component variants
- Designers can drop in pre-animated components
- Ensures consistency across pages

✅ **Motion tokens:**
- Define standard durations: Fast (200ms), Medium (400ms), Slow (600ms)
- Define easing curves: Ease Out, Ease In Out, Custom
- Reference these in all animations

---

### **Consistency Matters More Than Creativity**

✅ **Same interaction = Same animation:**
- All buttons should have identical hover behavior
- All modals should open the same way
- All toasts should appear from the same position

✅ **Establish rules, then follow them:**
- "Destructive actions shake, then require confirmation"
- "Success states always show green checkmark for 2s"
- "Page transitions always take 400ms"

❌ **Don't:**
- Make each button hover unique
- Use random durations (237ms, 512ms, etc.)
- Animate for the sake of animating

---

### **Handoff to Developers**

When sharing Figma prototypes:

1. **Add annotations:**
   - Specify exact timing (ms)
   - Note easing curves (bezier values if custom)
   - Call out what properties animate

2. **Provide motion specs doc:**
   - List all animation types used
   - Include duration/easing table
   - Note browser/framework considerations

3. **Demo the prototype:**
   - Walk through animations live
   - Explain intent and feel
   - Clarify edge cases

4. **Accept limitations:**
   - Some Figma animations can't be perfectly replicated
   - Scroll-based motion needs code implementation
   - Performance differs in production

---

### **Testing Animations**

Before finalizing:

✅ **Play the prototype at normal speed**
- Does it feel too slow? Too fast?
- Is there a clear focal point?
- Can you read all text during animations?

✅ **Test on mobile viewport**
- Resize frame to 375px width
- Do animations still make sense?
- Are touch targets still accessible during motion?

✅ **Check accessibility**
- Could this cause motion sickness? (parallax, rapid movement)
- Is there reduced motion alternative?
- Can keyboard users navigate during animations?

✅ **Get feedback**
- Show to team members unfamiliar with design
- Watch their reactions (confusion = simplify)
- Ask: "Did you notice the animation?" (Goal: barely noticed)

---

## 📚 Quick Reference Chart

| Animation Type | Duration | Easing | Use When |
|---------------|----------|---------|----------|
| Hover | 200-300ms | Ease Out | Interactive elements |
| Button Press | 100ms | Ease In | Click feedback |
| Toggle | 250ms | Ease Out | Binary state changes |
| Modal Open | 300ms | Ease Out | Overlaying content |
| Page Transition | 400ms | Ease In Out | Navigating routes |
| Loading Spinner | 1000ms/loop | Linear | Processing actions |
| Toast Slide-In | 350ms | Ease Out | Notifications |
| Fade on Scroll | 600ms | Ease Out | Revealing content |
| Stagger Delay | 100-150ms | — | Sequential reveals |
| Success Confirmation | 300ms | Ease Out | Action completed |

---

**End of Document**

For questions, create a motion design spec or consult your development team for implementation feasibility.

Remember: **The best animation is the one users don't consciously notice.**
