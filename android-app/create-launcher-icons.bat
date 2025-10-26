@echo off
echo ========================================
echo   Creating Basic Launcher Icons
echo ========================================
echo.

echo Creating basic launcher icons...
echo This creates simple colored squares as placeholders.
echo.

REM Create a simple PowerShell script to generate basic icons
powershell -Command "
Add-Type -AssemblyName System.Drawing

# Function to create a simple colored icon
function Create-Icon($size, $path, $color) {
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Fill with background color (green for agriculture theme)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(46, 125, 50))
    $graphics.FillRectangle($brush, 0, 0, $size, $size)
    
    # Add a simple 'A' for AquaTune
    $font = New-Object System.Drawing.Font('Arial', ($size * 0.4), [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    
    $rect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
    $graphics.DrawString('A', $font, $textBrush, $rect, $format)
    
    # Save as PNG
    $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $graphics.Dispose()
    $bitmap.Dispose()
    $brush.Dispose()
    $textBrush.Dispose()
    $font.Dispose()
}

# Create icons for different densities
Create-Icon 48 'app\src\main\res\mipmap-mdpi\ic_launcher.png' 'green'
Create-Icon 72 'app\src\main\res\mipmap-hdpi\ic_launcher.png' 'green'
Create-Icon 96 'app\src\main\res\mipmap-xhdpi\ic_launcher.png' 'green'
Create-Icon 144 'app\src\main\res\mipmap-xxhdpi\ic_launcher.png' 'green'
Create-Icon 192 'app\src\main\res\mipmap-xxxhdpi\ic_launcher.png' 'green'

# Create round icons (same as regular for simplicity)
Copy-Item 'app\src\main\res\mipmap-mdpi\ic_launcher.png' 'app\src\main\res\mipmap-mdpi\ic_launcher_round.png'
Copy-Item 'app\src\main\res\mipmap-hdpi\ic_launcher.png' 'app\src\main\res\mipmap-hdpi\ic_launcher_round.png'
Copy-Item 'app\src\main\res\mipmap-xhdpi\ic_launcher.png' 'app\src\main\res\mipmap-xhdpi\ic_launcher_round.png'
Copy-Item 'app\src\main\res\mipmap-xxhdpi\ic_launcher.png' 'app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png'
Copy-Item 'app\src\main\res\mipmap-xxxhdpi\ic_launcher.png' 'app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png'

Write-Host 'Icons created successfully!'
"

echo.
echo ✓ Launcher icons created!
echo.
pause