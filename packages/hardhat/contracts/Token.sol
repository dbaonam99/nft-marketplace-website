// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface ERC20 {
    //Powers The Token
    function totalSupply() external view returns (uint _totalSupply);
    function balanceOf(address _owner) external view returns (uint balance);
    function transfer(address _to, uint _value) external returns (bool success);
    
    
    //Needed to Meet ERC Standard
    function transferFrom(address _from, address _to, uint _value) external returns (bool success);
    function approve(address _spender, uint _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint remaining);
    
    //Need for front end Interaction
    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);

}

// this is the basics of creating an ERC20 token
contract Token is ERC20 {
    string public constant symbol = "UIT";
    string public constant name = "UIT Token";
    uint8 public constant decimals = 10;
 
    //1,000,000+10 zeros
    uint private constant __totalSupply = 10000000000000000;

    //this mapping is where we store the balances of an address
    mapping (address => uint) private __balanceOf;

    //This is a mapping of a mapping.  This is for the approval function to determine how much an address can spend
    mapping (address => mapping (address => uint)) private __allowances;

    //the creator of the contract has the total supply and no one can create tokens
    constructor(address _admin) public {
        __balanceOf[_admin] = __totalSupply;
    }

    function totalSupply() public view override returns (uint _totalSupply) {
        _totalSupply = __totalSupply;
    }

    //returns the balance of a specific address
    function balanceOf(address _addr) public view override returns (uint balance) {
        return __balanceOf[_addr];
    }
    

    //transfer an amount of tokens to another address.  The transfer needs to be >0 
    //does the msg.sender have enough tokens to forfill the transfer
    //decrease the balance of the sender and increase the balance of the to address
    function transfer(address _to, uint _value) public override returns (bool success) {
        require(_value <= __balanceOf[msg.sender], 'This wallet does not have enough money');

        __balanceOf[msg.sender] -= _value;
        __balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    
    //this allows someone else (a 3rd party) to transfer from my wallet to someone elses wallet
    //If the 3rd party has an allowance of >0 
    //and the value to transfer is >0 
    //and the allowance is >= the value of the transfer
    //and it is not a contract
    //perform the transfer by increasing the to account and decreasing the from accounts
    function transferFrom(address _from, address _to, uint _value) public override returns (bool success) {
        require(!isContract(_to), 'This is not a contract');
        require(_value <= __balanceOf[_from], 'This wallet does not have enough money');
        require(_value <= __allowances[_from][msg.sender], 'This wallet does not have enough alowances');

        __balanceOf[_from] -= _value;
        __balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    //This check is to determine if we are sending to a contract?
    //Is there code at this address?  If the code size is greater then 0 then it is a contract.
    function isContract(address _addr) public view returns (bool) {
        uint codeSize;
        //in line assembly code
        assembly {
            codeSize := extcodesize(_addr)
        }
        // i=s code size > 0  then true
        return codeSize > 0;    
    }

 
    //allows a spender address to spend a specific amount of value
    function approve(address _spender, uint _value) external override returns (bool success) {
        __allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }


    //shows how much a spender has the approval to spend to a specific address
    function allowance(address _owner, address _spender) external override view returns (uint remaining) {
        return __allowances[_owner][_spender];
    }

}