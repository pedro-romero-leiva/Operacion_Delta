# **App Name**: Delta Unlocked

## Core Features:

- Mission Display: Display each mission's content (text, tables, instructions) from the Markdown, one at a time, in a clear and structured format. Only the current mission is visible, and subsequent missions are locked until the correct code is entered.
- Password Validation: Validate the user-entered password for each mission against the correct code (case-insensitive). Unlock the next mission upon successful validation.
- Progress Saving: Persistently store user input within each mission using localStorage.
- Instructor Panel: Securely reveal access to the instructor panel using the master password. Display codes, answers and errors upon validation.
- Animated Slope Visualization: Generate an animation illustrating the calculation of slope in Mission 1. The animation shows the delta h and delta t. Does not implement any tool-assisted decision making
- Average Visualization: Display a zigzag function, and animate the display of secant lines and their averages.
- Secant-Tangent Transformation: Show the h(t) curve, with secant transforming into the tangent, while using a slider

## Style Guidelines:

- Primary color: Gold (#B8860B) to evoke sophistication and a sense of unlocking something valuable.  Background color: Dark navy blue (#0D1B4B), desaturated and dark, for an 'espionage terminal' aesthetic. Accent color: Forest green (#1B5E20) to add a touch of contrast, referencing GeoGebra, and symbolizing growth and discovery.
- Headline font: 'Space Grotesk', a sans-serif with a modern and slightly technical feel, well-suited to a title and interface font. Body and interface font: 'Inter' will work well paired with Space Grotesk. Code, command and formula font: Use 'Source Code Pro' for displaying code snippets, formulas, and GeoGebra commands.
- Implement a top progress bar to visualize the agent's progress.
- When a checkpoint is unlocked, show animation.
- Incorporate subtle security-themed icons (padlocks, keys, etc.)