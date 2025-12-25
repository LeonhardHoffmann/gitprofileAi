export function normalizeTechStack(stack, minPercent = 1) {
  const total = Object.values(stack).reduce((a, b) => a + b, 0);

  const percentages = {};
  let others = 0;

  for (const [tech, value] of Object.entries(stack)) {
    const percent = Number(((value / total) * 100).toFixed(2));

    if (percent < minPercent) {
      others += percent;
    } else {
      percentages[tech] = percent;
    }
  }

  if (others > 0) {
    percentages["Others"] = Number(others.toFixed(2));
  }

  return percentages;
}
