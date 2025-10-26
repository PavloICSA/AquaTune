Add-Type -AssemblyName System.Drawing

function Create-Icon {
    param($size, $path)
    
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Fill with green background
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(46, 125, 50))
    $graphics.FillRectangle($brush, 0, 0, $size, $size)
    
    # Add letter 'F' for Fertilizer
    $fontSize = [math]::Floor($size * 0.4)
    $font = New-Object System.Drawing.Font('Arial', $fontSize, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    
    $rect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
    $graphics.DrawString('F', $font, $textBrush, $rect, $format)
    
    # Save as PNG
    $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Cleanup
    $graphics.Dispose()
    $bitmap.Dispose()
    $brush.Dispose()
    $textBrush.Dispose()
    $font.Dispose()
    $format.Dispose()
}

# Create icons for different densities
Create-Icon 48 'app\src\main\res\mipmap-mdpi\ic_launcher.png'
Create-Icon 72 'app\src\main\res\mipmap-hdpi\ic_launcher.png'
Create-Icon 96 'app\src\main\res\mipmap-xhdpi\ic_launcher.png'
Create-Icon 144 'app\src\main\res\mipmap-xxhdpi\ic_launcher.png'
Create-Icon 192 'app\src\main\res\mipmap-xxxhdpi\ic_launcher.png'

# Create round icons (copy regular icons)
Copy-Item 'app\src\main\res\mipmap-mdpi\ic_launcher.png' 'app\src\main\res\mipmap-mdpi\ic_launcher_round.png'
Copy-Item 'app\src\main\res\mipmap-hdpi\ic_launcher.png' 'app\src\main\res\mipmap-hdpi\ic_launcher_round.png'
Copy-Item 'app\src\main\res\mipmap-xhdpi\ic_launcher.png' 'app\src\main\res\mipmap-xhdpi\ic_launcher_round.png'
Copy-Item 'app\src\main\res\mipmap-xxhdpi\ic_launcher.png' 'app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png'
Copy-Item 'app\src\main\res\mipmap-xxxhdpi\ic_launcher.png' 'app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png'

Write-Host "Icons created successfully!"