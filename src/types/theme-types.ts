export type ThemeColors =
  | 'Zinc'
  | 'Rose'
  | 'Blue'
  | 'Green'
  | 'Orange'
  | 'Slate'
  | 'Stone'
  | 'Gray'
  | 'Neutral'
  | 'Red'
  | 'Yellow'
  | 'Violet'
export interface ThemeColorStateParams {
  themeColor: ThemeColors
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>
}
