/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  LLMTrainingRequest,
  LLMTrainingRequestInterface,
} from "../LLMTrainingRequest";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "llmIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "llmModelLink",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "requirement",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "llmRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_indexId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fineTunedModelId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "datasetId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fineTuneHostedScript",
        type: "string",
      },
    ],
    name: "llmSubmitted",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "LlmIndex",
    outputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "string",
        name: "llmModelId",
        type: "string",
      },
      {
        internalType: "string",
        name: "requirement",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_indexId",
        type: "uint256",
      },
    ],
    name: "acceptTraining",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_indexId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "giveReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "llmModelId",
        type: "string",
      },
      {
        internalType: "string",
        name: "requirement",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "requestTraining",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_indexId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "retrieveTrainingUser",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "userAcceptTime",
            type: "uint256",
          },
        ],
        internalType: "struct LLMTrainingRequest.TrainingUserRequest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_indexId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "fineTunedModelId",
        type: "string",
      },
      {
        internalType: "string",
        name: "datasetId",
        type: "string",
      },
      {
        internalType: "string",
        name: "fineTuneHostedScript",
        type: "string",
      },
    ],
    name: "submitTraining",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userTrainingAddresses",
    outputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "userAcceptTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b506000808190555061148f806100266000396000f3fe6080604052600436106100745760003560e01c8063a389510b1161004e578063a389510b1461010a578063cf957b3614610126578063fa2c9d6514610164578063fec4a5ba1461018d57610075565b80636b17d485146100775780639df44ac0146100a0578063a2c43102146100e157610075565b5b005b34801561008357600080fd5b5061009e600480360381019061009991906108ce565b6101ca565b005b3480156100ac57600080fd5b506100c760048036038101906100c291906108ce565b6102cc565b6040516100d89594939291906109db565b60405180910390f35b3480156100ed57600080fd5b5061010860048036038101906101039190610a68565b610432565b005b610124600480360381019061011f9190610bdd565b6104ff565b005b34801561013257600080fd5b5061014d60048036038101906101489190610c7c565b6106bb565b60405161015b929190610cbc565b60405180910390f35b34801561017057600080fd5b5061018b60048036038101906101869190610ce5565b61071c565b005b34801561019957600080fd5b506101b460048036038101906101af9190610c7c565b6107a6565b6040516101c19190610ded565b60405180910390f35b60005481111561020f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161020690610e54565b60405180910390fd5b6002600082815260200190815260200160002060405180604001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200142815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505050565b60016020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805461031590610ea3565b80601f016020809104026020016040519081016040528092919081815260200182805461034190610ea3565b801561038e5780601f106103635761010080835404028352916020019161038e565b820191906000526020600020905b81548152906001019060200180831161037157829003601f168201915b5050505050908060020180546103a390610ea3565b80601f01602080910402602001604051908101604052809291908181526020018280546103cf90610ea3565b801561041c5780601f106103f15761010080835404028352916020019161041c565b820191906000526020600020905b8154815290600101906020018083116103ff57829003601f168201915b5050505050908060030154908060040154905085565b60006001600084815260200190815260200160002060040154905060008273ffffffffffffffffffffffffffffffffffffffff168260405161047390610f05565b60006040518083038185875af1925050503d80600081146104b0576040519150601f19603f3d011682016040523d82523d6000602084013e6104b5565b606091505b50509050806104f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104f090610f66565b60405180910390fd5b50505050565b428210610541576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053890610fd2565b60405180910390fd5b803414610583576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161057a9061103e565b60405180910390fd5b33600160008054815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600160008054815260200190815260200160002060010190816105fd919061120a565b508260016000805481526020019081526020016000206002019081610622919061120a565b5081600160008054815260200190815260200160002060030181905550806001600080548152602001908152602001600020600401819055507fbf50bb8c8ec606c8c76b4841a4bbe1f94aa859acfde9dd8d44cbfc235c8fcb823360005486868686604051610696969594939291906112dc565b60405180910390a16000808154809291906106b09061137a565b919050555050505050565b600260205281600052604060002081815481106106d757600080fd5b9060005260206000209060020201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b600054841115610761576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075890610e54565b60405180910390fd5b7f7e4b4bb848805d120a19062b8f25396d229ea1e740b359f908e58a8d6ee2a46233858585856040516107989594939291906113c2565b60405180910390a150505050565b6107ae610854565b6002600084815260200190815260200160002082815481106107d3576107d261142a565b5b90600052602060002090600202016040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481525050905092915050565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6108ab81610898565b81146108b657600080fd5b50565b6000813590506108c8816108a2565b92915050565b6000602082840312156108e4576108e361088e565b5b60006108f2848285016108b9565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610926826108fb565b9050919050565b6109368161091b565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561097657808201518184015260208101905061095b565b60008484015250505050565b6000601f19601f8301169050919050565b600061099e8261093c565b6109a88185610947565b93506109b8818560208601610958565b6109c181610982565b840191505092915050565b6109d581610898565b82525050565b600060a0820190506109f0600083018861092d565b8181036020830152610a028187610993565b90508181036040830152610a168186610993565b9050610a2560608301856109cc565b610a3260808301846109cc565b9695505050505050565b610a458161091b565b8114610a5057600080fd5b50565b600081359050610a6281610a3c565b92915050565b60008060408385031215610a7f57610a7e61088e565b5b6000610a8d858286016108b9565b9250506020610a9e85828601610a53565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610aea82610982565b810181811067ffffffffffffffff82111715610b0957610b08610ab2565b5b80604052505050565b6000610b1c610884565b9050610b288282610ae1565b919050565b600067ffffffffffffffff821115610b4857610b47610ab2565b5b610b5182610982565b9050602081019050919050565b82818337600083830152505050565b6000610b80610b7b84610b2d565b610b12565b905082815260208101848484011115610b9c57610b9b610aad565b5b610ba7848285610b5e565b509392505050565b600082601f830112610bc457610bc3610aa8565b5b8135610bd4848260208601610b6d565b91505092915050565b60008060008060808587031215610bf757610bf661088e565b5b600085013567ffffffffffffffff811115610c1557610c14610893565b5b610c2187828801610baf565b945050602085013567ffffffffffffffff811115610c4257610c41610893565b5b610c4e87828801610baf565b9350506040610c5f878288016108b9565b9250506060610c70878288016108b9565b91505092959194509250565b60008060408385031215610c9357610c9261088e565b5b6000610ca1858286016108b9565b9250506020610cb2858286016108b9565b9150509250929050565b6000604082019050610cd1600083018561092d565b610cde60208301846109cc565b9392505050565b60008060008060808587031215610cff57610cfe61088e565b5b6000610d0d878288016108b9565b945050602085013567ffffffffffffffff811115610d2e57610d2d610893565b5b610d3a87828801610baf565b935050604085013567ffffffffffffffff811115610d5b57610d5a610893565b5b610d6787828801610baf565b925050606085013567ffffffffffffffff811115610d8857610d87610893565b5b610d9487828801610baf565b91505092959194509250565b610da98161091b565b82525050565b610db881610898565b82525050565b604082016000820151610dd46000850182610da0565b506020820151610de76020850182610daf565b50505050565b6000604082019050610e026000830184610dbe565b92915050565b7f494e56414c49445f494e4445585f494400000000000000000000000000000000600082015250565b6000610e3e601083610947565b9150610e4982610e08565b602082019050919050565b60006020820190508181036000830152610e6d81610e31565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610ebb57607f821691505b602082108103610ece57610ecd610e74565b5b50919050565b600081905092915050565b50565b6000610eef600083610ed4565b9150610efa82610edf565b600082019050919050565b6000610f1082610ee2565b9150819050919050565b7f5472616e73666572206661696c65640000000000000000000000000000000000600082015250565b6000610f50600f83610947565b9150610f5b82610f1a565b602082019050919050565b60006020820190508181036000830152610f7f81610f43565b9050919050565b7f494e56414c49445f54494d455354414d50000000000000000000000000000000600082015250565b6000610fbc601183610947565b9150610fc782610f86565b602082019050919050565b60006020820190508181036000830152610feb81610faf565b9050919050565b7f494e56414c49445f414d4f554e54000000000000000000000000000000000000600082015250565b6000611028600e83610947565b915061103382610ff2565b602082019050919050565b600060208201905081810360008301526110578161101b565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026110c07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611083565b6110ca8683611083565b95508019841693508086168417925050509392505050565b6000819050919050565b60006111076111026110fd84610898565b6110e2565b610898565b9050919050565b6000819050919050565b611121836110ec565b61113561112d8261110e565b848454611090565b825550505050565b600090565b61114a61113d565b611155818484611118565b505050565b5b818110156111795761116e600082611142565b60018101905061115b565b5050565b601f8211156111be5761118f8161105e565b61119884611073565b810160208510156111a7578190505b6111bb6111b385611073565b83018261115a565b50505b505050565b600082821c905092915050565b60006111e1600019846008026111c3565b1980831691505092915050565b60006111fa83836111d0565b9150826002028217905092915050565b6112138261093c565b67ffffffffffffffff81111561122c5761122b610ab2565b5b6112368254610ea3565b61124182828561117d565b600060209050601f8311600181146112745760008415611262578287015190505b61126c85826111ee565b8655506112d4565b601f1984166112828661105e565b60005b828110156112aa57848901518255600182019150602085019450602081019050611285565b868310156112c757848901516112c3601f8916826111d0565b8355505b6001600288020188555050505b505050505050565b600060c0820190506112f1600083018961092d565b6112fe60208301886109cc565b81810360408301526113108187610993565b905081810360608301526113248186610993565b905061133360808301856109cc565b61134060a08301846109cc565b979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061138582610898565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036113b7576113b661134b565b5b600182019050919050565b600060a0820190506113d7600083018861092d565b6113e460208301876109cc565b81810360408301526113f68186610993565b9050818103606083015261140a8185610993565b9050818103608083015261141e8184610993565b90509695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220271df93df366279831f635810709a1a9fac5282d023fdbffa1d0dc208df4013f64736f6c634300081b0033";

type LLMTrainingRequestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LLMTrainingRequestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LLMTrainingRequest__factory extends ContractFactory {
  constructor(...args: LLMTrainingRequestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      LLMTrainingRequest & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): LLMTrainingRequest__factory {
    return super.connect(runner) as LLMTrainingRequest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LLMTrainingRequestInterface {
    return new Interface(_abi) as LLMTrainingRequestInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): LLMTrainingRequest {
    return new Contract(address, _abi, runner) as unknown as LLMTrainingRequest;
  }
}
