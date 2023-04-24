export function calculateFiveSummaryStatistics(values: number[]): number[] {
  const sortedValues = [...values].sort((a, b) => a - b)
  const min = sortedValues[0]
  const max = sortedValues[sortedValues.length - 1]
  const median = sortedValues[Math.floor(sortedValues.length / 2)]
  const q1 = sortedValues[Math.floor(sortedValues.length / 4)]
  const q3 = sortedValues[Math.floor((3 * sortedValues.length) / 4)]

  return [min, q1, median, q3, max]
}
