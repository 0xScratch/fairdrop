// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {IStrategy} from "./IStrategy.sol";
import {ISparkLendPool} from "./ISparkLendPool.sol";

import "hardhat/console.sol";

contract SparkLendStrategy is IStrategy {
    ISparkLendPool private pool;

    constructor(address _pool) {
        pool = ISparkLendPool(_pool);
    }

    function supply(address token, uint256 amount) external {
        // Send tokens to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Approve SparkLend pool to spend any amount of tokens
        if (IERC20(token).allowance(address(this), address(pool)) < amount) {
            IERC20(token).approve(address(pool), type(uint256).max);
        }

        pool.supply(token, amount, address(this), 0);

        // TODO: transfer liquidity tokens to msg.sender
    }
}
