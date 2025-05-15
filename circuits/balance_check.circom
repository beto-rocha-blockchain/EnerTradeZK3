pragma circom 2.0.0;

include "comparators.circom";

template BalanceCheck(nBits) {
    signal input balance;
    signal input threshold;
    signal output result;

    component lt = LessThan(nBits);
    lt.in[0] <== balance;
    lt.in[1] <== threshold;

    // Se balance < threshold, lt.out = 1; caso contrário, lt.out = 0
    // Portanto, result = 1 - lt.out será 1 quando balance >= threshold
    result <== 1 - lt.out;
}

component main = BalanceCheck(32);
