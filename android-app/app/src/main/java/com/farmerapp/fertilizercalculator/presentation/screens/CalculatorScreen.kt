package com.farmerapp.fertilizercalculator.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.farmerapp.fertilizercalculator.data.localization.useTranslation
import com.farmerapp.fertilizercalculator.data.localization.Translations
import com.farmerapp.fertilizercalculator.data.localization.LocalizationManager
import com.farmerapp.fertilizercalculator.data.model.*
import com.farmerapp.fertilizercalculator.presentation.MainViewModel
import com.farmerapp.fertilizercalculator.domain.LocalizedCalculationUtils

@Composable
fun CalculatorScreen(
    localizationManager: LocalizationManager,
    viewModel: MainViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val translations = useTranslation(localizationManager)
    
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Required Inputs
        item {
            RequiredInputsCard(
                uiState = uiState,
                translations = translations,
                onVolumeChange = viewModel::updateVolume,
                onPHInitChange = viewModel::updatePHInit,
                onPHTargetChange = viewModel::updatePHTarget,
                onAlkalinityChange = viewModel::updateAlkalinity,
                onToggleExpertMode = viewModel::toggleExpertMode
            )
        }
        
        // Effect Timing Selection
        item {
            EffectTimingCard(
                selectedTiming = uiState.requiredEffectTiming,
                translations = translations,
                onTimingChange = viewModel::updateEffectTiming
            )
        }
        
        // Expert Mode Options
        if (uiState.showExpertMode) {
            item {
                ExpertModeCard(
                    uiState = uiState,
                    translations = translations,
                    onTemperatureChange = viewModel::updateTemperature,
                    onFertilizerPurityChange = viewModel::updateFertilizerPurity
                )
            }
        }
        
        // Available Fertilizers
        item {
            AvailableFertilizersCard(
                availableFertilizers = uiState.availableFertilizers,
                translations = translations,
                onFertilizerAvailabilityChange = viewModel::updateFertilizerAvailability
            )
        }
        
        // Calculate Button with Clear Results Button
        item {
            CalculateButtonRow(
                isCalculating = uiState.isCalculating,
                hasResults = uiState.calculationResult != null,
                translations = translations,
                onCalculate = viewModel::calculateFertilizers,
                onClear = viewModel::clearResults
            )
        }
        
        // Results
        uiState.calculationResult?.let { result ->
            item {
                CalculationResultCard(
                    result = result,
                    translations = translations
                )
            }
        }
    }
}

@Composable
private fun RequiredInputsCard(
    uiState: FertilizerCalculatorState,
    translations: Translations,
    onVolumeChange: (String) -> Unit,
    onPHInitChange: (String) -> Unit,
    onPHTargetChange: (String) -> Unit,
    onAlkalinityChange: (String) -> Unit,
    onToggleExpertMode: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f)
        ),
        border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.primary)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "* ${translations.requiredParameters}",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                IconButton(onClick = onToggleExpertMode) {
                    Icon(
                        Icons.Default.Settings,
                        contentDescription = translations.expertMode,
                        tint = MaterialTheme.colorScheme.primary
                    )
                }
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = if (uiState.volumeL == 0.0) "" else uiState.volumeL.toString(),
                    onValueChange = onVolumeChange,
                    label = { Text("${translations.volumeL} *") },
                    placeholder = { Text(translations.volumePlaceholder) },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    modifier = Modifier.weight(1f)
                )
                
                OutlinedTextField(
                    value = if (uiState.pHInit == 0.0) "" else uiState.pHInit.toString(),
                    onValueChange = onPHInitChange,
                    label = { Text("${translations.initialPH} *") },
                    placeholder = { Text(translations.initialPHPlaceholder) },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    modifier = Modifier.weight(1f)
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    OutlinedTextField(
                        value = if (uiState.pHTarget == 0.0) "" else uiState.pHTarget.toString(),
                        onValueChange = onPHTargetChange,
                        label = { Text("${translations.targetPH} *") },
                        placeholder = { Text(translations.targetPHPlaceholder) },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                        modifier = Modifier.fillMaxWidth()
                    )
                    Text(
                        text = translations.recommended,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                
                Column(modifier = Modifier.weight(1f)) {
                    OutlinedTextField(
                        value = if (uiState.alkalinityMgLAsCaCO3 == 0.0) "" else uiState.alkalinityMgLAsCaCO3.toString(),
                        onValueChange = onAlkalinityChange,
                        label = { Text("${translations.alkalinity} *") },
                        placeholder = { Text(translations.alkalinityPlaceholder) },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                        modifier = Modifier.fillMaxWidth()
                    )
                    Text(
                        text = translations.alkalinityUnit,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
private fun EffectTimingCard(
    selectedTiming: EffectTiming,
    translations: Translations,
    onTimingChange: (EffectTiming) -> Unit
) {
    InputCard(
        title = translations.effectTiming,
        subtitle = translations.whenNeeded
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            EffectTiming.values().forEach { timing ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .selectable(
                            selected = selectedTiming == timing,
                            onClick = { onTimingChange(timing) }
                        )
                        .padding(8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    RadioButton(
                        selected = selectedTiming == timing,
                        onClick = { onTimingChange(timing) }
                    )
                    Column {
                        Text(
                            text = when (timing) {
                                EffectTiming.IMMEDIATE -> translations.immediate
                                EffectTiming.WITHIN_24H -> translations.within24h
                                EffectTiming.NO_RUSH -> translations.noRush
                            },
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.Medium
                        )
                        Text(
                            text = when (timing) {
                                EffectTiming.IMMEDIATE -> translations.immediateDesc
                                EffectTiming.WITHIN_24H -> translations.within24hDesc
                                EffectTiming.NO_RUSH -> translations.noRushDesc
                            },
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun ExpertModeCard(
    uiState: FertilizerCalculatorState,
    translations: Translations,
    onTemperatureChange: (String) -> Unit,
    onFertilizerPurityChange: (String) -> Unit
) {
    InputCard(
        title = translations.additionalParameters,
        subtitle = translations.optionalParameters
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            OutlinedTextField(
                value = if (uiState.temperatureC == 0.0) "" else uiState.temperatureC.toString(),
                onValueChange = onTemperatureChange,
                label = { Text(translations.temperature) },
                placeholder = { Text(translations.temperaturePlaceholder) },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.weight(1f)
            )
            
            OutlinedTextField(
                value = if (uiState.fertilizerPurity == 0.0) "" else uiState.fertilizerPurity.toString(),
                onValueChange = onFertilizerPurityChange,
                label = { Text(translations.fertilizerPurity) },
                placeholder = { Text(translations.fertilizerPurityPlaceholder) },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.weight(1f)
            )
        }
    }
}

@Composable
private fun AvailableFertilizersCard(
    availableFertilizers: List<FertilizerAvailability>,
    translations: Translations,
    onFertilizerAvailabilityChange: (String, String, Boolean) -> Unit
) {
    InputCard(
        title = translations.availableFertilizers,
        subtitle = translations.selectFertilizers
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            availableFertilizers.forEach { availability ->
                FertilizerAvailabilityItem(
                    availability = availability,
                    translations = translations,
                    onSelectionChange = { isSelected ->
                        onFertilizerAvailabilityChange(
                            availability.fertilizer.id,
                            availability.availableAmountKg.toString(),
                            isSelected
                        )
                    },
                    onAmountChange = { amount ->
                        onFertilizerAvailabilityChange(
                            availability.fertilizer.id,
                            amount,
                            availability.isSelected
                        )
                    }
                )
            }
        }
    }
}

@Composable
private fun CalculateButtonRow(
    isCalculating: Boolean,
    hasResults: Boolean,
    translations: Translations,
    onCalculate: () -> Unit,
    onClear: () -> Unit
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Button(
            onClick = onCalculate,
            enabled = !isCalculating,
            modifier = Modifier.fillMaxWidth()
        ) {
            if (isCalculating) {
                CircularProgressIndicator(
                    modifier = Modifier.size(16.dp),
                    strokeWidth = 2.dp
                )
            } else {
                Icon(Icons.Default.PlayArrow, contentDescription = null)
            }
            Spacer(modifier = Modifier.width(8.dp))
            Text(if (isCalculating) translations.calculating else translations.calculate)
        }
        
        // Clear Results Button - only show after calculation, positioned below Calculate button
        if (hasResults) {
            Button(
                onClick = onClear,
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.secondary,
                    contentColor = MaterialTheme.colorScheme.onSecondary
                )
            ) {
                Icon(Icons.Default.Clear, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text(translations.clear)
            }
        }
    }
}

@Composable
private fun InputCard(
    title: String,
    subtitle: String,
    content: @Composable () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            content()
        }
    }
}

@Composable
private fun FertilizerAvailabilityItem(
    availability: FertilizerAvailability,
    translations: Translations,
    onSelectionChange: (Boolean) -> Unit,
    onAmountChange: (String) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (availability.isSelected) 
                MaterialTheme.colorScheme.primaryContainer 
            else 
                MaterialTheme.colorScheme.surface
        )
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Checkbox(
                    checked = availability.isSelected,
                    onCheckedChange = onSelectionChange
                )
                
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = translations.getFertilizerName(availability.fertilizer.id),
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Medium
                    )
                    Text(
                        text = "${translations.formula} ${availability.fertilizer.chemicalFormula}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = "${availability.fertilizer.pricePerKg} ${translations.currency}/${translations.availableAmountKg}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }
            
            if (availability.isSelected) {
                OutlinedTextField(
                    value = if (availability.availableAmountKg == 0.0) "" else availability.availableAmountKg.toString(),
                    onValueChange = onAmountChange,
                    label = { Text(translations.availableAmount) },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    modifier = Modifier.fillMaxWidth()
                )
                
                Text(
                    text = availability.fertilizer.description,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
private fun CalculationResultCard(
    result: CalculationResult,
    translations: Translations
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 6.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(
                text = "📊 ${translations.calculationResults}",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSecondaryContainer
            )
            
            // Recommendations
            if (result.recommendedFertilizers.isNotEmpty()) {
                Text(
                    text = "💰 ${translations.mainRecommendation}:",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Medium
                )
                
                result.recommendedFertilizers.forEach { recommendation ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(
                            containerColor = MaterialTheme.colorScheme.surface
                        )
                    ) {
                        Column(
                            modifier = Modifier.padding(12.dp),
                            verticalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Text(
                                text = translations.getFertilizerName(recommendation.fertilizer.id),
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Medium
                            )
                            Text(
                                text = "${translations.amount} ${String.format("%.3f", recommendation.amountKg)} ${translations.availableAmountKg} (${String.format("%.1f", recommendation.amountG)} ${translations.gramsUnit})",
                                style = MaterialTheme.typography.bodyMedium
                            )
                            Text(
                                text = "${translations.cost} ${String.format("%.2f", recommendation.cost)} ${translations.currency}",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.primary
                            )
                            Text(
                                text = "${translations.timeToEffect} ${recommendation.timeToEffect}",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
                
                // Total Cost
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.primaryContainer
                    )
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "${translations.totalCost}:",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "${String.format("%.2f", result.totalCost)} ${translations.currency}",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                    }
                }
                
                // Final pH and Time to Effect
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "🎯 ${translations.finalPH}: ${String.format("%.2f", result.finalPh)}",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Medium
                    )
                    Text(
                        text = "⏱️ ${result.timeToEffect}",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            // Warnings
            val localizedWarnings = LocalizedCalculationUtils.generateLocalizedWarnings(
                result.recommendedFertilizers, 
                translations
            )
            if (localizedWarnings.isNotEmpty()) {
                Text(
                    text = "⚠️ ${translations.warningsAndSafetyMeasures}",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Medium,
                    color = MaterialTheme.colorScheme.error
                )
                
                localizedWarnings.forEach { warning ->
                    Text(
                        text = "• $warning",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.error
                    )
                }
            }
            
            // Jar Test Instructions
            if (result.recommendedFertilizers.isNotEmpty()) {
                val localizedJarTestInstructions = LocalizedCalculationUtils.generateLocalizedJarTestInstructions(
                    result.recommendedFertilizers,
                    translations
                )
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.tertiaryContainer
                    )
                ) {
                    Column(
                        modifier = Modifier.padding(12.dp)
                    ) {
                        Text(
                            text = "🧪 ${translations.jarTestInstructionsTitle}",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Medium,
                            color = MaterialTheme.colorScheme.onTertiaryContainer
                        )
                        Text(
                            text = localizedJarTestInstructions,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onTertiaryContainer
                        )
                    }
                }
            }
            
            // Scientific Explanation
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(
                    modifier = Modifier.padding(12.dp)
                ) {
                    Text(
                        text = "🔬 ${translations.scientificReasoningTitle}",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Medium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        text = LocalizedCalculationUtils.generateLocalizedDetailedExplanation(result, translations),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}