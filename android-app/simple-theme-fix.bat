@echo off
echo Creating minimal theme as backup...

echo ^<?xml version="1.0" encoding="utf-8"?^> > app\src\main\res\values\themes_simple.xml
echo ^<resources^> >> app\src\main\res\values\themes_simple.xml
echo     ^<style name="Theme.FertilizerCalculator" parent="Theme.AppCompat.Light.NoActionBar"^> >> app\src\main\res\values\themes_simple.xml
echo         ^<item name="colorPrimary"^>#2E7D32^</item^> >> app\src\main\res\values\themes_simple.xml
echo         ^<item name="colorPrimaryDark"^>#1B5E20^</item^> >> app\src\main\res\values\themes_simple.xml
echo         ^<item name="colorAccent"^>#8BC34A^</item^> >> app\src\main\res\values\themes_simple.xml
echo     ^</style^> >> app\src\main\res\values\themes_simple.xml
echo ^</resources^> >> app\src\main\res\values\themes_simple.xml

echo Simple theme created as backup.
pause