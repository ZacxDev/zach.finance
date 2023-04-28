export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en: {
      siteTitle: 'zach.finance - the best free financial tools in the universe',
      siteDescription: 'A collection of free and amazing financial analysis tools.',

      volatilityByInterval: 'Volatility by Interval',
      volatilityDescription:
        'The % change in price for the given assets per interval, over the given period.',
      tickers: 'Tickers',
      addTicker: 'Add Ticker',
      startDate: 'Start Date',
      endDate: 'End Date',
      interval: 'Interval',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      getVolatility: 'Get Volatility',
      somethingWentWrong: 'Something went wrong...',

      volatility: 'Volatility',
      volatilitySummary: 'Volatility Summary'
    },
    es: {
      siteTitle: 'zach.finance - las mejores herramientas financieras gratuitas del universo',
      siteDescription: 'Una colección de herramientas de análisis financiero gratuitas y sorprendentes.',

      volatilityByInterval: 'Volatilidad Por Intervalo',
      volatilityDescription:
        'El % de cambio en el precio de los activos dados por intervalo, durante el período dado.',
      tickers: 'Símbolos',
      addTicker: 'Agregar',
      startDate: 'Fecha De Inicio',
      endDate: 'Fecha De Final',
      interval: 'Intervalo',
      daily: 'Diario',
      weekly: 'Semanal',
      monthly: 'Mensual',
      getVolatility: 'Obtener Volatilidad',
      somethingWentWrong: 'Algo Salió Mal...',

      volatility: 'Volatilidad',
      volatilitySummary: 'Resumen De Volatilidad'
    }
  }
}))
