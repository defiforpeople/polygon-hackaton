function calculateInvesmentLabel(periods: number) {
  const labels = [];

  for (let index = 0; index < periods + 1; index++) {
    if (index === 0) {
      labels.push('Today');
      continue;
    }

    if (index === periods) {
      labels.push(`${periods} years`);
      continue;
    }

    labels.push('');
  }
  return labels;
}

function calculateInvesmentValues(
  periods: number,
  initialValue: number,
  monthlyAmount: number,
) {
  const values = [];

  for (let index = 0; index < periods + 1; index++) {
    if (index === 0) {
      values.push(initialValue);
      continue;
    }

    values.push(values[index - 1] + monthlyAmount);
  }

  return values;
}

function calculateBorderRadius(periods: number) {
  const borderRadius = [];

  for (let index = 0; index < periods + 1; index++) {
    if (index === periods) {
      borderRadius.push(1);
      continue;
    }

    borderRadius.push(0);
  }

  return borderRadius;
}

function calculateEarnedInterest(
  periods: number,
  initialValue: number,
  monthlyAmount: number,
  APY: number,
) {
  const revenue = [];

  for (let index = 0; index < periods + 1; index++) {
    if (index === 0) {
      revenue.push(initialValue);
      continue;
    }

    revenue.push(revenue[index - 1] + monthlyAmount + revenue[index - 1] * APY);
  }

  return revenue;
}

function calculateInvesment(
  periods: number,
  initialValue: number,
  monthlyAmount: number,
  APY: number,
) {
  const labels = calculateInvesmentLabel(periods);

  const invested = calculateInvesmentValues(
    periods,
    initialValue,
    monthlyAmount,
  );

  const pessimisticRevenue = calculateEarnedInterest(
    periods,
    initialValue,
    monthlyAmount,
    0.05,
  );

  const optimisticRevenue = calculateEarnedInterest(
    periods,
    initialValue,
    monthlyAmount,
    0.1,
  );

  const borderRadius = calculateBorderRadius(periods);

  const output = {
    labels: labels,
    invested: invested,
    pessimisticRevenue: pessimisticRevenue,
    optimisticRevenue: optimisticRevenue,
    borderRadius: borderRadius,
  };

  return output;
}

export default calculateInvesment;
