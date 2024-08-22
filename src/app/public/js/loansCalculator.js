const calculateLoan = () => {
  const loanAmount = +document.getElementById("loan-amount").value;
  const loanTerm = +document.getElementById("loan-term").value;
  const loanInterest = +document.getElementById("loan-interest").value / 100;
  const loanAmortization = document.getElementById("loan-amortization").value;

  if (!(loanTerm > 0) || !(loanAmount > 0)) {
    document.getElementById("loan-payment").innerHTML = null;
    document.getElementById("loan-table").innerHTML = null;
    return;
  }

  let remainingLoan = loanAmount;
  let amortizationTable = "";
  let average_pmt = 0;

  if (loanAmortization === "Francés") {
    const pmt =
      (loanAmount *
        (loanInterest / 12) *
        (1 + loanInterest / 12) ** (12 * loanTerm)) /
      ((1 + loanInterest / 12) ** (12 * loanTerm) - 1);
    average_pmt = pmt;

    for (let i = 1; i <= loanTerm * 12; i++) {
      const interesti = (remainingLoan * loanInterest) / 12;
      remainingLoan -= pmt - interesti;
      if (i === loanTerm * 12) remainingLoan = 0;
      amortizationTable = amortizationTable.concat(`
			<tr>
			<td>
			${i}
			</td>
			<td>
			${pmt.toFixed(2)}
			</td>
			<td>
			${(pmt - interesti).toFixed(2)}
			</td>
			<td>
			${interesti.toFixed(2)}
			</td>
			<td>
			${remainingLoan.toFixed(2)}
			</td>
			</tr>`);
    }
  }

  if (loanAmortization === "Alemán") {
    const pmtPrincipal = loanAmount / (loanTerm * 12);
    let tmp = 0;
    for (let i = 1; i <= loanTerm * 12; i++) {
      const interesti = (remainingLoan * loanInterest) / 12;
      remainingLoan -= pmtPrincipal;
      if (i === loanTerm * 12) remainingLoan = 0;
      const pmt = pmtPrincipal + interesti;
      tmp += pmt;
      amortizationTable = amortizationTable.concat(`
			<tr>
			<td>
			${i}
			</td>
			<td>
			${pmt.toFixed(2)}
			</td>
			<td>
			${pmtPrincipal.toFixed(2)}
			</td>
			<td>
			${interesti.toFixed(2)}
			</td>
			<td>
			${remainingLoan.toFixed(2)}
			</td>
			</tr>`);
    }
    average_pmt = tmp / (loanTerm * 12);
  }

  if (loanAmortization === "Bullet") {
    let tmp = 0;
    for (let i = 1; i <= loanTerm * 12; i++) {
      const interesti = (loanAmount * loanInterest) / 12;
      let pmt = interesti;
      tmp += pmt;
      if (i === loanTerm * 12) {
        amortizationTable = amortizationTable.concat(`
			<tr>
			<td>
			${i}
			</td>
			<td>
			${(pmt + loanAmount).toFixed(2)}
			</td>
			<td>
			${loanAmount.toFixed(2)}
			</td>
			<td>
			${interesti.toFixed(2)}
			</td>
			<td>
			0
			</td>
			</tr>`);
        break;
      }
      amortizationTable = amortizationTable.concat(`
			<tr>
			<td>
			${i}
			</td>
			<td>
			${pmt.toFixed(2)}
			</td>
			<td>
			0
			</td>
			<td>
			${interesti.toFixed(2)}
			</td>
			<td>
			${loanAmount}
			</td>
			</tr>`);
    }
    average_pmt = (tmp + loanAmount) / (loanTerm * 12);
  }

  document.getElementById("loan-payment").innerHTML = average_pmt.toFixed(2);
  document.getElementById("loan-table").innerHTML = `
		<thead>
		<tr>
			<th>Mes</th>
			<th>Cuota</th>
			<th>Principal</th>
			<th>Interés</th>
			<th>Balance</th>
		</tr>
		</thead>
		<tbody >
		${amortizationTable}
		</tbody>
		`;
};
const loanSimulatorDOM = document.getElementById("loan-simulator");

loanSimulatorDOM.addEventListener("input", calculateLoan);
