package com.farmerapp.fertilizercalculator.di

import com.farmerapp.fertilizercalculator.domain.PhCalculationEngine
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun providePhCalculationEngine(): PhCalculationEngine {
        return PhCalculationEngine()
    }
}