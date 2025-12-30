// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Dhanmatrix Smart Yield Vault
 * @dev Sample contract for decentralized investment allocation.
 */
contract DMCYieldVault {
    address public owner;
    uint256 public totalAUM; // Assets Under Management

    mapping(address => uint256) public balances;
    mapping(address => uint256) public lastDepositTime;

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event ProfitDistributed(uint256 totalProfit);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Matrix Admin allowed");
        _;
    }

    function deposit() public payable {
        require(msg.value > 0, "Initial capital required");
        balances[msg.sender] += msg.value;
        lastDepositTime[msg.sender] = block.timestamp;
        totalAUM += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function getPendingProfit(address user) public view returns (uint256) {
        // Mock profit logic: 1% per day if held
        uint256 duration = block.timestamp - lastDepositTime[user];
        uint256 daysElapsed = duration / 1 days;
        return (balances[user] * daysElapsed) / 100;
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender] + getPendingProfit(msg.sender);
        require(amount > 0, "No assets found");
        
        balances[msg.sender] = 0;
        totalAUM -= amount;
        
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }
}
