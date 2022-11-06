// old contracts
// export const CONTRACT_ADDRESS = "0x3B620BCFA256B8233964b51bAa8804a84BED0401";
// export const TEST_SAFE_ADDRESS = '0x513f8F0e8a1Cb90Ef1e8FC57c177F7CBfad8a280';
export const TEST_SAFE_ADDRESS = '0x62Fa12356234FC4a26129699Cdc7274074F7BBAD';

export const CONTRACT_ADDRESS = '0x4949b1c5F805EeaCf29CBEb820b662C586596544';

export const CONTRACT_ABI = [
    {
        inputs: [
            {
                internalType: 'address payable',
                name: 'safeAddr',
                type: 'address',
            },
            {
                internalType: 'address payable',
                name: 'destination',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'duration',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'minVotes',
                type: 'uint256',
            },
        ],
        name: 'addTransaction',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_safeName',
                type: 'string',
            },
            {
                internalType: 'address[]',
                name: '_owners',
                type: 'address[]',
            },
        ],
        name: 'createNewSafe',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address payable',
                name: 'safeAddr',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'executeTransaction',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        stateMutability: 'payable',
        type: 'fallback',
    },
    {
        inputs: [
            {
                internalType: 'address payable',
                name: 'safeAddr',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'approve',
                type: 'bool',
            },
        ],
        name: 'voteTransaction',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        stateMutability: 'payable',
        type: 'receive',
    },
    {
        inputs: [],
        name: 'GetSafes',
        outputs: [
            {
                internalType: 'address payable[]',
                name: '',
                type: 'address[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];

export const SAFE_ABI = [
    {
        inputs: [
            {
                internalType: 'string',
                name: '_safeName',
                type: 'string',
            },
            {
                internalType: 'address[]',
                name: '_owners',
                type: 'address[]',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        stateMutability: 'payable',
        type: 'fallback',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_newOwner',
                type: 'address',
            },
        ],
        name: 'addOwner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'origin',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_destination',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_duration',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_minVotes',
                type: 'uint256',
            },
        ],
        name: 'addTransaction',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'origin',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256',
            },
        ],
        name: 'executeTransaction',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'numOwners',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'safeName',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_minVotes',
                type: 'uint256',
            },
        ],
        name: 'setMinVotes',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_safeName',
                type: 'string',
            },
        ],
        name: 'setSafeName',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'transactionCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'transactions',
        outputs: [
            {
                internalType: 'bool',
                name: 'exists',
                type: 'bool',
            },
            {
                internalType: 'uint256',
                name: 'forVotes',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'totalVotes',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'minVotes',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'expiryTime',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'destination',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'transaction',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'isProcessed',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'origin',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: '_approve',
                type: 'bool',
            },
        ],
        name: 'voteTransaction',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        stateMutability: 'payable',
        type: 'receive',
    },
];

// old ABI
// export const CONTRACT_ABI = [
//     {
//         inputs: [
//             {
//                 internalType: 'address',
//                 name: '_newOwner',
//                 type: 'address',
//             },
//         ],
//         name: 'addOwner',
//         outputs: [],
//         stateMutability: 'nonpayable',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'address',
//                 name: '_destination',
//                 type: 'address',
//             },
//             {
//                 internalType: 'uint256',
//                 name: '_amount',
//                 type: 'uint256',
//             },
//             {
//                 internalType: 'uint256',
//                 name: '_duration',
//                 type: 'uint256',
//             },
//         ],
//         name: 'addTransaction',
//         outputs: [],
//         stateMutability: 'nonpayable',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'uint256',
//                 name: '_id',
//                 type: 'uint256',
//             },
//         ],
//         name: 'executeTransaction',
//         outputs: [],
//         stateMutability: 'payable',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'uint256',
//                 name: '_minVotes',
//                 type: 'uint256',
//             },
//         ],
//         name: 'setMinVotes',
//         outputs: [],
//         stateMutability: 'nonpayable',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'string',
//                 name: '_safeName',
//                 type: 'string',
//             },
//         ],
//         name: 'setSafeName',
//         outputs: [],
//         stateMutability: 'nonpayable',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'uint256',
//                 name: '_id',
//                 type: 'uint256',
//             },
//             {
//                 internalType: 'bool',
//                 name: '_approve',
//                 type: 'bool',
//             },
//         ],
//         name: 'voteTransaction',
//         outputs: [],
//         stateMutability: 'nonpayable',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'string',
//                 name: '_safeName',
//                 type: 'string',
//             },
//             {
//                 internalType: 'uint256',
//                 name: '_minVotes',
//                 type: 'uint256',
//             },
//             {
//                 internalType: 'address[]',
//                 name: '_owners',
//                 type: 'address[]',
//             },
//         ],
//         stateMutability: 'nonpayable',
//         type: 'constructor',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'address',
//                 name: '',
//                 type: 'address',
//             },
//         ],
//         name: 'isOwner',
//         outputs: [
//             {
//                 internalType: 'bool',
//                 name: '',
//                 type: 'bool',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [],
//         name: 'minVotes',
//         outputs: [
//             {
//                 internalType: 'uint256',
//                 name: '',
//                 type: 'uint256',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [],
//         name: 'safeName',
//         outputs: [
//             {
//                 internalType: 'string',
//                 name: '',
//                 type: 'string',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [],
//         name: 'transactionCount',
//         outputs: [
//             {
//                 internalType: 'uint256',
//                 name: '',
//                 type: 'uint256',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'uint256',
//                 name: '',
//                 type: 'uint256',
//             },
//         ],
//         name: 'transactions',
//         outputs: [
//             {
//                 internalType: 'bool',
//                 name: 'exists',
//                 type: 'bool',
//             },
//             {
//                 internalType: 'uint256',
//                 name: 'forVotes',
//                 type: 'uint256',
//             },
//             {
//                 internalType: 'uint256',
//                 name: 'totalVotes',
//                 type: 'uint256',
//             },
//             {
//                 internalType: 'uint256',
//                 name: 'amount',
//                 type: 'uint256',
//             },
//             {
//                 internalType: 'uint256',
//                 name: 'expiryTime',
//                 type: 'uint256',
//             },
//             {
//                 internalType: 'address',
//                 name: 'destination',
//                 type: 'address',
//             },
//             {
//                 internalType: 'address',
//                 name: 'transaction',
//                 type: 'address',
//             },
//             {
//                 internalType: 'bool',
//                 name: 'isConfirmed',
//                 type: 'bool',
//             },
//             {
//                 internalType: 'bool',
//                 name: 'isProcessed',
//                 type: 'bool',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
// ];
