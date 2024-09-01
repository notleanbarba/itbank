const calculateLoan = (amount, term, interest, amortization) => {
  let remainingLoan = amount;
  let average_pmt = 0;
  let tmp = 0;
  const amortizationSchedule = [];

  switch (amortization) {
    case "Francés":
      const pmt =
        (amount * (interest / 12) * (1 + interest / 12) ** (12 * term)) /
        ((1 + interest / 12) ** (12 * term) - 1);

      for (let i = 1; i <= term * 12; i++) {
        const interesti = (remainingLoan * interest) / 12;
        remainingLoan -= pmt - interesti;
        if (i === term * 12) remainingLoan = 0;
        amortizationSchedule.push([
          i,
          pmt.toFixed(2),
          (pmt - interesti).toFixed(2),
          interesti.toFixed(2),
          remainingLoan.toFixed(2),
        ]);
      }
      average_pmt = pmt;
      break;
    case "Alemán":
      const pmtPrincipal = amount / (term * 12);
      tmp = 0;
      for (let i = 1; i <= term * 12; i++) {
        const interesti = (remainingLoan * interest) / 12;
        remainingLoan -= pmtPrincipal;
        if (i === term * 12) remainingLoan = 0;
        const pmt = pmtPrincipal + interesti;
        tmp += pmt;
        amortizationSchedule.push([
          i,
          pmt.toFixed(2),
          (pmt - interesti).toFixed(2),
          interesti.toFixed(2),
          remainingLoan.toFixed(2),
        ]);
      }
      average_pmt = tmp / (term * 12);
      break;
    case "Bullet":
      tmp = 0;
      for (let i = 1; i <= term * 12; i++) {
        const interesti = (amount * interest) / 12;
        let pmt = interesti;
        if (i === term * 12) {
          pmt += amount;
          remainingLoan = 0;
        }
        tmp += pmt;
        amortizationSchedule.push([
          i,
          pmt.toFixed(2),
          (pmt - interesti).toFixed(2),
          interesti.toFixed(2),
          remainingLoan.toFixed(2),
        ]);
      }
      average_pmt = (tmp + amount) / (term * 12);
      break;
  }
  return [average_pmt, amortizationSchedule];
};

const generateRow = (data) => {
  const row = document.createElement("tr");
  data.forEach((d) => {
    const rowData = document.createElement("td");
    rowData.textContent = d;
    row.appendChild(rowData);
  });
  return row;
};

const createTableContent = (amortizationSchedule) => {
  const tableContent = document.createDocumentFragment();
  const tableHeader = document.createElement("thead");
  const tableBody = document.createElement("tbody");
  const tableData = document.createElement("td");

  const headers = ["Mes", "Cuota", "Principal", "Interés", "Balance"];
  headers.forEach((header) => {
    const tableHeaderData = document.createElement("th");
    tableHeaderData.textContent = header;
    tableHeader.appendChild(tableHeaderData);
  });
  tableContent.append(tableHeader);

  amortizationSchedule.forEach((period) => {
    tableBody.appendChild(generateRow(period));
  });
  tableContent.append(tableBody);

  return tableContent;
};

const renderNewCalculation = () => {
  const loanAmount = +document.getElementById("loan-amount").value;
  const loanTerm = +document.getElementById("loan-term").value;
  const loanInterest = +document.getElementById("loan-interest").value / 100;
  const loanAmortization = document.getElementById("loan-amortization").value;

  if (!(loanTerm > 0) || !(loanAmount > 0)) {
    document.getElementById("loan-payment").innerHTML = null;
    document.getElementById("loan-table").innerHTML = null;
    return;
  }

  const loanCalculation = calculateLoan(
    loanAmount,
    loanTerm,
    loanInterest,
    loanAmortization,
  );

  document.getElementById("loan-payment").textContent =
    loanCalculation[0].toFixed(2);
  document
    .getElementById("loan-table")
    .replaceChildren(createTableContent(loanCalculation[1]));
};

const loanSimulatorDOM = document.getElementById("loan-simulator");

loanSimulatorDOM.addEventListener("input", renderNewCalculation);
