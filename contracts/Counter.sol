// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
  uint public x = 10;
  uint public y = 5;
  uint public ratio = 2;

  function add(uint addx, uint addy) public {
    require(((x+addx)/(y+addy)) == ratio, "added amounts should match ratio");
    x+=addx;
    y+=addy;
  }

  function getReserves() public view returns(uint, uint) {
    return(x, y);
  }

  function swapXForY(uint amount) public {
    require(amount > 0, "added amount should be positive");
    require(amount <= x, "not enough X to swap");
    require((amount/2) <= y, "not enough liquidity");
    x -= amount;
    y += (amount/2);
  }

  function swapYForX(uint amount) public {
    require(amount > 0, "added amount should be positive");
    require(amount <= y, "not enough Y to swap");
    require((amount*2) <= x, "not enough liquidity");
    y -= amount;
    x += (amount*2);
  }
}
