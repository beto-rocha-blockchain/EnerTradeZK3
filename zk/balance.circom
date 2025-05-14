pragma circom 2.0.0;

template BalanceCheck() {
    signal input private balance;
    signal input threshold;
    signal output pass;

    pass <== balance >= threshold;
}

component main = BalanceCheck();
