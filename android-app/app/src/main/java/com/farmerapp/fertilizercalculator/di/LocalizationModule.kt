package com.farmerapp.fertilizercalculator.di

import android.content.Context
import com.farmerapp.fertilizercalculator.data.localization.LocalizationManager
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object LocalizationModule {
    
    @Provides
    @Singleton
    fun provideLocalizationManager(
        @ApplicationContext context: Context
    ): LocalizationManager {
        return LocalizationManager(context)
    }
}