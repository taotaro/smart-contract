// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract Escrow_test {
  uint256 public count = 0;
  address public accName;
  uint256 public balance;
  uint256 public gasFee;

  event Transfer(address indexed from, address indexed, uint256 value);

  struct Account {
    uint256 id;
    string name;
    uint256 balance;
  }

  mapping(uint => Account) public accounts;
  mapping(address => uint256) balances;

  constructor() {
    createAccount('Tamara Yustian', 999);
  }

  function createAccount(string memory _name, uint256 _balance) public {
    count++;
    accounts[count] = Account(count, _name, _balance);
  }

  function balanceOf(address _name) public view returns (uint256 availBalance) {
        return balances[_name];
    }

  function transferTo(address _from, address _to, uint256 _amount) 
  public payable returns (bool success) {
    if (balances[_from] > _amount && _amount > 0 && balances[_to] + _amount > balances[_to]) {
      balances[_from] -= _amount;
      balances[_to] += _amount;
      return true;
    } else {
      return false;
    }
  }

}