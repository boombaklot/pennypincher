
// This is used to wire money
function wire(deposit, money, withdraw) {
  account[deposit] += money;
  account[withdraw] -= money;
  if(account[withdraw]<0) {
    return 1; // Error! The account can not have a negative balance
  }
  return 0;
}

// This is used to print the balance
function print_balance(time) {
  print("-------------------------------------------------");
  print(" The general balance is:");
  print(" Crypto coin:  "+crypto_coin);
  print(" Crypto value: "+crypto_value);
  print(" Crypto cash:  "+(account[0]*crypto_value)+" u$s");
  print(" Account 0: "+account[0]+" coins");
  print(" Account 1: "+account[1]+" coins");
  print(" Overall value: "+( ( account[0] + account[1] ) * crypto_value )+" u$s")
  print("-------------------------------------------------");
  if(typeof time !== 'undefined') {
     seconds_in_a_day = 60*60*24;
     print(" Estimated daily profit: "+( (seconds_in_a_day/time) * account[1] * crypto_value) +" u$s");
     print("-------------------------------------------------\n");
  }
}

// This is used to set the default initial values
function reset_values() {
  account[0] = initial_deposit;
  account[1] = 0; // profit
}

// My initial money
initial_deposit = 10000000000000000;
crypto_coin = "Fakecoin"
crypto_value = 0.00000000011;

// Here I have my bank accounts defined
account = new Array();

print("\n1) Searching for the best profit");
profit = 0
for (j = 1; j < initial_deposit; j+=1) {
  reset_values();
  wire(1, j, 0); // I will transfer a few cents from the account 0 to the account 1
  if(account[0]==initial_deposit && j > profit) {
    profit = j;
  } else {
    break;
  }
}
print("   Found: "+profit);
reset_values();
start = new Date().getTime() / 1000;
print("\n2) Let's start moving some money");
for (j = 0; j < 10000000000; j++) {
  for (i = 0; i < 1000000000; i++) { 
    wire(1, profit, 0); // I will transfer my 29 cents from the account 0 to the account 1
  }
  finish = new Date().getTime() / 1000;
  print_balance(finish-start);
}
