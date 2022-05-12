pragma solidity 0.8.9;

library types {


struct PersonProfile {
        uint256 personID; // user integrating
        uint256 timeJoined;
        uint256 lastQueried;
        mapping(uint256 => uint256) interestForPlanet; // for determining the total interest incurred  for the given planetID.
        mapping(uint => mapping(uint => bool ))  planetOccupied; // determines the 
        uint256 lastPx;
        uint256 lastPy;
        uint256 stepsTaken; // total steps followed , for tracking purposes;
        uint256 fuelRemaining; // for every work , there will be money spend , so need to charge credits by using their 
    }


struct WorldMap {
    // just for the dimension purposes.
    uint256 Length;
    uint256 Breadth;
    mapping(uint256 => mapping(uint256  => Planet) world; 
    /* considering Planet to be an circle and thus anyone reaching approx in the radius will be  the recipient of the resources */
}


struct Planet {
    uint256 CenterX;
    uint256 CenterY;
    uint256 radius;
    uint256 resources;
    uint decayRate; // this determines the reduction of the resources after captured // might be used for superfluid streaming of the amounts
}


}