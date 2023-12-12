import { useTheme } from "../hooks/themeContext"
import { useCallback } from "react"

export function isDarkTheme() {
    const {currentTheme} = useTheme()
    if (currentTheme.colors.dark == "#ffffff") {
        return false
    } else {
        return true
    }
}