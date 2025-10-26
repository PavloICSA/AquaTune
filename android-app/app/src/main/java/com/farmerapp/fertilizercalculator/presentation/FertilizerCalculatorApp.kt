package com.farmerapp.fertilizercalculator.presentation

import androidx.compose.runtime.Composable
import androidx.hilt.navigation.compose.hiltViewModel
import com.farmerapp.fertilizercalculator.data.localization.LocalizationManager
import com.farmerapp.fertilizercalculator.presentation.navigation.AppNavigation
import javax.inject.Inject

@Composable
fun FertilizerCalculatorApp(
    localizationManager: LocalizationManager
) {
    AppNavigation(localizationManager)
}