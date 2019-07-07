const chargeCC = async (ccNumber) => {
  const res = await chargeCard(ccNumber);
  console.log(res);
};