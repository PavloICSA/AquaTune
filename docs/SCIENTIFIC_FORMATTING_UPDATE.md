# Scientific Formatting Improvements

## Overview
Updated the Scientific Reasoning section to display chemical formulas and scientific notation in a more user-friendly format.

## Changes Made

### 1. Chemical Formula Formatting
- **Before**: `Ka1=4.47e-7, Ka2=4.67e-11, Kw=1e-14`
- **After**: `K₁ = 4.47 × 10⁻⁷, K₂ = 4.67 × 10⁻¹¹, Kw = 1.00 × 10⁻¹⁴`

### 2. Subscript and Superscript Support
- Added proper HTML rendering for chemical formulas
- `K₁`, `K₂` → K<sub>1</sub>, K<sub>2</sub>
- `H⁺` → H<sup>+</sup>
- `CaCO₃` → CaCO<sub>3</sub>
- Scientific notation: `10⁻⁷` → 10<sup>-7</sup>

### 3. User-Friendly Number Formatting
- Replaced scientific e-notation with proper mathematical notation
- Numbers ≥ 1: displayed with 4 decimal places
- Numbers ≥ 0.001: displayed with 6 decimal places  
- Smaller numbers: converted to readable format like `4.47 × 10⁻⁷`

### 4. Implementation Details
- Modified `generateScientificReasoning()` method in `phCalculationEngine.ts`
- Updated `CalculationResultCard.tsx` to render HTML with proper subscripts/superscripts
- Used `dangerouslySetInnerHTML` with regex replacements for chemical formula formatting

## Example Output
```
Scientific basis: carbonate system buffering and alkalinity neutralization.
K₁ = 4.47 × 10⁻⁷, K₂ = 4.67 × 10⁻¹¹, Kw = 1.00 × 10⁻¹⁴ (25°C).
Initial pH = 7, Target pH = 5.8, Alkalinity = 150 mg/L as CaCO₃ (~3.000 × 10⁻³ mol/L charge).
Required H⁺: 2.1944 mol for 1000 L.
Selected: Ammonium Sulfate, moles used: 1.0972 mol.
```

## Benefits
- More professional and readable scientific presentation
- Proper chemical notation standards
- Better user experience for technical users
- Maintains scientific accuracy while improving readability