class Table {
  constructor(div) {
    this.div = div;
    this.tableOcuped = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.queens = [];
  }
  toString() {
    const square = "&#9723";
    const squareQueen = "&#9724";
    const squareQueenDead = "&#9949";
    const squareOcuped = "&#9636";

    let table = "&#9931 |A |B |C |D |E |F |G |H<br>";
    let row = "";
    let cell = "";
    let tableOcuped = this.tableOcuped;
    for (let i = 0; i < 8; i++) {
      row = i + 1 + " | ";
      for (let j = 0; j < 8; j++) {
        if (tableOcuped[i][j] > 10) {
          cell = squareQueenDead;
        } else if (tableOcuped[i][j] == 10) {
          cell = squareQueen;
        } else if (tableOcuped[i][j] > 0) {
          cell = squareOcuped;
        } else {
          cell = square;
        }
        row += cell + " ";
      }
      row += "<br>";
      table += row;
    }
    return table;
  }
  putQueen(x, y) {
    this.queens.push([x, y]);
    this.sumPointsQueen([x, y]);
    this.div.innerHTML = this.toString();
    this.verify();
  }
  sumPointsQueen([x, y]) {
    // const x = xy[0];
    // const y = xy[1];
    this.tableOcuped[x][y] += 8;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i - x == j - y) | (i + j == x + y)) {
          this.tableOcuped[i][j] += 1;
        }
        if ((i == x) | (j == y)) {
          this.tableOcuped[i][j] += 1;
        }
      }
    }
    // this.verify();
  }
  subsPointsQueen([x, y]) {
    // const x = xy[0];
    // const y = xy[1];
    this.tableOcuped[x][y] -= 8;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i - x == j - y) | (i + j == x + y)) {
          this.tableOcuped[i][j] -= 1;
          // console.log("flag");
        }
        if ((i == x) | (j == y)) {
          this.tableOcuped[i][j] -= 1;
        }
      }
    }
    // this.verify();
  }
  verify() {
    div.innerHTML = this.toString();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.tableOcuped[i][j] > 10) {
          div.innerHTML +=
            '<br><span style="color:red">INCORRECTO</span><br>Has puesto ' +
            this.queens.length +
            " reinas";
          return false;
        }
      }
    }
    if (this.queens.length == 8) {
      div.innerHTML +=
        '<br><span style="color:green">CORRECTO</span><br>Has puesto ' +
        this.queens.length +
        " reinas";
    } else {
      div.innerHTML +=
        '<br><span style="color:orange">CORRECTO por ahora</span><br>Has puesto ' +
        this.queens.length +
        " de 8 reinas";
    }

    return true;
  }
  cleanQueens() {
    this.tableOcuped = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.queens = [];
    this.div.innerHTML = this.toString();
    this.verify();
  }
  changeColOfQueen(i, col) {
    // console.log(col);
    // console.log(this.queens[i]);
    this.subsPointsQueen(this.queens[i]);
    this.queens[i][1] = col;
    this.sumPointsQueen(this.queens[i]);
    // console.log(this.queens[i]);
  }
}
function ubicaReinas() {
  table.cleanQueens();
  let queen = document.querySelector("#queen1").value;
  let abc = "ABCDEFGH";
  let x = 0,
    y = 0;
  for (let i = 1; i <= 8; i++) {
    queen = document.querySelector("#queen" + i).value;
    if (queen) {
      x = parseInt(queen[0]) - 1;
      y = abc.indexOf(queen[1].toUpperCase());
      // console.log(y);
      table.putQueen(x, y);
    }
  }
  table.verify();
}

function ubicaReinaCalcula() {
  let table = new Table(div);
  let abc = "ABCDEFGH";
  let x = 0,
    y = 0;

  queen = document.querySelector("#queenInitial").value;
  if (queen) {
    x = parseInt(queen[0]) - 1;
    y = abc.indexOf(queen[1].toUpperCase());
    // console.log(y);
    table.putQueen(x, y);
    let init = 0;
    if (y == 0) {
      init = 1;
    }
    // console.log(init);
    table.putQueen(1, init);
    table.putQueen(2, init);
    table.putQueen(3, init);
    table.putQueen(4, init);
    table.putQueen(5, init);
    table.putQueen(6, init);
  }
  flag = !table.verify();
  // console.log(flag);
  for (let i1 = 0; (i1 < 8) & flag; i1++) {
    table.changeColOfQueen(1, i1);
    for (let i2 = 0; (i2 < 8) & flag; i2++) {
      table.changeColOfQueen(2, i2);
      for (let i3 = 0; (i3 < 8) & flag; i3++) {
        table.changeColOfQueen(3, i3);

        for (let i4 = 0; (i4 < 8) & flag; i4++) {
          table.changeColOfQueen(4, i4);
          for (let i5 = 0; (i5 < 8) & flag; i5++) {
            table.changeColOfQueen(5, i5);
            for (let i6 = 0; (i6 < 8) & flag; i6++) {
              table.changeColOfQueen(6, i6);
              flag = !table.verify();
              //       for (let i7 = 0; (i7 < 8) & flag; i7++) {
              //         table.changeColOfQueen(7, i7);
              //         flag = !table.verify();
              //       }
            }
          }
        }
      }
    }
  }
  for (let i = 1; i <= table.queens.length; i++) {
    let x = table.queens[i - 1][0] + 1;
    abc = "ABCDEFGH";
    let y = table.queens[i - 1][1];

    document.querySelector("#queen" + i).value = x + abc[y];
  }
}
const div = document.querySelector("div.content");
table = new Table(div);
table.putQueen(0, 2);
table.putQueen(1, 5);
table.putQueen(2, 3);
table.putQueen(3, 0);
table.putQueen(4, 7);
table.putQueen(5, 4);
table.putQueen(6, 6);
// console.log(table.tableOcuped);
// table.subsPointsQueen(0, 2);
// table.tableOcuped[0][2] -= 8;
// console.log(table.tableOcuped);
// table.sumPointsQueen(0, 2);
// console.log(table.tableOcuped);
// table.putQueen(7, 1);
// console.log(table.verify());
for (let i = 1; i <= table.queens.length; i++) {
  let x = table.queens[i - 1][0] + 1;
  abc = "ABCDEFGH";
  let y = table.queens[i - 1][1];

  document.querySelector("#queen" + i).value = x + abc[y];
}
