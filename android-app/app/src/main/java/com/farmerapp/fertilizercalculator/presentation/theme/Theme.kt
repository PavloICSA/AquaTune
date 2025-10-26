package com.farmerapp.fertilizercalculator.presentation.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

// Agricultural-themed colors
private val md_theme_light_primary = Color(0xFF2E7D32) // Forest Green
private val md_theme_light_onPrimary = Color(0xFFFFFFFF)
private val md_theme_light_primaryContainer = Color(0xFFA5D6A7) // Light Green
private val md_theme_light_onPrimaryContainer = Color(0xFF1B5E20)
private val md_theme_light_secondary = Color(0xFF8BC34A) // Light Green
private val md_theme_light_onSecondary = Color(0xFFFFFFFF)
private val md_theme_light_secondaryContainer = Color(0xFFDCEDC8)
private val md_theme_light_onSecondaryContainer = Color(0xFF33691E)
private val md_theme_light_tertiary = Color(0xFF795548) // Brown
private val md_theme_light_onTertiary = Color(0xFFFFFFFF)
private val md_theme_light_tertiaryContainer = Color(0xFFD7CCC8)
private val md_theme_light_onTertiaryContainer = Color(0xFF3E2723)
private val md_theme_light_error = Color(0xFFD32F2F)
private val md_theme_light_errorContainer = Color(0xFFFFCDD2)
private val md_theme_light_onError = Color(0xFFFFFFFF)
private val md_theme_light_onErrorContainer = Color(0xFFB71C1C)
private val md_theme_light_background = Color(0xFFF1F8E9)
private val md_theme_light_onBackground = Color(0xFF1B1B1F)
private val md_theme_light_surface = Color(0xFFFFFFFF)
private val md_theme_light_onSurface = Color(0xFF1B1B1F)

private val md_theme_dark_primary = Color(0xFF81C784) // Light Green
private val md_theme_dark_onPrimary = Color(0xFF1B5E20)
private val md_theme_dark_primaryContainer = Color(0xFF2E7D32)
private val md_theme_dark_onPrimaryContainer = Color(0xFFA5D6A7)
private val md_theme_dark_secondary = Color(0xFFAED581)
private val md_theme_dark_onSecondary = Color(0xFF33691E)
private val md_theme_dark_secondaryContainer = Color(0xFF558B2F)
private val md_theme_dark_onSecondaryContainer = Color(0xFFDCEDC8)
private val md_theme_dark_tertiary = Color(0xFFA1887F)
private val md_theme_dark_onTertiary = Color(0xFF3E2723)
private val md_theme_dark_tertiaryContainer = Color(0xFF5D4037)
private val md_theme_dark_onTertiaryContainer = Color(0xFFD7CCC8)
private val md_theme_dark_error = Color(0xFFEF5350)
private val md_theme_dark_errorContainer = Color(0xFFD32F2F)
private val md_theme_dark_onError = Color(0xFFB71C1C)
private val md_theme_dark_onErrorContainer = Color(0xFFFFCDD2)
private val md_theme_dark_background = Color(0xFF1B1B1F)
private val md_theme_dark_onBackground = Color(0xFFE3E2E6)
private val md_theme_dark_surface = Color(0xFF1B1B1F)
private val md_theme_dark_onSurface = Color(0xFFE3E2E6)

private val LightColors = lightColorScheme(
    primary = md_theme_light_primary,
    onPrimary = md_theme_light_onPrimary,
    primaryContainer = md_theme_light_primaryContainer,
    onPrimaryContainer = md_theme_light_onPrimaryContainer,
    secondary = md_theme_light_secondary,
    onSecondary = md_theme_light_onSecondary,
    secondaryContainer = md_theme_light_secondaryContainer,
    onSecondaryContainer = md_theme_light_onSecondaryContainer,
    tertiary = md_theme_light_tertiary,
    onTertiary = md_theme_light_onTertiary,
    tertiaryContainer = md_theme_light_tertiaryContainer,
    onTertiaryContainer = md_theme_light_onTertiaryContainer,
    error = md_theme_light_error,
    errorContainer = md_theme_light_errorContainer,
    onError = md_theme_light_onError,
    onErrorContainer = md_theme_light_onErrorContainer,
    background = md_theme_light_background,
    onBackground = md_theme_light_onBackground,
    surface = md_theme_light_surface,
    onSurface = md_theme_light_onSurface,
)

private val DarkColors = darkColorScheme(
    primary = md_theme_dark_primary,
    onPrimary = md_theme_dark_onPrimary,
    primaryContainer = md_theme_dark_primaryContainer,
    onPrimaryContainer = md_theme_dark_onPrimaryContainer,
    secondary = md_theme_dark_secondary,
    onSecondary = md_theme_dark_onSecondary,
    secondaryContainer = md_theme_dark_secondaryContainer,
    onSecondaryContainer = md_theme_dark_onSecondaryContainer,
    tertiary = md_theme_dark_tertiary,
    onTertiary = md_theme_dark_onTertiary,
    tertiaryContainer = md_theme_dark_tertiaryContainer,
    onTertiaryContainer = md_theme_dark_onTertiaryContainer,
    error = md_theme_dark_error,
    errorContainer = md_theme_dark_errorContainer,
    onError = md_theme_dark_onError,
    onErrorContainer = md_theme_dark_onErrorContainer,
    background = md_theme_dark_background,
    onBackground = md_theme_dark_onBackground,
    surface = md_theme_dark_surface,
    onSurface = md_theme_dark_onSurface,
)

@Composable
fun FertilizerCalculatorTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }

        darkTheme -> DarkColors
        else -> LightColors
    }
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}