// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DomainRegistry
 * @notice Production-ready domain registration contract with lifetime ownership
 * @dev Deploy separate instances on each blockchain (Ethereum, Polygon, BSC, etc.)
 * 
 * FEATURES:
 * - Lifetime domain ownership (no renewal fees)
 * - Custom domain extensions support
 * - Domain records (wallet addresses, IPFS, social links)
 * - Domain transfers
 * - Emergency pause mechanism
 * - Upgradeable treasury address
 * 
 * PAYMENT FLOW:
 * 1. User calls registerDomain() with payment in native currency
 * 2. Payment instantly transferred to treasury (your wallet)
 * 3. Domain registered to user with lifetime ownership
 * 4. User can set records and transfer domain
 */
contract DomainRegistry {
    // ============ State Variables ============
    
    address public owner;
    address public treasury;
    bool public paused;
    
    // Pricing (can be 0 for free registration)
    uint256 public registrationFee;
    
    struct Domain {
        address owner;
        uint256 registrationDate;
        uint256 expirationDate; // type(uint256).max for lifetime
        bool isActive;
        string extension;
    }
    
    struct DomainRecords {
        string walletAddress;  // Associated wallet
        string ipfsHash;       // IPFS content hash
        string twitter;        // Twitter handle
        string discord;        // Discord handle
        string email;          // Email address
        string website;        // Website URL
        string avatar;         // Avatar IPFS hash
    }
    
    // Mappings
    mapping(string => Domain) public domains;
    mapping(string => DomainRecords) public domainRecords;
    mapping(address => string[]) private userDomains;
    
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
        address indexed toAddress,
        uint256 timestamp
    );
    
    event RecordUpdated(
        string indexed domainName,
        string recordType,
        string value,
        uint256 timestamp
    );
    
    event PaymentReceived(
        address indexed from,
        uint256 amount,
        string domainName,
        uint256 timestamp
    );
    
    event TreasuryUpdated(
        address indexed oldTreasury,
        address indexed newTreasury,
        uint256 timestamp
    );
    
    event RegistrationFeeUpdated(
        uint256 oldFee,
        uint256 newFee,
        uint256 timestamp
    );
    
    event Paused(bool paused, uint256 timestamp);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    // ============ Errors ============
    
    error InvalidAddress();
    error InvalidDomainName();
    error DomainAlreadyRegistered();
    error DomainNotRegistered();
    error NotDomainOwner();
    error InsufficientPayment();
    error IsPaused();
    error OnlyOwner();
    error TransferFailed();
    
    // ============ Modifiers ============
    
    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }
    
    modifier whenNotPaused() {
        if (paused) revert IsPaused();
        _;
    }
    
    modifier validAddress(address addr) {
        if (addr == address(0)) revert InvalidAddress();
        _;
    }
    
    modifier onlyDomainOwner(string memory domainName) {
        if (!domains[domainName].isActive) revert DomainNotRegistered();
        if (domains[domainName].owner != msg.sender) revert NotDomainOwner();
        _;
    }
    
    // ============ Constructor ============
    
    constructor(address _treasury, uint256 _registrationFee) validAddress(_treasury) {
        owner = msg.sender;
        treasury = _treasury;
        registrationFee = _registrationFee;
        paused = false;
        
        emit OwnershipTransferred(address(0), msg.sender);
    }
    
    // ============ Main Functions ============
    
    /**
     * @notice Register a domain with lifetime ownership
     * @param domainName Full domain name (e.g., "myname.fizz")
     * @param extension The extension (e.g., ".fizz")
     */
    function registerDomain(
        string calldata domainName,
        string calldata extension
    ) external payable whenNotPaused {
        if (bytes(domainName).length == 0) revert InvalidDomainName();
        if (domains[domainName].isActive) revert DomainAlreadyRegistered();
        if (msg.value < registrationFee) revert InsufficientPayment();
        
        // Transfer payment to treasury
        (bool success, ) = payable(treasury).call{value: msg.value}("");
        if (!success) revert TransferFailed();
        
        // Register domain with lifetime ownership
        domains[domainName] = Domain({
            owner: msg.sender,
            registrationDate: block.timestamp,
            expirationDate: type(uint256).max, // Lifetime ownership
            isActive: true,
            extension: extension
        });
        
        // Add to user's domain list
        userDomains[msg.sender].push(domainName);
        
        emit PaymentReceived(msg.sender, msg.value, domainName, block.timestamp);
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
     * @return available True if domain is available
     */
    function checkAvailability(string calldata domainName) 
        external 
        view 
        returns (bool available) 
    {
        return !domains[domainName].isActive;
    }
    
    /**
     * @notice Get domain information
     * @param domainName Full domain name
     * @return domain Domain struct with all info
     */
    function getDomainInfo(string calldata domainName)
        external
        view
        returns (Domain memory domain)
    {
        return domains[domainName];
    }
    
    /**
     * @notice Get domain records
     * @param domainName Full domain name
     * @return records Domain records struct
     */
    function getDomainRecords(string calldata domainName)
        external
        view
        returns (DomainRecords memory records)
    {
        return domainRecords[domainName];
    }
    
    /**
     * @notice Set wallet address record for a domain
     * @param domainName Full domain name
     * @param walletAddress Wallet address to associate
     */
    function setWalletAddress(string calldata domainName, string calldata walletAddress)
        external
        onlyDomainOwner(domainName)
    {
        domainRecords[domainName].walletAddress = walletAddress;
        emit RecordUpdated(domainName, "wallet", walletAddress, block.timestamp);
    }
    
    /**
     * @notice Set IPFS hash for domain content
     * @param domainName Full domain name
     * @param ipfsHash IPFS content hash
     */
    function setIPFSHash(string calldata domainName, string calldata ipfsHash)
        external
        onlyDomainOwner(domainName)
    {
        domainRecords[domainName].ipfsHash = ipfsHash;
        emit RecordUpdated(domainName, "ipfs", ipfsHash, block.timestamp);
    }
    
    /**
     * @notice Set social media records
     * @param domainName Full domain name
     * @param twitter Twitter handle
     * @param discord Discord handle
     */
    function setSocialRecords(
        string calldata domainName,
        string calldata twitter,
        string calldata discord
    )
        external
        onlyDomainOwner(domainName)
    {
        domainRecords[domainName].twitter = twitter;
        domainRecords[domainName].discord = discord;
        emit RecordUpdated(domainName, "social", "updated", block.timestamp);
    }
    
    /**
     * @notice Set email and website
     * @param domainName Full domain name
     * @param email Email address
     * @param website Website URL
     */
    function setContactInfo(
        string calldata domainName,
        string calldata email,
        string calldata website
    )
        external
        onlyDomainOwner(domainName)
    {
        domainRecords[domainName].email = email;
        domainRecords[domainName].website = website;
        emit RecordUpdated(domainName, "contact", "updated", block.timestamp);
    }
    
    /**
     * @notice Set avatar IPFS hash
     * @param domainName Full domain name
     * @param avatar Avatar IPFS hash
     */
    function setAvatar(string calldata domainName, string calldata avatar)
        external
        onlyDomainOwner(domainName)
    {
        domainRecords[domainName].avatar = avatar;
        emit RecordUpdated(domainName, "avatar", avatar, block.timestamp);
    }
    
    /**
     * @notice Transfer domain ownership
     * @param domainName Full domain name
     * @param newOwner Address of new owner
     */
    function transferDomain(string calldata domainName, address newOwner)
        external
        onlyDomainOwner(domainName)
        validAddress(newOwner)
    {
        address oldOwner = domains[domainName].owner;
        domains[domainName].owner = newOwner;
        
        // Remove from old owner's list
        string[] storage oldOwnerDomains = userDomains[oldOwner];
        uint256 len = oldOwnerDomains.length;
        for (uint256 i = 0; i < len; i++) {
            if (keccak256(bytes(oldOwnerDomains[i])) == keccak256(bytes(domainName))) {
                oldOwnerDomains[i] = oldOwnerDomains[len - 1];
                oldOwnerDomains.pop();
                break;
            }
        }

        // Add to new owner's list
        userDomains[newOwner].push(domainName);
        
        emit DomainTransferred(domainName, oldOwner, newOwner, block.timestamp);
    }
    
    /**
     * @notice Get all domains owned by an address
     * @param userAddress Address to query
     * @return Array of domain names
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
     * @notice Update treasury address
     * @param newTreasury New treasury address
     */
    function updateTreasury(address newTreasury) 
        external 
        onlyOwner 
        validAddress(newTreasury) 
    {
        address oldTreasury = treasury;
        treasury = newTreasury;
        emit TreasuryUpdated(oldTreasury, newTreasury, block.timestamp);
    }
    
    /**
     * @notice Update registration fee
     * @param newFee New registration fee in wei
     */
    function updateRegistrationFee(uint256 newFee) external onlyOwner {
        uint256 oldFee = registrationFee;
        registrationFee = newFee;
        emit RegistrationFeeUpdated(oldFee, newFee, block.timestamp);
    }
    
    /**
     * @notice Pause/unpause contract
     * @param _paused True to pause, false to unpause
     */
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit Paused(_paused, block.timestamp);
    }
    
    /**
     * @notice Transfer contract ownership
     * @param newOwner Address of new owner
     */
    function transferOwnership(address newOwner) 
        external 
        onlyOwner 
        validAddress(newOwner) 
    {
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    /**
     * @notice Emergency withdrawal (only if funds stuck)
     * @dev Should never be needed as payments go directly to treasury
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        if (balance > 0) {
            (bool success, ) = payable(treasury).call{value: balance}("");
            if (!success) revert TransferFailed();
        }
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get contract version
     * @return version Version string
     */
    function version() external pure returns (string memory) {
        return "1.0.0";
    }
    
    /**
     * @notice Check if address owns a specific domain
     * @param userAddress Address to check
     * @param domainName Domain to check
     * @return True if user owns domain
     */
    function isOwnerOf(address userAddress, string calldata domainName)
        external
        view
        returns (bool)
    {
        return domains[domainName].isActive && domains[domainName].owner == userAddress;
    }
    
    // Receive function to accept ETH
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value, "direct", block.timestamp);
    }
}
