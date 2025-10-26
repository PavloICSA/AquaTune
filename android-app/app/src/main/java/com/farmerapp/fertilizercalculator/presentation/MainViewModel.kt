package com.farmerapp.fertilizercalculator.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.farmerapp.fertilizercalculator.data.model.*
import com.farmerapp.fertilizercalculator.domain.PhCalculationEngine
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val calculationEngine: PhCalculationEngine
) : ViewModel() {

    private val _uiState = MutableStateFlow(FertilizerCalculatorState())
    val uiState: StateFlow<FertilizerCalculatorState> = _uiState.asStateFlow()

    init {
        loadAvailableFertilizers()
    }

    private fun loadAvailableFertilizers() {
        val fertilizers = FertilizerDB.fertilizers.map { fertilizer ->
            FertilizerAvailability(
                fertilizer = fertilizer.toLegacyFormat(),
                availableAmountKg = 10.0, // Default available amount
                isSelected = fertilizer.id == "map" // Select MAP by default
            )
        }
        
        _uiState.value = _uiState.value.copy(
            availableFertilizers = fertilizers
        )
    }

    fun updateVolume(volume: String) {
        val numericVolume = volume.toDoubleOrNull() ?: 0.0
        _uiState.value = _uiState.value.copy(volumeL = numericVolume)
    }

    fun updatePHInit(ph: String) {
        val numericPh = ph.toDoubleOrNull() ?: 7.0
        _uiState.value = _uiState.value.copy(pHInit = numericPh)
    }

    fun updatePHTarget(ph: String) {
        val numericPh = ph.toDoubleOrNull() ?: 5.8
        _uiState.value = _uiState.value.copy(pHTarget = numericPh)
    }

    fun updateAlkalinity(alkalinity: String) {
        val numericAlkalinity = alkalinity.toDoubleOrNull() ?: 150.0
        _uiState.value = _uiState.value.copy(alkalinityMgLAsCaCO3 = numericAlkalinity)
    }

    fun updateTemperature(temperature: String) {
        val numericTemperature = temperature.toDoubleOrNull() ?: 25.0
        _uiState.value = _uiState.value.copy(temperatureC = numericTemperature)
    }

    fun updateWaterHardness(hardness: String) {
        val numericHardness = hardness.toDoubleOrNull() ?: 100.0
        _uiState.value = _uiState.value.copy(waterHardnessMgLAsCaCO3 = numericHardness)
    }

    fun updateFertilizerPurity(purity: String) {
        val numericPurity = purity.toDoubleOrNull() ?: 95.0
        _uiState.value = _uiState.value.copy(fertilizerPurity = numericPurity)
    }

    fun updateEffectTiming(timing: EffectTiming) {
        _uiState.value = _uiState.value.copy(requiredEffectTiming = timing)
    }

    fun toggleExpertMode() {
        _uiState.value = _uiState.value.copy(showExpertMode = !_uiState.value.showExpertMode)
    }

    fun updateFertilizerAvailability(fertilizerId: String, amount: String, isSelected: Boolean) {
        val numericAmount = amount.toDoubleOrNull() ?: 0.0
        val updatedFertilizers = _uiState.value.availableFertilizers.map { availability ->
            if (availability.fertilizer.id == fertilizerId) {
                availability.copy(
                    availableAmountKg = numericAmount,
                    isSelected = isSelected
                )
            } else {
                availability
            }
        }
        
        _uiState.value = _uiState.value.copy(availableFertilizers = updatedFertilizers)
    }

    fun calculateFertilizers() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isCalculating = true)
            
            try {
                // Simulate async calculation
                kotlinx.coroutines.delay(500)
                
                val input = CalculationInput(
                    volumeL = _uiState.value.volumeL,
                    pHInit = _uiState.value.pHInit,
                    pHTarget = _uiState.value.pHTarget,
                    alkalinityMgLAsCaCO3 = _uiState.value.alkalinityMgLAsCaCO3,
                    temperatureC = _uiState.value.temperatureC,
                    waterHardnessMgLAsCaCO3 = _uiState.value.waterHardnessMgLAsCaCO3,
                    caIonsMgL = _uiState.value.caIonsMgL,
                    mgIonsMgL = _uiState.value.mgIonsMgL,
                    selectedFertilizer = _uiState.value.selectedFertilizer,
                    fertilizerPurity = _uiState.value.fertilizerPurity,
                    requiredEffectTiming = _uiState.value.requiredEffectTiming,
                    countryLocale = _uiState.value.countryLocale,
                    budgetConstraint = _uiState.value.budgetConstraint,
                    availableFertilizers = _uiState.value.availableFertilizers
                )
                
                val result = calculationEngine.calculateOptimalFertilizers(input)
                
                _uiState.value = _uiState.value.copy(
                    calculationResult = result,
                    isCalculating = false
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    calculationResult = CalculationResult(
                        recommendedFertilizers = emptyList(),
                        totalCost = 0.0,
                        finalPh = 0.0,
                        timeToEffect = "Error",
                        explanation = "Calculation error: ${e.message}",
                        warnings = listOf("Check input data"),
                        scientificReasoning = "Calculation impossible due to error"
                    ),
                    isCalculating = false
                )
            }
        }
    }

    fun clearResults() {
        _uiState.value = _uiState.value.copy(calculationResult = null)
    }
}