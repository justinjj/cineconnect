/**
 * Creates a unique comparison key for two actors.
 * The IDs are sorted so that:
 *
 * 95 + 132
 * ==
 * 132 + 95
 */
export function buildComparisonKey(
  actor1Id: number,
  actor2Id: number
): string {
  const [first, second] = [actor1Id, actor2Id].sort((a, b) => a - b);

  return `${first}#${second}`;
}