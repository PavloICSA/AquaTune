package com.farmerapp.fertilizercalculator.presentation.navigation

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.hilt.navigation.compose.hiltViewModel
import com.farmerapp.fertilizercalculator.data.localization.useTranslation
import com.farmerapp.fertilizercalculator.data.localization.LocalizationManager
import com.farmerapp.fertilizercalculator.data.localization.Language
import com.farmerapp.fertilizercalculator.presentation.screens.*
import javax.inject.Inject

sealed class Screen(val route: String, val titleKey: String, val icon: ImageVector) {
    object WhyAquaTune : Screen("why_aquatune", "whyAquaTune", Icons.Default.Info)
    object Calculator : Screen("calculator", "calculator", Icons.Default.Calculate)
    object About : Screen("about", "about", Icons.Default.Science)
    object Instructions : Screen("instructions", "instructions", Icons.Default.MenuBook)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppNavigation(
    localizationManager: LocalizationManager
) {
    val navController = rememberNavController()
    val translations = useTranslation(localizationManager)
    
    Scaffold(
        topBar = {
            AppTopBar(localizationManager)
        },
        bottomBar = {
            AppBottomNavigation(navController = navController, localizationManager = localizationManager)
        }
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = Screen.Calculator.route,
            modifier = Modifier.padding(paddingValues)
        ) {
            composable(Screen.WhyAquaTune.route) {
                WhyAquaTuneScreen(localizationManager)
            }
            composable(Screen.Calculator.route) {
                CalculatorScreen(localizationManager = localizationManager)
            }
            composable(Screen.About.route) {
                AboutScreen(localizationManager)
            }
            composable(Screen.Instructions.route) {
                InstructionsScreen(localizationManager)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun AppTopBar(localizationManager: LocalizationManager) {
    val translations = useTranslation(localizationManager)
    
    TopAppBar(
        title = { 
            Column {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(
                        "AquaTune",
                        style = MaterialTheme.typography.headlineSmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
                Text(
                    translations.appMotto,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        },
        actions = {
            LanguageSelector(localizationManager)
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer
        )
    )
}

@Composable
private fun AppBottomNavigation(navController: NavHostController, localizationManager: LocalizationManager) {
    val translations = useTranslation(localizationManager)
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination
    
    val screens = listOf(
        Screen.WhyAquaTune,
        Screen.Calculator,
        Screen.About,
        Screen.Instructions
    )
    
    NavigationBar {
        screens.forEach { screen ->
            NavigationBarItem(
                icon = { Icon(screen.icon, contentDescription = null) },
                label = { 
                    Text(
                        when (screen.titleKey) {
                            "whyAquaTune" -> translations.whyAquaTune
                            "calculator" -> translations.calculator
                            "about" -> translations.about
                            "instructions" -> translations.instructions
                            else -> screen.titleKey
                        },
                        style = MaterialTheme.typography.labelSmall,
                        maxLines = 2,
                        textAlign = TextAlign.Center
                    )
                },
                selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true,
                onClick = {
                    navController.navigate(screen.route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        }
    }
}

@Composable
private fun LanguageSelector(localizationManager: LocalizationManager) {
    var expanded by remember { mutableStateOf(false) }
    val currentLanguage by localizationManager.currentLanguage.collectAsState()
    
    Box {
        IconButton(onClick = { expanded = true }) {
            Icon(Icons.Default.Language, contentDescription = "Language")
        }
        
        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            Language.values().forEach { language ->
                DropdownMenuItem(
                    text = { 
                        Row(
                            verticalAlignment = androidx.compose.ui.Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Text(language.flag)
                            Text(language.displayName)
                            if (currentLanguage == language) {
                                Icon(
                                    Icons.Default.Check,
                                    contentDescription = "Selected",
                                    tint = MaterialTheme.colorScheme.primary
                                )
                            }
                        }
                    },
                    onClick = { 
                        localizationManager.setLanguage(language)
                        expanded = false 
                    }
                )
            }
        }
    }
}