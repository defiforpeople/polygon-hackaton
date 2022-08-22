// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import { IPool } from '@aave/core-v3/contracts/interfaces/IPool.sol';
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

// errors
error Error__NotEnoughBalance(uint256 balance, uint256 depositAmount);
error Error__NotEnoughAllowance(uint256 allowance, uint256 depositAmount);
error Error__NotEnoughLP(uint256 lpAmount);
error Error__AmountIsZero();
error Error__InvalidToken(address token);

contract SupplyAave {
  // events
  event Deposit(address indexed userAddr, uint256 amount);
  event Withdraw(address indexed userAddr, uint256 amount);

  IPool public immutable pool;
  uint16 public constant AAVE_REF_CODE = 0;

  mapping(address => uint256) public balances;

  constructor(address aavePool) {
    pool = IPool(aavePool);
  }

  // modifier that checks amount is not zero
  modifier checkAmount(uint256 amount) {
    if (amount == 0) {
      revert Error__AmountIsZero();
    }
    _;
  }

  // method for supplying tokens to Aave pool, with user permittion
  function deposit(address tokenAddr, uint256 amount)
    external
    checkAmount(amount)
  {
    IERC20 token = IERC20(tokenAddr);

    // check that user give enoguh allowance to the contract for supplying the token
    if (
      token.allowance(msg.sender, address(this)) == 0 ||
      token.allowance(msg.sender, address(this)) < amount
    ) {
      revert Error__NotEnoughAllowance(
        token.allowance(msg.sender, address(this)),
        amount
      );
    }

    // check that user has enough balance to supply the token
    if (token.balanceOf(msg.sender) < amount || amount == 0) {
      revert Error__NotEnoughBalance(token.balanceOf(msg.sender), amount);
    }

    balances[msg.sender] += amount;

    token.transferFrom(msg.sender, address(this), amount);
    token.approve(address(pool), amount);

    // supply liquidity in Aave
    pool.supply(tokenAddr, amount, address(this), AAVE_REF_CODE);

    emit Deposit(msg.sender, amount);
  }

  // method for withdraw tokens from Aave pool, to user's address
  /// @dev tokenAddr is the address of the token used in deposit(), not the aToken address
  function withdraw(address tokenAddr, uint256 amount) external {
    IERC20 token = IERC20(tokenAddr);

    // check that user has enough LP to withdraw
    if (balances[msg.sender] < amount || amount == 0) {
      revert Error__NotEnoughBalance(balances[msg.sender], amount);
    }

    balances[msg.sender] -= amount;

    // withdraw token amount from aave, to the userAddr
    pool.withdraw(address(token), amount, msg.sender);

    emit Withdraw(msg.sender, amount);
  }
}
