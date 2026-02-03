// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title DomainRegistry
 * @notice Simple domain registration contract that collects payments
 * @dev This is an example contract. Deploy separate contracts for each blockchain.
 * 
 * PAYMENT FLOW:
 * 1. User calls registerDomain() with payment
 * 2. Contract receives payment in native currency (ETH, BNB, MATIC, etc.)
 * 3. Payment is immediately transferred to treasury (your wallet)
 * 4. Domain is registered to the user
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Deploy this contract on each blockchain (Ethereum, BSC, Polygon, etc.)
 * 2. Set the treasury address to YOUR wallet or multi-sig
 * 3. Update NEXT_PUBLIC_CONTRACT_ADDRESS in your .env.local
 * 4. Integrate with frontend (see PAYMENTS.md)
 */

contract DomainRegistry {
    // ============ State Variables ============
    
    address public owner;
    address public treasury; // YOUR WALLET - receives all payments
    bool public paused;
    
    struct Domain {
        address owner;
        uint256 registrationDate;
        uint256 expirationDate; // Set to type(uint256).max for lifetime
        bool isActive;
        string extension;
    }
    
    // domain name => Domain info
    mapping(string => Domain) public domains;
    
    // user address => array of domain names
    mapping(address => string[]) public userDomains;
    
    // ============ Events ============
    
    event DomainRegistered(
        string indexed domainName,
        address indexed owner,
        uint256 paymentAmount,
        string extension,
        uint256 registrationDate
    );
    
    event DomainTransferred(
        string indexed domainName,
        address indexed fromAddress,
        address indexed toAddress
    );
    
    event PaymentReceived(
        address indexed from,
        uint256 amount,
        string domainName
    );
    
    event TreasuryUpdated(
        address indexed oldTreasury,
        address indexed newTreasury
    );
    
    // ============ Constructor ============
    
    constructor(address _treasury) {
        require(_treasury != address(0), "Invalid treasury address");
        owner = msg.sender;
        treasury = _treasury;
        paused = false;
    }
    
    // ============ Modifiers ============
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    // ============ Main Functions ============
    
    /**
     * @notice Register a domain with lifetime ownership
     * @param domainName Full domain name (e.g., "myname.fizz")
     * @param extension The extension (e.g., ".fizz")
     */
    function registerDomain(
        string memory domainName,
        string memory extension
    ) external payable whenNotPaused {
        require(msg.value > 0, "Payment required");
        require(!domains[domainName].isActive, "Domain already registered");
        require(bytes(domainName).length > 0, "Invalid domain name");
        
        // Transfer payment to treasury (YOUR WALLET)
        payable(treasury).transfer(msg.value);
        
        // Register the domain with lifetime ownership
        domains[domainName] = Domain({
            owner: msg.sender,
            registrationDate: block.timestamp,
            expirationDate: type(uint256).max, // Lifetime = never expires
            isActive: true,
            extension: extension
        });
        
        // Add to user's domain list
        userDomains[msg.sender].push(domainName);
        
        emit PaymentReceived(msg.sender, msg.value, domainName);
        emit DomainRegistered(
            domainName,
            msg.sender,
            msg.value,
            extension,
            block.timestamp
        );
    }
    
    /**
     * @notice Check if a domain is available
     * @param domainName Full domain name to check
     * @return bool true if available, false if taken
     */
    function checkAvailability(string memory domainName) 
        external 
        view 
        returns (bool) 
    {
        return !domains[domainName].isActive;
    }
    
    /**
     * @notice Get domain information
     * @param domainName Full domain name
     * @return Domain struct with all domain info
     */
    function getDomainInfo(string memory domainName)
        external
        view
        returns (Domain memory)
    {
        return domains[domainName];
    }
    
    /**
     * @notice Transfer domain to a new owner
     * @param domainName Full domain name
     * @param newOwner Address of the new owner
     */
    function transferDomain(string memory domainName, address newOwner)
        external
    {
        require(domains[domainName].isActive, "Domain not registered");
        require(domains[domainName].owner == msg.sender, "Not domain owner");
        require(newOwner != address(0), "Invalid address");
        
        address oldOwner = domains[domainName].owner;
        domains[domainName].owner = newOwner;
        
        // Add to new owner's list
        userDomains[newOwner].push(domainName);
        
        emit DomainTransferred(domainName, oldOwner, newOwner);
    }
    
    /**
     * @notice Get all domains owned by an address
     * @param userAddress Address to query
     * @return string[] Array of domain names
     */
    function getUserDomains(address userAddress)
        external
        view
        returns (string[] memory)
    {
        return userDomains[userAddress];
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Update treasury address (where payments go)
     * @param newTreasury New treasury address
     */
    function updateTreasury(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "Invalid address");
        address oldTreasury = treasury;
        treasury = newTreasury;
        emit TreasuryUpdated(oldTreasury, newTreasury);
    }
    
    /**
     * @notice Pause/unpause contract in emergency
     * @param _paused true to pause, false to unpause
     */
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }
    
    /**
     * @notice Transfer ownership of contract
     * @param newOwner Address of new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
