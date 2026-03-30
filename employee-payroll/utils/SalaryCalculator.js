const calculateSalary = (basicSalary) => {
  const hra = 0.20 * basicSalary;
  const da = 0.10 * basicSalary;
  const pf = 0.05 * basicSalary;

  const netSalary = basicSalary + hra + da - pf;

  return {
    basicSalary,
    hra,
    da,
    pf,
    netSalary
  };
};

module.exports = calculateSalary;
