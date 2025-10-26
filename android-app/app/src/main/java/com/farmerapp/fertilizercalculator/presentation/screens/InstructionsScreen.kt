package com.farmerapp.fertilizercalculator.presentation.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.farmerapp.fertilizercalculator.data.localization.useTranslation
import com.farmerapp.fertilizercalculator.data.localization.Translations
import com.farmerapp.fertilizercalculator.data.localization.LocalizationManager

@Composable
fun InstructionsScreen(localizationManager: LocalizationManager) {
    val translations = useTranslation(localizationManager)
    val scrollState = rememberScrollState()
    var selectedTab by remember { mutableStateOf(0) }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Tab Row
        TabRow(
            selectedTabIndex = selectedTab,
            modifier = Modifier.fillMaxWidth()
        ) {
            Tab(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0 },
                text = { Text(translations.stepByStepTab) }
            )
            Tab(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1 },
                text = { Text(translations.safetyTab) }
            )
            Tab(
                selected = selectedTab == 2,
                onClick = { selectedTab = 2 },
                text = { Text(translations.jarTestTab) }
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Tab Content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            when (selectedTab) {
                0 -> StepByStepContent(translations)
                1 -> SafetyContent(translations)
                2 -> JarTestContent(translations)
            }
        }
    }
}

@Composable
private fun StepByStepContent(translations: Translations) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = translations.stepByStep,
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            
            InstructionStep(
                stepNumber = 1,
                title = translations.enterRequiredParametersTitle,
                description = translations.enterRequiredParametersDescription,
                details = listOf(
                    translations.tankVolumeDetail,
                    translations.waterPHDetail,
                    translations.desiredPHDetail,
                    translations.alkalinityDetail
                ),
                icon = Icons.Default.Input
            )
            
            InstructionStep(
                stepNumber = 2,
                title = translations.selectEffectSpeedTitle,
                description = translations.selectEffectSpeedDescription,
                details = listOf(
                    translations.immediateEffectDetail,
                    translations.within24hEffectDetail,
                    translations.noRushEffectDetail
                ),
                icon = Icons.Default.Timer
            )
            
            InstructionStep(
                stepNumber = 3,
                title = translations.configureExpertParametersTitle,
                description = translations.configureExpertParametersDescription,
                details = listOf(
                    translations.temperatureDetail,
                    translations.fertilizerPurityDetail
                ),
                icon = Icons.Default.Settings
            )
            
            InstructionStep(
                stepNumber = 4,
                title = translations.selectAvailableFertilizersTitle,
                description = translations.selectAvailableFertilizersDescription,
                details = listOf(
                    translations.markAvailableFertilizersDetail,
                    translations.specifyQuantitiesDetail,
                    translations.systemOptimizesDetail
                ),
                icon = Icons.Default.Inventory
            )
            
            InstructionStep(
                stepNumber = 5,
                title = translations.getResultsAndJarTestTitle,
                description = translations.getResultsAndJarTestDescription,
                details = listOf(
                    translations.clickCalculateDetail,
                    translations.performJarTestDetail,
                    translations.followSafetyDetail
                ),
                icon = Icons.Default.Science
            )
        }
    }
}

@Composable
private fun SafetyContent(translations: Translations) {
    Column(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Personal Protection
        SafetyCard(
            title = translations.personalProtectionTitle,
            icon = "🛡️",
            items = listOf(
                translations.personalProtectionMandatory,
                translations.personalProtectionForbidden
            ),
            isWarning = false
        )
        
        // Storage and Handling
        SafetyCard(
            title = translations.storageAndHandlingTitle,
            icon = "📦",
            items = listOf(
                translations.storageAndHandlingStorage,
                translations.storageAndHandlingTransport,
                translations.storageAndHandlingDisposal
            ),
            isWarning = false
        )
        
        // Emergency Procedures
        SafetyCard(
            title = translations.emergencyProceduresTitle,
            icon = "🚨",
            items = listOf(
                translations.emergencyProceduresSkin,
                translations.emergencyProceduresEyes
            ),
            isWarning = true
        )
    }
}

@Composable
private fun JarTestContent(translations: Translations) {
    Column(
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Equipment Needed
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "🧪 ${translations.equipmentNeededTitle}",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
                
                val equipment = listOf(
                    translations.glassJarsEquipment,
                    translations.phMeterEquipment,
                    translations.preciseScaleEquipment,
                    translations.measuringCylindersEquipment,
                    translations.glassStirringRodsEquipment,
                    translations.stopwatchEquipment,
                    translations.markerEquipment,
                    translations.logbookEquipment
                )
                
                equipment.forEach { item ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Text("•", color = MaterialTheme.colorScheme.primary)
                        Text(
                            text = item,
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onPrimaryContainer
                        )
                    }
                }
            }
        }
        
        // Step-by-Step Procedure
        Card(
            modifier = Modifier.fillMaxWidth(),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = "📋 ${translations.stepByStepProcedure}",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                
                JarTestStep(
                    stepNumber = 1,
                    title = translations.samplePreparationTitle,
                    description = translations.samplePreparationDescription
                )
                
                JarTestStep(
                    stepNumber = 2,
                    title = translations.measureInitialPH,
                    description = translations.measureInitialPHDescription
                )
                
                JarTestStep(
                    stepNumber = 3,
                    title = translations.calculateTestDoses,
                    description = translations.calculateTestDosesDescription
                )
                
                JarTestStep(
                    stepNumber = 4,
                    title = translations.addFertilizers,
                    description = translations.addFertilizersDescription
                )
                
                JarTestStep(
                    stepNumber = 5,
                    title = translations.mixing,
                    description = translations.mixingDescription
                )
                
                JarTestStep(
                    stepNumber = 6,
                    title = translations.observation,
                    description = translations.observationDescription
                )
                
                JarTestStep(
                    stepNumber = 7,
                    title = translations.phMeasurement,
                    description = translations.phMeasurementDescription
                )
                
                JarTestStep(
                    stepNumber = 8,
                    title = translations.resultEvaluation,
                    description = translations.resultEvaluationDescription
                )
            }
        }
        
        // Result Interpretation
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer
            )
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "📊 ${translations.resultInterpretation}",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSecondaryContainer
                )
                
                ResultInterpretationItem(
                    status = "✅ ${translations.good}",
                    description = translations.goodDescription,
                    color = MaterialTheme.colorScheme.primary
                )
                
                ResultInterpretationItem(
                    status = "⚠️ ${translations.caution}",
                    description = translations.cautionDescription,
                    color = MaterialTheme.colorScheme.tertiary
                )
                
                ResultInterpretationItem(
                    status = "❌ ${translations.bad}",
                    description = translations.badDescription,
                    color = MaterialTheme.colorScheme.error
                )
            }
        }
        
        // Important Warning
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.errorContainer
            )
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "⚠️ ${translations.important}",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onErrorContainer
                )
                
                Text(
                    text = translations.mandatoryJarTest,
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        }
    }
}

@Composable
private fun InstructionStep(
    stepNumber: Int,
    title: String,
    description: String,
    details: List<String>,
    icon: androidx.compose.ui.graphics.vector.ImageVector
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Card(
            modifier = Modifier.size(40.dp),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.primary
            )
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = stepNumber.toString(),
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            }
        }
        
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Icon(
                    icon,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary
                )
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
            
            Text(
                text = description,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Justify
            )
            
            details.forEach { detail ->
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text("•", color = MaterialTheme.colorScheme.primary)
                    Text(
                        text = detail,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Justify
                    )
                }
            }
        }
    }
}

@Composable
private fun SafetyCard(
    title: String,
    icon: String,
    items: List<String>,
    isWarning: Boolean
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (isWarning) 
                MaterialTheme.colorScheme.errorContainer 
            else 
                MaterialTheme.colorScheme.primaryContainer
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = icon,
                    style = MaterialTheme.typography.headlineSmall
                )
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = if (isWarning) 
                        MaterialTheme.colorScheme.onErrorContainer 
                    else 
                        MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
            
            items.forEach { item ->
                Text(
                    text = "• $item",
                    style = MaterialTheme.typography.bodyMedium,
                    color = if (isWarning) 
                        MaterialTheme.colorScheme.onErrorContainer 
                    else 
                        MaterialTheme.colorScheme.onPrimaryContainer,
                    textAlign = TextAlign.Justify
                )
            }
        }
    }
}

@Composable
private fun JarTestStep(
    stepNumber: Int,
    title: String,
    description: String
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Card(
            modifier = Modifier.size(32.dp),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.secondary
            )
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = stepNumber.toString(),
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSecondary
                )
            }
        }
        
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
            )
            
            Text(
                text = description,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Justify
            )
        }
    }
}

@Composable
private fun ResultInterpretationItem(
    status: String,
    description: String,
    color: androidx.compose.ui.graphics.Color
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = status,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = color
        )
        Text(
            text = description,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSecondaryContainer,
            textAlign = TextAlign.Justify
        )
    }
}