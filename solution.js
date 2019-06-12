class Table {
  constructor(div) {
    this.div = div;
    this.tableMatrix = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
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
    let tableMatrix = this.tableOcuped;
    for (let i = 0; i < 8; i++) {
      row = i + 1 + " | ";
      for (let j = 0; j < 8; j++) {
        if (tableMatrix[i][j] > 10) {
          cell = squareQueenDead;
        } else if (tableMatrix[i][j] == 10) {
          cell = squareQueen;
        } else if (tableMatrix[i][j] > 0) {
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
    this.tableMatrix[x][y] = 1;
    // this.tableOcuped[x][y] = 5;
    this.queens.push([x, y]);
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
    this.tableOcuped[x][y] = 10;
    // console.log("step");
    // console.log(this.tableOcuped[0]);
    // console.log(this.tableOcuped[1]);
    // console.log(this.tableOcuped[2]);
    // console.log(this.tableOcuped[3]);
    // console.log(this.tableOcuped[4]);
    // console.log(this.tableOcuped[5]);
    // console.log(this.tableOcuped[6]);
    // console.log(this.tableOcuped[7]);
    this.div.innerHTML = this.toString();
  }
  verify() {
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
}
function ubicaReinas() {
  table.cleanQueens();
  let queen = document.querySelector("#queen1").value;
  for (let i = 1; i <= 8; i++) {
    queen = document.querySelector("#queen" + i).value;
    if (queen) {
      x = parseInt(queen[0]) - 1;
      switch (queen[1].toUpperCase()) {
        case "A":
          y = 0;
          break;
        case "B":
          y = 1;
          break;
        case "C":
          y = 2;
          break;
        case "D":
          y = 3;
          break;
        case "E":
          y = 4;
          break;
        case "F":
          y = 5;
          break;
        case "G":
          y = 6;
          break;
        case "H":
          y = 7;
          break;
        default:
          y = -1;
          break;
      }
      table.putQueen(x, y);
    }
  }
  table.verify();
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
// table.putQueen(7, 1);
console.log(table.verify());
for (let i = 1; i <= table.queens.length; i++) {
  let x = table.queens[i - 1][0] + 1;
  abc = "ABCDEFGH";
  let y = table.queens[i - 1][1];

  document.querySelector("#queen" + i).value = x + abc[y];
}
